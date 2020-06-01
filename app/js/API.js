export const API_ENDPOINT = "http://localhost:3000";
export const USERS_URL = `${API_ENDPOINT}/users?_embed=tweets`;
export const TWEETS_URL = `${API_ENDPOINT}/tweets?_expand=user&_embed=comments`;



const getTweets = async () => await fetch(TWEETS_URL).then((res) => res.json());
const getUsers = async () => await fetch (USERS_URL).then((res) => res.json());

let whichUser = window.localStorage;
let whichUserId = window.localStorage;
let whichUserava = window.localStorage;
let clickedCommentId = window.localStorage;
let clickedUser = window.localStorage;



export default {
  getTweets,
  getUsers,
  whichUser,
  whichUserava,
  whichUserId,
  clickedCommentId,
  clickedUser
};

export const counting = async (obj, url) => {
  const configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(obj),
  };

  return await fetch(url, configObject)
    .then((res) => (res.ok ? res.json() : "Oops we couldn't update that!"))
    .catch((error) => console.log(error));
};

const day = new Date()
let month = day.getMonth()
if(month < 10) month = `0${month}`
export const currentDate = `${day.getDay()}/${month}/${day.getFullYear()}`

export const createNewTweet = async (msg) => {
   const configObject = await {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "userId": parseInt(whichUserId.id),
      "content": `${msg}`,
      "likes": 0,
      "retweets": 0,
      "date": `${currentDate}`
    }),
  };

  await fetch(`${API_ENDPOINT}/tweets`, configObject)
    .then((res) => (res.ok ? res.json() : "Oops we couldn't update that!"))
    .catch((error) => console.log(error));
}


export const makeNewComment = async (comment) => {
    const configObject = await {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "userId": parseInt(whichUserId.id),
      "tweetId": parseInt(clickedCommentId.comid),
      "content": `${comment}`,
      "date": `${currentDate}`,
      "retweets": 0,
      "likes": 0
    }),
  };

  await fetch(`${API_ENDPOINT}/comments`, configObject)
    .then((res) => (res.ok ? res.json() : "Oops we couldn't update that!"))
    .catch((error) => console.log(error));
}

/*
let deleteComment = async (id) => {
  const configObject = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      body: JSON.stringify(),
  };

  return await fetch(`${API_ENDPOINT}/tweets/${id}`, configObject)
      .then(res => (res.ok) ? "Deleted!" : "That could not be deleted!").catch(error => console.log(error))
}
deleteComment(25)

*/