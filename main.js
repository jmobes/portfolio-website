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
