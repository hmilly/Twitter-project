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