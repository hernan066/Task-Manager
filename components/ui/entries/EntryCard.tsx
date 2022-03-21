import { DragEvent, FC } from "react";

import { useDispatch } from "react-redux";
import { endDragging, startDragging } from "../../../redux/uiSlice";


import { Entry } from "../../../interfaces";


interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  

  const dispatch = useDispatch();

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text", entry._id);

    dispatch(startDragging()) ;
  };

  const onDragEnd = () => {
    
    dispatch(endDragging()) ;
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
