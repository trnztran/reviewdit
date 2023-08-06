const axios = require('axios');

let token_URL = 'https://www.reddit.com/api/v1/access_token';

const reddit_Username = "HereComesTheGordo";
const reddit_Password = "Garfield789!";
const reddit_ClientID = "XYj8WIQfauPz0WyHHVq4Dw";
const reddit_ClientSecret = "7EfVmBEbGgMK-pQLBi-kdFKIt7Ka0g";
const reddit_UserAgent = "Reviewdit";

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
