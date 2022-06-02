import { ConnectedUser } from './UserManager';

export interface Player {
  name: string;
  connected: boolean;
}

export interface PlayerMap {
  [userId: string]: Player;
}

export class PlayerManager {
  currentPlayer: number;
  playerOrder: string[];
  players: PlayerMap;

  constructor() {
    this.players = {};
    this.playerOrder = [];
    this.currentPlayer = null;
  }

  addPlayer(user: ConnectedUser) {
    const { userId } = user;
    const player: Player = {
      name: userId.substring(0, 8),
      connected: true,
    };
    this.players[userId] = player;
    this.playerOrder.push(userId);
    if (!this.currentPlayer) this.currentPlayer = 0;
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
}
