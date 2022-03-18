import { LeftSide } from "./left/LeftSide";
import { MainContent } from "./main/MainContent";

export const Wrapper = () => {
  return (
    <>
      <LeftSide />

      <div className="main-container">
        <MainContent />
      </div>
    </>
  );
};
