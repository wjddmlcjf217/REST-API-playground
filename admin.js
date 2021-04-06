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

  // method to add items onSubmit
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

  // inventory display method
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

    // deletes single entry
    function del() {
      console.log(retrieveID())
      params = `?herbName=${retrieveID()}`
      console.log(params)
      xhttp.open("DELETE", endPointRoot + "herbs/1", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(params);
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp)
          document.getElementById("demo").innerHTML = "Entry Deleted";
        }
      }
    }

  // deletes entire inventory
  function delAll() {
    xhttp.open("DELETE", endPointRoot + "herbs", true);
    xhttp.setRequestHeader("Content-type", "applciation/x-www-form-urlencoded");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        
        document.getElementById("demo").innerHTML = "All Entries Deleted"
      }
    }
  }


  // table generation for inventory display
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

      let text1 = document.createTextNode(obj[i]['herbName'])
      let text2 = document.createTextNode('Available')
      let editBtn = document.createElement('button')
      editBtn.innerHTML = 'Edit'
      let deleteBtn = document.createElement('button')
      deleteBtn.innerHTML = 'Delete'
      deleteBtn.setAttribute("id", obj[i]['herbName']);
      deleteBtn.setAttribute('onClick', 'retrieveID()');

      deleteBtn.setAttribute('onClick', 'del()');

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

  function retrieveID () {
    return event.target.id
  }