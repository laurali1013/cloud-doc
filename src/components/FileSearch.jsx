import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState("");
  const nodeRef = useRef(null);
  const closeSearch = (event) => {
    event.preventDefault();
    setInputActive(false);
    setValue("");
  };
  //按enter调用onFileSearch
  //按esc调用setInputActive == false
  useEffect(() => {
    const handleInputEvent = (event) => {
      const { keyCode } = event;
      if (keyCode === 13 && inputActive) {
        //enter
        onFileSearch(value);
      } else if (keyCode === 27 && inputActive) {
        //esc
        closeSearch(event);
      }
    };
    document.addEventListener("keyup", handleInputEvent);
    return () => {
      document.removeEventListener("keyup", handleInputEvent);
    };
  });

  //inputActive使能后自动focus到input
  useEffect(() => {
    if (inputActive) {
      nodeRef.current.focus();
    }
  }, [inputActive]);

  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center">
      {!inputActive && (
        <>
          <span>{title}</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => {
              setInputActive({ inputActive: true });
            }}
          >
            <FontAwesomeIcon icon={faSearch} title="search" size="lg" />
          </button>
        </>
      )}
      {inputActive && (
        <>
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            ref={nodeRef}
          />
          <button
            type="button"
            className="icon-button"
            onClick={(e) => {
              closeSearch(e);
            }}
          >
            <FontAwesomeIcon icon={faTimes} title="search" size="lg" />
          </button>
        </>
      )}
    </div>
  );
};

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired,
};

FileSearch.defaultProps = {
  title:"我的云文档"
}

export default FileSearch;
