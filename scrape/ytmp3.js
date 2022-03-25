const axios = require("axios");
const cheerio = require("cheerio");

async function ytmp3(url) {
  return new Promise(async(resolve, reject) => {
    await axios.request({
      method: "POST",
      url: "https://yt1s.com/api/ajaxSearch/index",
      data: `q=${encodeURIComponent(url)}&vt=home`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
        "Cookie": "_ga=GA1.2.56066711.1640019302; _gid=GA1.2.1024042191.1640019302; __atuvc=1%7C51; __atuvs=61c0b56a497017fe000; __atssc=google%3B1; prefetchAd_4425332=true"
      }
    }).then(async({ data }) => {
      await axios.request({
        method: "POST",
        url: "https://yt1s.com/api/ajaxConvert/convert",
        data: `vid=${encodeURIComponent(data.vid)}&k=${encodeURIComponent(data.links.mp3['mp3128'].k)}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "User-Agent": "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          "Accept": "*/*",
          "Origin": "https://yt1s.com/",
          "Referer": "https://yt1s.com/id89",
          "Cookie": "_ga=GA1.2.56066711.1640019302; _gid=GA1.2.1024042191.1640019302; __atssc=google%3B1; __atuvc=2%7C51; __atuvs=61c0b56a497017fe001; prefetchAd_3897490=true"
        }
      }).then(({ data: result }) => {
        resolve({
          title: data.title,
          channel: data.a,
          videoID: data.vid,
          size: data.links.mp3['mp3128'].size,
          quality: data.links.mp3['mp3128'].q,
          url: result.dlink
        });
      }).catch(reject);
    }).catch(reject);
  });
}

async function ytmp4(url) {
  return new promise(async(resolve, reject) => {
    await axios.request({
      method: "post",
      url: "https://yt1s.com/api/ajaxsearch/index",
      data: `q=${encodeuricomponent(url)}&vt=home`,
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        "user-agent": "mozilla/5.0 (linux; android 9; cph1923) applewebkit/537.36 (khtml, like gecko) chrome/93.0.4577.62 mobile safari/537.36",
        "cookie": "_ga=ga1.2.56066711.1640019302; _gid=ga1.2.1024042191.1640019302; __atuvc=1%7c51; __atuvs=61c0b56a497017fe000; __atssc=google%3b1; prefetchad_4425332=true"
      }
    }).then(async({ data }) => {
      await axios.request({
        method: "post",
        url: "https://yt1s.com/api/ajaxconvert/convert",
        data: `vid=${encodeuricomponent(data.vid)}&k=${encodeuricomponent(data.links.mp4['18'].k)}`,
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
          "user-agent": "mozilla/5.0 (linux; android 9; cph1923) applewebkit/537.36 (khtml, like gecko) chrome/93.0.4577.62 mobile safari/537.36",
          "accept": "*/*",
          "origin": "https://yt1s.com/",
          "referer": "https://yt1s.com/id89",
          "cookie": "_ga=ga1.2.56066711.1640019302; _gid=ga1.2.1024042191.1640019302; __atssc=google%3b1; __atuvc=2%7c51; __atuvs=61c0b56a497017fe001; prefetchad_3897490=true"
        }
      }).then(({ data: result }) => {
        resolve({
          title: data.title,
          channel: data.a,
          videoid: data.vid,
          size: data.links.mp4['18'].size,
          quality: data.links.mp4['18'].q,
          url: result.dlink
        });
      }).catch(reject);
    }).catch(reject);
  });
}


module.exports = {
ytmp3,
ytmp4
}