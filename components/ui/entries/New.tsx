import { SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { entriesApi } from "../../../apis";
import { Entry } from "../../../interfaces";
import { addNewEntry } from "../../../redux/entrySlice";
import { RootState } from "../../../redux/store";
import { closeNew } from "../../../redux/uiSlice";

import { motion } from "framer-motion";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const newVariants = {
  initial: { opacity: 0, y: "-100%", x: "-50%" },
  animate: { opacity: 1, y: "-50%", x: "-50%", transition: { duration: 0.25 } },
  exit: { opacity: 0, y: "-100%", transition: { duration: 0.25 } },
};

export const New = () => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    /* browserSupportsSpeechRecognition, */
  } = useSpeechRecognition();

  const handleStartListen = () => {
    SpeechRecognition.startListening({ continuous: true });
  };
  const handleStopListen = () => {
    SpeechRecognition.stopListening();

    if (transcript.length > 0) {
      setInputValue(
        transcript.charAt(0).toUpperCase() + transcript.slice(1) + "."
      );
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
    <>
      <div className="overlay-app"></div>

      <motion.div
        className="pop-up"
        variants={newVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="pop-up__header">
          <div className="pop-up__title">New Task</div>

          <button
            className="pop-up-close"
            onClick={() => (dispatch(closeNew()), handleStopListen())}
          >
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
      </motion.div>
    </>
  );
};
