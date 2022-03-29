import { FC } from "react";
import { Entry } from "../../../interfaces";
import { getFormatDistanceToNow } from "../../../utils/dateFunctions";
import { motion } from "framer-motion";

interface Props {
  entry: Entry;
}

const sectionsVariants = {
  initial: { opacity: 0, x: -1500 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: {
    opacity: 0,
    x: 1500,
    transition: { ease: "easeInOut", duration: 0.3 },
  },
};

export const EditSection: FC<Props> = ({ entry }) => {
  return (
    <motion.div
      className="content-section"
      variants={sectionsVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="apps-card">
        <div className="app-card" style={{ width: "100%" }}>
          <h4 style={{ textTransform: "capitalize" }}>{entry.status}</h4>

          <div className="app-card__entry-list">
            <div className="app-card__entry">
              <div>
                <div className="app-card__text">
                  <div
                    className="edit-menu"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      cursor: "pointer",
                    }}
                  ></div>

                  <p>{entry.description}</p>
                  <span>{getFormatDistanceToNow(entry.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
