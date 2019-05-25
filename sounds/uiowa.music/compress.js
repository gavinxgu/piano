const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const files = fs.readdirSync(path.join(__dirname, "logicData"));

files.forEach(file => {
  if (file.match(".aiff")) {
    const newFilename = file.match(/Piano.(.*).aiff \(/)[1] + ".mp3";
    cp.execSync(
      `ffmpeg -i ${path.join(
        __dirname,
        "logicData",
        file
          .replace(" ", "\\ ")
          .replace("(", "\\(")
          .replace(")", "\\)")
      )} -b:a 64k -ar 44100 -f mp3 "${path.join(
        __dirname,
        "output",
        newFilename
      )}"`
    );
  }
});
