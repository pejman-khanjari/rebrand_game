import React, { Fragment } from "react";
import clsx from "clsx";
import style from "./Letters.module.scss";

const letters = 'بسلصنجعدطغوایگر';

interface PropsType {
  onSelectLetter: (letter: string) => void;
  selectedLetters: {
    value: string;
    accepted: boolean;
  }[];
}

const Letters: React.FC<PropsType> = ({onSelectLetter,selectedLetters }) => {
  const checkLetter = (value: string) => {
    const letter = selectedLetters.find((item) => item.value === value);
    console.log(letter, 'letter')
    if (letter?.accepted) return style.CorrectLetter;
    else if (letter && !letter.accepted) return style.WrongLetter;
  }
  return (
    <Fragment>
      <div className={style.LettersContainer}>
        {letters.split('').map((item: string) => (
          <button type="button" className={clsx(style.LetterButton, checkLetter(item))} onClick={() => onSelectLetter(item)}>{item}</button>
        ))}
      </div>
    </Fragment>
  );
};

export default Letters;
