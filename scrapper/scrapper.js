const express = require("express");
const puppeteer = require("puppeteer");
const router = express.Router();

router.get("/data", async (req, res, next) => {
  const getQuotes = async () => {
    const browser = await puppeteer.launch({ headless: false });

    // Open a new page
    const page = await browser.newPage();

    // Open the website and wait until the DOM content is loaded

    await page.goto("https://www.eduvision.edu.pk/scholarships/", {
      waitUntil: "domcontentloaded",
    });

    // Get page data
    const quotes = await page.evaluate(() => {
      const quoteList = document.querySelectorAll(".col-md-12");

      // Prepare an array to store results
      const results = [];

      quoteList.forEach((div) => {
        // Find the nested anchor tag within the div
        const anchor = div.querySelector("a");
        const img = anchor?.querySelector("img");
        const title = div
          .querySelector("h3")
          ?.querySelector("b")
          ?.querySelector("a").innerHTML;
        const levels = div.querySelector("p")?.querySelector("b")?.innerHTML;
        // const type = div
        //   .querySelector(".col-lg-3")
        //   ?.querySelectorAll("span")[1]?.innerText;

        const feilds = [];
        div.querySelectorAll(".col-lg-3")?.forEach((element) => {
          feilds.push(element.querySelectorAll("span")[1]?.innerText);
        });

        const [type, category, area, deadline] = feilds;
        results.push({
          imgSrc: img
            ? "https://www.eduvision.edu.pk/scholarships/" +
              img.getAttribute("src")
            : null,
          title: title,
          levels: levels,
          type: type,
          category: category,
          area: area,
          deadline: deadline,
        });
      });
      function cleanResults(results) {
        const seenImgs = new Set();
        const cleanedResults = [];
        for (const item of results) {
          // Check if item is an object and has an imgSrc property (adjust based on your data)
          if (typeof item === "object" && item.hasOwnProperty("imgSrc")) {
            const imgSrc = item.imgSrc; // Use dot notation if possible
            if (imgSrc !== null && !seenImgs.has(imgSrc)) {
              seenImgs.add(imgSrc);
              cleanedResults.push({ ...item }); // Spread syntax for object cloning
            }
          }
        }
        return cleanedResults;
      }

      return cleanResults(results);
    });

    // Close the browser
    await browser.close();

    // Return the results
    return quotes;
  };

  // Start the scraping
  try {
    const list = await getQuotes();
    res.json({ count: list.length, data: list });
  } catch (error) {
    console.error("Error occurred while scraping:", error);
    res.status(500).send("An error occurred");
  }
});

router.get("/data/applicationOpen", async (req, res, next) => {
  const getQuotes = async () => {
    const browser = await puppeteer.launch({ headless: false });

    // Open a new page
    const page = await browser.newPage();

    // Open the website and wait until the DOM content is loaded

    await page.goto(
      "https://www.eduvision.edu.pk/scholarships/index.php?authority=&level=1&field=1&cat=1&type=&sort=3&page=1",
      {
        waitUntil: "domcontentloaded",
      }
    );

    // Get page data
    const quotes = await page.evaluate(() => {
      const quoteList = document.querySelectorAll(".col-md-12");

      // Prepare an array to store results
      const results = [];

      quoteList.forEach((div) => {
        // Find the nested anchor tag within the div
        const anchor = div.querySelector("a");
        const img = anchor?.querySelector("img");
        const title = div
          .querySelector("h3")
          ?.querySelector("b")
          ?.querySelector("a").innerHTML;
        const levels = div.querySelector("p")?.querySelector("b")?.innerHTML;
        // const type = div
        //   .querySelector(".col-lg-3")
        //   ?.querySelectorAll("span")[1]?.innerText;

        const feilds = [];
        div.querySelectorAll(".col-lg-3")?.forEach((element) => {
          feilds.push(element.querySelectorAll("span")[1]?.innerText);
        });

        const [type, category, area, deadline] = feilds;
        results.push({
          imgSrc: img
            ? "https://www.eduvision.edu.pk/scholarships/" +
              img.getAttribute("src")
            : null,
          title: title,
          levels: levels,
          type: type,
          category: category,
          area: area,
          deadline: deadline,
        });
      });
      function cleanResults(results) {
        const seenImgs = new Set();
        const cleanedResults = [];
        for (const item of results) {
          // Check if item is an object and has an imgSrc property (adjust based on your data)
          if (typeof item === "object" && item.hasOwnProperty("imgSrc")) {
            const imgSrc = item.imgSrc; // Use dot notation if possible
            if (imgSrc !== null && !seenImgs.has(imgSrc)) {
              seenImgs.add(imgSrc);
              cleanedResults.push({ ...item }); // Spread syntax for object cloning
            }
          }
        }
        return cleanedResults;
      }

      return cleanResults(results);
    });

    // Close the browser
    await browser.close();

    // Return the results
    return quotes;
  };

  // Start the scraping
  try {
    const list = await getQuotes();
    res.json({ count: list.length, data: list });
  } catch (error) {
    console.error("Error occurred while scraping:", error);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
