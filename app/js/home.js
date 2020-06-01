import API from "./API.js";
import { API_ENDPOINT, counting, makeNewComment } from "./api.js";
// Your code here

API.getUsers().then((users) => console.log(users));
API.getTweets().then((tweets) => console.log(tweets));

console.log(
  "The current user is",
  API.whichUser.person,
  "with user id: ",
  API.whichUserId.id,
  "The clicked comment id is :",
  API.clickedCommentId.comid
);

const title = document.querySelector(".title > h2");
const at = document.querySelector(".at > div > p");
const tweetContainer = document.querySelector(".tweet-container");

const filecont = document.querySelector(".fileContainer");

API.getTweets()
  .then((tweetData) => {
    for (let i in tweetData) {
      if (tweetData[i].user.name === API.whichUser.person) {
        title.innerText = `${API.whichUser.person}`;
        at.innerText = `@${API.whichUser.person}`;
      }
      const text = document.createElement("div");
      text.className = `comment-box`;
      text.id = `${tweetData[i].id}`;
      text.innerHTML = `
        <a href=""><div class="header">
          <h5 class="userName">${tweetData[i].user.name}</h5>
          <h5>${tweetData[i].date}</h5>
        </div></a>
        <div class="content">
          <p>
          ${tweetData[i].content}
          </p>
          <p class="hash"></p>
        </div>
        <div class="footer">
          <div class="cont">
            <img src="./img/heart 1.png" class="heart" alt="heart">
            <p>${tweetData[i].likes}</p>
          </div>
          <div class="cont">
            <img src="./img/retweetgrey.png" class="retweet" alt="share symbol">
            <p>${tweetData[i].retweets}</p>
          </div>
          <div class="cont">
            <button class="msgs"><img src="./img/comment.png" alt="message boxes"></button>
            <p>${tweetData[i].comments.length}</p>
          </div>
        </div>`;
      tweetContainer.append(text);
    }
  })
  .then(() => {
    const users = document.querySelectorAll(".header");
    users.forEach((u, i) =>
      u.addEventListener("click", () => {
        API.clickedCommentId.removeItem("comid");
        API.clickedCommentId.setItem("comid", i + 1);
        u.parentNode.href = "mypage.html";
      })
    );
  })
  .then(() => {
    const likes = document.querySelectorAll(".heart");
    const once = { once: true };
    likes.forEach((like) =>
      like.addEventListener(
        "click",
        (e) => {
          const parentId = e.path[3].id;
          const addLike =
            parseInt(like.parentElement.querySelector("p").innerText) + 1;
          counting({ likes: addLike }, `${API_ENDPOINT}/tweets/${parentId}`);
          like.parentElement.querySelector("p").innerText = addLike;
          e.target.src = "./img/icon.png";
        },
        once
      )
    );
  })
  .then(() => {
    const retweets = document.querySelectorAll(".retweet");
    const once = { once: true };
    retweets.forEach((tweet) =>
      tweet.addEventListener(
        "click",
        (e) => {
          const parentId = e.path[3].id;
          const addRetweet =
            parseInt(tweet.parentElement.querySelector("p").innerText) + 1;
          counting(
            { retweets: addRetweet },
            `${API_ENDPOINT}/tweets/${parentId}`
          );
          tweet.parentElement.querySelector("p").innerText = addRetweet;
          e.target.src = "./img/retweet.png";
        },
        once
      )
    );
  })
  .then(() => {
    const coms = document.querySelectorAll(".msgs");
    coms.forEach((item, i) => {
      item.addEventListener("click", (e) => {
        API.clickedCommentId.removeItem("comid");
        API.clickedCommentId.setItem("comid", i + 1);

        const combox = document.createElement("div");
        combox.className = "text";
        combox.innerHTML = `
        <textarea name="comment" class="commentText" placeholder="Your comment" rows="5"></textarea>
        <div>
          <img src="./img/Arrow 1.png" alt="arrow" class="arrow"></img>
          <button class="reply">Reply</button>
        </div>`;
        e.target.offsetParent.append(combox);

        item.disabled = true;

        const arrow = combox.querySelector(".arrow");
        arrow.addEventListener("click", () => {
          combox.remove(combox);
          item.disabled = false;
        });
        const reply = combox.querySelector(".reply");
        reply.addEventListener("click", (e) => {
          const textcont = combox.querySelector(".commentText");

          if (textcont.value === "") {
            window.alert("Please enter a comment!");
          } else {
            makeNewComment(`${textcont.value}`);
            let pselect = item.parentNode.querySelector("p")
            pselect.innerText = parseInt(pselect.innerText) + 1;
            combox.remove(combox);
            item.disabled = false;
          }
        });
      });
    });
  });

/**
  // set base URL to your json server

 * create an async function {getComments}, which 
 * gets data from URL and returns the data as JS objects

let getComments = async () => {
  return await fetch(`${baseURL}/comments`).then(res => res.json()).catch(error => console.log(error))
}

* create an async function {postComment}, which takes {newComment} as an argument,
* and posts it to the comments URL.
*
let postComment = async (newComment) => {
  const configObject = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      body: JSON.stringify(newComment),
  };

  return await fetch(`${baseURL}/comments`, configObject)
      .then(res => (res.ok) ? res.json() : "Oops something went wrong!").catch(error => console.log(error))
}

* Create an async function {patchComment}, which takes {comment}
* and {newCommentBody} as arguments.
*
let patchComment = async (comment, newCommentBody) => {
  const configObject = {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      body: JSON.stringify({ body: newCommentBody }),
  };

  return await fetch(`${baseURL}/comments/${comment.id}`, configObject)
      .then(res => (res.ok) ? res.json() : "Oops we couldn't update that!").catch(error => console.log(error))
}

* create an async function {putComment}, which takes {comment} as an argument,
* and makes a put request with the new comment data.
*
let putComment = async (comment) => {
  const configObject = {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      body: JSON.stringify(comment),
  };

  return await fetch(`${baseURL}/comments/${comment.id}`, configObject)
      .then(res => (res.ok) ? res.json() : "Oops we couldn't update that!").catch(error => console.log(error))
}

* create an async function {deleteComment}, which takes {comment} as an argument,
* and deletes the selected comment from DB.
let deleteComment = async (comment) => {
  const configObject = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      body: JSON.stringify(comment),
  };

  return await fetch(`${baseURL}/comments/${comment.id}`, configObject)
      .then(res => (res.ok) ? "Deleted!" : "That could not be deleted!").catch(error => console.log(error))
}
  **/
