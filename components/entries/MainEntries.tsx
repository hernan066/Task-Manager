import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { entriesApi } from "../../apis";

import { Entry } from "../../interfaces";
import { deleteEntries, refreshEntries } from "../../redux/entrySlice";

import { Edit } from "../ui/entries/Edit";
import { RootState } from "../../redux/store";
import { openEdit } from "../../redux/uiSlice";
import { AnimatePresence, motion } from "framer-motion";
import { EditSection } from "./section/EditSection";

interface Props {
  entry: Entry;
}

const sectionsVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { ease: "easeInOut", duration: 0.5 },
  },
};

export const MainEntries: FC<Props> = ({ entry }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const openEditTask = useSelector((state: RootState) => state.ui.openEditTask);

  ///////////////////////////////////Delete//////////////////////////////////////////

  const handleDelete = () => {
    const deleteEntry = async (entry: Entry) => {
      await entriesApi.delete(`/entries/${entry._id}`);
      dispatch(deleteEntries(entry));
    };

    deleteEntry(entry);

    router.push(`/`);
  };

  ////////////////////////refresh Entries////////////////////////////////

  const refresh = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch(refreshEntries(data));
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {openEditTask && <Edit entry={entry} />}
      </AnimatePresence>

      <motion.div className="content-wrapper">
        <div className="main-header">
          <div className="menu-link-main">Edit Task</div>

          <div className="header-menu">
            <button className="new-button" onClick={handleDelete}>
              <i className="fa-solid fa-trash-can"></i> Delete
            </button>
            <button className="new-button" onClick={() => dispatch(openEdit())}>
              <i className="fa-solid fa-square-pen"></i> Edit
            </button>
          </div>
        </div>

        <AnimatePresence exitBeforeEnter initial={false}>
          <EditSection entry={entry} key={entry._id} />
        </AnimatePresence>
      </motion.div>
    </>
  );
};
