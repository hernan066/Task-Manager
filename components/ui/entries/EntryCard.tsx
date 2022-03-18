import { DragEvent, FC, useContext } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { UIContext } from "../../../context/ui/UIContext";
import { Entry } from "../../../interfaces";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text", entry._id);

    startDragging();
  };

  const onDragEnd = () => {
    endDragging();
  };

  return (
    <div
      className="app-card__entry"
      // Eventos de drag
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div>
        <div className="app-card__text">
          <p>{entry.description}</p>
          <span>hace 30 minutos</span>
        </div>

       
      </div>
    </div>
  );
};
