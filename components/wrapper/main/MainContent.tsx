import { useState } from "react";

import { All } from "./sections/All";
import { Complete } from "./sections/Complete";
import { InProgress } from "./sections/InProgress";
import { Pending } from "./sections/Pending";

export const MainContent = () => {
  const [sectionName, setSectionName] = useState<string>("all");

  return (
    <div className="content-wrapper">
      <div className="main-header">
        <a className="menu-link-main" href="#">
          Tareas
        </a>
        <div className="header-menu">
          <p
            className={`main-header-link ${ sectionName === 'all'? 'is-active' : ''}`}
            onClick={() => setSectionName("all")}
          >
            All
          </p>
          <p
            className={`main-header-link ${ sectionName === 'pending'? 'is-active' : ''}`}
            onClick={() => setSectionName("pending")}
          >
            Pending
          </p>
          <p
            className={`main-header-link ${ sectionName === 'inProgress'? 'is-active' : ''}`}
            onClick={() => setSectionName("inProgress")}
          >
            In progress
          </p>
          <p
            className={`main-header-link ${ sectionName === 'complete'? 'is-active' : ''}`}
            onClick={() => setSectionName("complete")}
          >
            Complete
          </p>
        </div>
      </div>

      {
        sectionName === 'pending' && <Pending />
      }
      {
        sectionName === 'inProgress' && <InProgress />
      }
      {
        sectionName === 'complete' && <Complete />
      }
      {
        sectionName === 'all' && <All />
      }

      
    </div>
  );
};
