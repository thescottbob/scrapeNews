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

      $("div.top-table-col").each(function(i, element) {
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

        // So long as our headline and sum and url aren't empty or undefined, do the following
      if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: "https://www.washingtonpost.com/" + url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;
