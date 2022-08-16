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

fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => renderCard(toys));

const toyDiv = document.getElementById('toy-collection');
const newDiv = document.createElement('div');
toyDiv.appendChild(newDiv);
newDiv.className = 'card'

function renderCard(toys) {
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const pLikes = document.createElement('p')
  const btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.id = toys.id
  h2.textContent = toys.name;
  pLikes.textContent = toys.likes;
  img.src = toys.image;
  newDiv.append(h2, img, pLikes, btn)
}

renderCard(toys);
