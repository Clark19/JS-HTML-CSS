const request = require("request");
const cheerio = require("cheerio");

let url = "https://pjt3591oo.github.io/";

request(url, (err, res, body) => {
  // console.log(res);
  // console.log(body);
  let $ = cheerio.load(body);
  let posts = $(".wrapper .home .p");

  posts.each((index, item) => {
    let title = $(item).find("a").text();
    let desc = $(item).find("h4").text();

    console.log(title, desc);
  });
});
