
download('http://dapo.dikdasmen.kemdikbud.go.id/sekolah/F33B09BC54112EDA5C92', 'tes.xlsx')



function download(url, filename){
  const puppeteer = require('puppeteer');
  
  (async () => {
    // const url = 'http://dapo.dikdasmen.kemdikbud.go.id/sekolah/F33B09BC54112EDA5C92';
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
  
    page.on('request', (req) => {
      if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
        req.abort();
      }
      else {
        req.continue();
      }
    });
  
  
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
  
    const downloadLink = await page.evaluate(() => {
      const story = document.querySelector('.profile > a');
      const link = story.getAttribute("href").trim();
      return link;
    });
  
    console.log(downloadLink);
    // await page.goto("http://dapo.dikdasmen.kemdikbud.go.id"+downloadLink, { waitUntil: 'networkidle2', timeout: 0 });
  
    const http = require('http');
    const fs = require('fs');
  
    // const file = fs.createWriteStream("file.xlsx");
    const file = fs.createWriteStream(filename);
    const request = http.get("http://dapo.dikdasmen.kemdikbud.go.id"+downloadLink, function(response) {
      response.pipe(file);
    });
  
  
    await browser.close();
  })();
}