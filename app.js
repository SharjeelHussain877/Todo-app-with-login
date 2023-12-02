// Form
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

if (localStorage.getItem("currentUser")) {
  location.href = "./dashboard.html";
}

signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
  signupBtn.click();
  return false;
};
// Form end

// function for valid email Start
function isValidEmail(email) {
  let validEmail = /^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return validEmail.test(email);
}
//   function for valid email Start

// validation password
function isValidPassword(password) {
  if (password == "") {
    swal(" ", "Please enter your password!", "warning");
    return false;
  }
  if (password.length < 8) {
    swal(" ", "Password must be 8 characters!", "error");
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    swal(" ", "Password must have a capital characters!", "error");
    return false;
  }
  if (!/[a-z]/.test(password)) {
    return false;
  }
  if (!/\d/.test(password)) {
    swal(" ", "Password must have one digit!", "error");
    return false;
  }
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-]/.test(password)) {
    swal(" ", "Password must have one special characters!", "error");
    return false;
  }
  return true;
}
// validation password end

let userData = [];
let dbUsers = localStorage.getItem("users");
let dbUsersArr = JSON.parse(dbUsers) ? JSON.parse(dbUsers) : [];
function signUp() {
  let userName = document.getElementById("user-name").value;
  let userEmail = document.getElementById("user-email").value;
  let userPassword = document.getElementById("user-password").value;
  let userConfirmPassword = document.getElementById("confirm-password").value;

  // Check user name
  if (userName == "") {
    swal(" ", "Please enter the username", "warning");
    return false;
  } else if (userName.length < 4) {
    swal(" ", "Please enter valid username!", "error");
    return false;
  }

  let isEmailDuplicated = false;

  dbUsersArr.forEach((element) => {
    if (element.email === userEmail) {
      swal("Email already exist", "Please enter another email", "warning");
      isEmailDuplicated = true;
    }
  });

  if (isEmailDuplicated === true) {
    swal("Email already exist", "Please enter another email", "warning");
    return false;
  }

  // email validation
  if (userEmail == "") {
    swal(" ", "Please enter your email!", "error");
    return false;
  } else if (!isValidEmail(userEmail)) {
    swal("Error!", "email is Incorrect!", "error");
    return false;
  }

  //   password validation
  if (!isValidPassword(userPassword)) {
    return false;
  }

  // is password matching ?
  if (userConfirmPassword == "") {
    swal("Error!", "Please confirm your password!", "warning");
    return false;
  }
  if (userPassword !== userConfirmPassword) {
    swal("Error!", "Password does'nt match!", "error");
    return false;
  }

  if (dbUsersArr && Array.isArray(dbUsersArr)) {
    let newUser = {
      username: userName,
      email: userEmail,
      password: userPassword,
      createdAt: Date.now(),
      userId: dbUsersArr.length + 1000,
    };
    dbUsersArr.push(newUser);
    localStorage.setItem("users", JSON.stringify(dbUsersArr));
  } else {
    let newUser = {
      username: userName,
      email: userEmail,
      password: userPassword,
      createdAt: Date.now(),
      userId: userData.length + 1000,
    };
    userData.push(newUser);
    localStorage.setItem("users", JSON.stringify(userData));
  }

  document.getElementById("user-name").value = "";
  document.getElementById("user-email").value = "";
  document.getElementById("user-password").value = "";
  document.getElementById("confirm-password").value = "";
  swal("Signed up!", "Successfully created an account!", "success");
}

let currentUser;

function logIn(e) {
  e.preventDefault();
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  let userFound = dbUsersArr.find(function (userObj) {
    return userObj.email == email;
  });
  if (email == "") {
    swal("Email is empty", "", "warning");
    return false;
  } else if (!userFound) {
    swal("Email is Incorrect", "", "warning");
    return;
  } else if (password == "") {
    swal("Password is empty", "", "warning");
    return false;
  } else if (userFound.password !== password) {
    swal("Password is Incorrect", "", "warning");
    return;
  } else {
    swal("Signed in!", "You have logged in successfully!", "success");
    currentUser = userFound;
    location.href = "./dashboard/dashboard.html";
  }
  localStorage.setItem("currentUser", JSON.stringify(userFound));
}
