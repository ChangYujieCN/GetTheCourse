const puppeteer = require("puppeteer");
const username = ""
const password = ""
const base = `http://www.fdmse.fudan.edu.cn/fdmse-1516/Default.aspx`;

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    dumpio: false,
    devtools: true
  });
  const page = await browser.newPage();
  await page.goto(base, {
    waitUntil: "load"
  });
  await page.waitFor(2000);
  await page.click("#WebHead1_hlLogin");
  await page.waitFor("#txtLogin_Name");
  await page.waitFor("#txtPassword");
  await page.type("#txtLogin_Name", username, { delay: 100 });
  await page.type("#txtPassword", password, { delay: 100 });
  await page.click("#btnConfirm");
  await page.waitFor("#WebHead1_Hyperlink4");
  await page.click("#WebHead1_Hyperlink4");
  await page.waitFor(2000);
  await page.waitFor("#DataGrid1");
  await page.click(
    `a[href="javascript:__doPostBack('DataGrid1$ctl04$ctl02','')"]`
  );
  await page.waitFor("#Label1");
  let info = await page.evaluate(() => {
    var str = document.getElementById("Label1").innerText;
    return str;
  });
  while (info === "对不起，您选择的这这门课已经达到选课上限！") {
    await page.waitFor(5000);
    await page.click(
      `a[href="javascript:__doPostBack('DataGrid1$ctl04$ctl02','')"]`
    );
    await page.waitFor("#Label1");
    info = await page.evaluate(() => {
      var str = document.getElementById("Label1").innerText;
      return str;
    });
  }
  await page.click(
    `a[href="javascript:__doPostBack('DataGrid2$ctl02$ctl00','')"]`
  );
  await page.waitFor("#Label1");
  info = await page.evaluate(() => {
    var str = document.getElementById("Label1").innerText;
    return str;
  });
  if (info === "本次退课成功") {
    await page.click(
      `a[href="javascript:__doPostBack('DataGrid1$ctl04$ctl02','')"]`
    );
  }
  await browser.close();
})();
