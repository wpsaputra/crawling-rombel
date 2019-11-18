const puppeteer = require('puppeteer');

(async () => {
  // const url = 'http://dapo.dikdasmen.kemdikbud.go.id/rombel/2/206000';
  const url = 'https://matching-dev.bps.go.id/index.php?menu=list_gc&prop=bm0%3D';
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage({ headless: false });
  const fs = require('fs');
  
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
  
  // muh.mulyadi
  // sh4fira2008
  // https://matching-dev.bps.go.id/index.php?menu=list_gc&prop=bm0%3D
  
  await page.type('#signupInputUsername', 'muh.mulyadi');
  await page.type('#signupInputPassword', 'sh4fira2008');
  await page.keyboard.press('Enter');

  await delay(3000);

  let tes = [];
  
  await page.goto("https://matching-dev.bps.go.id/index.php?menu=list_gc&prop=bm0%3D", { waitUntil: 'networkidle2', timeout: 0 });

  // await page.click(".form-control.input-sm");
  // await page.select('#telCountryInput', 'my-value')
  // await page.evaluate(() => {
  //   document.querySelector('select option:nth-child(4)').selected = true;
  // });

  await page.select('select[name="demo-dt-basic_length"]', "100");
  
  const kabupatenLinks = await page.evaluate(() => {
    const stories = Array.from(document.querySelectorAll('td > a'));
    const links = stories.map(story => story.getAttribute("href"));
    return links;
  });
  
  // console.log(kabupatenLinks);
  // await delay(300000);


  for (let i = 0; i < kabupatenLinks.length; i++) {
    const url_kecamatan = ("https://matching-dev.bps.go.id/" + kabupatenLinks[i]).trim();
    console.log(url_kecamatan)
    await page.goto(url_kecamatan, { waitUntil: 'networkidle2', timeout: 0 });
    await page.select('select[name="demo-dt-basic_length"]', "100");

    console.log("Finish load kecamatan");
    // await page.screenshot({ path: i + '.png' });
    const desaLinks = await page.evaluate(() => {
      const stories = Array.from(document.querySelectorAll('td > a'));
      const links = stories.map(story => story.getAttribute("href").trim());
      return links;
    });
    // console.log("desa");
    // console.log(desaLinks);
    
    // desaLinks =  desaLinks.filter(v => v.contains("index.php"));
    // desaLinks.filter(str => str.contains('index.php'));
    // console.log(desaLinks);

    for (let j = 0; j < desaLinks.length; j++) {
      // const url_desa = desaLinks[j];
      if (desaLinks[j].includes("excelgc")) { continue; }

      const url_desa = ("https://matching-dev.bps.go.id/" + desaLinks[j]).trim();
      // console.log(url_desa);

      await page.goto(url_desa, { waitUntil: 'networkidle2', timeout: 0 });
      await page.select('select[name="demo-dt-basic_length"]', "100");


      const downloadLinks = await page.evaluate(() => {
        const stories = Array.from(document.querySelectorAll('td > a'));
        const links = stories.map(story => story.getAttribute("href").trim());
        return links;
      });

      const fileName = await page.evaluate(() => {
        const stories = Array.from(document.querySelectorAll('td > a'));
        const links = stories.map(story => story.textContent);
        return links;
      });

      console.log(downloadLinks);
      console.log(fileName);

      for (let k = 0; k < downloadLinks.length; k++) {
        // const element = array[index];
        
        // const http = require('https');
        const fs = require('fs');
      
        // // const file = fs.createWriteStream("file.xlsx");
        // const file = fs.createWriteStream(fileName[k]+".pdf");
        // const request = http.get(downloadLinks[k], function(response) {
        //   response.pipe(file);
        // });

        if (downloadLinks[k].includes("excelgc")) { continue; }

        await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: '/home/wayan/Code/crawling-rombel'});
        // page.setRequestInterception(true);
        // page.on('response', response => {
        //   const headers = response.headers;
        //   if (response.url.endsWith('.pdf'))
        //     headers['Content-Disposition'] = 'attachment';
        //   response.continue({headers});
        // });


        // const response = await page.goto("https://matching-dev.bps.go.id/" + downloadLinks[k], { waitUntil: 'networkidle2', timeout: 0 });

        tes.push("https://matching-dev.bps.go.id/" + downloadLinks[k]);
        console.log("https://matching-dev.bps.go.id/" + downloadLinks[k]);
        // fs.writeFileSync("tes"+i+j+k+".json", JSON.stringify(tes));

        // delay(60000);

        // fs.writeFileSync("/home/wayan/Code/crawling-rombel/"+fileName[k]+".pdf", await response.buffer());

      }


      
      // const http = require('https');
      // const fs = require('fs');
    
      // // const file = fs.createWriteStream("file.xlsx");
      // const file = fs.createWriteStream("filename"+j+".pdf");
      // const request = https.get(url_desa, function(response) {
      //   response.pipe(file);
      // });

      
    }


  }

  //   const sekolahNames = await page.evaluate(() => {
  //     const stories = Array.from(document.querySelectorAll('td > a'));
  //     const links = stories.map(story => story.textContent.trim().replace("/", " ").replace("\\", ""));
  //     return links;
  //   });
  //   // console.log(sekolahLinks);
  //   // console.log(sekolahNames);

  //   for (let j = 0; j < sekolahLinks.length; j++) {
  //     // download("http://dapo.dikdasmen.kemdikbud.go.id"+sekolahLinks[j], sekolahNames[j]+".xlsx", browser, page);
  //     url_download = "http://dapo.dikdasmen.kemdikbud.go.id"+sekolahLinks[j];
  //     filename = sekolahNames[j]+".xlsx"
  //     // console.log(url_download);
  //     await page.goto(url_download, { waitUntil: 'networkidle2', timeout: 0 });
  
  //     const downloadLink = await page.evaluate(() => {
  //       const story = document.querySelector('.profile > a');
  //       const link = story.getAttribute("href").trim();
  //       return link;
  //     });
    
  //     console.log(downloadLink);
  //     // await page.goto("http://dapo.dikdasmen.kemdikbud.go.id"+downloadLink, { waitUntil: 'networkidle2', timeout: 0 });
    
  //     const http = require('http');
  //     const fs = require('fs');
    
  //     // const file = fs.createWriteStream("file.xlsx");
  //     const file = fs.createWriteStream(filename);
  //     const request = http.get("http://dapo.dikdasmen.kemdikbud.go.id"+downloadLink, function(response) {
  //       response.pipe(file);
  //     });


  //   }

  // }

  fs.writeFileSync("tes.json", JSON.stringify(tes));

  await browser.close();
})();

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}


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