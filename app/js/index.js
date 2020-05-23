import API from './API.js'
// Your code here

let whichUser = "";
console.log(whichUser);

API.getUsers().then((users) => console.log(users))
API.getTweets().then((users) => console.log(users))

const loginButton = document.getElementById("homebtn");
const login = document.getElementById("username");

if (login) {
  login.addEventListener("keyup", (e) =>
  API.getUsers()
  .then(userData => {
        userData.forEach((person) => {
          if (person.name.toLowerCase() === e.target.value.toLowerCase())
            loginButton.setAttribute("href", "home.html");

          whichUser = e.target.value;
          console.log(whichUser);
          
        });
      })
  );
}

if (loginButton) {
  loginButton.addEventListener("click", (e) => {
    if (e.target.href == "http://localhost:8080/")
      window.alert("Please enter a valid username to continue.");
  });
}
