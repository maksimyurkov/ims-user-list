const express = require("express");
const serveStatic = require("express-static-gzip");
const history = require("connect-history-api-fallback");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8000;
const allUsers = require("../demo/users.json");

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: true,
  methods: ["POST"],
  allowedHeaders: "Content-Type, Accept, Authorization",
  optionsSuccessStatus: 200,
  credentials: true
};

function capitalize(str) {
  str = "" + str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function user(parameters) {
  const userId = parameters.userId;
  const usedData = parameters.usedData;
  let user = {};
  for (let item of allUsers) {
    if (item.login.uuid === userId) {
      user = item;
      break;
    }
  }
  let userData = {};
  userData.id = user.login.uuid;
  if (usedData.avatarURL) userData.avatarURL = user.picture.large;
  if (usedData.displayName)
    userData.displayName = `${capitalize(user.name.first)} ${capitalize(
      user.name.last
    )}`;
  if (usedData.nickname) userData.nickname = user.login.username;
  if (usedData.position) userData.position = `Специалист ${user.nat}`;
  if (usedData.subdivision)
    userData.subdivision = `Поддержка ${user.location.city}`;
  if (usedData.email) userData.email = user.email;
  if (usedData.systemEmail) userData.systemEmail = `work.${user.email}`;
  if (usedData.phone) userData.phone = user.phone;
  if (usedData.mobilePhone) userData.mobilePhone = user.cell;
  if (usedData.address)
    userData.address = `${capitalize(user.location.postcode)}, ${capitalize(
      user.location.city
    )}, ${capitalize(user.location.street)}`;
  if (usedData.accountURL) userData.accountURL = "https://google.com";
  return userData;
}

async function users(parameters) {
  const searchText = parameters.searchText.toLowerCase();
  const startIndex = parameters.page || 0;
  let pageSize = parameters.pageSize;
  let endIndex = startIndex + pageSize;
  if (endIndex > allUsers.length) {
    endIndex = allUsers.length;
  }
  let filteredUsers = [];
  for (let user of allUsers) {
    let displayName = `${user.name.first} ${user.name.last}`;
    if (displayName.includes(searchText)) {
      filteredUsers.push({
        id: user.login.uuid,
        displayName: `${capitalize(user.name.first)} ${capitalize(
          user.name.last
        )}`,
        position: `Специалист ${user.nat}`,
        avatarURL: user.picture.medium
      });
    }
  }
  let result = {};
  result.users = filteredUsers.slice(startIndex, endIndex);
  result.totalSize = filteredUsers.length;
  return result;
}

app.options("/", cors(corsOptions));

app.post("/", cors(corsOptions), async (req, res) => {
  const route = req.body.route;
  const parameters = req.body;
  let data = {};
  if (route === "user") {
    data = await user(parameters);
  }
  if (route === "users") {
    data = await users(parameters);
  }
  res.json(data);
});

app.use(history());
app.use(
  serveStatic(__dirname + "/dist/", {
    enableBrotli: true,
    orderPreference: ["br", "gz"]
  })
);

app.listen(port);

console.info(`Project is running at http://localhost:${port}`);
