import React, { useState } from "react";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";
import { v4 } from "uuid";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import defaultFiles from "./utils/defaultFiles";
import { flattenArr, objToArr } from "./utils/helper";

import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import BottomBtn from "./components/BottomBtn";
import TabList from "./components/TabList";

function App() {
  const [files, setFiles] = useState(flattenArr(defaultFiles)); //文件列表
  console.log(files);
  const [activeFileId, setActiveFileId] = useState(""); //当前被激活的文件id
  const [openedFileIds, setOpenedFileIds] = useState([]); //被打开的文件id数组
  const [unsavedFileIds, setUnsavedFileIds] = useState([]); //未保存的文件id数组
  const [searchFiles, setSearchFiles] = useState([]); //搜索关键字的文件数组
  const filesArr = objToArr(files);

  //通过activeFileId找到文件
  const activeFile = files[activeFileId];

  //事件：反向数据流
  //已经打开的文档列表
  const openedFiles = openedFileIds.map((openId) => {
    return files[openId];
  });

  //fileClick:参数fileId
  const fileClick = (fileId) => {
    //设置 打开current active file：添加到activeFileId
    setActiveFileId(fileId);
    //如果openedIds 没有的时候才加，有了就不加了
    if (!openedFileIds.includes(fileId)) {
      //把打开的文件追加放到opendId里面
      setOpenedFileIds([...openedFileIds, fileId]);
    }
  };

  //把当前点击的file设置为activeFileId
  const TabClick = (fileId) => {
    //将文件id 放在activeFileId中
    setActiveFileId(fileId);
  };

  //把openedIds中的fileId删除掉
  const TabClose = (fileId) => {
    //获取除了fileId的openedFileIds
    const tabsWithout = openedFileIds.filter((id) => id !== fileId);
    //openedFileIds重新赋值
    setOpenedFileIds(tabsWithout);
    //删除后，找到openedFileIds的第一项（如果有的话），并将其设置为activeFileId
    if (tabsWithout.length) {
      setActiveFileId(tabsWithout[0]);
    } else {
      setActiveFileId("");
    }
  };

  //修改当前文档的内容
  const fileChange = (fileId, value) => {
    //创建一个新的文档对象
    const newFile = { ...files[fileId], body: value };
    //将新的文档对象保存到文档files对象中
    setFiles({ ...files, [fileId]: newFile });
    //将id添加到unsavedFileIds（没有才添加，有就不添加了）
    if (!unsavedFileIds.includes(fileId)) {
      setUnsavedFileIds([...unsavedFileIds, fileId]);
    }
  };

  //删除markdown文档
  const fileDelete = (fileId) => {
    //删除fileId的文档对象
    delete files[fileId];
    //重新设置files
    setFiles(files);
    //要把openedfileId也删除掉
    TabClose(fileId);
  };

  //更新文档名（重命名）
  const updateFileName = (fileId, title) => {
    //创建一个修改的新文档对象
    const modifyFile = { ...files[fileId], title, isNew: false };
    //追加到files文档对象中
    setFiles({ ...files, [fileId]: modifyFile });
  };

  //查找关键字title的文件
  const fileSearch = (keyword) => {
    //filter：过滤出title中有keyword关键字的新files数组（includes方法）
    const newFiles = filesArr.filter((file) => file.title.includes(keyword));
    //更新files（要新加一个状态保存查找的文件）
    setSearchFiles(newFiles);
    //如果找到keyword那么显示搜索到的文件，如果没有找到显示files
  };
  const fileListArray = searchFiles.length > 0 ? searchFiles : filesArr;

  //新建
  const createNewFile = () => {
    //新建一个file
    const newId = v4();
    const newFile = {
      id: newId,
      title: "",
      body: "##hello",
      createAt: new Date().getTime(),
      isNew: true, //用来判断是不是新增加
    };
    //追加到到文档对象中
    setFiles({ ...files, [newId]: newFile });
  };

  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 left-panel bg-light">
          <FileSearch title="我的云文档" onFileSearch={fileSearch} />
          <FileList
            files={fileListArray}
            onFileClick={fileClick}
            onFileDelete={fileDelete}
            onSaveEdit={updateFileName}
          />
          <div className="row no-gutters button-group">
            <div className="col">
              <BottomBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col">
              <BottomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          {!activeFile && (
            <div className="start-page">请选择或者创建新的 markdown 文档</div>
          )}
          {activeFile && (
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileId}
                unsaveIds={unsavedFileIds}
                onTabClick={TabClick}
                onTabClose={TabClose}
              />
              <SimpleMDE
                key={activeFile && activeFileId}
                value={activeFile.body}
                onChange={(value) => {
                  fileChange(activeFile.id, value);
                }}
                options={{
                  minHeight: "515px",
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
