// scrape script
// =============

// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");

// This function will scrape Hacker News website
var scrape = function() {
  // Scrape website
    return axios.get("https://news.ycombinator.com/").then(function(res) {

    var $ = cheerio.load(res.data);
    // Make an empty array to save our article info
    console.log('scraped data returned')
    var articles = [];

      // This grabs the <a> element, which includes story link
      $(".storylink").each(function(i, element) {
        
        // console.log('element: ', element)

        var head = $(this)
          .text()
          .trim();
        console.log('headline: ', head)

        // Grab the URL of the article
        var url = $(this)
          .attr("href");
        console.log('url: ', url)

        // try grabbing something else like comment count or something
        // var sum = $(this)
        //   .text()
        //   .trim();

        // So long as our headline and sum and url aren't empty or undefined, do the following
      if (head && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        // var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array

        var dataToAdd = {
          headline: headNeat,
          url: url,
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;
