function getUsers() {
  fetch("http://localhost:8000/api/users/")
    .then((response) => response.json())
    .then((users) => {
      const userList = document.getElementById("user-list");
      userList.innerHTML = "";
      users.forEach((user) => {
        const listItem = document.createElement("li");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        editButton.textContent = "Editar";
        editButton.dataset.userId = user.id;
        editButton.onclick = () => {
          document.getElementById("update-user-id").value = user.id;
          document.getElementById("update-name").value = user.name;
          document.getElementById("update-favorite-color").value =
            user.favorite_color;
          document.getElementById("update-address").value = user.address;
          document.getElementById("update-email").value = user.email;
          document.getElementById("update-pet-name").value = user.pet_name;
        };

        deleteButton.textContent = "Deletar";
        deleteButton.dataset.userId = user.id;
        deleteButton.onclick = () => {
          const confirmDelete = confirm(
            `Tem certeza que deseja excluir o usuário ${user.name}?`
          );
          if (confirmDelete) {
            deleteUser(user.id);
          }
        };

        listItem.textContent = `${user.name} | ${user.favorite_color} | ${user.address} | ${user.email} | ${user.pet_name} | `;
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        userList.appendChild(listItem);
      });
    })
    .catch((error) => console.error(error));
}

window.onload = function () {
  getUsers();
};

document
  .getElementById("create-user-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = {
      name: document.getElementById("create-name").value,
      favorite_color: document.getElementById("create-favorite-color").value,
      address: document.getElementById("create-address").value,
      email: document.getElementById("create-email").value,
      pet_name: document.getElementById("create-pet-name").value,
    };

    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8000/api/users/");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
      if (request.status === 201) {
        alert("Usuário criado com sucesso!");
        document.getElementById("create-user-form").reset();
        getUsers();
      } else {
        alert("Ocorreu um erro ao criar o usuário.");
      }
    };
    request.send(JSON.stringify(formData));
  });

document
  .getElementById("update-user-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = {
      name: document.getElementById("update-name").value,
      favorite_color: document.getElementById("update-favorite-color").value,
      address: document.getElementById("update-address").value,
      email: document.getElementById("update-email").value,
      pet_name: document.getElementById("update-pet-name").value,
    };
    var userId = document.getElementById("update-user-id").value;
    var updateUrl = "http://localhost:8000/api/users/" + userId + "/";
    var request = new XMLHttpRequest();

    request.open("PUT", updateUrl);

    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
      if (request.status === 200) {
        alert("Usuário atualizado com sucesso!");
        document.getElementById("update-user-form").reset();

        getUsers();
      } else {
        alert("Ocorreu um erro ao atualizar o usuário.");
      }
    };

    request.send(JSON.stringify(formData));
  });
