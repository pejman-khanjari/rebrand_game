import { User } from '../models/user';

interface Database {
  users: User[];
}

class InMemeoryDatabase {
  private readonly db: Database = { users: [] };
  constructor() {
    this.db.users = [];
  }
  getUsers() {
    return this.db.users;
  }
  getUser(ip: string) {
    return this.db.users.find((user) => user.getIp() === ip) || this.createUser(ip);
  }
  createUser(ip: string) {
    const user = new User({ ip });
    this.db.users.push(user);
    return user;
  }
  updateUser(user: User) {
    const index = this.db.users.findIndex((u) => u.getIp() === user.getIp());
    this.db.users[index] = user;
  }
  deleteUser(ip: string) {
    this.db.users = this.db.users.filter((user) => user.getIp() !== ip);
  }
}

export const DB = new InMemeoryDatabase();
