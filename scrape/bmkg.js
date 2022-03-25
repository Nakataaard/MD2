const cheerio = require('cheerio')
const axios = require('axios')
const request = require("request")

const Gempa = () => new Promise((resolve, reject) => {
  axios.get('https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg').then((response) => {
  const $ = cheerio.load(response.data)

  const urlElems = $('table.table-hover.table-striped')

  for (let i = 0; i < urlElems.length; i++) {
    const urlSpan = $(urlElems[i]).find('tbody')[0]

    if (urlSpan) {
      const urlData = $(urlSpan).find('tr')[0]
      var Kapan = $(urlData).find('td')[1]
      var Letak = $(urlData).find('td')[2]
      var Magnitudo = $(urlData).find('td')[3]
      var Kedalaman = $(urlData).find('td')[4]
      var Wilayah = $(urlData).find('td')[5]
      var lintang = $(Letak).text().split(' ')[0]
      var bujur = $(Letak).text().split(' ')[2]
      var hasil = {
        waktu: $(Kapan).text(),
        lintang: lintang,
        bujur: bujur,
        magnitudo: $(Magnitudo).text(),
        kedalaman: $(Kedalaman).text().replace(/\t/g, '').replace(/I/g, ''),
        wilayah: $(Wilayah).text().replace(/\t/g, '').replace(/I/g, '').replace('-','').replace(/\r/g, '').split('\n')[0],
        map: $('div.row > div > img').attr('src')
      }
      // We then print the text on to the console
      resolve(hasil);
    }
  }
  }).catch(err => reject(err))
})


const Cuaca = (kota) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${kota}&units=metric&appid=132d0c03530775bbbfa9b298392866df`)
            .then(async ({
                data
            }) => {
                if (data.cod == 404) {
                    resolve(data.message);
                } else {
                    sunrise = await moment.tz(data.sys.sunrise * 1000, "Asia/Jakarta").format("DD, MM - yy : HH:mm") + " WIB";
                    sunset = await moment.tz(data.sys.sunset * 1000, "Asia/Jakarta").format("DD, MM - yy : HH:mm") + " WIB";
                    result = {
                        Name: data.name + ', ' + data.sys.country,
                        Longitude: data.coord.lon,
                        Latitude: data.coord.lat,
                        sunrise,
                        sunset,
                        Suhu: data.main.temp + " C",
                        Angin: data.wind.speed + " m/s",
                        Kelembaban: data.main.humidity + "%",
                        Cuaca: data.weather[0].main,
                        Keterangan: data.weather[0].description,
                        Udara: data.main.pressure + " HPa"
                    };
                    resolve(result);
                }
            }).catch(reject);
    });
}

module.exports = { Gempa, Cuaca }


       
