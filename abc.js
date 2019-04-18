const puppeteer = require('puppeteer');

(async () => {
  const url = 'http://dapo.dikdasmen.kemdikbud.go.id/rombel/2/206000';
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage({ headless: false });
  // await page.goto(url, {waitUntil: 'load', timeout: 0});
  
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
    // const stories = Array.from(document.querySelectorAll('td'));
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
  }


  await browser.close();
})();