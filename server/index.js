const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const socket = require("socket.io");

var app = express();
app.use(bodyParser.json());
app.use(cors);

var port = 3000;

var server = app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

var io = socket(server);
var connected_socket;

io.on("connection", socket => {
  connected_socket = socket;

  setInterval(() => {
    var heartrates = [72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82];
    var size = heartrates.length;
    var heartData = heartrates[Math.floor(Math.random() * size)];
    var emotions = ["Happy", "Ecstatic", "Normal", "Sad"];
    var size2 = emotions.length;
    var emotion = emotions[Math.floor(Math.random() * size2)];
    // var heartData = fs.readFileSync(__dirname + "/heartrate.txt").toString();
    // var vibration = fs.readFileSync(__dirname + "/vibration.txt").toString();
    var vibration_beat_data = fs
      .readFileSync(__dirname + "/heartandvibrator.txt")
      .toString();
    var steps = fs
      .readFileSync(__dirname + "/steps.txt")
      .toString()
      .split("\r\n");
    // console.log(steps);
    var steps = steps[steps.length - 2];
    socket.emit("data", {
      heartData: heartData,
      emotion: emotion,
      steps: steps
    });
  }, 5000);
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.get("/data", (req, res) => {
  var JSONData = JSON.parse(
    fs.readFileSync(__dirname + "/data.json").toString()
  );
  //   console.log(JSONData);
  res.send(JSONData);
});

app.post("/data", (req, res) => {
  var currTime = new Date();
  var JSONData = JSON.parse(
    fs.readFileSync(__dirname + "/data.json").toString()
  );
  var sentData = req.body;
  console.log(sentData);
  JSONData[currTime.getTime()] = sentData.data;
  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(JSONData));
  res.send("Success");
});

app.post("/mood", (req, res) => {
  var currTime = new Date();
  var sentData = req.body;
  var JSONData = JSON.parse(
    fs.readFileSync(__dirname + "/mood.json").toString()
  );
  JSONData[currTime.getTime()] = sentData.data;
  fs.writeFileSync(__dirname + "/mood.json", JSON.stringify(JSONData));
  res.send("Success");
});

app.get("/interests", (req, res) => {
  var JSONData = JSON.parse(
    fs.readFileSync(__dirname + "/interests.json").toString()
  );
  res.send(JSONData);
});

app.post("/interests", (req, res) => {
  var JSONData = JSON.parse(
    fs.readFileSync(__dirname + "/interests.json").toString()
  );
  var sentData = req.body;
  JSONData.push(sentData.data);
  fs.writeFileSync(__dirname + "/interests.json", JSON.stringify(JSONData));
  res.send("Success");
});

app.get("/mood", (req, res) => {
  var JSONData = JSON.parse(
    fs.readFileSync(__dirname + "/mood.json").toString()
  );

  res.send(JSONData);
});

// app.post();
