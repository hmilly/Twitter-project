const API_ENDPOINT = "http://localhost:3000";
const USERS_URL = `${API_ENDPOINT}/users?_embed=tweets`;
const TWEETS_URL = `${API_ENDPOINT}/tweets?_expand=user&_embed=comments`;

const getTweets = async () => await fetch(TWEETS_URL).then((res) => res.json());
const getUsers = async () => await fetch (USERS_URL).then((res) => res.json());

let whichUser = window.localStorage;
let whichUserId = window.localStorage;
let whichUserava = window.localStorage;
let clickedUser = window.localStorage;

export default {
  getTweets,
  getUsers,
  whichUser,
  whichUserava,
  whichUserId,
  clickedUser
};
