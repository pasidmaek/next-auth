var express = require("express");
var app = express();
var users = require("./users.json");
var fs = require("fs");
var path = require("path");
var usersDataFilePath = path.join(__dirname, "users.json");
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
  var aUser = users.filter((_, index) => {
    return index + 1 == req.params.id;
  });
  console.log(aUser);
  res.send(aUser);
});

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

// Signup endpoint
app.post("/signup", (req, res) => {
  const { username, password, role, id } = req.body;

  // Check if the username already exists
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    res.status(409).json({ message: "Username already exists" });
  } else {
    // Add new user to the users data
    const newUser = { username, password, role, id };
    users.push(newUser);

    // Write the updated user data to the JSON file
    fs.writeFile(usersDataFilePath, JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).json({ message: "Error writing to file" });
      } else {
        res.status(201).json({ message: "Signup successful", user: newUser });
      }
    });
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
