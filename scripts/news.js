"use strict";

//Get userArr from Storage
let userArr = getFromStorage("userArr");
!userArr && (userArr = []);
userArr = userArr.map((user) => parseUser(user));

//Get logined user from storage
const loginedUser = getFromStorage("loginedUser");
let activeUser = "";
const activeUserId = userArr.findIndex((user) => user.username === loginedUser);
const labelPageNum = document.getElementById("page-num");

let newsPerPage = 5;
let pageNum = Number(labelPageNum.textContent);
activeUserId !== -1 && (activeUser = userArr[activeUserId]);
activeUserId !== -1 && (newsPerPage = activeUser.newsPerPage);

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

const newsContainer = document.getElementById("news-container");
newsContainer.classList.add("container");

const loadAndRenderNews = async function (page = 1) {
  if (!loginedUser) return;
  try {
    const res = await fetch(activeUser.urlNewsApi(page));
    if (!res.ok) throw new Error("Cannot fetch data");
    const data = await res.json();
    renderNews(data.articles);
    btnPrev.hidden = btnPrev.disabled = page === 1;
    btnNext.hidden = btnNext.disabled = page * newsPerPage >= data.totalResults;
  } catch (err) {
    console.log(err.message);
  }
};

//Below function is to display the news
const renderNews = function (articles) {
  newsContainer.removeEventListener("click", btnViewHandle);
  newsContainer.innerHTML = "";

  for (let i = 0; i < articles.length; i++) {
    const { title, description, url, urlToImage } = articles[i];
    const html = `
  <div class="row" style="margin-bottom: 20px">
    <div class="col-4">
      <img src="${urlToImage}" class="img-fluid" alt="${title}">
    </div>
    <div class="col-8">
      <h5>${title}</h5>
      <p>${description}</p>
      <button type="button" class="btn btn-primary" href="${url}">View</button>
    <div>
  <div>  
  `;
    newsContainer.insertAdjacentHTML("beforeend", html);
  }

  newsContainer.addEventListener("click", btnViewHandle);
};

//Combine two action go previous/next into one function
const navigationHandle = async function (e) {
  if (e.target.getAttribute("id") === "btn-prev") pageNum--;
  else pageNum++;
  await loadAndRenderNews(pageNum);
  labelPageNum.textContent = pageNum;
};

//Handle if user click the view button
const btnViewHandle = function (e) {
  const clicked = e.target.closest("button");
  if (clicked.tagName === "BUTTON") {
    window.location.assign(clicked.getAttribute("href"));
  }
};

btnPrev.addEventListener("click", navigationHandle);
btnNext.addEventListener("click", navigationHandle);
loadAndRenderNews(1);
// console.log("FIRST");
