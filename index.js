const container = document.getElementById("data-container");
const title = document.getElementById("inputTitle");
const body = document.getElementById("inputBody");

let activeUser = {
  userName: "Tommy",
  id: 1,
};

let newPost = {
  title: "",
  body: "",
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
    renderData(data, userData);
  } catch (error) {
    renderErrorState();
    console.log(error);
  }
}

const fetchUsers = async () => {
  console.log("Fetching users...");
  try {
    const response = await fetch("http://localhost:3004/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    renderErrorState();
  }
};

function renderErrorState() {
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

function renderData(data, userData) {
  container.innerHTML = "";

  if (data.length > 0) {
    data.forEach((item) => {
      const postContainer = document.createElement("div");
      const user = document.createElement("h3");
      const title = document.createElement("h1");
      const body = document.createElement("p");

      const foundUser = findUser(userData, item);

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

const findUser = (userArray, post) => {
  return userArray.find((userInfo) => userInfo.id === post.userId.toString());
};

const addPost = async () => {
  const currentId = activeUser.id;

  const post = {
    title: newPost.title,
    body: newPost.body,
    userId: currentId,
  };

  try {
    const response = await fetch("http://localhost:3004/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
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

const inputTitle = () => {
  newPost.title = title.value;
  console.log("POST" + newPost.title)
}

const inputBody= () => {
  newPost.body = body.value;
  console.log("POST" + newPost.body)
}

title.addEventListener('input', inputTitle)
body.addEventListener('input', inputBody)
document.getElementById("post-button").addEventListener("click", addPost);

fetchPosts();

