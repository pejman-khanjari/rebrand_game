import React, { Fragment } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Nav, Navbar } from "react-bootstrap";
import ButtonComponent from "../Button";
import style from "./Header.module.scss";

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <Fragment>
      <Navbar bg="white" expand="xl" className={style.Container}>
        <Container className="container-fluid" >
          <Navbar.Toggle className={style.NavbarToggle} aria-controls="basic-navbar-nav" />
          <Link href="/">
            <a className={style.Logo}>
              <Image src="/images/LOGO.svg" width={100} height={60} />
            </a>
          </Link>
          <Navbar.Collapse
            className="justify-content-end "
            id="basic-navbar-nav"
          >
            <Nav className="mr-auto gap-5 h6">
              <Link href="#home">
                <a className={clsx(style.MenuItem, {
                  [style.ActiveItem]: router.asPath === "/#home"
                })}>خانه</a>
              </Link>
              <Link href="#gifts">
                <a className={clsx(style.MenuItem, {
                  [style.ActiveItem]: router.asPath === "/#gifts"
                })}>جوایز</a>
              </Link>
              <Link href="#guide">
                <a className={clsx(style.MenuItem, {
                  [style.ActiveItem]: router.asPath === "/#guide"
                })}>راهنما</a>
              </Link>
              <ButtonComponent variant="primary" onClick={() => console.log("start game")}>شروع مسابقه</ButtonComponent>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </Fragment>
  );
};

export default Header;