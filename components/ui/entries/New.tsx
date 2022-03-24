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
  

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  console.log(listening);
  console.log(browserSupportsSpeechRecognition)

  const handleStartListen = () => {
    SpeechRecognition.startListening({ continuous: true });
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
    
    setInputValue("");
  };

  const onReset = () => {
    resetTranscript();
    setInputValue("");
  };

  return (
    <div className={`pop-up ${newTask ? "visible" : ""}`}>
      <div className="pop-up__header">
        <div className="pop-up__title">New Task</div>

        <button className="pop-up-close" onClick={() => dispatch(closeNew())}>
          <i className="fa-solid fa-xmark"></i>
        </button>
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
          className="new-button"
          disabled={inputValue.length === 0 ? true : false}
          onClick={onReset}
        >
          Clear
        </button>
        <button
          className="new-button"
          disabled={inputValue.length === 0 ? true : false}
          onClick={onSave}
        >
          Send
        </button>
      </div>
      
      
      
      
      {listening === true ? (
        <button
          className={`pop-up-microphone on ${!browserSupportsSpeechRecognition ? 'no-display' :'' } `} 
          onClick={() => handleStopListen()}
        >
          <i className="fa-solid fa-microphone"></i>
        </button>
      ) : (
        <button
          className={`pop-up-microphone ${!browserSupportsSpeechRecognition ? 'no-display' :'' } `}
          onClick={() => handleStartListen()}
        >
          <i className="fa-solid fa-microphone"></i>
        </button>
      )}
    </div>
  );
};
