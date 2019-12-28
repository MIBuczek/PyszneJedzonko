const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const list = document.querySelectorAll('.slider_item');

let variable = 0;

list[variable].classList.add('visible');

prev.addEventListener("click", function(){
    list[variable].classList.remove('visible');
        variable--;
    if(variable < 0){
        variable = list.length-1;
        }
    list[variable].classList.add('visible');
});

next.addEventListener("click", function(){
    list[variable].classList.remove('visible');
        variable++;
    if(variable >= list.length){
        variable = 0;
        }
    list[variable].classList.add('visible');
});