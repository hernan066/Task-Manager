import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { entriesApi } from "../../../apis";
import { Entry, EntryStatus } from "../../../interfaces";
import { refreshEntries, updateEntry } from "../../../redux/entrySlice";

import { closeEdit } from "../../../redux/uiSlice";

import { motion } from "framer-motion";
import { useRouter } from "next/router";

const newVariants = {
  initial: { opacity: 0, y: "-100%", x: "-50%" },
  animate: { opacity: 1, y: "-50%", x: "-50%", transition: { duration: 0.25 } },
  exit: { opacity: 0, y: "-100%", transition: { duration: 0.25 } },
};

interface Props {
  entry: Entry;
}

export const Edit: FC<Props> = ({ entry }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [inputValue, setInputValue] = useState({
    description: entry.description,
    status: entry.status,
  });

  const isRadioChecked = (value: EntryStatus): boolean =>
    inputValue.status === value;

  const onSave = async () => {
    if (inputValue.description.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      description: inputValue.description,
      status: inputValue.status,
    };
    const { data } = await entriesApi.put<Entry>(
      `/entries/${entry._id}`,
      updatedEntry
    );
    dispatch(updateEntry(data));

    dispatch(closeEdit());
    router.push(`/entries/${entry._id}`);
  };

  return (
    <>
      <div className="overlay-app"></div>

      <motion.div
        className="pop-up edit"
        variants={newVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="pop-up__header">
          <div className="pop-up__title">Edit Task</div>

          <button
            className="pop-up-close"
            onClick={() => dispatch(closeEdit())}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div
          className="pop-up__textarea-wrapper"
          style={{ paddingBottom: "10px" }}
        >
          <textarea
            className="pop-up__textarea"
            autoFocus
            placeholder="Add new task"
            onChange={(e) =>
              setInputValue({ ...inputValue, description: e.target.value })
            }
            value={inputValue.description}
          ></textarea>
        </div>

        <div className="edit-pop-up">
          <div className="edit-type">
            <input
              type="radio"
              name="status"
              id="pending"
              value="pending"
              checked={isRadioChecked("pending")}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  status: e.target.value as EntryStatus,
                })
              }
            />
            <label htmlFor="pending">Pending</label>
          </div>
          <div className="edit-type">
            <input
              type="radio"
              name="status"
              id="in-progress"
              value="in-progress"
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  status: e.target.value as EntryStatus,
                })
              }
            />
            <label htmlFor="in-progress">In Progress</label>
          </div>
          <div className="edit-type">
            <input
              type="radio"
              name="status"
              id="finished"
              value="finished"
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  status: e.target.value as EntryStatus,
                })
              }
            />
            <label htmlFor="finished">Finished</label>
          </div>
        </div>

        <div className="content-button-wrapper" style={{ width: "100%" }}>
          <button className="new-button edit" onClick={() => onSave()}>
            <i className="fa-solid fa-floppy-disk"></i> Save
          </button>
        </div>
      </motion.div>
    </>
  );
};
