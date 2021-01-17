import API from "./API.js";
import { createNewTweet } from "./api.js";

console.log(
  "The current user is",
  API.whichUser.person,
  "with user id: ",
  API.whichUserId.id,
  "The clicked comment id is :",
  API.clickedCommentId.comid
);

  const tweetTextArea = document.querySelector(".tweetTextArea")
  const tweetButton = document.querySelector(".tweetButton")
    tweetButton.addEventListener("click", async (e) => {
      if (tweetTextArea.value === ""){
        e.preventDefault()
        window.alert("Nothing to submit!")
      } else {
       createNewTweet(`${tweetTextArea.value}`)
       .then(tweetButton.href = "home.html" )
      }
  })
