//File to contain Amazon webpage scrapper
//window.location.href to grab current url

const axios = require('axios');
const puppeteer = require('puppeteer');
const button = document.querySelector(".submit");

const reddit_Username = "HereComesTheGordo";        
const reddit_Password = "Garfield789!";
const reddit_ClientID = "XYj8WIQfauPz0WyHHVq4Dw";
const reddit_ClientSecret = "7EfVmBEbGgMK-pQLBi-kdFKIt7Ka0g";
const reddit_UserAgent = "Reviewdit";

let token_URL = 'https://www.reddit.com/api/v1/access_token';
let amazon_TestURL = 'https://www.amazon.com/Echo-4th-Gen/dp/B07XKF5RM3/ref=sr_1_1?crid=3K9BNKQJVT3BS&keywords=echo&psr=EY17&qid=1690615128&s=todays-deals&sprefix=echo+%2Ctodays-deals%2C149&sr=1-1-catcorr';

button.addEventListener("click", aquireProduct);

async function getAccessToken(){
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
    } catch(error){
        console.error('Error getting the access token: ', error.message);
    }
}

async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="productTitle"]/text()');
    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue();

    //console.log(rawTxt);

    browser.close();
    return rawTxt;
}

async function aquireProduct(event){
    event.preventDefault();
    const url = amazon_TestURL;
    var productName = await scrapeProduct(url);
    console.log(productName);
    document.getElementById("holder").innerHTML = productName;
}

// function displayDivs(){
//     var reviewTag = document.getElementsByClassName("reviews");
//     reviewTag.style.display = "block";
// }

function tester(){
    testVal = "Test Good"
    document.getElementById("holder").innerHTML = testVal;
}

scrapeProduct(window.location.href);

//test code
//scrapeProduct("https://www.amazon.com/MATBEBY-Mattress-Breathable-Stretches-Protector/dp/B08KNZL6BB/ref=sr_1_5?crid=21QIA02SPE4JQ&keywords=mattress%2Btopper&qid=1677813441&sprefix=%2Caps%2C174&sr=8-5&th=1");
// aquireProduct();

