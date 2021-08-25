const pouppeter = require("puppeteer");
async function start() {
  const browser = await pouppeter.launch({ headless: false });
  const page = await browser.newPage();
  // adicione a usa url do live server
  await page.goto("http://127.0.0.1:5500/html-layouts/telaLogin.html");
  inicio(page);
}
start();
let i = 0;
let j = 0;

var a = [
  "teste1",
  "123",
  "teste1",
  "123",
  "d",
  "s",
  "d",
  "ad",
  "a",
  "dd",
  "a",
  "dada",
  "das",
];
async function inicio(page) {
  if (
    await page.waitForSelector(".login_submit", {
      visible: true,
    })
  ) {
    const ac = await page.$eval(
      "body > main > div > form > button",
      (el) => el.className
    );
    console.log(ac);
    if (ac.includes("success") == false) {
      console.log(i + "" + j);
      if (i < a.length - 1) {
        i++;
        await page.type('input[type= "email"]', `${a[i]}`, { delay: 100 });
        await page.type('input[type= "password"]', `${a[j]}`, { delay: 100 });

        page.click(".login_submit", { delay: 0 });

        await page.waitForTimeout(800);

        inicio(page);
        console.log("chegou");

        await page.evaluate(
          () => (document.querySelector('input[type= "email"]').value = ``)
        );

        await page.evaluate(
          () => (document.querySelector('input[type= "password"]').value = ``)
        );
      } else {
        if (j < a.length - 1) {
          j++;
          i = 0;
          inicio(await page);
        }
      }
    }
  } else {
    await page.waitForNavigation();
    //await page.waitForTimeout(800);
  }
}
