const xhttp = new XMLHttpRequest();
// local endpointroot
const endPointRoot = "http://localhost:8888/API/v1/";
// heroku endpointroot
// const endPointRoot = "https://cryptic-meadow-01838.herokuapp.com/API/v1/";
  
let params = "";
let resource = "";

  function put() {
    xhttp.open("PUT", endPointRoot + "herbs/1", true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText
      }
    }
  }

  function post() {
    params = `?herbName=${document.getElementById("herbName").value.trim()}`
    console.log(params)
    xhttp.open("POST", endPointRoot + "herbs/1", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhttp.send(params),
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = "Entry Success";
      }
    }
  }


  function getOne() {
    let id = "1";
    resource = "patients/";
    xhttp.open("GET", endPointRoot + resource + id, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText;
      }
    }
  }

  function getAll() {
    resource = "herbs/";
    xhttp.open("GET", endPointRoot + resource, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText
      }
    }
  }

  function del() {
    xhttp.open("DELETE", endPointRoot + "herbs/", true);
    xhttp.setRequestHeader("Content-type", "applciation/x-www-form-urlencoded");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = "All Entries Deleted"

      }
    }
  }