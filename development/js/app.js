// user-name
const pulpit = document.querySelector(".pulpit");
const inputName = document.querySelector(".input_name");
const buttonName = document.querySelector(".app_welcome a.app_btn");

const headerUserName = document.querySelector("header p.user");
const welcomeSection = document.querySelector("div .app_welcome");
const invisibleElements = document.querySelectorAll(".display");

if (!localStorage.getItem("savedName")) {
  addInvisibleClass(invisibleElements);
} else {
  setStyles();
}

buttonName.addEventListener("click", function() {
  let userName = inputName.value;

  if (!localStorage.getItem("savedName")) {
    localStorage.setItem("savedName", userName);
    addInvisibleClass(invisibleElements);
    setStyles();
  } else {
    setStyles();
  }
});

function setStyles() {
  const name = localStorage.getItem("savedName");
  headerUserName.innerText = name;
  welcomeSection.style.display = "none";
}

function addInvisibleClass(list) {
  Array.from(list).forEach(function(e) {
    e.classList.toggle("closeItem");
  });
}

// import { SlowBuffer } from "buffer";
const closeButtons = document.querySelectorAll("#close_icon");
const notifications = document.querySelector(".notifications");
const addRecipe = document.getElementById("addRecipe_icon");
const addPlan = document.getElementById("addPlan_icon");
const info = document.getElementById("info");
const alert = document.getElementById("alert");
const success = document.getElementById("success");

for (button of closeButtons) {
  button.addEventListener("click", function() {
    console.log("you clicked me!");
    this.parentElement.style.display = "none";
    notifications.style.display = "block";

    if (
      info.style.display === "none" &&
      alert.style.display === "none" &&
      success.style.display === "none"
    ) {
      notifications.style.display = "none";
    }
  });
}

addPlan.addEventListener("click", function() {
  addInvisibleClass(invisibleElements);
  newPlan.classList.remove("invisible");
});

// Adding new recipe
// stworzona tablica z obiekatami które przechwóją recepture posiłku
const mealRecipe = !localStorage.getItem("MealRecipe")
  ? []
  : JSON.parse(localStorage.getItem("MealRecipe"));

// niezbedne selektory
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
const saveBtn = document.getElementById("save");
const weeklePlan = document.querySelector(".weekly_plan");
const topContiner = document.querySelector(".top_container");

// pokazywanie i chowanie panelu dodawania posiłka
addRecipe.addEventListener("click", function() {
  pannelRecipe.classList.remove("hidden");
  welcomeSection.classList.add("hidden");
  weeklePlan.classList.add("hidden");
  topContiner.classList.add("hidden");
});

//tworzenie instrukjci przez dodawanie kolejnego li
// dodatkowy przycisk do usuwania instukcji lub edytowania
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

  mealRecipe.push(newRecipe);
  // mealRecipe[0].showInfo();

  localStorage.setItem("MealRecipe", JSON.stringify(mealRecipe));
  pannelRecipe.classList.add("hidden");
  weeklePlan.classList.remove("hidden");
  topContiner.classList.remove("hidden");

  recipeName.value = "";
  textDescription.value = "";
  inputRecipe = "";
  inputProduct = "";
  instuctionList = [];
  componentList = [];
});

// Nowy plan tygodnia
const allPlanns = !localStorage.getItem("Schedule")
  ? []
  : JSON.parse(localStorage.getItem("Schedule")); // zmienna przetrzymująca wszystkie plany w formie obiektu
const saveButton = document.querySelector(".np_btn"); // zapisz i wyjdz btn
const newPlan = document.querySelector(".new_plan"); // pulpit z dodawaniem nowego planu

// konstruktor nowego planu
function Schedule(id, weekNumber, title, description) {
  this.id = id; // id przepisu
  this.title = title; // nazwa planu
  this.description = description; // opis planu
  this.weekNumber = weekNumber; // numer tygodnia do którego przypisany jest plan
  this.monday = []; // plan na poniedzialek
  this.tuesday = []; // plan na wtorek
  this.wednesday = []; // plan na środę
  this.thursday = []; // plan na czwartek
  this.friday = []; // plan na piątek
  this.saturday = []; // plan na sobotę
  this.sunday = []; // plan na niedzielę
}

Schedule.prototype.showInfo = function() {
  console.warn(
    "ID: ",
    this.id,
    "TYTUŁ: ",
    this.title,
    "TYDZIEN: ",
    this.weekNumber
  ); // wyświetl id oraz tytuł
  console.warn("OPIS: ", this.description); // wyświetl opis
  console.warn("Poniedziałek:");
  this.monday.forEach(function(elem, i) {
    console.warn(i, elem); // wyświetl każdy poskiłek z poniedziałku
  });
};

function getRecipes(day) {
  return Array.from(day).map(item => item.value);
}

saveButton.addEventListener("click", function() {
  const title = document.getElementById("plan").value;
  const description = document.getElementById("plan_description").value;
  const week = document.getElementById("week").value;
  const newMonday = document.querySelectorAll(".new_monday select");
  const newTuesday = document.querySelectorAll(".new_tuesday select");
  const newWednesday = document.querySelectorAll(".new_wednesday select");
  const newThursday = document.querySelectorAll(".new_thursday select");
  const newFriday = document.querySelectorAll(".new_friday select");
  const newSaturday = document.querySelectorAll(".new_saturday select");
  const newSunday = document.querySelectorAll(".new_sunday select");

  const newSchedule = new Schedule(
    allPlanns.length + 1,
    week,
    title,
    description
  );
  newSchedule.monday = getRecipes(newMonday);
  newSchedule.tuesday = getRecipes(newTuesday);
  newSchedule.wednesday = getRecipes(newWednesday);
  newSchedule.thursday = getRecipes(newThursday);
  newSchedule.friday = getRecipes(newFriday);
  newSchedule.saturday = getRecipes(newSaturday);
  newSchedule.sunday = getRecipes(newSunday);

  allPlanns.push(newSchedule);
  //allPlanns[0].showInfo();
  localStorage.setItem("Schedule", JSON.stringify(allPlanns));
  newPlan.classList.add("invisible");
  addInvisibleClass(invisibleElements);
});
