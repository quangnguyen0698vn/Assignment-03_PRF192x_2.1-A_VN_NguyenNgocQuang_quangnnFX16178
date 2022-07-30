"use strict";

const apikey = `3a0f836ee33e40d98192cc8c9b3e6a06`;
// const apikey = `3a0f836ee33e40d98192cc8c9b3e6a06`;

class User {
  firstName;
  lastName;
  username;
  password;
  newsPerPage = 5; //these are default values
  newsCategory = "General";

  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }

  login(username, password) {
    return username === this.username && password === this.password;
  }

  urlNewsApi(page = 1) {
    return `https://newsapi.org/v2/top-headlines?country=us&category=${this.newsCategory.toLowerCase()}&pageSize=${
      this.newsPerPage
    }&page=${page}&apiKey=${apikey}`;
  }

  urlSearchApi(page = 1, keyword) {
    return `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${this.newsPerPage}&page=${page}&apiKey=${apikey}`;
  }
}

//We must re-create the instances of the class User since local storage cannot store methods

function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );
  user.newsPerPage = userData.newsPerPage;
  user.newsCategory = userData.newsCategory;
  return user;
}
