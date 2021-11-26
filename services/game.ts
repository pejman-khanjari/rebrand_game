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

  private updateAnswer(letter: string) {
    const correctLetters = [...this.user.getAnswer()];
    const letterIndex = correctLetters.indexOf(letter);
    correctLetters[letterIndex] = '_';
    this.user.setAnswer(correctLetters);
  }

  private checkLetter(letter: string): boolean {
    const correctLetters = [...this.user.getAnswer()];
    const letterIndex = correctLetters.indexOf(letter);
    return letterIndex > -1;
  }

  private checkUserIsWinner(): boolean {
    return this.user.getAnswer().filter((letter) => letter !== '_').length === 0;
  }

  public play(letter: string): { user: ITransformedUser; status: number } {
    if (!this.checkLetter(letter) && this.user.getTries() >= 2 && !this.playIsAllowed())
      return {user: this.user.transform(), status: 403};
    if (this.user.getWon() && !this.playIsAllowed())
      return {user: this.user.transform(), status: 403};
    if (this.playIsAllowed()) this.user.resetPlayer();
    if (this.checkLetter(letter)) {
      this.user.setScore(this.user.getScore() + 1);
      this.updateAnswer(letter);
    } else this.user.setTries(this.user.getTries() + 1);
    if (this.checkUserIsWinner()) this.user.setWon(true);
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
