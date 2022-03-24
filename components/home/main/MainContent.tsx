import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { openNew, setTypeTabEntry } from "../../../redux/uiSlice";

import { All } from "./sections/All";
import { Complete } from "./sections/Complete";
import { InProgress } from "./sections/InProgress";
import { Pending } from "./sections/Pending";

export const MainContent = () => {
  

  const tab = useSelector((state: RootState) => state.ui.typeTabEntry);
  const newTask = useSelector((state: RootState) => state.ui.newTaskOpen);
  const dispatch = useDispatch();
  
  return (
    <div className="content-wrapper is-active">
      <div className="main-header">
        <a className="menu-link-main" href="#">
          Task
        </a>
        <div className="header-menu">
          <p
            className={`main-header-link ${ tab === 'all'? 'is-active' : ''}`}
            onClick={() => dispatch(setTypeTabEntry('all'))}
          >
            All
          </p>
          <p
            className={`main-header-link ${ tab === 'pending'? 'is-active' : ''}`}
            onClick={() => dispatch(setTypeTabEntry('pending'))}
            
          >
            Pending
          </p>
          <p
            className={`main-header-link ${ tab === 'inProgress'? 'is-active' : ''}`}
            onClick={() => dispatch(setTypeTabEntry('inProgress'))}
          >
            In progress
          </p>
          <p
            className={`main-header-link ${ tab === 'finished'? 'is-active' : ''}`}
            onClick={() => dispatch(setTypeTabEntry('finished'))}
          >
            Finished
          </p>
        </div>
          <button className="main-header-link-add" onClick={()=>dispatch(openNew()) } >
          <i className="fa-solid fa-plus"></i> 
          </button>
      </div>

      {
        tab === 'pending' && <Pending />
      }
      {
        tab === 'inProgress' && <InProgress />
      }
      {
        tab === 'finished' && <Complete />
      }
      {
        tab === 'all' && <All />
      }

      
    </div>
  );
};
