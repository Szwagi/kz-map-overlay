export function getMapPrefix(mapName) {
  return mapName.includes("_") ? mapName.split("_")[0] : "Unknown prefix";
}

export function getMapPrettyName(fullMapName) {
  return fullMapName.split("/").pop();
}

export function ifAnyUndefined(varsArray) {
  return varsArray.some((v) => v === undefined);
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
