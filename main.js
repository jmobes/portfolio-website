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
const formEvent = form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.querySelector(".contact__name").value;
  let email = document.querySelector(".contact__email").value;
  let message = document.querySelector(".contact__message").value;

  sendMail({ name, email, message });
});

const sendMail = async (mail) => {
  const loader = document.querySelector(".loader");
  const confirmation = document.querySelector(".contact__confirmation");
  const options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mail),
  };
  let message;
  loader.style.display = "block";
  try {
    const res = await fetch("http://localhost:5000/email", options);
    const contact = await res.json();
    confirmation.style.background = "#04c986";
    message = "Your message was sent successfully.";
    document.querySelector(".contact__name").value = "";
    document.querySelector(".contact__email").value = "";
    document.querySelector(".contact__message").value = "";
  } catch (err) {
    confirmation.style.background = "red";
    message = "Unable to send email. Please try again.";
  }
  confirmation.style.display = "block";
  confirmation.innerText = message;
  loader.style.display = "none";
};

// disable button while request is pending

let navItems = document.querySelectorAll(".navigation__item");
console.log("NAVITEMS: ", navItems);
