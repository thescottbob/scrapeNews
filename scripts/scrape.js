// scrape script
// =============

// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");

// This function will scrape The Washington Post website
var scrape = function() {
  // Scrape The Washington Post website
    return axios.get("https://www.washingtonpost.com/").then(function(res) {

    var $ = cheerio.load(res.data);
    // Make an empty array to save our article info
    var articles = [];

      $("div.no-skin").each(function(i, element) {
        // Grab the header of the article
        var head = $(this)
          .find("a")
          .text()
          .trim();

        // Grab the URL of the article
        var url = $(this)
          .find("a")
          .attr("href");

        // Grab the article summary
        var sum = $(this.blurb)
          .text()
          .trim();

          var dataToAdd = {
            headline: head,
            url: url,
            summary: sum
          }

        articles.push(dataToAdd);
        return articles;
      })
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;
