const filter = document.getElementById("filter");
const list = document.getElementById("list");
let USERS = [];

function toHTML(user) {
  return `
  <li class="list-item">${user.name}</li>
`;
}

function render(users = []) {
  if (users.length === 0) {
    list.innerHTML = "No matched users";
  } else {
    const html = users.map(toHTML).join("");
    list.innerHTML = html;
  }
}

async function start() {
  try {
    const resp = await fetch("base.json");
    const data = await resp.json();
    USERS = data;
    render(data);
  } catch (err) {
    list.style.color = "red";
    list.innerHTML = err.message;
  }
}

start();

filter.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();
  const filtredUsers = USERS.filter((user) =>
    user.name.toLowerCase().includes(value)
  );
  render(filtredUsers);
});
