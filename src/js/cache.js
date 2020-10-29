export const getCacheEntry = (key) => {
  let data = sessionStorage.getItem(key);
  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

export const setCacheEntry = (key, value, lifetimeSeconds) => {
  sessionStorage.setItem(
    key,
    JSON.stringify({
      data: value,
      expires: Math.floor(Date.now() / 1000) + lifetimeSeconds,
    })
  );
};

export const removeCacheEntry = (key) => {
  sessionStorage.removeItem(key);
};

export const isExpiredCacheEntry = (entry) => {
  if (!entry) {
    return true;
  }

  return entry.expires < Math.floor(Date.now() / 1000);
};

export const removeExpiredCacheEntries = () => {
  const cacheKeys = Object.keys(sessionStorage);
  const secondsNow = Math.floor(Date.now() / 1000);

  for (const key of cacheKeys) {
    const entry = getCacheEntry(key);
    const expiredSeconds = Math.abs(secondsNow - entry.expires);

    // 5 minutes
    if (expiredSeconds >= 300) {
      removeCacheEntry(key);
    }
  }
};
