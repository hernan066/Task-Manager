import { EntryList } from "../../../ui";

export const InProgress = () => {
  return (
    <div className="content-section">
      <div className="apps-card">
      <div className="app-card" style={{ width: '100%' }}>
          <h4>In progress</h4>

          <EntryList status="in-progress" />
        </div>
      </div>
    </div>
  );
};
