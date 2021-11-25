import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import ButtonComponent from "../Button";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <Fragment>
      <footer className={style.Container}>
        <div className={style.Footer}>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className={style.RightSection}>
                  <div className={style.ImageIcon}>
                    <Image src="/images/phone.svg" width={20} height={20} />
                  </div>
                  <span>تماس با ایران‌رنتر</span>
                  <span className={style.PhoneNumber}>021-4240900</span>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className={style.LeftSection}>
                  <Link href="">
                    <a className={style.InstagramIcon}>
                      <Image src="/images/instagrambtn.svg" width={20} height={20} />
                    </a>
                  </Link>
                  <div className={style.ImageIcon}>
                    <Image src="/images/phone.svg" width={20} height={20} />
                  </div>
                  <span>ایران‌رنتر در شبکه اجتماعی اینستاگرام</span>
                  <ButtonComponent className={style.Instagram} variant="primary" onClick={() => console.log("!!!!")}>
                    <Image src="/images/instagrambtn.svg" width={20} height={20} />
                    <span>اینستاگرام</span>
                  </ButtonComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.CopyRight}>
          کلیه حقوق این سایت متعلق به شرکت ایران‌رنتر می‌باشد <span>Copyrights - Iranrenter Co. - 1394 ©</span>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
