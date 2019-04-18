const puppeteer = require('puppeteer');

(async () => {
  // const url = 'http://dapo.dikdasmen.kemdikbud.go.id/rombel/2/206000';
  const url = 'http://dapo.dikdasmen.kemdikbud.go.id/rombel/2/206100';
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage({ headless: false });
  
  // await page.setRequestInterception(true);

  // page.on('request', (req) => {
  //   if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
  //     req.abort();
  //   }
  //   else {
  //     req.continue();
  //   }
  // });

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

  const kecamatanLinks = await page.evaluate(() => {
    const stories = Array.from(document.querySelectorAll('td > a'));
    const links = stories.map(story => story.getAttribute("href"));
    return links;
  });

  console.log(kecamatanLinks);

  for (let i = 0; i < kecamatanLinks.length; i++) {
    const url_kecamatan = ("http://dapo.dikdasmen.kemdikbud.go.id" + kecamatanLinks[i]).trim();
    console.log(url_kecamatan)
    await page.goto(url_kecamatan, { waitUntil: 'networkidle2', timeout: 0 });
    console.log("Finish load kecamatan");
    // await page.screenshot({ path: i + '.png' });
    const sekolahLinks = await page.evaluate(() => {
      const stories = Array.from(document.querySelectorAll('td > a'));
      const links = stories.map(story => story.getAttribute("href").trim());
      return links;
    });

    const sekolahNames = await page.evaluate(() => {
      const stories = Array.from(document.querySelectorAll('td > a'));
      const links = stories.map(story => story.textContent.trim().replace("/", " ").replace("\\", ""));
      return links;
    });
    // console.log(sekolahLinks);
    // console.log(sekolahNames);

    for (let j = 0; j < sekolahLinks.length; j++) {
      // download("http://dapo.dikdasmen.kemdikbud.go.id"+sekolahLinks[j], sekolahNames[j]+".xlsx", browser, page);
      url_download = "http://dapo.dikdasmen.kemdikbud.go.id"+sekolahLinks[j];
      filename = sekolahNames[j]+".xlsx"
      // console.log(url_download);
      await page.goto(url_download, { waitUntil: 'networkidle2', timeout: 0 });
  
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


    }

  }


  await browser.close();
})();



function download(url, filename, browser, page){
  // const puppeteer = require('puppeteer');
  
  (async () => {
    // const url = 'http://dapo.dikdasmen.kemdikbud.go.id/sekolah/F33B09BC54112EDA5C92';
    
    // const browser = await puppeteer.launch({ headless: true });
    // const page = await browser.newPage();
    // await page.setRequestInterception(true);
  
    // page.on('request', (req) => {
    //   if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
    //     req.abort();
    //   }
    //   else {
    //     req.continue();
    //   }
    // });
  
  
    await page.goto(url_download, { waitUntil: 'networkidle2', timeout: 0 });
  
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
  
  
    // await browser.close();
  })();
}