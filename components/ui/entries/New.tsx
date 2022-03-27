import { SetStateAction, useEffect, useState } from "react";
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

const microOnVariants = {
  initial: {
    color: "red",
    borderColor: "red",
  },
  animation: {
    color: "#fff",
    borderColor: "#fff",
    transition: {
      yoyo: Infinity,
      duration: 0.6,
    },
  },
};
const microOffVariants = {
  initial: {
    color: "#fff",
    border: "1px solid #fff",
  },
  
  hover: {
    border: "2px solid #fff",
    transition: {
      duration: 0.2,
    },
  },
};

const newVariants = {
  initial: {opacity: 0, scale: 0.1, y: '-100%', x: '100%'},
  animate: {opacity: 1, scale: 1, y: 0, x:0,   transition: { duration: 0.25 }},
  exit: {opacity: 0, scale: 0.1, y: '-100%', x: '100%', transition: { duration: 0.25 }},
};



export const New = () => {
  const newTask = useSelector((state: RootState) => state.ui.newTaskOpen);
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
        <motion.button
          /* whileHover={{ scale: 1.1 }}  */
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="new-button"
          disabled={inputValue.length === 0 ? true : false}
          onClick={onReset}
        >
          Clear
        </motion.button>
        <button
          className="new-button"
          disabled={inputValue.length === 0 ? true : false}
          onClick={onSave}
        >
          Send
        </button>
      </div>

      {listening === true ? (
        <motion.button
          variants={microOnVariants}
          initial="initial"
          animate="animation"
          className="pop-up-microphone-on"
          onClick={() => handleStopListen()}
        >
          <i className="fa-solid fa-microphone"></i>
        </motion.button>
      ) : (
        <motion.button
          variants={microOffVariants}
          initial="initial"
          whileHover="hover"
          className="pop-up-microphone-off"
          onClick={() => handleStartListen()}
        >
          <i className="fa-solid fa-microphone"></i>
        </motion.button>
      )}
    </motion.div>
    </>
    
  );
};
