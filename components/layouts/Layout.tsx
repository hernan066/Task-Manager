import { FC, useState } from "react";
import Head from "next/head";

import { Navbar } from "../ui";
import { Bg } from "./Bg";
import { LeftSide } from "../home/left/LeftSide";
import { New } from "../ui/entries/New";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AnimatePresence } from "framer-motion";

interface Props {
  title?: string;
}

export const Layout: FC<Props> = ({ title = "Task Manager", children }) => {
  const newTask = useSelector((state: RootState) => state.ui.newTaskOpen);

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
          <AnimatePresence>
            {newTask === "id-new-task-open" ? <New key={newTask} /> : null}
          </AnimatePresence>

          {children}
        </div>
      </div>
    </>
  );
};
