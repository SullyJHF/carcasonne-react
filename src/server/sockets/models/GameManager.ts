import { Game } from './Game';

class GameManager {
  static instance: GameManager;
  games: {
    [id: string]: Game;
  };

  constructor() {
    this.games = {};
  }

  static getInstance() {
    if (!this.instance) this.instance = new GameManager();
    return this.instance;
  }

  async createGame() {
    const game = new Game();
    this.games[game.id] = game;
    return game;
  }

  getGame(id: string) {
    // will get game by id, or maybe even user? but for now just return the one game created;
    return Object.values(this.games)[0].getGameData();
  }
}

export default GameManager.getInstance();
