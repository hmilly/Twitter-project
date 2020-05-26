import API from "./API.js";
// Your code here

API.getUsers().then((users) => console.log(users));
API.getTweets().then((users) => console.log(users));

console.log(
  "The current user is",
  API.whichUser.person,
  "with user id: ",
  API.whichUserId.id,
  "last user clicked was:",
  API.clickedUser.user
);


let commentsDiv = document.querySelector(".msg-container");
let title = document.querySelector(".title > h2");
let at = document.querySelector(".at");
let profilePic = document.querySelector(".img-counter > img");
let likes = document.querySelector(".heart > img");
let share = document.querySelector(".share > img");

API.getTweets().then(() => {
      likes.addEventListener(
      "click",
      (e) => {
        e.target.src = "./img/icon.png";
      }
    )
})
.then(() => {
  share.addEventListener(
      "click",
      (e) => {
        e.target.src = "./img/retweet.png";
      }
    )
})


API.getUsers().then((userData) => {
  for (let i in userData) {
    if (userData[i].name === API.clickedUser.user) {
      title.innerText = `${userData[i].name}`;
      at.innerText = `@${userData[i].name}`;
      profilePic.src = `${userData[i].avatar_url}`;

      userData[i].tweets.forEach((tweet) => {
        let newcomment = document.createElement("div");
        newcomment.className = "item";
        newcomment.innerHTML = `
            <div class="head">
                <img src="${userData[i].avatar_url}" alt="circular picture token">
                <div class="comments-box">
                    <div>
                        <div>
                            <p>${userData[i].name}</p>
                            <p>@${userData[i].name}</p>
                        </div>
                    </div>
                    <span></span>
                </div>
            </div>
            <div class="content">
                <p>
                    ${tweet.content}
                </p>
            </div>`;
        commentsDiv.append(newcomment);
      }
      );
    }
  }
})