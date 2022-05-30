export const SOCKET_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
};

export const USER_EVENTS = {
  JOIN_GAME: 'user/join',
};

export const GAME_EVENTS = {
  TILE_PLACED: 'game/tile_placed',
  REORIENT_TILE: 'game/reorient_tile',

  STATE_UPDATE: 'game/state_update',
};
