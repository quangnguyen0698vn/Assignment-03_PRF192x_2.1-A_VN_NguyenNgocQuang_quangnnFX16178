"use strict";

let userArr = getFromStorage("userArr");
!userArr && (userArr = []);
userArr = userArr.map((user) => parseUser(user));

const loginedUser = getFromStorage("loginedUser");
const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");

if (loginedUser) {
  const activeUserId = userArr.findIndex(
    (user) => user.username === loginedUser
  );
  const activeUser = userArr[activeUserId];
  //Initialization
  pageSizeInput.value = activeUser.newsPerPage;
  categoryInput.value = activeUser.newsCategory;

  const btnSubmit = document.getElementById("btn-submit");
  btnSubmit.addEventListener("click", function () {
    if (pageSizeInput.value === "") {
      alert("Please enter a number for News per page");
      return;
    }
    userArr[activeUserId].newsPerPage = Number(pageSizeInput.value);
    userArr[activeUserId].newsCategory = categoryInput.value;
    console.log(userArr[activeUserId]);
    updateToStorage("userArr", userArr);
    alert("Save settings successfully");
  });
}
