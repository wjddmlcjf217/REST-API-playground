

const xhttp = new XMLHttpRequest();
  // const endPointRoot = "http://localhost:" + process.env.PORT || "8888" + "/API/v1/";
  const endPointRoot = "http://localhost:8888/API/v1/";
  
  let params = "?name=John&age=23";
  let resource = "";

  function put() {
    resource = "patients/1"

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
    xhttp.open("POST", endPointRoot + "herb/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhttp.send(params),
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText;
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
    console.log(endPointRoot)
    xhttp.open("GET", endPointRoot + resource, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText
      }
    }
  }

  function del() {
    resource = "patients/1"
    xhttp.open("DELETE", endPointRoot + "herb/", true);
    xhttp.setRequestHeader("Content-type", "applciation/x-www-form-urlencoded");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText

      }
    }
  }