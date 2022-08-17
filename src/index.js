let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Fetch data
const getToys = () => {
  return fetch("http://localhost:3000/toys").then((res) => res.json());
};

// Render HTML
const renderToys = (toys) => {
  const container = document.querySelector("#toy-collection");

  toys.forEach((toy) => {
    const card = document.createElement("div");
    const name = document.createElement("h2");
    const image = document.createElement("img");
    const likes = document.createElement("p");
    const button = document.createElement("button");

    card.classList.add("card");
    image.classList.add("toy-avatar");
    button.classList.add("like-btn");
    button.id = toy.id;
    image.src = toy.image;

    name.textContent = toy.name;
    likes.textContent = toy.likes + " likes";
    button.textContent = "Like ❤️";

    button.addEventListener('click', e => {
      e.preventDefault();
      updateToy(toy.id, likes);
    });

    card.append(name, image, likes, button);
    container.appendChild(card);
  });
};

//Call functions
getToys().then((toys) => renderToys(toys));

/// Create the new toy
const createToy = () => {
  return {
    name: document.querySelector('input[name="name"]').value,
    image: document.querySelector('input[name="image"]').value,
    likes: 0
  };
};

// Post toy to server
const postToy = (toy) => {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {'Content-Type': "application/json", "Accept": "application/json"},
    body: JSON.stringify(toy)
  }).then((res) => res.json())
    .then((newToy) => renderToys([newToy]));
};

// Get submit button and add an event listener
const toyForm = document.querySelector('.add-toy-form');
toyForm.addEventListener("submit", e => {
  e.preventDefault();
  const newToy = createToy();

  if (newToy && newToy.name) {
    postToy(newToy);
  }
}); 

// Get the like button
const likeButtons = document.querySelectorAll('.like-btn');

// Function to increase likes by 1
const increaseLike = like => {
  return parseInt(like) + 1
};

// PATCH to update database
const updateToy = (id, likeElement) => {
  fetch(`http://localhost:3000/toys/${id}`, {
  method: 'PATCH',
  headers: {'Content-Type': "application/json", "Accept": "application/json"},
  body: JSON.stringify({likes: increaseLike(likeElement.textContent)}),
  }).then((response) => response.json())
    .then((like) => likeElement.textContent = like.likes + ' likes');
};
