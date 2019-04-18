const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://dapo.dikdasmen.kemdikbud.go.id/rombel/2/206000')

  const navigationPromise = page.waitForNavigation()
  
  await navigationPromise
  
  await page.goto('http://dapo.dikdasmen.kemdikbud.go.id/rombel/3/206005')
  
  await page.setViewport({ width: 1920, height: 969 })
  
  await page.waitForSelector('#dataTables > tbody > .data:nth-child(1) > td > a')
  await page.click('#dataTables > tbody > .data:nth-child(1) > td > a')
  
  await navigationPromise
  
  await page.waitForSelector('#cfs_div_2 > .container > .material > .profile > .btn')
  await page.click('#cfs_div_2 > .container > .material > .profile > .btn')
  
  await browser.close()
})()