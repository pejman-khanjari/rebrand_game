import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonComponent from "../Button";
import style from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <Fragment>
      <nav className={style.Container}>
        <Link href="/">
          <a className={style.Logo}>
            <Image src="/images/LOGO.svg" width={100} height={60} />
          </a>
        </Link>
        <ul className={style.MenuItems}>
          <li className={style.MenuItem}>
            <Link href="/">
              <a>خانه</a>
            </Link>
          </li>
          <li className={style.MenuItem}>
            <Link href="#">
              <a>جوایز</a>
            </Link>
          </li>
          <li className={style.MenuItem}>
            <Link href="#">
              <a>راهنما</a>
            </Link>
          </li>
          <li>
            <ButtonComponent text="شروع مسابقه" variant="primary" onClick={() => console.log("start game")} />
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Header;