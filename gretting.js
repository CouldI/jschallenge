//jshint esversion:6

const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";


saveName = (text) => {
    localStorage.setItem(USER_LS, text);
};    

handlerSubmit = (event) => {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
};    

askForName = () => {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handlerSubmit);
};

paintGreeting = (text) => {
    form.classList.remove(SHOWING_CN);
    greetings.classList.add(SHOWING_CN);
    greetings.innerText = `Hello ${text}`;
};

loadName = () => {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }

};


function init() {
    loadName();
}

init();