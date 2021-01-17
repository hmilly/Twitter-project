import API from "./API.js";

const loginButton = document.getElementById("homebtn");
const login = document.getElementById("username");

login.addEventListener("keyup", (e) =>
  API.getUsers().then((userData) => {
    for (let i in userData)
      if (userData[i].name.toLowerCase() === e.target.value.toLowerCase()) {
        loginButton.setAttribute("href", "home.html");
        window.localStorage.clear();
        API.whichUser.setItem("person", userData[i].name);
        API.whichUserId.setItem("id", userData[i].id);
        API.whichUserava.setItem("ava", userData[i].avatar_url);
      }
  })
);

loginButton.addEventListener("click", (e) => {
  if (
    e.target.href === "http://localhost:8080/index.html" ||
    e.target.href === "http://localhost:8080/"
  )
    window.alert("Please enter a valid username to continue.");
});
