const overlayConfig = {
  debugMode: false,
  debugPlayer: "-1",

  // Map name when it is not available (i.e. main menu).
  defaultMapName: "Unknown map",

  // Mode name when a matching clantag is not found, see validKzModes below.
  defaultModeName: "KZT",

  // Whether to display "NUB" or "TP" times.
  preferNubTimes: false,

  // Whether to show times of spectated players.
  showTimesFromSpectated: false,

  // Local or remote host to your WebSocket server.
  wsEndpoint: "ws://localhost:4001",

  // String or array of protocols to add when connecting.
  wsProtocols: [],

  // Time in seconds on how often data is refreshed.
  dataFetchInterval: 30,

  // Base url for retrieving "global" statistics from.
  apiClientBaseUrl: "http://kztimerglobal.com/api/v2.0",

  // Cache lifetime for http queries, in seconds.
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
