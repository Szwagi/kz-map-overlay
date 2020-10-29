import { getCacheEntry, setCacheEntry, isExpiredCacheEntry } from "./cache";

export default class ApiHTTPClient {
  constructor(options) {
    this.options = {
      logger: options.logger,
      fetch: options.fetchOptions,
      client: options.clientOptions,
    };

    this.controller = new AbortController();
    this.options.fetch = {
      ...this.options.fetch,
      signal: this.controller.signal,
    };
  }

  getMapByName(mapName) {
    return cachedFetch(`/maps/name/${mapName}`, this.options);
  }

  getTpWorldRecord(mapName, modeName) {
    return cachedFetch("/records/top", this.options, {
      limit: 1,
      stage: 0,
      tickrate: 128,
      map_name: mapName,
      has_teleports: true,
      modes_list_string: modeName,
    });
  }

  getTpPersonalBest(mapName, modeName, steamId64) {
    return cachedFetch("/records/top", this.options, {
      stage: 0,
      limit: 1,
      tickrate: 128,
      map_name: mapName,
      steamId64: steamId64,
      has_teleports: true,
      modes_list_string: modeName,
    });
  }

  getProWorldRecord(mapName, modeName) {
    return cachedFetch("/records/top", this.options, {
      limit: 1,
      stage: 0,
      tickrate: 128,
      map_name: mapName,
      has_teleports: false,
      modes_list_string: modeName,
    });
  }

  getProPersonalBest(mapName, modeName, steamId64) {
    return cachedFetch("/records/top", this.options, {
      stage: 0,
      limit: 1,
      tickrate: 128,
      map_name: mapName,
      steamId64: steamId64,
      has_teleports: false,
      modes_list_string: modeName,
    });
  }

  abortInflightRequests() {
    this.controller.abort();
    this.controller = new AbortController();
    this.options.fetch.signal = this.controller.signal;
  }
}

const cachedFetch = async (url, options, queryParams) => {
  url = new URL(options.client.baseUrl + url);

  if (queryParams) {
    url.search = new URLSearchParams(queryParams);
  }

  let cacheKey = url.toString();
  let expiry = options.client.cacheLifetime;

  const cacheEntry = getCacheEntry(cacheKey);

  if (!isExpiredCacheEntry(cacheEntry)) {
    options.logger?.DoDebug("HTTP cache hit!", { cacheKey, cacheEntry });
    return cacheEntry.data;
  }

  options.logger?.DoDebug("HTTP cache miss!", { cacheKey });

  try {
    let response = await fetch(url, options.fetch);
    if (!response.ok) {
      return undefined;
    }

    let data = await response.json();
    options.logger?.DoDebug("HTTP success", { url, data });

    setCacheEntry(cacheKey, data, expiry);
    return data;
  } catch (err) {
    // probably abort?
    options.logger?.DoError("HTTP error", err);
    return null;
  }
};
