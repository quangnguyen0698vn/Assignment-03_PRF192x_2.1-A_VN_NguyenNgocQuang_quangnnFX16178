"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

//Nếu người dùng chưa đăng nhập, bạn cần hiển thị màn hình gồm nút đăng nhập và đăng ký
let loginedUser = getFromStorage("loginedUser");
loginModal.hidden = false;
mainContent.hidden = true;

//Nếu người dùng đã đăng nhập, bạn sẽ hiển thị thông điệp chào mừng như sau: "Welcome + Firstname" và nút Logout.
if (loginedUser) {
  loginModal.hidden = true;
  mainContent.hidden = false;
  welcomeMessage.insertAdjacentText("beforeend", `Welcome ${loginedUser}`);
}

//Handle log-out

btnLogout.addEventListener("click", function () {
  updateToStorage("loginedUser", "");
  window.location.reload();
});
