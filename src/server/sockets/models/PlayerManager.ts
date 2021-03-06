import { BoardPosition } from '../../../client/Store/BoardSlice';
import { ORIENTATION } from '../../../client/Store/TileSlice';
import { ConnectedUser } from './UserManager';

type MeepleList = [Meeple, Meeple, Meeple, Meeple, Meeple, Meeple, Meeple];
export interface Meeple {
  placedOnTile: BoardPosition;
  positionOnTile: ORIENTATION;
  confirmed: boolean;
  playerId: string;
}
export interface Player {
  playerId: string;
  name: string;
  connected: boolean;
  meeple: MeepleList;
  colour: string;
}

export interface PlayerMap {
  [userId: string]: Player;
}

export class PlayerManager {
  availableColours: string[];
  currentPlayerIndex: number;
  currentPlayer: string;
  playerOrder: string[];
  players: PlayerMap;

  constructor() {
    this.players = {};
    this.playerOrder = [];
    this.currentPlayer = null;
    this.availableColours = ['#f45b69', '#048A81', '#F0C808', '#9297C4', '#F1DEDE'];
  }

  private pickRandomColour() {
    const randIndex = Math.floor(Math.random() * this.availableColours.length);
    const [colour] = this.availableColours.splice(randIndex, 1);
    return colour;
  }

  private initialMeeple(userId: string): MeepleList {
    return [
      { placedOnTile: null, confirmed: false, playerId: userId, positionOnTile: null },
      { placedOnTile: null, confirmed: false, playerId: userId, positionOnTile: null },
      { placedOnTile: null, confirmed: false, playerId: userId, positionOnTile: null },
      { placedOnTile: null, confirmed: false, playerId: userId, positionOnTile: null },
      { placedOnTile: null, confirmed: false, playerId: userId, positionOnTile: null },
      { placedOnTile: null, confirmed: false, playerId: userId, positionOnTile: null },
      { placedOnTile: null, confirmed: false, playerId: userId, positionOnTile: null },
    ];
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayer];
  }

  addPlayer(user: ConnectedUser) {
    const { userId } = user;
    if (this.players[userId]) {
      this.players[userId].connected = true;
      return;
    }

    const player: Player = {
      playerId: userId,
      name: userId.substring(0, 8),
      connected: true,
      meeple: this.initialMeeple(userId),
      colour: this.pickRandomColour(),
    };
    this.players[userId] = player;
    if (this.playerOrder.indexOf(userId) === -1) {
      this.playerOrder.push(userId);
    }
    if (!this.currentPlayer) {
      this.currentPlayer = userId;
      this.currentPlayerIndex = this.playerOrder.indexOf(userId);
    }
  }

  removePlayer(user: ConnectedUser) {
    // This is different to if a player disconnects - should keep them in the game
    // until such a point as they get kicked, maybe when other players vote?
    const { userId } = user;
    this.players[userId].connected = false;
    // do the below when we want to actually remove them, the above is just temporary
    // to show that they are disconnected, but keep their local data
    // const { userId } = user;
    // delete this.players[userId];
    // const userIdIndex = this.playerOrder.indexOf(userId);
    // if (userIdIndex > -1) this.playerOrder.splice(userIdIndex, 1);
    // if (this.currentPlayer === userIdIndex && this.currentPlayer >= this.playerOrder.length) {
    //   if (!this.playerOrder.length) this.currentPlayer = null;
    //   else this.currentPlayer = 0;
    // }
  }

  nextPlayer() {
    // also confirm any meeple placements
    this.confirmPlacedMeeple();

    this.currentPlayerIndex++;
    this.currentPlayerIndex %= this.playerOrder.length;
    this.currentPlayer = this.playerOrder[this.currentPlayerIndex];
  }

  placeMeeple(position: BoardPosition) {
    const { meeple } = this.getCurrentPlayer();
    const freeMeeple = meeple.find((meep) => !meep.placedOnTile);
    if (!freeMeeple) return;
    freeMeeple.placedOnTile = position;
  }

  confirmPlacedMeeple() {
    const { meeple } = this.getCurrentPlayer();
    const placingMeeple = meeple.find((meep) => meep.placedOnTile && !meep.confirmed);
    if (placingMeeple) placingMeeple.confirmed = true;
  }

  cancelPlacedMeeple() {
    const { meeple } = this.getCurrentPlayer();
    const placingMeeple = meeple.find((meep) => meep.placedOnTile && !meep.confirmed);
    if (placingMeeple) placingMeeple.placedOnTile = null;
  }
}
