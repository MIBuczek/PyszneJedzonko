const clickedSection = document.querySelector("li.app_menuItem:nth-child(2)");
clickedSection.style.borderColor = "#FF6600";
clickedSection.style.position = "relative";
let listOfRecipes = !localStorage.getItem("MealRecipe")
  ? []
  : JSON.parse(localStorage.getItem("MealRecipe"));
const saveEdiTBtn = document.getElementById("edit");
const saveBtn = document.getElementById("save");
const savedName = localStorage.getItem("savedName");
document.querySelector("header p.user").innerText = savedName;

const newElement = document.createElement("div");
newElement.classList.add("orange_arrow");
newElement.innerText = ">";
clickedSection.querySelector(".app_menuLink").appendChild(newElement);

//pobieranie i dodawanie przepisu z localStorage

for (let i = 0; i < listOfRecipes.length; i++) {
  const newRow = document.createElement("tr");
  const newColId = document.createElement("td");
  const newColName = document.createElement("td");
  const newColDescription = document.createElement("td");
  const newColButtons = document.createElement("td");
  const newButtonEdit = document.createElement("button");
  const newButtonDelete = document.createElement("button");
  const parent = document.querySelector("tbody");

  let recipe = listOfRecipes[i];
  let id = i;
  let name = recipe.name;
  let description = recipe.descripe;

  newColId.innerText = id;
  newColName.innerText = name;
  newColDescription.innerText = description;
  newColButtons.classList.add("buttons");
  newColId.classList.add("recipe_id");
  newButtonEdit.classList.add("edit_recipe");
  newButtonDelete.classList.add("delete_recipe");

  parent.appendChild(newRow);
  parent.lastElementChild.appendChild(newColId);
  parent.lastElementChild.appendChild(newColName);
  parent.lastElementChild.appendChild(newColDescription);
  parent.lastElementChild.appendChild(newColButtons);
  parent.lastElementChild.lastElementChild.appendChild(newButtonEdit);
  parent.lastElementChild.lastElementChild.appendChild(newButtonDelete);
}

let buttons = document.querySelectorAll("table td.buttons");
Array.from(buttons).forEach(function(button) {
  const deleteButton = button.lastElementChild;
  const editButton = button.firstElementChild;

  deleteButton.addEventListener("click", function() {
    let recipeIdToDelete = this.parentNode.parentNode.children[0].innerText;
    let deletedElement = delateFromLocal(listOfRecipes, recipeIdToDelete);

    window.localStorage.removeItem("MealRecipe");
    window.localStorage.setItem("MealRecipe", JSON.stringify(deletedElement));
    location.reload();
    button.parentElement.remove();
  });

  editButton.addEventListener("click", function() {
    planList.classList.add("hidden");
    saveBtn.classList.add("hidden");
    editPannel.classList.remove("hidden");
    saveEdiTBtn.classList.remove("hidden");
    let recipeIdToEdit = this.parentNode.parentNode.children[0].innerText;
    let recipeToEdit = listOfRecipes[recipeIdToEdit];

    editRecipe(recipeIdToEdit, recipeToEdit);

    saveEdiTBtn.addEventListener("click", function() {
      const nameRecipeEdited = recipeName.value;
      const descriptionRecipeEdited = textDescription.value;
      const allLiInstructionsEdited = instuctionList.querySelectorAll("li");
      const allLiComponentsEdited = componentList.querySelectorAll("li");

      const editRecipeMeal = new Recipe(
        nameRecipeEdited,
        descriptionRecipeEdited
      );
      editRecipeMeal.instruction = instructionList(allLiInstructionsEdited);
      editRecipeMeal.products = instructionList(allLiComponentsEdited);

      let doneEdition = editFromLocal(
        listOfRecipes,
        recipeIdToEdit,
        editRecipeMeal
      );
      window.localStorage.removeItem("MealRecipe");
      window.localStorage.setItem("MealRecipe", JSON.stringify(doneEdition));
      location.reload();
    });
  });
});

function delateFromLocal(local, index) {
  let lockaArray = local;
  lockaArray.splice(index, 1);
  return lockaArray;
}

function editFromLocal(local, index, obiect) {
  let lockaArray = local;
  lockaArray.splice(index, 1, obiect);
  return lockaArray;
}
// NEW RECIPE FROM LIST RECIPE PANNEL
// Niezbedne selektory

const newRecipe = document.querySelector("#add_recipe");
const pannelRecipe = document.querySelector(".recipe_pannels");
let recipeName = document.querySelector(".title_newrecipe input");
let textDescription = document.querySelector(".title_newrecipe textarea");

let inputRecipe = document.getElementById("recipe-input");
let inputProduct = document.getElementById("product-input");
let instuctionList = document.getElementById("instruction-list");
let componentList = document.getElementById("component-list");
const recipeBtn = document.getElementById("recipe-btn");
const productBtn = document.getElementById("product-btn");
const weeklePlan = document.querySelector(".weekly_plan");
const topContiner = document.querySelector(".top_container");
const addRecipe = document.getElementById("addRecipe_icon");

addRecipe.addEventListener("click", function() {
  planList.classList.add("hidden");
  editPannel.classList.remove("hidden");
  saveEdiTBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
  headerTitle.innerText = "Nowy przepisu";
});

