import { FC } from "react";
import Head from "next/head";

import { Navbar } from "../ui";
import { Bg } from "./Bg";

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
        <div className="wrapper">{children}</div>
      </div>
    </>
  );
};
