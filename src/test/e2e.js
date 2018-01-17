const path = require("path");
const http = require("http");
const connect = require("connect");
const serveStatic = require("serve-static");
const puppeteer = require("puppeteer");
const fs = require("fs");

const PORT = 5555;
const SECOND = 1000;
const timeout = 5 * SECOND;
let server;
let browser;

global.jasmine.DEFAULT_TIMEOUT_INTERVAL = 3 * timeout;
// jest.setTimeout(3 * timeout);

export const waitForCfg = { timeout };

export const serve = async () => {
  server = await http
    .createServer(connect().use(serveStatic(path.join(process.cwd(), "build"))))
    .listen(PORT);
};

export const takeScreenshot = async (page, filename = "error") => {
  try {
    fs.mkdirSync(path.join(process.cwd(), "screenshot"));
  } catch (e) {}
  await (page || global.page).screenshot({
    path: `screenshot/${filename}-${Date.now()}.png`,
  });
};

export const createPage = async (url = "") => {
  browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}${url}`);
  await page.on("requestfailed", async () => {
    await takeScreenshot(page);
  });
  await page.on("pageerror", async () => {
    await takeScreenshot(page);
  });
  await page.on("error", async () => {
    await takeScreenshot(page);
  });
  return page;
};

export const exit = async () => {
  try {
    await browser.close();
  } catch (e) {}
  try {
    await server.close();
  } catch (e) {}
};

export const start = async url => {
  await serve();
  const page = await createPage(url);
  global.page = page;
  return page;
};

export const it = (desc, test) => {
  global.it(desc, async () => {
    try {
      return await test();
    } catch (error) {
      await takeScreenshot();
      return Promise.reject(error);
    }
  });
};
