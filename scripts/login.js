"use strict";

const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

let userArr = getFromStorage("userArr");
!userArr && (userArr = []);
userArr = userArr.map((user) => parseUser(user));

btnSubmit.addEventListener("click", function () {
  const username = usernameInput.value;
  const password = passwordInput.value;

  //validate input
  if (username === "") {
    alert("Please enter username");
    return;
  }
  if (password === "") {
    alert("Please enter password");
  }

  let foundUser = false;

  for (const user of userArr) {
    foundUser ||= user.username === username;

    if (user.login(username, password)) {
      saveToStorage("loginedUser", username);
      //go to the home page
      window.location.assign("../index.html");
      return;
      // https://love2dev.com/blog/ways-to-use-javascript-redirect-to-another-page/
    }
  }
  if (!foundUser)
    alert("This username is not found, please check if any typos");
  else alert("Wrong pasword!");
});
