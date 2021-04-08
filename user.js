const xhttp = new XMLHttpRequest();
// local endpointroot
const endPointRoot = "http://localhost:8888/API/v1/";
// heroku endpointroot
// const endPointRoot = "https://cryptic-meadow-01838.herokuapp.com/API/v1/";
  
let params = "";
let resource = "";  
  
  // inventory display method
  function getAll() {
    resource = "herbs/";
    xhttp.open("GET", endPointRoot + resource, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let obj = JSON.parse(this.response)
        // console.log(obj[0]['status'], obj.length);
        if (obj.length == 0) {
          document.getElementById('herbDisplay').innerHTML = "Out of Order"
        } else {
          displayHerbs(obj);
        }
        document.getElementById("demo").innerHTML = this.responseText;
      }
    }
  }  

  
  // table generation for inventory display
  function displayHerbs(obj) {
    console.log(obj)
    let table = document.createElement('table');
    let th1 = document.createElement('th')
    let th2 = document.createElement('th')
    let th3 = document.createElement('th')

    let text1 = document.createTextNode('Herb')
    let text2 = document.createTextNode('Price')
    let text3 = document.createTextNode('In Stock')

    th1.appendChild(text1)
    th2.appendChild(text2)
    th3.appendChild(text3)

    table.appendChild(th1)
    table.appendChild(th2)
    table.appendChild(th3)

    for (let i = 0; i < obj.length; i++) {
      let tr = document.createElement('tr');
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');

      let text1 = document.createTextNode(obj[i]['herbName'])
      let text2 = document.createTextNode(obj[i]['herbPrice'])
      let text3 = document.createTextNode(obj[i]['status'])

      td1.appendChild(text1)
      td2.appendChild(text2)
      td3.appendChild(text3)

      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)

      table.appendChild(tr)
    }
    document.getElementById('herbDisplay').innerHTML = ''
    document.getElementById('herbDisplay').appendChild(table)
  }

  function retrieveID () {
    return event.target.id
  }