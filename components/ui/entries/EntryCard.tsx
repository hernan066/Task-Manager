import { DragEvent, FC } from "react";

import { useDispatch } from "react-redux";
import { endDragging, startDragging } from "../../../redux/uiSlice";


import { Entry } from "../../../interfaces";
import { useRouter } from "next/router";
import { getFormatDistanceToNow } from '../../../utils/dateFunctions';




interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  
  const router = useRouter();
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
      onClick={() => router.push(`/entries/${entry._id}`)}
      // Eventos de drag
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div>
        <div className="app-card__text">
          <p>{entry.description}</p>
          <span>{getFormatDistanceToNow(entry.createdAt)}</span>
        </div>

       
      </div>
    </div>
  );
};
