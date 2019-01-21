var db = require("../models");

module.exports = {
  // This function clears out all news articles on the user's screen. They will still have access to their saved articles.
  clearDB: function(req, res) {
    db.Headline.remove({})
      .then(function() {
        return db.Note.remove({});
      })
      .then(function() {
        res.json({ ok: true });
      });
  }
};
