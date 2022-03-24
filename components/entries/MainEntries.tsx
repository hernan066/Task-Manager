import { useRouter } from "next/router";
import { FC, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { entriesApi } from "../../apis";

import { Entry } from "../../interfaces";
import { deleteEntries, updateEntry } from "../../redux/entrySlice";

import toast, { Toaster } from "react-hot-toast";
import { getFormatDistanceToNow } from "../../utils/dateFunctions";

interface Props {
  entry: Entry;
}

export const MainEntries: FC<Props> = ({ entry }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [inputValue, setInputValue] = useState(entry.description);

  const notifyUpdate = () => toast("Successfully updated");
  const notifyDelete = () => toast("Successfully deleted");

  const onTextFieldChanged = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
    };
    /////////////////////////////////////////////////////////////////////////////
    //logica repetida en entry-list.tsx
    /////////////////////////////////////////////////////////////////////////////

    const update = async (entry: Entry) => {
      try {
        const { data } = await entriesApi.put<Entry>(
          `/entries/${entry._id}`,
          entry
        );
        dispatch(updateEntry(entry));
      } catch (error) {
        console.log(error);
      }
    };

    update(updatedEntry);
    notifyUpdate();

    /* router.push(`/`); */
  };

  ///////////////////////////////////Delete//////////////////////////////////////////

  
  const handleDelete = () => {

    const deleteEntry = async (entry: Entry) => {
      try {
        await entriesApi.delete(`/entries/${entry._id}`);
        dispatch(deleteEntries(entry));
      } catch (error) {
        console.log(error);
      }
    };

    deleteEntry(entry);
    notifyDelete();

    router.push(`/`);
  }
  
  

  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <div className="content-wrapper is-active">
        <div className="main-header">
          <a className="menu-link-main" href="#">
            Edit Task
          </a>

          <div
            className="header-menu"
            style={{ position: "absolute", right: 0 }}
          >
            <button className="new-button" onClick={handleDelete}>
              <i className="fa-solid fa-trash-can"></i> Delete
            </button>
            <button className="new-button" onClick={handleSave}>
              <i className="fa-solid fa-floppy-disk"></i> Save
            </button>
          </div>
        </div>
        <div className="content-section">
          <div className="apps-card">
            <div className="app-card" style={{ width: "100%" }}>
              <h4 style={{ textTransform: "capitalize" }}>{entry.status}</h4>

              <div className="app-card__entry-list">
                <div className="app-card__entry">
                  <div>
                    <div className="app-card__text">
                      <textarea
                        className="pop-up__textarea"
                        autoFocus
                        placeholder="Add new task"
                        style={{ border: "none" }}
                        onChange={onTextFieldChanged}
                        value={inputValue}
                      ></textarea>
                      <span>{getFormatDistanceToNow(entry.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
