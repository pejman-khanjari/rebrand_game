import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import CountDown from "../CountDown";
import ButtonComponent from "../Button";
import style from "./Goal.module.scss";

const Goal: React.FC = () => {
  return (
    <Fragment>
      <div className="container position-relative">
        <div className="row">
          <div className={style.CloudLeft}>
            <Image src="/images/cloud2.svg" width={100} height={50} layout="responsive" />
          </div>
          <div className={style.CloudRight}>
            <Image src="/images/cloud1.svg" width={100} height={50} layout="responsive" />
          </div>
        </div>
        <div className={style.Main}>
          <div className={style.SignLogo}>
            <img src="/images/Sign.svg" width="100%" height={200} />
          </div>
          <div className={style.MainContent}>
            <div className={style.CountDownContainer}>
              <CountDown date="2021/12/30" />
            </div>
            <h2 className={style.MainTitle}>فصل نو شدن ایران رنتر!</h2>
            <p className={style.MainDescription}>
              ایران‌رنتر قصد دارد همزمان با سالگرد پنجمین سال فعالیتش، <strong>در اول اردیبهشت ۱۳۹۹ تمامی عناصر برند خود را بازآفرینی کند</strong><br/>
              شما می توانید با شرکت در این مسابقه نام جدید ایران رنتر را حدس بزنید.
            </p>
            <div className="d-flex justify-content-center">
              <Link href="#" passHref>
                <ButtonComponent variant="primary" className={style.StartLink}>شروع مسابقه</ButtonComponent>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Goal;
