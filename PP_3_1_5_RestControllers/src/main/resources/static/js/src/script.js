let editButtonItems;
fillUserTable();
fillAdminTable();

function fillUserTable() {
    fetch('http://localhost:8080/api/users/current')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.getElementById("#user_table_row").innerHTML =
                "<td>" + data.id + "</td>" +
                "<td>" + data.name + "</td>" +
                "<td>" + data.surname + "</td>" +
                "<td>" + data.age + "</td>" +
                "<td>" + data.email + "</td>" +
                "<td>" + data.roles + "</td>";
            document.getElementById("header_email").innerText = data.email;
            document.getElementById("header_roles").innerText = "with roles " + data.roles;
            if (!data.roles.includes('ADMIN')) {
                document.getElementById('v-pills-admin-tab').remove();
                document.getElementById('v-pills-admin').remove();
                document.getElementById('v-pills-user-tab').classList.add('active');
                document.getElementById('v-pills-user').classList.add('show', 'active');
            }
            if (!data.roles.includes('USER')) {
                document.getElementById('v-pills-user-tab').remove();
                document.getElementById('v-pills-user').remove();
            }
        });
}

async function fillAdminTable() {
    let innerHTML = "";
    await fetch('http://localhost:8080/api/users/')
        .then((response) =>
            response.json())
        .then((data) => {
                data.forEach((element) => {
                    let tableRow =
                        "<tr>" + "<td>" + element.id + "</td>" +
                        "<td>" + element.name + "</td>" +
                        "<td>" + element.surname + "</td>" +
                        "<td>" + element.age + "</td>" +
                        "<td>" + element.email + "</td>" +
                        "<td>" + element.roles + "</td>" +
                        '<td><a class="btn btn-primary edit-button" data-bs-toggle="modal" data-bs-target="#editModal" button-id="' + element.id + '">Edit</a></td>' +
                        '<td><a class="btn btn-danger delete-button" data-bs-toggle="modal" data-bs-target="#deleteModal" button-id="' + element.id + '">Delete</a></td>';
                    innerHTML += tableRow;
                })

                document.getElementById("admin_table_body").innerHTML = innerHTML;
            }
        )


    let editForm = document.getElementById('edit_user_form');
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let id = document.getElementById('edit_user_id_input').value;
        let name = document.getElementById("edit_user_name").value;
        let surname = document.getElementById("edit_user_surname").value;
        let age = document.getElementById("edit_user_age").value;
        let email = document.getElementById("edit_user_email").value;
        let password = document.getElementById("edit_user_password").value;
        let rolesEdit = "";
        Array.prototype.forEach.call(document.getElementById("edit_user_roles").selectedOptions, element => {
            rolesEdit += " " + element.value;
        });
        fetch('http://localhost:8080/api/users/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify({
                id: id,
                name: name,
                surname: surname,
                age: age,
                email: email,
                password: password,
                roles: rolesEdit
            })
        })
            .then(function (res) {
                fillAdminTable();
                clearEditModal();
            })
            .catch(function (res) {
                console.log(res)
            })
    })


    let closeButtonItems = document.querySelectorAll('.btn-edit-form-close');
    for (let btn of closeButtonItems) {
        btn.addEventListener("click", function (event) {
            clearEditModal();
        })
    }

    editButtonItems = document.querySelectorAll('.edit-button');
    for (let btn of editButtonItems) {
        btn.addEventListener("click", function (event) {
            let buttonId = event.target.getAttribute("button-id");
            fillEditModal(buttonId);
        })
    }
    let deleteButtonItems = document.querySelectorAll('.delete-button');
    for (let btn of deleteButtonItems) {
        btn.addEventListener("click", function (event) {
            let buttonId = event.target.getAttribute("button-id");
            fillDeleteModal(buttonId);
        })
    }

    let deleteForm = document.getElementById('delete-user-form');
    deleteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let id = document.getElementById('idDeleteInput').value;

        fetch('http://localhost:8080/api/users/' + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE"
        }).then(function (res) {
            fillAdminTable();
            clearDeleteModal();
        })
            .catch(function (res) {
                console.log(res)
            })
    })


}

function clearEditModal() {
    document.getElementById('edit_user_form').reset();
    let options = document.getElementById('edit_user_roles').options;
    for (let option of options) {
        option.selected = false;
    }
}

function clearDeleteModal() {
    document.getElementById('delete-user-form').reset();
    let options = document.getElementById('delete_user_roles').options;
    for (let option of options) {
        option.selected = false;
    }
}


let newUserForm = document.getElementById("new_user_form");
newUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = document.getElementById("new_user_name_input").value;
    let surname = document.getElementById("new_user_surname_input").value;
    let age = document.getElementById("new_user_age_input").value;
    let email = document.getElementById("new_user_email_input").value;
    let password = document.getElementById("new_user_password_input").value;
    let roles = "";
    Array.prototype.forEach.call(document.getElementById("new_user_roles_input").selectedOptions, element => {
        roles += " " + element.value;
    });
    fetch('http://localhost:8080/api/users/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            id: 0,
            name: name,
            surname: surname,
            age: age,
            email: email,
            password: password,
            roles: roles
        })
    })
        .then(function (res) {
            fillAdminTable();
        })
        .catch(function (res) {
            console.log(res)
        })

    document.getElementById("new_user").classList.remove("show", "active");
    document.getElementById("userinfo").classList.add("show", "active");
    document.getElementById("show-new-user-form").classList.remove("active");
    document.getElementById("show-users-table").classList.add("active");
    newUserForm.reset();
})


function fillEditModal(buttonId) {
    let URL = 'http://localhost:8080/api/users/' + buttonId;
    fetch(URL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.getElementById('edit_user_name').value = data.name;
            document.getElementById('edit_user_password').value = data.password;
            document.getElementById('edit_user_surname').value = data.surname;
            document.getElementById('edit_user_age').value = data.age;
            document.getElementById('edit_user_email').value = data.email;
            document.getElementById('edit_user_id_input').value = data.id;
            if (data.roles.includes("ADMIN")) {
                document.getElementById("option_admin").setAttribute("selected", "true");
            }
            if (data.roles.includes("USER")) {
                document.getElementById("option_user").setAttribute("selected", "true");
            }

        });
}

function fillDeleteModal(buttonId) {
    let URL = 'http://localhost:8080/api/users/' + buttonId;
    fetch(URL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.getElementById('nameDeleteInput').value = data.name;
            document.getElementById('surnameDeleteInput').value = data.surname;
            document.getElementById('ageDeleteInput').value = data.age;
            document.getElementById('emailDeleteInput').value = data.email;
            document.getElementById('passwordDeleteInput').value = data.password;
            document.getElementById('idDeleteInput').value = data.id;
            if (data.roles.includes("ADMIN")) {
                document.getElementById("option_admin_delete").setAttribute("selected", "true");
            }
            if (data.roles.includes("USER")) {
                document.getElementById("option_user_delete").setAttribute("selected", "true");
            }

        });
}