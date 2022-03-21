import { NewEntry, EntryList } from "../../../ui"


export const Pending = () => {
  return (
    <div className="content-section">
    <div className="apps-card">
    <div className="app-card" style={{ width: '100%' }}>
        <h4>Pending</h4>
        {/* <NewEntry /> */}
        <EntryList status="pending" />
      </div>
    
    </div>
  </div>
  )
}
