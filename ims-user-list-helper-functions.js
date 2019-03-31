export async function serverRequest(url, body, demoMode) {
  if (demoMode) return demoRequest(body);
  let response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(body)
  });
  let data = await response.json();
  return data;
}

// Functions for demo
async function demoRequest(body) {
  if (window.demoUsers === undefined) window.demoUsers = await getDemoUsers();
  let promise = new Promise(resolve => {
    setTimeout(async () => {
      const route = body.route;
      const parameters = body;
      let data = {};
      if (route === "user") {
        data = await user(parameters);
      }
      if (route === "users") {
        data = await users(parameters);
      }
      resolve(data);
    }, 500);
  });
  return promise;
}

async function getDemoUsers() {
  let response = await fetch("users.json");
  let data = await response.json();
  return data;
}

function capitalize(str) {
  str = "" + str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function user(parameters) {
  const userId = parameters.userId;
  const usedData = parameters.usedData;
  let user = {};
  for (let item of window.demoUsers) {
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
  if (endIndex > window.demoUsers.length) {
    endIndex = window.demoUsers.length;
  }
  let filteredUsers = [];
  for (let user of window.demoUsers) {
    let displayName = `${user.name.first} ${user.name.last}`;
    if (displayName.indexOf(searchText) !== -1) {
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
