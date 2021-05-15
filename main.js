const form = document.querySelector("#form");
let name = document.querySelector(".contact__name");

const formEvent = form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.querySelector(".contact__name").value;
  let email = document.querySelector(".contact__email").value;
  let message = document.querySelector(".contact__message").value;
  const formData = message ? { name, email, message } : { name, email };
  console.log("FORM DATA: ", formData);
});

const sendMail = (mail) => {};
