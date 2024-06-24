const TOKEN_AUTHOR = "accessToken";
const USER_LOGIN = "userLogin";

//  Cookie and local storage interaction functions

const getDataTextStorage = (storeName) => {
  if (localStorage.getItem(storeName)) {
    return localStorage.getItem(storeName);
  }
  return null;
};

const getDataJSONStorage = (storeName) => {
  if (localStorage.getItem(storeName)) {
    return JSON.parse(localStorage.getItem(storeName));
  }
  return null;
};

const setDataTextStorage = (storeName, data) => {
  localStorage.setItem(storeName, data);
};

const setDataJSONStorage = (storeName, data) => {
  localStorage.setItem(storeName, JSON.stringify(data));
};

const removeDataTextStorage = (storeName) => {
  localStorage.removeItem(storeName);
};

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

const refreshAccessToken = async () => {
  const currentToken = getDataTextStorage(TOKEN_AUTHOR);

  try {
    const response = await axios.post(
      "https://apistore.cybersoft.edu.vn/api/Users/RefeshToken",
      null,
      {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      }
    );

    const newToken = response.data.content.accessToken;
    setDataTextStorage(TOKEN_AUTHOR, newToken);
    return newToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

export {
  getDataTextStorage,
  getDataJSONStorage,
  setDataTextStorage,
  setDataJSONStorage,
  removeDataTextStorage,
  setCookie,
  getCookie,
  deleteCookie,
  TOKEN_AUTHOR,
  USER_LOGIN,
  refreshAccessToken,
};
