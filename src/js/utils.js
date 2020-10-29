export function getMapPrefix(mapName) {
  return mapName.includes("_") ? mapName.split("_")[0] : "Unknown prefix";
}

export function getMapPrettyName(fullMapName) {
  return fullMapName.split("/").pop();
}
