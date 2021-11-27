import {ITransformedUser, User} from '../models/user';
import {DB} from './db';

export class Game {
  private readonly playerIp: string;
  private user: User;
  private correctLetters: string[];

  constructor(playerIp: string, answer: string) {

    this.playerIp = playerIp;
    this.correctLetters = answer.split('');
    this.user = DB.getUser(this.playerIp);
    this.user.setAnswer(this.correctLetters);
  }

  private checkLetterIndex(letter: string): number {
    const letterIndex = this.user.getAnswer().indexOf(letter);
    return letterIndex;
  }

  private checkLetter(letter: string) {
    return this.checkLetterIndex(letter) > -1
  }

  public play(letter: string): { user: ITransformedUser; status: number } {
    if (this.user.getWon() && !this.playIsAllowed())
      return {user: this.user.transform(), status: 403};
    if (((!this.checkLetter(letter) && this.user.getTries() === 2) || (this.user.getTries() > 2)) && !this.playIsAllowed()) {
      this.user.setTries(this.user.getTries() + 1);
      DB.updateUser(this.user);
      return {user: this.user.transform(), status: 403};
    }
    if (this.playIsAllowed()) this.user.resetPlayer();
    if (this.checkLetter(letter)) {
      this.user.setScore(this.user.getScore() + 1);
      if (this.user.getScore() === this.correctLetters.length)
        this.user.setWon(true);
      DB.updateUser(this.user);
      return {user: this.user.transform(), status: 200};
    } else {
      this.user.setTries(this.user.getTries() + 1);
      DB.updateUser(this.user);
      return {user: this.user.transform(), status: 400};
    }
  }

  public setWinnerMobileNumber(mobile: string): { user: ITransformedUser; status: number } {
    this.user.setMobile(mobile);
    DB.updateUser(this.user);
    return {user: this.user.transform(), status: 200};
  }

  private playIsAllowed(): boolean {
    const lastPlayed = this.user.getLastTimePlayed();
    const now = new Date();
    const diff = now.getTime() - lastPlayed.getTime();
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    return diffHours >= 24;
  }
}
