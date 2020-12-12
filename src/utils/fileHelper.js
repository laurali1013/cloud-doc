const fs = require('fs');
const path = require('path');
console.dir(fs);

const fileHelper = {
  readFile: (path, callback) => {
    fs.readFile(path, { encoding: "utf8" }, (err, data) => {
      if (!err) {
        callback(data);
      }
    });
  },
  writeFile: (path, content,callback) => {
    fs.writeFile(path, content, { encoding: "utf8" }, (err) => {
      if (err) {
        callback();
      }
    });
  },
};

const testPath = path.join(__dirname, 'helper.js');
const testWritePath = path.join(__dirname, "hello.md");
fileHelper.readFile(testPath, (data) => {
    console.log(data);
});

fileHelper.writeFile(testWritePath, '## hello world', () => {
    console.log('写入成功');
})