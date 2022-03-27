
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { openNew, setTypeTabEntry } from "../../../redux/uiSlice";

import { All } from "./sections/All";
import { Complete } from "./sections/Complete";
import { InProgress } from "./sections/InProgress";
import { Pending } from "./sections/Pending";
import { AnimatePresence } from "framer-motion";

export const MainContent = () => {
  const tab = useSelector((state: RootState) => state.ui.typeTabEntry);
  
  const dispatch = useDispatch();

  return (
    <div className="content-wrapper">
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

      <AnimatePresence exitBeforeEnter>
        {tab === "pending" && <Pending key={tab} />}
        {tab === "inProgress" && <InProgress key={tab} />}
        {tab === "finished" && <Complete key={tab} />}
        {tab === "all" && <All key={tab} />}
      </AnimatePresence>
    </div>
  );
};
