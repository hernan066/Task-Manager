import { NewEntry, EntryList } from "../../../ui"


export const All = () => {
  return (
    <div className="content-section">
    <div className="apps-card">
      <div className="app-card">
        <h4>Pending</h4>
        {/* <NewEntry /> */}
        <EntryList status="pending" />
      </div>
      <div className="app-card">
        <h4>In progress</h4>

        <EntryList status="in-progress" />
      </div>
      <div className="app-card">
        <h4>Complete</h4>

        <EntryList status="finished" />
      </div>
    </div>
  </div>
  )
}
