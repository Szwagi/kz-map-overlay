export default class GameState {
  constructor() {
    this.steamId = null;
    this.currentState = null;
    this.eventListeners = {};
  }

  on(eventName, callback) {
    if (eventName in this.eventListeners) {
      this.eventListeners[eventName].push(callback);
    } else {
      this.eventListeners[eventName] = [callback];
    }
  }

  dispatch(eventName, data) {
    let receivers = this.eventListeners?.[eventName] ?? [];
    receivers.forEach((r) => r(data));
  }

  UpdateState(newState) {
    this.dispatch("newstate", newState);

    this.steamId = newState?.player?.steamid;

    if (this.currentState?.player?.clan !== newState?.player?.clan) {
      this.dispatch("clanchanged", newState?.player?.clan);
    }

    if (this.currentState?.map?.name !== newState?.map?.name) {
      this.dispatch("mapchanged", newState?.map?.name);
    }

    this.currentState = newState;
  }
}
