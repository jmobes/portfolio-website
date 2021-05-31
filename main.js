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

let emailSending = false;
const sendMail = async (mail) => {
  if (emailSending) {
    return;
  }
  emailSending = true;
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
  emailSending = false;
};

document.addEventListener("DOMContentLoaded", function () {
  let scrollStart = 0;
  let home = document.querySelector(".navigation__item--home");
  let about = document.querySelector(".navigation__item--about");
  let skills = document.querySelector(".navigation__item--skills");
  let projects = document.querySelector(".navigation__item--projects");
  let contact = document.querySelector(".navigation__item--contact");

  let homeOffset = document.querySelector("#home").getBoundingClientRect();
  let aboutOffset = document.querySelector("#about").getBoundingClientRect();
  let skillsOffset = document.querySelector("#skills").getBoundingClientRect();
  let projectsOffset = document
    .querySelector("#projects")
    .getBoundingClientRect();
  let contactOffset = document
    .querySelector("#contact")
    .getBoundingClientRect();

  document.onscroll = function (e) {
    console.log(e.target);
    scrollStart = e.target.scrollingElement.scrollTop;
    if (scrollStart < aboutOffset.top) {
      home.style.color = "red";
    } else if (
      scrollStart >= aboutOffset.top &&
      scrollStart < skillsOffset.top
    ) {
      about.style.color = "red";
    } else if (
      scrollStart >= skillsOffset.top &&
      scrollStart < projectsOffset.top
    ) {
      skills.style.color = "red";
    } else if (
      scrollStart >= projectsOffset.top &&
      scrollStart < contactOffset.top
    ) {
      projects.style.color = "red";
    } else {
      contact.style.color = "red";
    }
  };
});
// const options = {
//   threshold: 0.5,
// };
// const observer = new IntersectionObserver((entries, observer) => {
//   entries.forEach((entry) => {
//     console.log(entry.target, entry.isIntersecting, entry.intersectionRatio);
//     const id = `#${entry.target.id}`;
//     const navLink = document.querySelector(`a[href="${id}"]`);
//     if (entry.isIntersecting) {
//       navLink.classList.add("active");
//     } else {
//       navLink.classList.remove("active");
//     }
//   });
// }, options);
// let sections = document.querySelectorAll("section");
// sections.forEach((section) => {
//   observer.observe(section);
// });
