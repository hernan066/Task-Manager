import { FC, useContext, useMemo, DragEvent } from "react";
import { EntriesContext } from "../../../context/entries";
import { UIContext } from "../../../context/ui";
import { EntryStatus } from "../../../interfaces";
import { EntryCard } from "./EntryCard";

import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");

    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    //   TODO: aquí haremos drop
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
