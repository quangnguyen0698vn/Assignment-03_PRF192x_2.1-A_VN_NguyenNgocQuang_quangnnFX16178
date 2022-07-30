"use strict";

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirmInput = document.getElementById("input-password-confirm");

const btnSubmit = document.getElementById("btn-submit");

const isBlank = function (field, fieldName) {
  if (field === "") {
    alert(`${fieldName} should not be empty`);
    return true;
  }
  return false;
};

let userArr = getFromStorage("userArr");
!userArr && (userArr = []);

btnSubmit.addEventListener("click", function () {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const username = usernameInput.value;
  const password = passwordInput.value;
  const confimPassword = passwordConfirmInput.value;
  //Validate new user's information
  //Không có trường nào bị bỏ trống.
  if (isBlank(firstName, "First name")) return;
  if (isBlank(lastName, "Last name")) return;
  if (isBlank(username, "Username")) return;
  if (isBlank(password, "Password")) return;
  if (isBlank(confimPassword, "Confirm ")) return;
  //Username không được trùng với Username của các người dùng trước đó.
  if (userArr.find((user) => user.username === username)) {
    alert(`This username is already used. Please try another one!`);
    return;
  }
  //Password và Confirm Password phải giống nhau.
  if (password !== confimPassword) {
    alert(`Password and Confirm Password do not match. Please check!`);
    return;
  }
  //Password phải có nhiều hơn 8 ký tự.
  if (password.length <= 8) {
    alert(`Password must have more than 8 characters!`);
    return;
  }

  //login sucessfully
  alert(
    `The account with username: ${username} has been created successfully. The browser would redirect you to the login page!`
  );
  userArr.push(new User(firstName, lastName, username, password));
  updateToStorage("userArr", userArr);

  window.location.assign("login.html");
});

//Below code are not relevant
// console.log("here");
// console.log(getFromStorage("userArr"));
// function parseUser(userData) {
//   const user = new User(
//     userData.firstName,
//     userData.lastName,
//     userData.username,
//     userData.password
//   );

//   return user;
// }

/*THIS IS TO TEST THE LOCAL STORGE
const arr = new Array(10).fill(
  new User("quang", "nguyen", "quangnguyen", "123456")
);
console.log(arr);
saveToStorage("arr", arr);
const retrievedArr = getFromStorage("arr");
console.log(retrievedArr);
*/
