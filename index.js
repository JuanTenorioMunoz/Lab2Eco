document.getElementById("fetch-button").addEventListener("click", fetchPosts);

async function fetchPosts() {
  renderLoadingState();
  try {
    const response = await fetch("http://localhost:3004/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    renderData(data);
  } catch (error) {
    renderErrorState();
  }
}

const fetchUsers = () => {
}

function renderErrorState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 

  if (data.length > 0) {
    data.forEach((item) => {
      const postContainer = document.createElement("div");
      const title = document.createElement("h1")
      const body = document.createElement("p")

      postContainer.className = "post-container";
      title.innerHTML = item.title;
      body.innerHTML = item.body;
      
      postContainer.appendChild(title)
      postContainer.appendChild(body)
      container.appendChild(postContainer);
    });
  }
}
