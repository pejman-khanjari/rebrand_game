import React, { Fragment, useState, useEffect, memo } from "react";
import style from "./CountDown.module.scss";

interface TimeBoxPropType {
  data: CountDownItemType;
}
interface CountDownPropType {
  date: Date | string;
}

interface CountDownItemType {
  label: string;
  value: number;
}

const TimeBox: React.FC<TimeBoxPropType> = memo(({ data }) => {
  return (
    <Fragment>
      <div className={style.TimeBoxContainer}>
        <div className={style.TimeBoxValue}>{data.value > 9 ? data.value : `0${data.value}`}</div>
        <div className={style.TimeBoxLabel}>{data.label}</div>
      </div>
    </Fragment>
  );
});


const CountDown: React.FC<CountDownPropType> = ({ date }) => {
  const [countDownInfo, setCountDownInfo] = useState([]);
  const CountDownHandler = () => {
    const countDownDate = new Date(date).getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const daysValue = {
      label: 'روز',
      value: Math.floor(distance / (1000 * 60 * 60 * 24)),
    };
    const hoursValue = {
      label: 'ساعت',
      value: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    }
    const minutesValue = {
      label: 'دقیقه',
      value: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    }
    const secondsValue = {
      label: 'ثانیه',
      value: Math.floor((distance % (1000 * 60)) / 1000),
    }
    const info = [daysValue, hoursValue, minutesValue, secondsValue];
    // @ts-ignore
    setCountDownInfo(info)
  };
  useEffect(() => {
    const interval = setInterval(() => {
      CountDownHandler();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <div className={style.CountDownContainer}>
        {countDownInfo.map((item: CountDownItemType) => (
          <TimeBox data={item} />
        ))}
      </div>
    </Fragment>
  );
};

export default CountDown;
