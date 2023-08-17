const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

const PORT = 5000;

app.get("/api", (req,res) =>{
    res.json({"users": ["userOne", "userTwo", "userThree"]})
});

app.get("/productName", async (req, res) => {
    // launch puppeteer to scrape Amazon webpage for product name

    const website = req.query.website;
    console.log(website);
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(website);

        const [el] = await page.$x('//*[@id="productTitle"]/text()');
        const txt = await el.getProperty('textContent');
        const rawTxt = await txt.jsonValue();

        console.log(rawTxt);
        browser.close();

        return res.status(200).send(rawTxt);
    } catch (e) {
        console.log(e);
        res.status(500).send("Something broke :(");
    } 
});

app.listen(PORT, () => {console.log("server start on port 5000")});