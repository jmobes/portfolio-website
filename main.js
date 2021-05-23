const menu = document.querySelector(".hamburger");
const navigationList = document.querySelector(".navigation__list");
const menuEvent = menu.addEventListener("click", (e) => {
  navigationList.classList.toggle("hidden");
});
const navigationItem = document
  .querySelectorAll(".navigation__item")
  .forEach((item) => {
    item.addEventListener("click", (e) => {
      navigationList.classList.toggle("hidden");
    });
  });

const form = document.querySelector("#form");
let name = document.querySelector(".contact__name");

const formEvent = form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.querySelector(".contact__name").value;
  let email = document.querySelector(".contact__email").value;
  let message = document.querySelector(".contact__message").value;
  const formData = message ? { name, email, message } : { name, email };
  console.log("FORM DATA: ", formData);

  sendMail(formData);
});

const sendMail = async (mail) => {
  const options = {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify(mail),
  };
  try {
    const res = await fetch("http://localhost:5000", options);
    const contact = await res.json();
    console.log("CONTACT: ", contact);
  } catch (ex) {
    console.log("email failed");
  }
};
