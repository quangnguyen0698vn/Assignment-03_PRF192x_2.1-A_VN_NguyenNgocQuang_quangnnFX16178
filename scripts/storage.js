"use strict";

/* BELOW FUNCTION IS CALLED TO CLEAR THE LOCAL STORAGE */

// clearStorage();

function clearStorage() {
  localStorage.clear();
}

// saveToStorage: Hàm nhận hai tham số là Key và Vaule, sau đó sẽ thực hiện việc lưu xuống LocalStorage.
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

// getFromStorage: Hàm nhận vào tham số là Key, sau đó sẽ lấy dữ liệu từ LocalStorage theo Key tương ứng.

const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

// removeFromStorage: Xóa dữ liệu khỏi local storage
const removeFromStorage = function (key) {
  localStorage.removeItem(key);
};

// Cập nhật giá trị mới cho khóa
function updateToStorage(key, newValue) {
  removeFromStorage(key);
  saveToStorage(key, newValue);
}
