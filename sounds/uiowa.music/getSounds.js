const fs = require("fs");
const path = require("path");
const rq = require("urllib");
const cheerio = require("cheerio");

const main = async () => {
  const host = "http://theremin.music.uiowa.edu";
  const infoHTML = (await rq.curl(`${host}/MISpiano.html`)).data.toString();
  const $ = cheerio.load(infoHTML);
  const fileMap = new Map();
  let start = false;
  $("a").each((i, elem) => {
    console.log(
      $(elem).text(),
      $(elem)
        .text()
        .match("Piano.mf.F2")
    );
    if (
      $(elem)
        .text()
        .match("Piano.mf.F2")
    ) {
      start = true;
    }
    if (
      $(elem)
        .attr()
        .href.match(".aiff") &&
      start
    ) {
      fileMap.set(i, {
        title: $(elem).text(),
        url: `${host}/${$(elem).attr().href}`
      });
    }
  });
  for ([, file] of fileMap) {
    const data = (await rq.curl(file.url, { timeout: 30000 })).data;
    fs.writeFile(path.join(__dirname, `data/${file.title}.aiff`), data, err => {
      if (err) throw new Error(`保存${file.title}失败`);
      console.log(`保存${file.title}成功`);
    });
  }
};

main();
