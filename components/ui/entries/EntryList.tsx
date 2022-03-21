import { FC, useMemo, DragEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { entriesApi } from "../../../apis";

import { Entry, EntryStatus } from "../../../interfaces";
import { refreshEntries, updateEntry } from "../../../redux/entrySlice";
import { RootState } from "../../../redux/store";
import { endDragging } from "../../../redux/uiSlice";
import { EntryCard } from "./EntryCard";

import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const entries = useSelector((state: RootState) => state.entry.entries);

  const isDragging = useSelector((state: RootState) => state.ui.isDragging);
  const dispatch = useDispatch();

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  ////////////////////////update Entries////////////////////////////////

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    
    const id = event.dataTransfer.getData("text");

    const entry = entries.find((e) => e._id === id)!;

    const entryNewStatus = {
      ...entry,
      status: status,
    };

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

    update(entryNewStatus);
    dispatch(endDragging());
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
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <div className="app-card__entry-list">
        {entriesByStatus.map((entry) => (
          <EntryCard key={entry._id} entry={entry} />
        ))}
      </div>
    </div>
  );
};
