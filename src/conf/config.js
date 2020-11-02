const overlayConfig = {
  debugMode: false,
  debugPlayer: "-1",

  /*
    defaultMapName: Map name when it is not available (i.e. main menu).
    defaultModeName: Mode name when a matching clantag is not found, see validKzModes below.
  */
  defaultMapName: "Unknown map",
  defaultModeName: "KZT",

  preferNubTimes: false,
  showTimesFromSpectated: false,

  /*
    wsEndpoint: Local or remote host to your WebSocket server.
    wsProtocols: String or array of protocols to add when connecting
  */
  wsEndpoint: "ws://localhost:4001",
  wsProtocols: [],

  dataFetchInterval: 30,

  componentsToLoad: ["debug.vue.js", "record.vue.js"],

  /*
    "apiClientBaseUrl" - Base url for retrieving "global" statistics from.
    "apiClientCacheLifetime" - Cache lifetime for http queries, in seconds.
  */
  apiClientBaseUrl: "http://kztimerglobal.com/api/v2.0",
  apiClientCacheLifetime: 25,

  // Clantags considered to be valid KZ modes.
  validKzModes: ["KZT", "SKZ", "VNL", "FKZ", "HKZ"],

  // Map prefixes considered to be valid KZ.
  validKzMapPrefixes: ["kz", "xc", "bkz", "skz", "vnl", "kzpro"],

  validKzGlobalModes: {
    KZT: "kz_timer",
    SKZ: "kz_simple",
    VNL: "kz_vanilla",
  },
};
