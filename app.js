let friends = [];
let originalNames = [];

/**
 * Agrega un nuevo amigo al arreglo de amigos.
 * Valida que el nombre no esté vacío antes de agregarlo y actualiza la lista visual.
 */
function addFriend() {
  let friendName = document.getElementById("amigo").value;

  if (friendName.trim() === "") {
    alert("Por favor, inserte un nombre");
  } else {
    let maskedFriendName = "*".repeat(friendName.length);
    friends.push(maskedFriendName);
    originalNames.push(friendName); // Guarda el nombre original
    document.querySelector("#amigo").value = "";
    updateFriendList();
  }
}

/**
 * Actualiza la visualización de la lista de amigos en el DOM, creando elementos <li> para cada amigo.
 */
function updateFriendList() {
  let friendsList = document.querySelector("#listaAmigos");
  friendsList.innerHTML = "";

  for (let index = 0; index < friends.length; index++) {
    const element = friends[index];

    let listItem = document.createElement("li");
    listItem.textContent = element;
    friendsList.appendChild(listItem);
  }
}

/**
 * Muestra una animación de ruleta antes de seleccionar un amigo al azar.
 */
function showSpinner(callback) {
  let spinnerContainer = document.createElement("div");
  spinnerContainer.id = "spinner-container";
  spinnerContainer.style.position = "fixed";
  spinnerContainer.style.top = "50%";
  spinnerContainer.style.left = "50%";
  spinnerContainer.style.transform = "translate(-50%, -50%)";
  spinnerContainer.style.zIndex = "1000";

  let spinner = document.createElement("img");
  spinner.src = "assets/ruleta.gif";
  spinner.alt = "Ruleta sorteando";
  spinner.id = "spinner";
  spinner.style.width = "300px";
  spinner.style.height = "300px";

  spinnerContainer.appendChild(spinner);
  document.body.appendChild(spinnerContainer);
  
  setTimeout(() => {
    document.body.removeChild(spinnerContainer);
    callback();
  }, 3000); // Simula el giro de la ruleta durante 3 segundos
}

/**
 * Selecciona y muestra aleatoriamente un amigo de la lista.
 * Asegura que la lista no esté vacía antes de realizar el sorteo.
 * Elimina el amigo seleccionado de la lista.
 */
function drawFriend() {
  let friendsCount = friends.length;
  if (friendsCount === 0) {
    alert("Por favor, inserte un nombre antes de sortear");
  } else {
    showSpinner(() => {
      let friendIndex = Math.floor(Math.random() * friendsCount);
      let selectedFriend = originalNames[friendIndex];
      let resultHTML = document.querySelector("#resultado");
      resultHTML.innerHTML = `Tu amigo secreto es: <strong>${selectedFriend}</strong>`; // Muestra el nombre real
      
      // Elimina el amigo seleccionado de las listas
      friends.splice(friendIndex, 1);
      originalNames.splice(friendIndex, 1);
      updateFriendList();
    });
  }
}
