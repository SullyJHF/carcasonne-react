export interface ConnectedUserMap {
  [userId: string]: boolean;
}

class UserManager {
  static instance: UserManager;
  users: ConnectedUserMap;

  constructor() {
    this.users = {};
  }

  static getInstance(): UserManager {
    if (!this.instance) this.instance = new UserManager();
    return this.instance;
  }

  userConnected(socketId: string): void {
    this.users[socketId] = true;
    console.log(`${socketId} joined!`);
    console.log('All users:');
    console.log(this.users);
  }

  userDisconnected(socketId: string): void {
    delete this.users[socketId];
    console.log(`${socketId} disconnected!`);
    console.log('All users');
    console.log(this.users);
  }

  getUsers() {
    return this.users;
  }
}

export default UserManager.getInstance();
