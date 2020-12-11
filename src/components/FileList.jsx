import React, { useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { PropTypes } from "prop-types";
import useKeyPress from "./../hooks/useKeyPress";

//显示文件列表组件
//files:要显示文件列表：要求是一个数组
//onFileClick:点击文件后，右侧应显示对应file的内容的事件
//onSaveEdit:修改文件名，并保存事件
//onFileDelete:删除文件事件
const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  //editStatus保存的是file的id属性
  const [editStatus, setEditStatus] = useState(false);
  //input的值
  const [value, setValue] = useState("");
  //enter按键和esc按键
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);

  //关闭输入框输入处理函数：按x或esc调用此函数
  const closeEdit = (file) => {
    setEditStatus(false);
    setValue("");
    //如果修改的是newFile，那么就把文件删除掉
    if (file.isNew) {
      onFileDelete(file.id);
    }
  };

  //键盘事件
  useEffect(() => {
    //当enter按下后，遍历file，找到对应的id
    const file = files.find((file) => file.id === editStatus);
    if (enterPressed && editStatus) {
      //关闭输入
      closeEdit(file);
      //发送修改标题请求：参数为id和值
      onSaveEdit(file.id, value);
    }
    if (escPressed && editStatus) {
      closeEdit(file);
    }
  });
  //副作用：新建文档时，依赖files的变化
  useEffect(() => {
    //获取新增文件
    const newFile = files.find(file => file.isNew);
    //如果newFile存在，需要把id和title设置到EditStatus中value中
    if (newFile) {
      setEditStatus(newFile.id);
      setValue(newFile.title);
    }
  },[files])



  return (
    <ul className="list-group list-group-flush file-list">
      {files.map((file) => (
        <li
          key={file.id}
          className="list-group-item bg-light row d-flex align-items-center file-list-item mx-0"
        >
          {file.id !== editStatus && !file.isNew && (
            <>
              <FontAwesomeIcon icon={faMarkdown} className="col-2" size="lg" />
              <span
                className="col-6 c-link"
                onClick={() => {
                  onFileClick(file.id);
                }}
              >
                {file.title}
              </span>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => {
                  setEditStatus(file.id);
                  setValue(file.title);
                }}
              >
                <FontAwesomeIcon icon={faEdit} title="编辑" size="lg" />
              </button>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => {
                  onFileDelete(file.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} title="删除" size="lg" />
              </button>
            </>
          )}
          {(file.id === editStatus || file.isNew) && (
            <>
              <input
                className="col-10"
                type="text"
                value={value}
                placeholder="请输入title"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <button
                type="button"
                className="icon-button col-2"
                onClick={()=>{closeEdit(file)}}
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
