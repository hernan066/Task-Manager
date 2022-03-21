
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { closeNew } from "../../../redux/uiSlice";

export const New = () => {
  
  const newTask = useSelector((state: RootState) => state.ui.newTaskOpen);
  const dispatch = useDispatch();
  
  
  
  return (
    <div className={`pop-up ${newTask ? "visible" : ""}`}>
      <div className="pop-up__title">
        New Task
        
      </div>
      <div className="pop-up__textarea-wrapper">
        <textarea className="pop-up__textarea" autoFocus={true}   placeholder='Add new task'>
          
        </textarea>
      </div>

      <div className="content-button-wrapper">
        <button 
        className="content-button status-button open close"
        onClick={()=>dispatch(closeNew())}
        >
          Cancel
        </button>
        <button className="content-button status-button">Add</button>
      </div>
    </div>
  );
};
