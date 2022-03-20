import { FC } from "react";
import Head from "next/head";

import { Navbar } from "../ui";
import { Bg } from "./Bg";
import { LeftSide } from "../home/left/LeftSide";
import { New } from "../home/new/New";

interface Props {
  title?: string;
}

export const Layout: FC<Props> = ({ title = "OpenJira", children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Bg />
      <div className="app">
        <Navbar />
        <div className="wrapper">
          <LeftSide />
          <New />
          {children}
        </div>
        <div className="overlay-app is-active"></div>
      </div>
    </>
  );
};
