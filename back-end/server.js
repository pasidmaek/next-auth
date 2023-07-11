var express = require("express");
var app = express();
var users = require("./users.json");
var fs = require("fs");
var path = require("path");
var usersDataFilePath = path.join(__dirname, "users.json");
const TokenManager = require("./tokenmanager");
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

app.get("/users/checkrole/:username", function (req, res) {
  // var aUser = users[req.params.id];
  console.log("req ->", req.params.username);
  var aUser = users.filter((user) => {
    return user.username === req.params.username;
  });
  console.log(aUser);
  if (aUser) {
    if (aUser[0].role === "admin") {
      res.json({
        status: true,
      });
    } else {
      res.json({
        status: false,
      });
    }
  } else {
    res.json({
      message: "Invalid username",
    });
  }
});

app.get("/users/find/:username", function (req, res) {
  // var aUser = users[req.params.id];
  console.log("req ->", req.params.username);
  var aUser = users.filter((user) => {
    return user.username == req.params.username;
  });
  var oneUser = aUser[0];
  console.log(aUser);
  res.send(oneUser);
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
    let accessToken = TokenManager.getGenerateAccessToken({
      username: username,
    });
    console.log("token -> ", accessToken);
    res.status(200).json({
      status: "0",
      message: "Login successful",
      user,
      access_token: accessToken,
    });
  } else {
    // User not found, send error response

    res.status(401).json({
      status: "1",
      message: "Invalid username or password",
    });
  }
});

app.post("/check_authen", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus != false) {
    res.send(jwtStatus);
  } else {
    res.send(false);
  }
});

app.post("/get_user_data", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus != false) {
    res.send(
      users.find((user) => {
        return user.username == jwtStatus.username;
      })
    );
  } else {
    res.send(false);
  }
});

// Signup endpoint
app.post("/signup", (req, res) => {
  const { username, password, email, role } = req.body;
  const id = users.length + 1;
  // Check if the username already exists
  const existingUser = users.find((user) => user.username === username);
  const imgurl =
    "https://i.pinimg.com/564x/4a/ca/6f/4aca6fdd35b62296dcf6d79ada4d95e0.jpg";

  if (existingUser) {
    res.status(409).json({ message: "Username already exists" });
  } else {
    // Add new user to the users data
    const newUser = { username, password, email, role, id, imgurl };
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
  const newUser = users.filter((user) => {
    return user !== users[req.params.index - 1];
  });
  console.log("After delete -> ", newUser);
  // res.send(users);
  fs.writeFile(usersDataFilePath, JSON.stringify(newUser), (err) => {
    if (err) {
      res.status(500).json({ message: "Error writing to file" });
    } else {
      res.status(201).json({ message: "Delete successful", user: newUser });
    }
  });
});

app.put("/users/update/:index", function (req, res) {
  const index = req.params.index - 1;
  const updatedUser = req.body;
  // Check if the username already exists
  const existingUser = users.find(
    (user) => user.username === updatedUser.username
  );

  if (existingUser) {
    res.status(409).json({ message: "Username already exists" });
  } else {
    // Check if the index is valid
    if (index >= 0 && index < users.length) {
      // Update the user at the specified index
      users[index] = { ...updatedUser };
      fs.writeFile(usersDataFilePath, JSON.stringify(users), (err) => {
        if (err) {
          console.log(err);
        } else {
          res
            .status(200)
            .json({ message: "User updated successfully", user: users });
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
});

app.post("/signout", (req, res) => {
  // const { token } = req.body;
  res.status(200).json({ message: "Sign out successful" });
});

var server = app.listen(8081, function () {
  var port = server.address().port;
  console.log("Application is running at http://127.0.0.1:%s", port);
});
