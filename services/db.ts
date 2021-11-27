import { User } from '../models/user';
interface Database {
  users: User[];
}

class InMemeoryDatabase {
  private readonly db: Database = { users: [] };

  private static instance: InMemeoryDatabase;

  public static getInstance() {
    if (!InMemeoryDatabase.instance) {
      InMemeoryDatabase.instance = new InMemeoryDatabase();
    }

    return InMemeoryDatabase.instance;
  }

  constructor() {}

  getUsers() {
    return this.db.users;
  }
  getUser({ ip, answer }: { ip: string; answer: string[] }) {
    return this.db.users.find((user) => user.getIp() === ip) || this.createUser(ip, answer);
  }
  createUser(ip: string, answer: string[]) {
    const user = new User({ ip, answer });
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

export const DB = InMemeoryDatabase.getInstance();
