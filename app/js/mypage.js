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
  API.clickedUser.user,
  "With user id: ",
  API.clickedUserId.userid
);

let commentsDiv = document.querySelector(".msg-container");
let title = document.querySelector(".title > h2");
let at = document.querySelector(".at");
let profilePic = document.querySelector(".img-counter > img");
let likes = document.querySelector(".heart > img");
let share = document.querySelector(".share > img");

/*
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

`
<div class="text">
<textarea name="comment" placeholder="Your comment" rows="5"></textarea>
<div>
    <img src="./img/Arrowy.png" alt=""></img>
    <button href="">Tweet</button>
</div>
</div>`
*/
API.getUsers().then((userData) => {
  for (let i in userData) {
    if (userData[i].name === API.clickedUser.user) {
      title.innerText = `${userData[i].name}`;
      at.innerText = `@${userData[i].name}`;
      profilePic.src = `${userData[i].avatar_url}`;
      API.clickedUserId.removeItem("userid");
      API.clickedUserId.setItem("userid", userData[i].id);
      API.clickedUserava.removeItem("usereava");
      API.clickedUserava.setItem("usereava", userData[i].avatar_url);
    }
  }
});

API.getTweets()
  .then((tweetData) => {
    for (let i in tweetData) {
      if (tweetData[i].userId == API.clickedUserId.userid) {
        let newcomment = document.createElement("div");
        newcomment.className = "item";
        newcomment.innerHTML = `
              <div class="head">
                  <img src="${API.clickedUserava.usereava}" alt="circular picture token">
                  <div class="comments-box">
                      <div>
                          <div>
                              <p>${API.clickedUser.user}</p>
                              <p>@${API.clickedUser.user}</p>
                          </div>
                      </div>
                      <span></span>
                  </div>
              </div>
              <div class="content">
                  <p>
                      ${tweetData[i].content}
                  </p>
              </div>`;
        commentsDiv.append(newcomment);
      }
    }
  })
  .then(() => {
    likes.addEventListener("click", (e) => {
      e.target.src = "./img/icon.png";
    });
  })
  .then(() => {
    share.addEventListener("click", (e) => {
      e.target.src = "./img/retweet.png";
    });
  })

  .then(() => {
    let coms = document.querySelector(".msgs");

    coms.addEventListener("click", (e) => {
      const combox = document.createElement("div");
      combox.className = "text";
      combox.innerHTML = `
        <textarea name="comment" class="commentText" placeholder="Your comment" rows="5"></textarea>
        <div>
          <img src="./img/Arrow 1.png" alt="arrow" class="arrow"></img>
          <button class="reply">Reply</button>
        </div>`;
      e.target.offsetParent.append(combox);

      coms.disabled = true;
      commentsDiv.style.height = "35vh";

      const arrow = combox.querySelector(".arrow");
      arrow.addEventListener("click", () => {
        combox.remove(combox);
        coms.disabled = false;
        commentsDiv.style.height = "54vh";
      });

      const reply = combox.querySelector(".reply");
      reply.addEventListener("click", () => {
        const textcont = combox.querySelector(".commentText").value;
        combox.remove(combox);
        coms.disabled = false;
        commentsDiv.style.height = "54vh";
      });
    });
  });
