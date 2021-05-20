var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var xhub = require("express-x-hub");

//Const
var xhubSecret = "MySecretKey";
var port = "8085";
var host = "localhost";

//Secret key
app.use(xhub({ algorithm: "sha1", secret: xhubSecret }));

// Configure express json
app.use(bodyParser.json());

// Main : Start the express http server
var server = app.listen(port, host, function() {
  console.log(
    "App listening at http://%s:%s",
    server.address().address,
    server.address().port,
  );
});

// Add default route
app.post("/webhook", function(req, res) {
  if (!req.isXHubValid()) {
    res.status(400).send("Invalid X-Hub Request");
    console.log("Secret key is invalid");
    return;
  }

  switch (req.headers["x-github-event"]) {
    //Event create (Branch, or tag created)
    case "create":
      res.send("Event create trigger");
      console.log("Create event");
      break;

    //Event release (Release published in a repository)
    case "release":
      res.send("Event release trigger");
      console.log("Release Event");
      break;

    default:
      res.status(400).send("Event not supported : " + command);
      console.log("Event not supported : " + req.headers["X-Github-Event"]);
  }
});
