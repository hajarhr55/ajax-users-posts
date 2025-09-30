function users() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/users");
  request.responseType = "json";
  request.setRequestHeader("Accept", "application/json");
  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      let users = request.response.slice(0, 8);
      let usersContainer = document.getElementById("btns");
      for (let user of users) {
        let div = document.createElement("div");
        div.className = "user";
        div.innerHTML = `${user.name} <br> ${user.email}`;
        div.addEventListener("click", function () {
          post(user.id);
          userselected(this);
        });
        usersContainer.appendChild(div);
      }
    }
  };
}
users();

function post(id) {
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  request.responseType = "json";
  request.setRequestHeader("Accept", "application/json");
  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      let posts = request.response;
      let html = "";
      for (let post of posts) {
        html += `
                    <div class="container-post">
                      <div class="post">${post.title}
                        <hr></hr>
                        ${post.body}
                      </div>
                    </div>
             `;
        document.getElementById("content").innerHTML = html;
      }
    }
  };
  document.getElementById("content").innerHTML = "";
}

function userselected(element) {
  let selectedElement = document.getElementsByClassName("selected");
  for (let el of selectedElement) {
    el.classList.remove("selected");
  }
  element.classList.add("selected");
}
