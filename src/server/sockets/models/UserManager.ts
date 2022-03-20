
export interface ConnectedUserMap {
  [userId: string]: boolean;
}

class UserManager {
  static instance: UserManager | null = null;

  users: ConnectedUserMap;

  constructor() {
    this.users = {};
  }

  static getInstance(): UserManager {
    if (this.instance === null) this.instance = new UserManager();
    return this.instance;
  }

  userConnected(socketId: string): void {
    this.users[socketId] = true;
    console.log(`${socketId} joined!`);
    console.log('All users:');
    console.log(this.users);
  }

  userDisconnected(socketId: string): void{
    this.users[socketId] = false;
    console.log(`${socketId} disconnected!`);
    console.log('All users');
    console.log(this.users);
  }
}

export default UserManager.getInstance();
