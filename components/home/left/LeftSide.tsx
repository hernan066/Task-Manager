import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { setTypeTabEntry } from "../../../redux/uiSlice";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export const LeftSide = () => {
  const entries = useSelector((state: RootState) => state.entry.entries);
  const dispatch = useDispatch();
  const router = useRouter();

  let allTaskNumber: number = entries.length;
  let pendingTaskNumber: number = entries.filter(
    (entry) => entry.status === "pending"
  ).length;
  let inProgressTaskNumber: number = entries.filter(
    (entry) => entry.status === "in-progress"
  ).length;
  let finishedTaskNumber: number = entries.filter(
    (entry) => entry.status === "finished"
  ).length;

  const handleClick = (type: string) => {
    dispatch(setTypeTabEntry(type));
    router.push(`/`);
  };

  return (
    <div className="left-side">
      <div className="side-wrapper">
        <div className="side-title">Task</div>
        <div className="side-menu">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="side-menu-link"
            onClick={() => handleClick("all")}
          >
            <i className="fa-regular fa-pen-to-square"></i>All task
            {allTaskNumber > 0 && (
              <span className="notification-number updates">
                {allTaskNumber}
              </span>
            )}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="side-menu-link"
            onClick={() => handleClick("pending")}
          >
            <i className="fa-solid fa-list-ul"></i>Pending
            <span className="notification-number updates">
              {pendingTaskNumber}
            </span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="side-menu-link"
            onClick={() => handleClick("inProgress")}
          >
            <i className="fa-solid fa-list-check"></i>In Progress
            <span className="notification-number updates">
              {inProgressTaskNumber}
            </span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="side-menu-link"
            onClick={() => handleClick("finished")}
          >
            <i className="fa-solid fa-check"></i>Finished
            <span className="notification-number updates">
              {finishedTaskNumber}
            </span>
          </motion.div>
        </div>
      </div>
      <div className="side-wrapper">
        <div className="side-title">Social Network</div>
        <div className="side-menu">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-facebook-square"></i> Facebook
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>Instagram
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i>Linkedin
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://www.github.com/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github-square"></i>Github
          </motion.a>
        </div>
      </div>
    </div>
  );
};
