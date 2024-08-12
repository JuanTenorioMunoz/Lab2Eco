document.getElementById("fetch-button").addEventListener("click", fetchPosts);
const container = document.getElementById("data-container");

async function fetchPosts() {
  renderLoadingState();
  const userData = await fetchUsers();

  try {
    const response = await fetch("http://localhost:3004/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    renderData(data,userData);
  } catch (error) {
    renderErrorState();
    console.log(error);
  }
}

const fetchUsers = async () => {
  console.log("im doing something")
  try {
    const response = await fetch("http://localhost:3004/users")
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.log("SOS RE GIL" + error)
    renderErrorState();
  }
}

function renderErrorState() {
  container.innerHTML = ""; 
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  container.innerHTML = ""; 
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

function renderData(data, users) {
  container.innerHTML = ""; 

  if (data.length > 0) {
    data.forEach((item) => {
      const postContainer = document.createElement("div");
      const user = document.createElement("h3");
      const title = document.createElement("h1");
      const body = document.createElement("p");

      const foundUser = findUser(users, item);

      postContainer.className = "post-container";
      title.innerHTML = item.title;
      body.innerHTML = item.body;
      user.innerHTML = foundUser ? foundUser.name : "Unknown User";
      
      postContainer.appendChild(user);
      postContainer.appendChild(title);
      postContainer.appendChild(body);
      container.appendChild(postContainer);
    });
  }
}

const findUser = (userArray, userId) => {
  const found =  userArray.find((id) => id.id === userId.id)
  return found
}
