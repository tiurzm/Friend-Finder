const friends = require("../data/friends")


module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

  app.get("/api/friends/:friend", function(req, res) {
    let chosen = req.params.friend;
    console.log(chosen);
    for (let i = 0; i < friends.length; i++) {
      if (chosen === friends[i].routeName) {
        return res.json(friends[i]);
      }
    }
  return res.json(false);
  
  });

  app.post("/api/friends", function(req, res) {
    let newFriend = req.body;
    newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
    console.log(newFriend);
    friends.push(newFriend);
    res.json(newFriend);
  });

};