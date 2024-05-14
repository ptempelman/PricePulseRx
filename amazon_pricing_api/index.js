const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
// const express = require('express');
// const app = express();

const urls = [
    {url: 'https://pharmacy.amazon.com/Lisinopril-Generic-Zestril-Oral-Tablet/dp/B084BP2BXS?', price_class: '#extended-supply-price-label .a-offscreen'}, 
    {url: 'https://www.amazon.com/Prilosec-OTC-Frequent-Heartburn-Medicine/dp/B0000AN9L7/',
    price_class: '#sns-base-price .a-offscreen'},
];

async function configureBrowser() {
    const pages = [];

    for (let i = 0; i < urls.length; i++){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        console.log(urls[i].url);
        await page.goto(urls[i].url);
        pages.push({page, price_class: urls[i].price_class});
    }

    return pages;
}

async function checkPrice(pages){

    for (let i = 0; i < pages.length; i++){
        let {page, price_class} = pages[i];
        await page.reload(); //creating instance of page/browser every time will use too much memory, just reload the same page instance
        let html = await page.evaluate(() => document.body.innerHTML);
        // console.log(html) //this loads a lot of html 

        //reference to cheerio library
        let $ = cheerio.load(html);
        $(price_class).each(function() {
            let dollarPrice = $(this).text().trim();
            // console.log(dollarPrice);
            var price = Number(dollarPrice.replace(/[^0-9.-]+/g,""));
            console.log(price);
        
            return false;
        })
    }
}

async function monitor(){
    let pages = await configureBrowser();
    checkPrice(pages);
}

monitor();