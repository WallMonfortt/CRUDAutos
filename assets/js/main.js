//Array cars
let carsList = [];

//Create or update

let updateFlag = false;
let updateIndex = null;

let carListUI = document.getElementById("carList");
const carForm = document.getElementById("addCar")

let localCarsList = JSON.parse(localStorage.getItem("carStorageArray"));

const carStorage = () => {
    if (typeof Storage !== "undefined") {
        localStorage.setItem("carStorageArray", JSON.stringify(carsList));
        renderList();
    } else {
        alert("Tu navegador no es compatible con este almacenamiento");
    }
};

const renderList = () => {
    carListUI.innerHTML = "";
    let carListArray = JSON.parse(localStorage.getItem("carStorageArray"));
    if (carListArray === null) {
        carListArray = [];
    } else {
        carListArray.forEach((car, index) => {
            const carItemDiv = document.createElement("div");
            carItemDiv.setAttribute("class", "carItem");
            carListUI.appendChild(carItemDiv);

            const carInfoDiv = document.createElement("div");
            carInfoDiv.setAttribute("class", "carInfo");
            carItemDiv.appendChild(carInfoDiv);

            const modelCarDiv = document.createElement("h3");
            const brandCarDiv = document.createElement("h3");
            const yearCarDiv = document.createElement("h3");
            const colorCarDiv = document.createElement("h3");
            modelCarDiv.innerText = `${car.model}`;
            brandCarDiv.innerText = `${car.brand}`;
            yearCarDiv.innerText = `${car.year}`;
            colorCarDiv.innerText = `${car.color}`;

            carInfoDiv.appendChild(modelCarDiv);
            carInfoDiv.appendChild(brandCarDiv);
            carInfoDiv.appendChild(yearCarDiv);
            carInfoDiv.appendChild(colorCarDiv);

            //Buttons update & delete

            const actionButtons = document.createElement("div");
            actionButtons.setAttribute("class", "actions");
            carItemDiv.append(actionButtons);

            const updateBtn = document.createElement("button");

            updateBtn.setAttribute("class", "update");
            updateBtn.addEventListener("click", () => {
                updateCar(index, car);
                overlay.classList.add('active');
            });
            updateBtn.setAttribute("id", "update");
            updateBtn.innerText = "Edit";

            const deleteBtn = document.createElement("button");

            //class, id & addEventListener
            deleteBtn.setAttribute("class", "delete");
            deleteBtn.addEventListener("click", () => deleteCar(index));
            deleteBtn.innerHTML = "Delete";
            deleteBtn.setAttribute("id", "delete");

            actionButtons.appendChild(updateBtn);
            actionButtons.appendChild(deleteBtn);
        });
    }
};

const createUpdateCar = event => {
    event.preventDefault();
    if (updateFlag) {
        let updateCar = {
            model: document.getElementById("model").value,
            brand: document.getElementById("brand").value,
            year: document.getElementById("year").value,
            color: document.getElementById("color").value
        };
        carsList[updateIndex] = updateCar;
        updateFlag = false;
        updateIndex = null;
        carStorage();
        renderList();
    } else {
        let car = {
            model: document.getElementById("model").value,
            brand: document.getElementById("brand").value,
            year: document.getElementById("year").value,
            color: document.getElementById("color").value
        };
        if (localCarsList === null) {
            localCarsList = [];
        }
        carsList.push(...localCarsList, car);
        carStorage();
        renderList();
    }
    carForm.reset();
};

const updateCar = (index, car) => {
    model: document.getElementById("model").value = car.model;
    brand: document.getElementById("brand").value = car.brand;
    year: document.getElementById("year").value = car.year;
    color: document.getElementById("color").value = car.color;
    updateFlag = true;
    updateIndex = index;
    carStorage();
    renderList();
}

const deleteCar = index => {
    carsList = JSON.parse(localStorage.getItem("carStorageArray"));
    carsList.splice(index, 1);
    carStorage();
    renderList();
};

carForm.addEventListener("submit", createUpdateCar);
document.addEventListener("DOMContentLoaded",renderList);
//Add listener for overlay

 //Add event listener start & close button
 document.querySelector('#addCarBtn').addEventListener('click', () => {
    overlay.classList.add('active');
});
 
 document.querySelector('#btn-close-popup').addEventListener('click', () => {
    overlay.classList.remove('active');
});