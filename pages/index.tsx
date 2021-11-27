import { useEffect } from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Goal from "../components/Goal";
import Gift from "../components/Gift";
import Game from "../components/Game";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/*<Goal />*/}
      <Gift />
      <Game />
      <Footer />
    </div>
  )
}

export default Home
