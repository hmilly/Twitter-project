import API from "./API.js";
import { createNewTweet } from "./api.js";
// Your code here

console.log(
  "The current user is",
  API.whichUser.person,
  "with user id: ",
  API.whichUserId.id,
  "The clicked comment id is :",
  API.clickedCommentId.comid
);

API.getUsers().then((users) => console.log(users));
API.getTweets().then((tweets) => console.log(tweets));

  const tweetTextArea = document.querySelector(".tweetTextArea")
  const tweetbutton = document.querySelector(".tweetButton")

    tweetbutton.addEventListener("click", async (e) => {
      if (tweetTextArea.value === ""){
        e.preventDefault()
        window.alert("Nothing to submit!")
      } else {
       createNewTweet(`${tweetTextArea.value}`)
       .then(tweetbutton.href = "home.html" )
      }
  })
