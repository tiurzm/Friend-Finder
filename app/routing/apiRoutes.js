const friends = require("../data/friends");


module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    let bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    let userData =  req.body;
    let userScores = userData.scores;
    let totalDifference;

    for(let i = 0; i < friends.length; i++){
      let currentFriend = friends[i]; 
      totalDifference = 0;
     
      let length = currentFriend.scores.length
      for(let j = 0; j < length; j++){
        let currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }
      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    
    friends.push(userData);
    res.json(bestMatch);
  });
};