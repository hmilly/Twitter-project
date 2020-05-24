import API from "./API.js";
// Your code here

API.getUsers().then((users) => console.log(users));
API.getTweets().then((users) => console.log(users));

console.log(
  "The current user is",
  API.whichUser.person,
  "with user id: ",
  API.whichUserId.id
);

let firstComBox = document.querySelector(".contents > p");
let commentBoxes = document.querySelector(".msg-container");
let title = document.querySelector(".title > h2");
let at = document.querySelector(".at");
let profilePic = document.querySelector(".img-counter > img");
let heart = document.querySelector(".heart > p");
let share = document.querySelector(".share > p");
let cmts = document.querySelector(".cmts > p");

API.getUsers().then((userData) => {
  for (let i in userData) {
    if (userData[i].name === API.whichUser.person) {
      title.innerText = `${API.whichUser.person}`;
      at.innerText = `@${API.whichUserava.person}`;
      profilePic.src = `${API.whichUserava.ava}`;

      userData[i].tweets.forEach((tweet, index) => {
        if (index === 0){
          firstComBox.innerText = tweet.content; 
          heart.innerText = tweet.likes;
          share.innerText = tweet.retweets;
        } else {
        let createdcoms = document.createElement("div");
        createdcoms.className = "item";
        createdcoms.innerHTML = `
            <div class="head">
                <img src="${API.whichUserava.ava}" alt="circular picture token">
                <div class="comments-box">
                    <div>
                        <div>
                            <p>${API.whichUser.person}</p>
                            <p>@${API.whichUser.person}</p>
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
        commentBoxes.append(createdcoms);
      }
      });
    }
  }
});
