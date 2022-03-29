import Image from "next/image";
import Link from "next/link";
import { Menu } from "../../home/left/Menu";
import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';

const menuVariants = {
  initial: {
    opacity: 0,
    x: "100vw",
  },
  animate:{
    opacity: 1,
    x: "0",
  },
  exit:{
    opacity: 0,
    x: "100vw",
  }

}



export const Navbar = () => {
  const [menu, setMenu] = useState("close");

  return (
    <div className="header">
      <Link href={"/"} passHref>
        <div className="menu-logo">
          <Image src={"/logo.png"} height={20} width={30} alt="logo" />

          <h1>Task Manager</h1>
        </div>
      </Link>
      <div className="header-menu">
        <Link href={"/"} passHref>
          <div className="menu-link is-active">Task</div>
        </Link>
        <Link href={"/"} passHref>
          <div className="menu-link">Search</div>
        </Link>

        <div className="menu-movil" onClick={() => setMenu("open")}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <AnimatePresence>
          {menu === "open" ? (
            <>
              {/* <div className="overlay-menu"></div>  */}
              <motion.div 
              className="menu-sidebar-movil"
              variants={menuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={menu}
             
              >
                <div
                  className="menu-close-movil"
                  onClick={() => setMenu("close")}
                >
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <Menu />
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};
