import React, { Fragment, useState } from "react";
import Image from "next/image";
import style from "./Game.module.scss";
import Letters from "./Letters";
import SelectedLetters from "./SelectedLetters";
import Http from "../../services/request";
import ModalLost from "../ModalLost";
import ModalWin from "../ModalWin";

const correctLetters = "لندو";

const Game: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [winModal, setWinModal] = useState<boolean>(false);

  const CheckLetter = async (letter: string) => {
    try {
      const res = await Http.post('/game', { letter });
      if (res.status === 200) {
        setSelectedLetter((prevState: any) => [...prevState, {value: letter, accepted: true}]);
        setUser(res.data);
        if (res.data.score === 4) setWinModal(true);
      }

    } catch (error:any) {
      if (error.response.status === 400 && !error.response.data.message) {
        setSelectedLetter((prevState: any) => [...prevState, {value: letter, accepted: false}]);
        setUser(error.response.data);
      } else if (error.response.status === 403) {
        setErrorModal(true);
      }
      console.error(error);
    }
  }

  const submitUserMobile = async (mobile: string) => {

    try {
      const res = await Http.post('/game', { mobile, letter: '1' } );
      if (res.status === 200) {
        setWinModal(false);
      }
    } catch (error:any) {
      console.error(error);
    }
  }
  return (
    <Fragment>
      <div className="justify-content-center">
        <div className="d-flex justify-content-center w-100" id="game">
          <div className={style.Border}>
            <div className={style.GameContainer}>
              <h2 className={style.Title}>حدس بزن جایزه ببر!</h2>
              <div className={style.Description}>
                <p>نام جدید ایران‌رنتر از 4 حرف تشکیل شده است.</p>
                <p>
                  شما در هر روز یک بار فرصت شرکت در این مسابقه و در هر بار فرصت دو چراغ روشن دارید. اگر حرفی را به اشتباه انتخاب کنید، چراغ شما خاموش می شود. در پایان اگر نام را به درستی حدس بزنید، با وارد کردن شماره همراه خود، می توانید در قرعه‌کشی شرکت کنید.</p>
              </div>
              <Letters onSelectLetter={CheckLetter} selectedLetters={selectedLetter} />
              <div className="d-flex align-items-center justify-content-center mt-5">
                <div className="mx-2">
                  <Image src={user?.tries > 0 ? '/images/red-btn.svg' : '/images/yellow-btn.svg'} width={100} height={100} />
                </div>
                <div className="mx-2">
                  <Image src={user?.tries > 1 ? '/images/red-btn.svg' : '/images/yellow-btn.svg'} width={100} height={100} />
                </div>
              </div>
              <SelectedLetters selectedLetters={selectedLetter} correctLetters={correctLetters} />
            </div>
          </div>
        </div>
      </div>
      <ModalLost show={errorModal} onHide={() => setErrorModal(false)} />
      <ModalWin show={winModal} onHide={() => setWinModal(false)} submitForm={submitUserMobile} />
    </Fragment>
  );
};

export default Game;
