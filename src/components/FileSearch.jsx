// FileSearch左侧上方的标题和搜索
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import useKeyPress from "./../hooks/useKeyPress";

// title：要检索的文档title
//onFileSearch：检索事件，当按enter确认键后开始检索
const FileSearch = ({ title, onFileSearch }) => {
  //输入框是否显示
  const [inputActive, setInputActive] = useState(false);
  //输入框内容
  const [value, setValue] = useState("");
  //绑定到输入框的节点，用于使input成为受控组件
  const nodeRef = useRef(null);
  //按键：enter和esc
  const enterpressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  //关闭搜索函数，点x时候触发
  const closeSearch = () => {
    //隐藏输入框
    setInputActive(false);
    //输入框内容为空
    setValue("");
    //恢复显示文件列表：""空-->app：app检测为空，没有匹配项，searchFiles长度为0，显示files
    onFileSearch("");
  };
  //每次渲染就会运行
  //按enter调用onFileSearch
  //按esc调用setInputActive == false
  useEffect(() => {
    //输入框事件处理函数
    const handleInputEvent = (event) => {
      if (enterpressed && inputActive) {
        //enter键按下，开始将value传给app，查找value关键字的文档
        onFileSearch(value);
      }
      if (escPressed && inputActive) {
        //esc键按下，把输入框关闭，输入框值清空，显示files，而不是searchFiles
        closeSearch();
      }
    };
    document.addEventListener("keyup", handleInputEvent);
    //useEffect副作用返回值等同于componentWillUnmount
    return () => {
      document.removeEventListener("keyup", handleInputEvent);
    };
  });

  //inputActive使能后自动focus到input
  useEffect(() => {
    if (inputActive) {
      nodeRef.current.focus();
    }
  }, [inputActive]); //useEffect第二个参数依赖：当[inputActive]发生变化时才会触发此useEffect

  
  //如果inputActive未使能，显示title和搜索button
  //如果inputActive使能，显示输入框和关闭输入框button
  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
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
            <FontAwesomeIcon icon={faSearch} title="搜索" size="lg" />
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
            <FontAwesomeIcon icon={faTimes} title="关闭" size="lg" />
          </button>
        </>
      )}
    </div>
  );
};

//对props校验
FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired,
};

//props的默认值
FileSearch.defaultProps = {
  title: "我的云文档",
};

export default FileSearch;