recipeBtn.addEventListener("click", function(e) {
  e.preventDefault();
  let newTask = document.createElement("li");
  let newTaskText = document.createElement("span");
  let delButton = document.createElement("button");
  let editButton = document.createElement("button");

  delButton.classList.add("delete");
  editButton.classList.add("edit");
  newTaskText.innerHTML = inputRecipe.value;

  delButton.addEventListener("click", () => {
    instuctionList.removeChild(newTask);
  });

  editButton.addEventListener("click", e => {
    const li = e.target.parentNode;
    if (li.firstChild.tagName.toLowerCase() == "span") {
      const span = li.firstChild;
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
    } else {
      const input = li.firstChild;
      const span = document.createElement("span");
      span.innerText = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
    }
  });
  newTask.appendChild(newTaskText);
  newTask.appendChild(editButton);
  newTask.appendChild(delButton);
  instuctionList.appendChild(newTask);

  inputRecipe.value = "";
});

//tworzenie listy poduktów przez dodawanie kolejnego li
// dodatkowy przycisk do usuwania instukcji lub edytowania
productBtn.addEventListener("click", function(e) {
  e.preventDefault();
  let newTask = document.createElement("li");
  let newTaskText = document.createElement("span");
  let delButton = document.createElement("button");
  let editButton = document.createElement("button");

  delButton.classList.add("delete");
  editButton.classList.add("edit");
  newTaskText.innerHTML = inputProduct.value;

  delButton.addEventListener("click", () => {
    componentList.removeChild(newTask);
  });

  editButton.addEventListener("click", e => {
    const li = e.target.parentNode;
    if (li.firstChild.tagName.toLowerCase() == "span") {
      const span = li.firstChild;
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
    } else {
      const input = li.firstChild;
      const span = document.createElement("span");
      span.innerText = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
    }
  });

  newTask.appendChild(newTaskText);
  newTask.appendChild(editButton);
  newTask.appendChild(delButton);
  componentList.appendChild(newTask);

  inputProduct.value = "";
});

//funkcja pomocnica do otrzymywania tablicy z wartosciami z li
function instructionList(list) {
  return Array.from(list).map(item => item.innerText);
}
function Recipe(name, description, instruction, products) {
  this.name = name;
  this.descripe = description;
  this.instruction = instruction;
  this.products = products;
}

//funkcja sprawdzaja czy wszytsko chula w obiecie
Recipe.prototype.showInfo = function() {
  console.warn(
    "Name: ",
    this.name,
    "Description: ",
    this.descripe,
    "Instruction: ",
    this.instruction,
    "Products: ",
    this.products
  );
};

//przycisk który po tworzy nowa recepte, przesyła ja do servera i chowa całe menu
saveBtn.addEventListener("click", function(e) {
  const nameRecipe = recipeName.value;
  const descriptionRecipe = textDescription.value;
  const allLiInstructions = instuctionList.querySelectorAll("li");
  const allLiComponents = componentList.querySelectorAll("li");

  const newRecipe = new Recipe(nameRecipe, descriptionRecipe);
  newRecipe.instruction = instructionList(allLiInstructions);
  newRecipe.products = instructionList(allLiComponents);

  listOfRecipes.push(newRecipe);

  window.localStorage.removeItem("MealRecipe");
  localStorage.setItem("MealRecipe", JSON.stringify(listOfRecipes));
  location.reload();

  planList.classList.remove("hidden");
  editPannel.classList.add("hidden");

  recipeName.value = "";
  textDescription.value = "";
  inputRecipe = "";
  inputProduct = "";
  instuctionList = [];
  componentList = [];
});

// MIB EDITING

const planList = document.querySelector(".app_pulpit");
const editPannel = document.querySelector(".edit_pannel");
let headerTitle = document.querySelector(".recipe_pannel-header h2");

function productArray(index) {
  let productList = listOfRecipes[index].products;
  return productList;
}

function instructionArray(index) {
  let instructionList = listOfRecipes[index].instruction;
  return instructionList;
}

function nameString(index) {
  let nameEdited = listOfRecipes[index].name;
  return nameEdited;
}

function descriptionString(index) {
  let descriptionEdited = listOfRecipes[index].descripe;
  return descriptionEdited;
}

function editingLi(array, parent) {
  for (element of array) {
    let newTask = document.createElement("li");
    let newTaskText = document.createElement("span");
    let delButton = document.createElement("button");
    let editButton = document.createElement("button");

    delButton.classList.add("delete");
    editButton.classList.add("edit");
    newTaskText.innerHTML = element;

    delButton.addEventListener("click", () => {
      instuctionList.removeChild(newTask);
    });

    editButton.addEventListener("click", e => {
      const li = e.target.parentNode;
      if (li.firstChild.tagName.toLowerCase() == "span") {
        const span = li.firstChild;
        const input = document.createElement("input");
        input.type = "text";
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
      } else {
        const input = li.firstChild;
        const span = document.createElement("span");
        span.innerText = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
      }
    });

    newTask.appendChild(newTaskText);
    newTask.appendChild(editButton);
    newTask.appendChild(delButton);
    parent.appendChild(newTask);
  }
}

function editRecipe(index, local) {
  headerTitle.innerText = "Edycja przepisu";
  let productList = productArray(index);
  let instructionList = instructionArray(index);
  let nameEdited = nameString(index);
  let descriptionEdited = descriptionString(index);

  editingLi(productList, componentList);

  editingLi(instructionList, instuctionList);

  recipeName.value = nameEdited;
  textDescription.value = descriptionEdited;
}
console.log(listOfRecipes);
