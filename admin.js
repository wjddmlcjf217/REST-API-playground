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
        let obj = JSON.parse(this.response)
        console.log(obj[0]['status'], obj.length);
        displayHerbs(obj);
        document.getElementById("demo").innerHTML = this.responseText;
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

  function displayHerbs(obj) {
    let table = document.createElement('table');
    let th1 = document.createElement('th')
    let th2 = document.createElement('th')
    let text1 = document.createTextNode('Herb')
    let text2 = document.createTextNode('In Stock')
    th1.appendChild(text1)
    th2.appendChild(text2)
    table.appendChild(th1)
    table.appendChild(th2)

    for (let i = 0; i < obj.length; i++) {
      let tr = document.createElement('tr');
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');

      // herbName
      let text1 = document.createTextNode(obj[i]['herbName'])
      let text2 = document.createTextNode('Available')
      let editBtn = document.createElement('button')
      editBtn.innerHTML = 'Edit'
      let deleteBtn = document.createElement('button')
      deleteBtn.innerHTML = 'Delete'
      

      td1.appendChild(text1)
      td2.appendChild(text2)
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(editBtn)
      tr.appendChild(deleteBtn)
      table.appendChild(tr)
    }
    document.getElementById('herbDisplay').innerHTML = ''
    document.getElementById('herbDisplay').appendChild(table)
  }