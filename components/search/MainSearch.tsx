export const MainSearch = () => {
  return (
    <div className="content-wrapper is-active">
      <div className="main-header">
        <a className="menu-link-main" href="#">
          Search Task
        </a>
        <div className="search-bar" style={{ position: 'absolute', right: '0px' }}>
        <input type="text" placeholder="Search" />
      </div> 
      </div>
      <div className="content-section">
        <div className="apps-card">
          <div className="app-card" style={{ width: "100%" }}>
            {/* <h4 style={{ textTransform: "capitalize" }}>{entry.status}</h4> */}

            <div className="app-card__entry-list">
              <div className="app-card__entry">
                <div>
                  <div className="app-card__text"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
