const fs = require("fs").promises;
const util = require("util");

fs.readFile("./main.js", "utf8").then((data) => {
  console.log(data);
});

fs.copyFile("./main.js", "./main2.js");
