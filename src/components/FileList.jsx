import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { PropTypes } from "prop-types";

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [value, setValue] = useState("");
  const closeEdit = (e) => {
    e.preventDefault();
    setEditStatus(false);
    setValue("");
    };
    //键盘事件
    useEffect(() => {
        const handleInputEvent = (event) => {
            const { keyCode } = event;
            if (keyCode === 13 && editStatus) {
                const editItem = files.find(file => file.id === editStatus);
                setEditStatus(false);
                setValue(""); 
                onSaveEdit(editItem.id, value);
            } else if (keyCode === 27 && editStatus) {
                closeEdit(event);
            }
        }
        document.addEventListener('keyup', handleInputEvent);
        return (() => {
            document.removeEventListener('keyup', handleInputEvent);
        })
     })

  return (
    <ul className="list-group list-group-flush file-list">
      {files.map((file) => (
        <li
          key={file.id}
          className="list-group-item bg-light row d-flex align-items-center file-list-item"
        >
          {file.id !== editStatus && (
            <>
              <FontAwesomeIcon icon={faMarkdown} className="col-2" size="lg" />
              <span
                className="col-8 c-link"
                onClick={() => {
                  onFileClick(file.id);
                }}
              >
                {file.title}
              </span>
              <button
                type="button"
                className="icon-button"
                onClick={() => {
                  setEditStatus(file.id);
                  setValue(file.title);
                }}
              >
                <FontAwesomeIcon icon={faEdit} title="编辑" size="lg" />
              </button>
              <button
                type="button"
                className="icon-button"
                onClick={() => {
                  onFileDelete(file.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} title="删除" size="lg" />
              </button>
            </>
          )}
          {file.id === editStatus && (
            <>
              <input
                className="col-10"
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <button
                type="button"
                className="icon-button col-2"
                onClick={closeEdit}
              >
                <FontAwesomeIcon icon={faTimes} title="搜索" size="lg" />
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func,
};

export default FileList;
