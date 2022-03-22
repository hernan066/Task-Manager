import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { entriesApi } from "../../../apis";
import { Entry } from "../../../interfaces";
import { addNewEntry } from "../../../redux/entrySlice";
import { RootState } from "../../../redux/store";
import { closeNew } from "../../../redux/uiSlice";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const New = () => {
  const newTask = useSelector((state: RootState) => state.ui.newTaskOpen);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  console.log(listening);

  const handleStartListen = () => {
    SpeechRecognition.startListening({ continuous: true });
    resetTranscript();
  };
  const handleStopListen = () => {
    SpeechRecognition.stopListening();

    if (transcript.length > 0) {
      transcript.charAt(0).toUpperCase();
      let transcriptWithDot = transcript + ".";
      
      
      setInputValue(transcriptWithDot);
    }
  };

  const onTextFieldChanged = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const onSave = async () => {
    if (inputValue.length === 0) return;

    const { data } = await entriesApi.post<Entry>("/entries", {
      description: inputValue,
    });
    dispatch(addNewEntry(data));

    dispatch(closeNew());
    setTouched(false);
    setInputValue("");
  };

  return (
    <div className={`pop-up ${newTask ? "visible" : ""}`}>
      <div className="pop-up__header">
        <div className="pop-up__title">New Task</div>
        {listening === true ? (
          <button
            className="pop-up-microphone on"
            onClick={() => handleStopListen()}
          >
            <i className="fa-solid fa-microphone"></i>
          </button>
        ) : (
          <button
            className="pop-up-microphone"
            onClick={() => handleStartListen()}
          >
            <i className="fa-solid fa-microphone"></i>
          </button>
        )}
      </div>

      <div className="pop-up__textarea-wrapper">
        <textarea
          className="pop-up__textarea"
          autoFocus
          placeholder="Add new task"
          onChange={onTextFieldChanged}
          value={inputValue}
        ></textarea>
      </div>

      <div className="content-button-wrapper">
        <button
          className="content-button status-button open close"
          onClick={() => dispatch(closeNew())}
        >
          Cancel
        </button>
        <button className="content-button status-button" onClick={onSave}>
          Add
        </button>
      </div>
    </div>
  );
};
