import React, { Fragment } from "react";
import clsx from "clsx";
import style from "./Button.module.scss";

interface ButtonComponentPropType {
  text: string;
  variant: "primary" | "warning" | "success" | "error";
  className?: string;
  onClick: () => void;
}

const ButtonComponent = ({text, variant = "primary", onClick, className}: ButtonComponentPropType) => {
  return (
    <Fragment>
      <button
        onClick={onClick}
        className={clsx(style.Button, className, {
          [style.Primary]: variant === "primary",
          [style.Warning]: variant === "warning",
          [style.Error]: variant === "error",
          [style.Success]: variant === "success",
      })}
      >{text}</button>
    </Fragment>
  );
};

export default ButtonComponent;
