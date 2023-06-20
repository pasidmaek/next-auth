var express = require("express");
var app = express();
var users = require("./user.json");
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

app.use(express.json()); //For JSON requests
app.use(express.urlencoded({ extended: true }));

app.get("/users", function (req, res) {
  console.log(users);
  res.send(users);
});

app.get("/users/:id", function (req, res) {
  // var aUser = users[req.params.id];
  console.log("req ->", req.params.id);
  var aUser = users.filter((user) => {
    return user.id == req.params.id;
  });
  console.log(aUser);
  res.send(aUser);
});

// var user = {
//   user4: { name: "betty", password: "4444", occupation: "engineer", id: 4 },
// };

// app.post("/users", function (req, res) {
//   users["user4"] = req.body;
//   console.log(users);
//   res.send(users);
// });

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  users.map((user) => {
    console.log(user);
  });
  // Find user in the users data
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    // User found, send success response
    res.status(200).json({ message: "Login successful", user });
  } else {
    // User not found, send error response
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.delete("/users/:index", function (req, res) {
  delete users["user" + req.params.index];
  console.log(users);
  res.send(users);
});

var server = app.listen(8081, function () {
  var port = server.address().port;
  console.log("Application is running at http://127.0.0.1:%s", port);
});
