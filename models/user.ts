interface IUser {
  getIp(): string;
  getMobile(): string;
  getScore(): number;
  getLastTimePlayed(): Date;
  getTries(): number;
  getScore(): number;
  getWon(): boolean;
  getAnswer(): string[];
  setIp(ip: string): void;
  setMobile(mobile: string): void;
  setScore(score: number): void;
  setLastTimePlayed(lastTimePlayed: Date): void;
  setTries(tries: number): void;
  setWon(won: boolean): void;
  setAnswer(answer: string[]): void;
  resetPlayer(): void;
}

export interface ITransformedUser {
  ip: string;
  mobile?: string;
  lastTimePlayed?: Date;
  tries?: number;
  score?: number;
  won?: boolean;
}

interface IUserInputs extends ITransformedUser {
  answer?: string[];
}

export class User implements IUser {
  constructor({ ip, answer, mobile, lastTimePlayed, tries, score, won }: IUserInputs) {
    this.ip = ip;
    this.mobile = mobile || '';
    this.lastTimePlayed = lastTimePlayed || new Date();
    this.tries = tries || 0;
    this.score = score || 0;
    this.won = won || false;
    this.answer = answer || [];
  }
  private ip: string;
  private mobile: string;
  private lastTimePlayed: Date;
  private tries: number;
  private score: number;
  private won: boolean;
  private answer: string[];

  getIp(): string {
    return this.ip;
  }
  getMobile(): string {
    return this.mobile;
  }
  getLastTimePlayed(): Date {
    return this.lastTimePlayed;
  }
  getTries(): number {
    return this.tries;
  }
  getScore(): number {
    return this.score;
  }
  getWon(): boolean {
    return this.won;
  }
  getAnswer(): string[] {
    return this.answer;
  }
  setIp(ip: string): void {
    this.ip = ip;
  }
  setMobile(mobile: string): void {
    this.mobile = mobile;
  }
  setLastTimePlayed(lastTimePlayed: Date): void {
    this.lastTimePlayed = lastTimePlayed;
  }
  setTries(tries: number): void {
    this.tries = tries;
  }
  setScore(score: number): void {
    this.score = score;
  }
  setWon(won: boolean): void {
    this.won = won;
  }
  setAnswer(answer: string[]): void {
    this.answer = answer;
  }

  resetPlayer(): void {
    this.tries = 0;
    this.score = 0;
    this.won = false;
  }

  /**
   * @description Transforms the user object to a plain object
   * @returns ITransformedUser
   */
  public transform(): ITransformedUser {
    return {
      ip: this.ip,
      mobile: this.mobile,
      lastTimePlayed: this.lastTimePlayed,
      tries: this.tries,
      score: this.score,
      won: this.won,
    };
  }
}
