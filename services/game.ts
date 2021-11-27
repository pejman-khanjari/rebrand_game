import { ITransformedUser, User } from '../models/user';
import { DB } from './db';

export class Game {
  private readonly playerIp: string;
  private user: User;
  private correctLetters: string[];

  constructor(playerIp: string, answer: string) {
    this.playerIp = playerIp;
    this.correctLetters = answer.split('');
    this.user = DB.getUser({ ip: this.playerIp, answer: this.correctLetters });
  }

  private check(letter: string): boolean {
    const correctLetters = [...this.user.getAnswer()];
    const letterIndex = correctLetters.indexOf(letter);
    if (letterIndex > -1) {
      correctLetters[letterIndex] = '_';
      this.user.setAnswer(correctLetters);
      return true;
    }
    return false;
  }

  private checkLetterIsCorrect(letter: string): boolean {
    return this.user.getAnswer().indexOf(letter) > -1;
  }

  private checkUserIsWinner(): boolean {
    return this.user.getAnswer().filter((letter) => letter !== '_').length === 0;
  }

  private playIsAllowed(): boolean {
    const lastPlayed = this.user.getLastTimePlayed();
    const now = new Date();
    const diff = now.getTime() - lastPlayed.getTime();
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    return diffHours >= 24;
  }

  public play(letter: string): { user: ITransformedUser; status: number } {
    if (((this.user.getTries() === 2 && !this.checkLetterIsCorrect(letter)) || this.user.getTries() > 2) && !this.playIsAllowed()) {
      this.user.setTries(this.user.getTries() + 1);
      DB.updateUser(this.user);
      return { user: this.user.transform(), status: 403 };
    }
    if (this.user.getWon() && !this.playIsAllowed())
      return { user: this.user.transform(), status: 403 };
    if (this.playIsAllowed()) this.user.resetPlayer();
    if (this.check(letter)) this.user.setScore(this.user.getScore() + 1);
    else {
      this.user.setLastTimePlayed(new Date());
      this.user.setTries(this.user.getTries() + 1);
      DB.updateUser(this.user);
      return { user: this.user.transform(), status: 400 };
    }
    if (this.checkUserIsWinner()) {
      this.user.setLastTimePlayed(new Date());
      this.user.setWon(true);
    }
    DB.updateUser(this.user);
    return { user: this.user.transform(), status: 200 };
  }

  public setWinnerMobile(mobile: string): { user: ITransformedUser; status: number } {
    this.user = DB.getUser({ ip: this.playerIp, answer: this.correctLetters });
    this.user.setMobile(mobile);
    DB.updateUser(this.user);
    return { user: this.user.transform(), status: 200 };
  }
}