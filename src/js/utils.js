export function getMapPrefix(mapName) {
  return mapName.includes("_") ? mapName.split("_")[0] : "";
}

export function getMapPrettyName(fullMapName) {
  return fullMapName.split("/").pop();
}
