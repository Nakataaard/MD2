const qs = require("qs");
const {default: Axios} = require("axios");
let fetch = require('node-fetch')
let cheerio = require('cheerio')

async function alldownload(url){
  return new Promise(async(resolve, reject) => {
    await Axios.get("https://aiovideodl.ml/", {
      headers: {
        "User-Agent":"Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
        "cookie":"pll_language=en;_ga=GA1.2.1686453003.1631818437;_gid=GA1.2.902417181.1635084800;PHPSESSID=73e827c0161936f3c62f08e7210d8463"
      }
    }).then(async result => {
      if(result.status !== 200) return reject;
      $ = cheerio.load(result.data);
      postData = {
        "url": url,
        "token": $("input[name='token']").attr("value")
      };
      await Axios.post("https://aiovideodl.ml/wp-json/aio-dl/video-data/", qs.stringify(postData), {
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
          "User-Agent":"Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          "origin":"https://aiovideodl.ml",
          "referer":"https://aiovideodl.ml/",
          "cookie":"pll_language=en;_ga=GA1.2.1686453003.1631818437;_gid=GA1.2.902417181.1635084800;PHPSESSID=73e827c0161936f3c62f08e7210d8463"
        }
      }).then(anu => {
        if(anu.status !== 200) return reject;
        resolve(anu.data);
        });
    }).catch(reject);
  });
}

module.exports = {
  alldownload
}