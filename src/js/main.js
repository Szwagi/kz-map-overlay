import config from "conf/config";
import template from "conf/template";

import { version } from "../../package.json";

import Logger from "./logger";
import ApiHTTPClient from "./apiclient";

import { removeExpiredCacheEntries } from "./cache";
import { getMapPrefix, getMapPrettyName } from "./utils";

const logger = new Logger({
  enableDebug: config.debugMode,
});

const apiClient = new ApiHTTPClient({
  logger: logger,
  clientOptions: {
    baseUrl: config.apiClientBaseUrl,
    cacheLifetime: config.apiClientCacheLifetime,
  },
});

logger.DoInfo(`kz-map-overlay v${version}`);

setInterval(removeExpiredCacheEntries, 60000);

const app = new Vue({
  el: "#overlay",
  template: template,

  data() {
    return {
      config: config,
      fetchTimer: null,

      map: null,

      tpWr: null,
      tpPb: null,
      proWr: null,
      proPb: null,

      steamId: "",
      mapName: config.defaultMapName,
      modeName: config.defaultModeName,
    };
  },
  watch: {
    mapName: "onMapChange",
    modeName: "onModeChange",
  },
  mounted() {
    this.mapName = this.config.defaultMapName;
    this.modeName = this.config.defaultModeName;

    if (this.config.debugMode) {
      this.steamId = this.config.debugPlayer;
    }

    if (this.config.wsEndpoint) {
      const ws = new WebSocket(this.config.wsEndpoint, this.config.wsProtocols);

      ws.onopen = (evt) => {
        ws.send(""); // GSISocket requires this
        logger.DoInfo("WebSocket connected", { ws, evt });
      };

      ws.onclose = (evt) => {
        logger.DoInfo("WebSocket disconnected", { ws, evt });
      };

      ws.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        logger.DoDebug("Websocket data received", { ws, data });

        this.steamId = data?.player?.steamid;

        this.mapName = getMapPrettyName(
          data?.map?.name ?? this.config.defaultMapName
        );

        this.modeName = this.config.validKzModes.includes(data?.player?.clan)
          ? data?.player?.clan
          : config.defaultModeName;
      };
    }
  },
  computed: {
    mapPrefix: function () {
      return getMapPrefix(this.mapName);
    },

    mapIsKz: function () {
      return this.config.validKzMapPrefixes.includes(this.mapPrefix);
    },

    globalMode: function () {
      return this.config.validKzGlobalModes[this.modeName];
    },

    nubWr: function () {
      if (this.tpWr === undefined || this.proWr === undefined) {
        return undefined;
      }

      return this.proWr?.time <= this.tpWr?.time ? this.proWr : this.tpWr;
    },

    nubPb: function () {
      if (this.tpPb === undefined || this.proPb === undefined) {
        return undefined;
      }

      return this.proPb?.time <= this.tpPb?.time ? this.proPb : this.tpPb;
    },
  },
  methods: {
    resetState: function (isMapChange) {
      clearTimeout(this.fetchTimer);
      apiClient.abortInflightRequests();

      if (isMapChange) {
        this.map = this.mapIsKz ? undefined : null;
      }

      this.invalidateRecords();
    },

    invalidateRecords: function () {
      const state = this.mapIsKz && this.globalMode ? undefined : null;
      this.tpWr = state;
      this.tpPb = state;
      this.proWr = state;
      this.proPb = state;
    },

    queueDataFetch: function () {
      clearTimeout(this.fetchTimer);
      if (this.config.dataFetchInterval) {
        this.fetchTimer = setTimeout(
          this.fetchData,
          this.config.dataFetchInterval * 1000
        );
      }
    },

    onMapChange: function () {
      logger.DoDebug("Map changed!");

      this.resetState(true);
      this.fetchData();
    },

    onModeChange: function () {
      logger.DoDebug("Mode changed!");

      this.resetState(false);
      this.fetchData();
    },

    fetchData: async function () {
      if (!this.mapIsKz) {
        return;
      }

      this.map = await apiClient.getMapByName(this.mapName);
      if (this.map === undefined) {
        return this.queueDataFetch();
      }

      if (!this.map?.validated) {
        this.tpWr = null;
        this.tpPb = null;
        this.proWr = null;
        this.proPb = null;
        return;
      }

      if (!this.globalMode) {
        return;
      }

      const map = this.mapName;
      const mode = this.globalMode;
      const steamId = this.steamId;

      const wrs = await Promise.all([
        apiClient.getTpWorldRecord(map, mode),
        apiClient.getProWorldRecord(map, mode),
      ]);

      this.tpWr = wrs[0]?.[0] ?? null;
      this.proWr = wrs[1]?.[0] ?? null;

      const pbs = await Promise.all([
        this.tpWr ? apiClient.getTpPersonalBest(map, mode, steamId) : null,
        this.proWr ? apiClient.getProPersonalBest(map, mode, steamId) : null,
      ]);

      this.tpPb = pbs[0]?.[0] ?? null;
      this.proPb = pbs[1]?.[0] ?? null;

      return this.queueDataFetch();
    },
  },
});

export { app };
