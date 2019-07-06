
// LOAD DATA
// We are linking our routes to a series of "data" sources.

var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
 

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

//   // API POST Requests

  app.post("/api/friends", function(req, res) {

    var bestMatch = {
        name: "",
        photo: "",
        friendScore: 1000
    };

    var inputData = req.body;
    var inputScore = inputData.scores;

    var totalDifference = 0;

    for (var i = 0; i<friends.length; i++){
        totalDifference = 0;

        for (var m =0; i<friends[i].scores[m]; m++) {
            totalDifference += Math.abs(parseInt(inputScore[m])- parseInt(friends[i].scores[m]));

            if (totalDifference < bestMatch.friendDifference) {

                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
        }
    }

    friends.push(inputData);

    res.json(bestMatch);
   
});

};
