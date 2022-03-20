import { EntryList } from "../../../ui";

export const Complete = () => {
  return (
    <div className="content-section">
      <div className="apps-card">
        <div className="app-card" style={{ width: '100%' }}>
          <h4>Complete</h4>

          <EntryList status="finished" />
        </div>
      </div>
    </div>
  );
};
