function verifyUser() {
  const userName = document.getElementById('username')
  const password = document.getElementById('password')
  // console.log(userName, password)
  if (userName == "amir" && password == "admin") {
    window.location.href = "admin.html"
    }
  else {
    window.location.href = "user.html"
  }
}