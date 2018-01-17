import { start, exit, it, waitForCfg } from "../e2e";

describe("End-2-end", () => {
  let page;

  beforeAll(async () => {
    page = await start();
  });

  afterAll(async () => {
    await exit();
  });

  it("should load async component", async () => {
    const TEST_ASYNC_COMPONENT = "#test-async-component";
    const LOAD_ASYNC_COMPONENT = "#load-async-component";
    const LOADED_COMPONENT = ".LoadedComponent";
    await page.waitForSelector(TEST_ASYNC_COMPONENT, waitForCfg);
    const navButton = await page.$(TEST_ASYNC_COMPONENT);
    await navButton.click();
    await page.waitForSelector(LOAD_ASYNC_COMPONENT, waitForCfg);
    const loadButton = await page.$(LOAD_ASYNC_COMPONENT);
    await loadButton.click();
    await page.waitForSelector(LOADED_COMPONENT, waitForCfg);
  });
});
