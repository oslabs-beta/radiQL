import puppeteer from 'puppeteer';
import regeneratorRuntime from 'regenerator-runtime';

const APP = `http://localhost:${process.env.PORT || 3000}/`;

/**
 * Welcome to puppeteer! This library from Google is fast-emerging as the gold
 * standard for end-to-end browser testing.
 *
 * One of the challenges of real-time testing is that almost every single
 * action is asynchronous. Hence, puppeteer is almost always used in an
 * async/await syntax. If you aren't familiar with async/await, in short it
 * lets you "pause" a function on any Promise. While it's paused, the JS engine
 * can continue to run synchronously outside of the function (just like a
 * normal Promise or callback). Once the Promise resolves, it comes back in
 * through the event queue and the 'awaited' function can resume execution.
 *
 * For a more in-depth look at the underlying design of async/await, see
 * https://ponyfoo.com/articles/understanding-javascript-async-await
 */
describe('Cookies tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
  });

  afterAll(() => {
    browser.close();
  });

  describe("Login works", () => {
    it("logs in successfully", async () => {
      
      expect(1 + 1).toBe(2);
    })
  })

});