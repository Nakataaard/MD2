var axios = require("axios");
var cheerio = require("cheerio");

const chord = (query) => {
  return new Promise(async(resolve, reject) => {
    await axios.request({
      method: "get",
      url: `https://www.gitagram.com/depan?do=search&q=${encodeURIComponent(query)}`,
      headers: {
        "User-Agent":"Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
        "referer":"https://www.gitagram.com/",
        "cookie":"DokuWiki=7aa41aff2f15480aa025999def18a4ed;sc_is_visitor_unique=rx12668259.1635101190.E276293DF03F4F2DC17BF0E8E50C7382.1.1.1.1.1.1.1.1.1"
      }
    }).then(async result => {
      if(result.status !== 200) return;
      $ = cheerio.load(result.data);
      const url = $("div.search_quickresult > ul.search_quickhits > li > a").attr("href");
      await axios.request({
        method: "get",
        url,
        headers: {
          "User-Agent":"Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          "referer":"https://www.gitagram.com/",
          "cookie":"DokuWiki=7aa41aff2f15480aa025999def18a4ed;sc_is_visitor_unique=rx12668259.1635101190.E276293DF03F4F2DC17BF0E8E50C7382.1.1.1.1.1.1.1.1.1"
        }
      }).then(anu => {
        if(anu.status !== 200) return;
        _ = cheerio.load(anu.data);
        resolve({
          title: _("h3.sectionedit1").text().trim(),
          chord: _("div.song-with-chords").text()
        });
      }).catch(reject);
    });
  });
}



module.exports = { chord }
