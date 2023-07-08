import React, { useEffect } from "react";
import { AppContext } from "../../App";
import "./styles.css";

const ImportModal = () => {
  const {file, setFile} = React.useContext(AppContext);
  const dropContainer = React.useRef();
  const fileInput = React.useRef();

  useEffect(() => {
    const refCurrent = dropContainer.current;
    const refInput = fileInput.current;

    if (refCurrent) {
      refCurrent.addEventListener("dragover", (e) => {
        // prevent default to allow drop
        e.preventDefault()
      }, false)
    
      refCurrent.addEventListener("dragenter", () => {
        refCurrent.classList.add("drag-active")
      })
    
      refCurrent.addEventListener("dragleave", () => {
        refCurrent.classList.remove("drag-active")
      })
    
      refCurrent.addEventListener("drop", (e) => {
        e.preventDefault()
        refCurrent.classList.remove("drag-active")
        refInput.files = e.dataTransfer.files
        setFile(e.dataTransfer.files[0]);
      })
    }
  }, [])

  return (
    <label for="images" className="drop-container" id="dropcontainer" ref={dropContainer}>
      <span className="drop-title">Перетягніть файл сюди</span>
      або
      <input type="file" id="images" required ref={fileInput} onChange={(e) => setFile(e.target.files[0])}/>
    </label>
  );
};

export default ImportModal;
