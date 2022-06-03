import { BoardPosition } from '../../../client/Store/BoardSlice';
import { ConnectedUser } from './UserManager';

type MeepleList = [Meeple, Meeple, Meeple, Meeple, Meeple, Meeple, Meeple];
export interface Meeple {
  placedOnTile: BoardPosition;
}
export interface Player {
  playerId: string;
  name: string;
  connected: boolean;
  meeple: MeepleList;
}

export interface PlayerMap {
  [userId: string]: Player;
}

export class PlayerManager {
  currentPlayerIndex: number;
  currentPlayer: string;
  playerOrder: string[];
  players: PlayerMap;

  constructor() {
    this.players = {};
    this.playerOrder = [];
    this.currentPlayer = null;
  }

  private initialMeeple(): MeepleList {
    return [
      { placedOnTile: null },
      { placedOnTile: null },
      { placedOnTile: null },
      { placedOnTile: null },
      { placedOnTile: null },
      { placedOnTile: null },
      { placedOnTile: null },
    ];
  }

  addPlayer(user: ConnectedUser) {
    const { userId } = user;
    const player: Player = {
      playerId: userId,
      name: userId.substring(0, 8),
      connected: true,
      meeple: this.initialMeeple(),
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
    this.currentPlayerIndex++;
    this.currentPlayerIndex %= this.playerOrder.length;
    this.currentPlayer = this.playerOrder[this.currentPlayerIndex];
  }

  placeMeeple(position: BoardPosition) {
    const { meeple } = this.players[this.currentPlayer];
    const freeMeeple = meeple.find((meep) => !meep.placedOnTile);
    if (!freeMeeple) return;
    freeMeeple.placedOnTile = position;
  }
}
