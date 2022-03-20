import React from "react";

export const New = () => {
  return (
    <div className="pop-up visible">
      <div className="pop-up__title">
        New Task
        
      </div>
      <div className="pop-up__textarea-wrapper">
        <textarea className="pop-up__textarea" autoFocus={true}   placeholder='Add new task'>
          
        </textarea>
      </div>

      <div className="content-button-wrapper">
        <button className="content-button status-button open close">
          Cancel
        </button>
        <button className="content-button status-button">Add</button>
      </div>
    </div>
  );
};
