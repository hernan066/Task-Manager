
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { openNew, setTypeTabEntry } from "../../../redux/uiSlice";

import { All } from "./sections/All";
import { Complete } from "./sections/Complete";
import { InProgress } from "./sections/InProgress";
import { Pending } from "./sections/Pending";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from "next/router";

const sectionsVariants = {
  initial: {opacity: 0, scale: 0.5},
  animate: {opacity: 1, scale: 1,  transition: { duration: 0.5}},
  exit: {opacity: 0, scale: 0.5, transition: { ease: "easeInOut", duration: 0.5 }},
};


export const MainContent = () => {
  const tab = useSelector((state: RootState) => state.ui.typeTabEntry);
  
  const dispatch = useDispatch();
  const router = useRouter();
  

  return (
    <motion.div 
    className="content-wrapper"
    variants={sectionsVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    key={router.route}
    >
      <div className="main-header">
        <div className="menu-title">Task Status</div>
        <div className="header-menu">
          <div
            className={`main-header-link ${tab === "all" ? "is-active" : ""}`}
            onClick={() => dispatch(setTypeTabEntry("all"))}
          >
            All
          </div>
          <div
            className={`main-header-link ${
              tab === "pending" ? "is-active" : ""
            }`}
            onClick={() => dispatch(setTypeTabEntry("pending"))}
          >
            Pending
          </div>
          <div
            className={`main-header-link ${
              tab === "inProgress" ? "is-active" : ""
            }`}
            onClick={() => dispatch(setTypeTabEntry("inProgress"))}
          >
            In progress
          </div>
          <div
            className={`main-header-link ${
              tab === "finished" ? "is-active" : ""
            }`}
            onClick={() => dispatch(setTypeTabEntry("finished"))}
          >
            Finished
          </div>
        </div>
        <button
          className="main-header-link-add"
          onClick={() => dispatch(openNew())}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <AnimatePresence exitBeforeEnter  initial={false} >
        {tab === "pending" && <Pending key={tab} />}
        {tab === "inProgress" && <InProgress key={tab} />}
        {tab === "finished" && <Complete key={tab} />}
        {tab === "all" && <All key={tab} />}
      </AnimatePresence>
    </motion.div>
  );
};
