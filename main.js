let input = document.querySelector("input[type=text]");
let btn = document.querySelector(".add");
let products = document.querySelector(".products");
let arr = [];

if (localStorage.getItem("array")) {
  arr = JSON.parse(localStorage.getItem("array"));
}

getData();

btn.addEventListener("click", () => {
  if (input.value != "") {
    addToArr(input.value);
  } else {
    alert("please add product name first ");
  }
  input.value = "";
});

// add data to array
function addToArr(val) {
  let item = {
    id: Date.now(),
    val: input.value,
  };
  arr.push(item);

  addToLocal(arr);

  addToPage(arr);
}

// add data to local Storage
function addToLocal(arr) {
  localStorage.setItem("array", JSON.stringify(arr));
}

// add data to page
function addToPage(arr) {
  products.innerHTML = "";
  arr.forEach((el) => {
    products.innerHTML += `
            <div class="product" data-id="${el.id}">
                <p>${el.val}</p>
                <button onclick="deleteEl(this)" class="del">Delete</button>
            </div>
    `;
  });
}

// delete item
function deleteEl(el) {
  el.parentElement.remove();
  deleteFromArr(el.parentElement.getAttribute("data-id"));
}

function deleteFromArr(id) {
  arr = arr.filter((el) => el.id != id);
  console.log(arr);

  localStorage.setItem("array", JSON.stringify(arr));
}

function getData() {
  let data = JSON.parse(localStorage.getItem("array"));
  if (data) {
    addToPage(data);
  }
}
