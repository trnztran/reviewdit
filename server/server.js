const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const axios = require("axios");

const PORT = 5000;

app.get("/api", (req,res) =>{
    res.json({"users": ["userOne", "userTwo", "userThree"]})
});

app.get("/accessToken", async (req,res) => {
    // Uses axios to retrieve access token from reddit api

    let token_URL = 'https://www.reddit.com/api/v1/access_token';
    
    const reddit_Username = "HereComesTheGordo";
    const reddit_Password = "Garfield789!";
    const reddit_ClientID = "XYj8WIQfauPz0WyHHVq4Dw";
    const reddit_ClientSecret = "7EfVmBEbGgMK-pQLBi-kdFKIt7Ka0g";
    const reddit_UserAgent = "Reviewdit";

    try{
        const response = await axios.post(
            token_URL,
            `grant_type=password&username=${reddit_Username}&password=${reddit_Password}`,
            {
                auth: {
                    username: reddit_ClientID,
                    password: reddit_ClientSecret,
                },
                headers: {
                    'User-Agent': reddit_UserAgent,
                },
            }
        );

        console.log ('Access token:', response.data.access_token);
        return res.status(200).send(response.data.access_token);
    } catch(error){
        console.error('Error getting the access token: ', error.message);
    }
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