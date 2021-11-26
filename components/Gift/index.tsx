import React, { Fragment } from "react";
import clsx from "clsx";
import style from "./Gift.module.scss";

const Gift: React.FC = () => {
  return (
    <Fragment>
      <div className="container mt-5" id={"gifts"}>
        <div
          className={clsx(style.GiftsContainers, 'row', 'justify-content-center', 'align-items-center')}
        >
          <div className="col-md-6 col-sm-12 justify-content-center align-items-center p5">
            <div className="row">
              <h2 className={style.Title}>
                <span className={style.GiftCount}>5 جایزه</span>
                <span className={style.GiftValue}>2 میلیون تومانی</span>
              </h2>
            </div>
            <div className="row">
              <p className={style.Description}>
                به 5 برنده خوش شانسی که بتوانند اسم جدید ایران رنتر را درست پیش
                بینی کنند، به قیر قرعه5 جایزه 2 میلیون تومانی هدیه داده می شود!
              </p>
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="row justify-content-center align-items-center">
              <img src="/images/gift.svg" className={style.GiftImage} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Gift;
