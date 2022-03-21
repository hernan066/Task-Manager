import { FC } from "react";
import Head from "next/head";

import { Navbar } from "../ui";
import { Bg } from "./Bg";
import { LeftSide } from "../home/left/LeftSide";
import { New } from "../home/new/New";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Props {
  title?: string;
}

export const Layout: FC<Props> = ({ title = "OpenJira", children }) => {
  
  const newTask = useSelector((state: RootState) => state.ui.newTaskOpen);
  const dispatch = useDispatch();
  
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
        <div className={`overlay-app ${ newTask ? "is-active" :""} `}></div>
      </div>
    </>
  );
};
