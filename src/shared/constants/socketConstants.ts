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
  CONFIRM_ORIENTATION: 'game/confirm_orientation',
  CANCEL_PLACEMENT: 'game/cancel_placement',

  STATE_UPDATE: 'game/state_update',
};
