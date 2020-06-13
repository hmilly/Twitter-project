import API from "./API.js";
import { API_ENDPOINT, counting, makeNewComment, currentDate } from "./api.js";

console.log(
  "The current user is",
  API.whichUser.person,
  "with user id: ",
  API.whichUserId.id,
  "The clicked comment id is :",
  API.clickedCommentId.comid
);

const profilePic = document.querySelector(".img-counter > img");
const title = document.querySelector(".title > h2");
const at = document.querySelector(".at");
const userCont = document.querySelector(".contents > p");

const likeNo = document.querySelector(".heart > p");
const shareNo = document.querySelector(".share > p");
const messages = document.querySelector(".msgs > p");

const likes = document.querySelector(".heart > img");
const share = document.querySelector(".share > img");

const commentsDiv = document.querySelector(".msg-container");

const showComment = (item) => {
  API.getUsers().then((userData) => {
    for (let i of userData) {
      if (i.id === item.userId) {
        const newComment = document.createElement("div");
        newComment.className = "item";
        newComment.innerHTML = `
                  <div class="head">
                      <img src="${i.avatar_url}" alt="circular picture token">
                      <div class="comments-box">
                          <div>
                              <div>
                                  <p>${i.name}</p>
                                  <p>@${i.name}</p>
                              </div>
                          </div>
                          <span></span>
                      </div>
                  </div>
                  <div class="content">
                      <p>
                          ${item.content}
                      </p>
                  </div>`;
        commentsDiv.append(newComment);
      }
    }
  });
};

API.getTweets().then(data => displayTweets(data))


const displayTweets = (tweetData) => {
  for (let i in tweetData) {
    if (tweetData[i].id == API.clickedCommentId.comid) {
      profilePic.src = `${tweetData[i].user.avatar_url}`;
      title.innerText = `${tweetData[i].user.name}`;
      at.innerText = `@${tweetData[i].user.name}`;
      userCont.innerText = `${tweetData[i].content}`;
      likeNo.innerText = `${tweetData[i].likes}`;
      shareNo.innerText = `${tweetData[i].retweets}`;
      messages.innerText = `${tweetData[i].comments.length}`;

      tweetData[i].comments.forEach((item) => showComment(item));
    }
  }
  isLiked()
  isShared()
  isCommented()
}

const isLiked = () => {
  const once = { once: true };
  likes.addEventListener(
    "click",
    (e) => {
      const addLikes =
        parseInt(likes.parentElement.querySelector("p").innerText) + 1;
      counting(
        { likes: addLikes },
        `${API_ENDPOINT}/comments/${API.clickedCommentId.comid}`
      );
      likes.parentElement.querySelector("p").innerText = addLikes;
      e.target.src = "./img/icon.png";
    },
    once
  );
}

const isShared = () => {
  const once = { once: true };
  share.addEventListener(
    "click",
    (e) => {
      const addRetweet =
        parseInt(share.parentElement.querySelector("p").innerText) + 1;
      counting(
        { retweets: addRetweet },
        `${API_ENDPOINT}/comments/${API.clickedCommentId.comid}`
      );
      share.parentElement.querySelector("p").innerText = addRetweet;
      e.target.src = "./img/retweet.png";
    },
    once
  );
}


const isCommented = () => {
  const coms = document.querySelector(".msgs");
  coms.addEventListener("click", (e) => {
    const comBox = document.createElement("div");
    comBox.className = "text";
    comBox.innerHTML = `
        <textarea name="comment" class="commentText" placeholder="Your comment" rows="5"></textarea>
        <div>
          <img src="./img/Arrow 1.png" alt="arrow" class="arrow"></img>
          <button class="reply">Reply</button>
        </div>`;
    e.target.offsetParent.append(comBox);

    coms.disabled = true;
    commentsDiv.style.height = "54%";

    const arrow = comBox.querySelector(".arrow");
    arrow.addEventListener("click", () => {
      comBox.remove(comBox);
      coms.disabled = false;
      commentsDiv.style.height = "70%";
    });

    const reply = comBox.querySelector(".reply");
    reply.addEventListener("click", () => {
      const textCPnt = comBox.querySelector(".commentText");
      const pSelect = coms.parentNode.querySelector("p");

      if (textCont.value === "") {
        window.alert("Please enter a comment!");
      } else {
        makeNewComment(textCont.value);
        showComment({
          userId: parseInt(API.whichUserId.id),
          tweetId: parseInt(API.clickedCommentId.comid),
          content: textCont.value,
          date: `${currentDate}`,
          retweets: 0,
          likes: 0,
        });
        const pSelect = coms.parentNode.querySelector("p");
        pSelect.innerText = parseInt(pSelect.innerText) + 1;
        comBox.remove(comBox);
        coms.disabled = false;
        commentsDiv.style.height = "70%";
      }
    });
  });
}
