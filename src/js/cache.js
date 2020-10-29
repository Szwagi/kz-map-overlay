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
