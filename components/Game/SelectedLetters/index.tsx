import React, { Fragment } from "react";
import style from "./SelectedLetters.module.scss";
type Letter = {
  value: string;
  accepted: boolean;
}

interface PropsType {
  selectedLetters?: Letter[];
  correctLetters: string;
}



const SelectedLetters: React.FC<PropsType> = ({ selectedLetters, correctLetters }) => {
  const checkLetterIsSelected = (letter: string): boolean => {
    return selectedLetters?.some((item) => item.value === letter) || false;
  }
  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-center">
        <ul className={style.Letters}>
          {correctLetters.split("").map(item => (
            <li className={style.Letter}>
              {checkLetterIsSelected(item) && item}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default SelectedLetters;