// PLAN LIST!!

// HTML ELEMENTS
const planTable = document.querySelector(".tabel_list"); //tabela
const planInfo = document.querySelector(".lp_info"); // <p> info
const savedPlanns = JSON.parse(localStorage.getItem("Schedule")); // localStorage
const addPlanButton = document.querySelector(".fa-plus-square"); //nowy plan button
const newPlan2 = document.querySelector('.new_plan');
const planList = document.querySelector('.planList');

// FUNKCJA TWORZĄCA NOWY WIERSZ W TABELI
function addSchedule(id, nazwaPlanu, opisPlanu, week) {
  const plan_tr = `
        <tr>
        <td>${id}</td>
        <td>${nazwaPlanu}</td>
        <td>${opisPlanu}</td>
        <td>${week}</td>
        <td><i class="far fa-edit"></i><i class="far fa-trash-alt"></i></td>
        </tr>`;

  planTable.insertAdjacentHTML("beforeend", plan_tr);
};

// TWORZENIE LISTY PLANÓW
if (savedPlanns && savedPlanns.length > 0) {
  // Wyświetlanie powiadomienia w przypadku braku zapisanych planów
  planInfo.classList.add("invisible");
  planTable.classList.remove("invisible");
  // Wyświetlenie listy planów
  savedPlanns.forEach(plan => {
    addSchedule(plan.id, plan.title, plan.description, plan.weekNumber);
  });
  } else {
    planInfo.classList.remove("invisible");
    planTable.classList.add("invisible");
  }

// DODAWANIE NOWEGO PLANU BUTTON
addPlanButton.addEventListener("click", function() {
  planList.classList.add("invisible");
  newPlan2.classList.remove("invisible");
});

// NOWY PLAN TYGODNIA
const allPlanns2 = !localStorage.getItem("Schedule") ? [] : JSON.parse(localStorage.getItem("Schedule")); // zmienna przetrzymująca wszystkie plany w formie obiektu
const saveButton2 = document.querySelector(".save_btn"); // zapisz i wyjdz btn

// Konstruktor nowego planu
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
};

// Funkcja testowa
Schedule.prototype.showInfo = function() {
  console.warn("ID: ", this.id, "TYTUŁ: ", this.title, "TYDZIEN: ", this.weekNumber); // wyświetl id oraz tytuł
  console.warn("OPIS: ", this.description); // wyświetl opis
  console.warn("Poniedziałek:");
  this.monday.forEach(function(elem, i) {
    console.warn(i, elem); // wyświetl każdy poskiłek z poniedziałku
  });
};

// Zapisane przepisów w formie tabeli
function getRecipes(day) {
  return Array.from(day).map(item => item.value);
};

// Stowrzenie planu tygodnia
saveButton2.addEventListener("click", function() {
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

  const newSchedule = new Schedule(allPlanns2.length + 1, week, title, description);
  newSchedule.monday = getRecipes(newMonday);
  newSchedule.tuesday = getRecipes(newTuesday);
  newSchedule.wednesday = getRecipes(newWednesday);
  newSchedule.thursday = getRecipes(newThursday);
  newSchedule.friday = getRecipes(newFriday);
  newSchedule.saturday = getRecipes(newSaturday);
  newSchedule.sunday = getRecipes(newSunday);

  allPlanns2.push(newSchedule);
  //allPlanns[0].showInfo();
  localStorage.setItem("Schedule", JSON.stringify(allPlanns2));
  location.reload();
});

// OBSŁUGA PRZYCISKÓW EDIT I DELETE
document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelectorAll('.fa-edit');
  const deleteButton = document.querySelectorAll('.fa-trash-alt');

  
  editButton.forEach(item => {
    item.addEventListener('click', function () {
      const saveEditButton = document.querySelector(".edit_btn");
      const planTitle = document.querySelector(".np_title");
      const planName = document.getElementById('plan');
      const planDesc = document.getElementById('plan_description');
      const weekNr = document.getElementById('week');

      planList.classList.add("invisible");
      newPlan2.classList.remove("invisible");
      saveButton2.classList.add("invisible");
      saveEditButton.classList.remove("invisible");
      planTitle.innerText = 'Edytuj plan';

      const editID = findId(item);
      const editIndex = findIndex(allPlanns2, editID);

      planName.value = allPlanns2[editIndex].title;
      planDesc.value = allPlanns2[editIndex].description;
      weekNr.value = allPlanns2[editIndex].weekNumber;


  });

  }); //  koniec editbutton

  deleteButton.forEach(item => {
    item.addEventListener('click', function () {
      const deleteID = findId(item);
      const deleteIndex = findIndex(allPlanns2, deleteID);
      allPlanns2.splice(deleteIndex, 1);
      localStorage.setItem("Schedule", JSON.stringify(allPlanns2));
      location.reload();
    });

  }); // koniec deletebutton

});

//FUNKCJA ZNAJDUJĄCA ID KLIKNIĘTEGO ELEMENTU
function findId (item) {
  return item.parentElement.parentElement.firstElementChild.innerText;
};


// FUNKCJA ZNAJDUJACA INDEX KLIKNIĘTEGO ELEMENTU
function findIndex(array, value) {
  for (let i=0; i<array.length; i++) {
    if (array[i].id == value) {
      return i;
    }; }; };
