document.getElementById("fetch-button").addEventListener("click", fetchPosts);
const container = document.getElementById("data-container");

let activeUser = {
  userName: "",
  id:"1",
}

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
    console.log(error)
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

const addPost = async () => {
  const currentUser = activeUser.userName;
  const currentId = activeUser.id;

  const newPost = {
    title: "New Post Title", 
    body: "This is the content of the new post.", 
    userId: currentId,
  };

  try {
    const response = await fetch("http://localhost:3004/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      throw new Error("Failed to post data to the server.");
    }

    const result = await response.json();
    console.log(result);

    fetchPosts();
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("post-button").addEventListener("click", addPost)
