const express = require("express");
const scrapRoute = require("./scrapper");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.json()); // application/json

app.use(scrapRoute);
app.listen(2000, () => {
  console.log("app is listenning on port 2000");
});
// const category = await page.evaluate(() => {
//   const select = document.querySelector('select[name="cat"]');
//   return select ? select.options[select.selectedIndex].textContent : null;
// });

// const area = await page.evaluate(() => {
//   const select = document.querySelector('select[name="field"]');
//   return select ? select.options[select.selectedIndex].textContent : null;
// });

// const deadline = await page.evaluate(() => {
//   const select = document.querySelector('select[name="sort"]');
//   return select ? select.options[select.selectedIndex].textContent : null;
// });

// const type = await page.evaluate(() => {
//   const select = document.querySelector('select[name="type"]');
//   return select ? select.options[select.selectedIndex].textContent : null;
// });

// const levels = await page.evaluate(() => {
//   const select = document.querySelector('select[name="level"]');
//   return select ? select.options[select.selectedIndex].textContent : null;
// });

// console.log("Category:", category);
// console.log("Area of Study:", area);
// console.log("Deadline:", deadline);
// console.log("Type:", type);
// console.log("Levels:", levels);
