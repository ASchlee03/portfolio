async function hideNavbar() {
  const navbar = document.querySelector("header nav");
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      navbar.style.top = "0";
    } else {
      navbar.style.top = "-70px";
    }
  });
  observer.observe(document.querySelector("main"));
}

async function smoothScroll() {
  const scrollLinks = document.querySelectorAll(".scroll-link");
  scrollLinks.forEach(link => {
    link.addEventListener("click", async e => {
      e.preventDefault();
      const id = e.target.getAttribute("href").slice(1);
      const element = document.getElementById(id);
      const navHeight = (await document.querySelector("header nav")).getBoundingClientRect().height;
      const containerHeight = element.getBoundingClientRect().top;
      const fixedNav = navHeight + containerHeight;
      await window.scrollTo({
        left: 0,
        top: fixedNav,
        behavior: "smooth"
      });
    });
  });
}

async function addActiveClass() {
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(entries => {
    let currentHeight = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetTop - 70;
      if (sectionHeight <= currentHeight && sectionHeight + section.offsetHeight > currentHeight) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });
  });
  sections.forEach(section => {
    observer.observe(section);
  });
}

async function projectPreview() {
  const projectPreview = document.querySelector(".project-preview");
  const projectLinks = document.querySelectorAll(".project-link");
  projectLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      const projectImage = link.querySelector("img").getAttribute("src");
      projectPreview.style.backgroundImage = `url(${projectImage})`;
      projectPreview.classList.add("show");
    });
    link.addEventListener("mouseleave", () => {
      projectPreview.classList.remove("show");
    });
  });
}

async function formValidation() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const { name, email, message } = form.elements;
    if (name.value === "" || email.value === "" || message.value === "") {
      form.classList.add("error");
    } else {
      form.classList.remove("error");
      // Submit the form here
      const formData = new FormData(form);
      const response = await fetch("contact.php", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
    }
  });
}

async function dragHeader() {const header = document.querySelector("header");
  let previousPosition = window.pageYOffset;
  
  window.addEventListener("scroll", async function() {
    let currentPosition = window.pageYOffset;
    if (currentPosition > previousPosition) {
      header.style.top = "-100px";
    } else {
      header.style.top = "0";
    }
    previousPosition = currentPosition;

    // Add active class to current section
    const sections = document.querySelectorAll("section");
    sections.forEach(function(section) {
      const sectionHeight = section.offsetTop - 70;
      if (sectionHeight <= currentHeight && sectionHeight + section.offsetHeight > currentHeight) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });
    
    // Show navbar on scroll
    const navbar = document.querySelector("header nav");
    if (window.pageYOffset > 70) {
      navbar.style.top = "-70px";
    } else {
      navbar.style.top = "0";
    }
  });
}

dragHeader();

// Smooth Scrolling
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = element.getBoundingClientRect().top;
    const fixedNav = navHeight + containerHeight;
    window.scrollTo({
      left: 0,
      top: fixedNav,
      behavior: "smooth"
    });
  });
});

  // Project Preview
  let projectPreviewContainer = document.querySelector(".project-preview");
  const projectLinks = document.querySelectorAll(".project-link");
  projectLinks.forEach(function(link) {
    link.addEventListener("mouseenter", function() {
      const projectImage = link.querySelector("img").getAttribute("src");
      projectPreviewContainer.style.backgroundImage = `url(${projectImage})`;
      projectPreviewContainer.classList.add("show");
    });
    link.addEventListener("mouseleave", function() {
      projectPreviewContainer.classList.remove("show");
    });
  });

// Form Validation
const form = document.querySelector("form");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.querySelector("input[name='name']");
  const email = document.querySelector("input[name='email']");
  const message = document.querySelector("textarea[name='message']");
  if (name.value === "" || email.value === "" || message.value === "") {
    form.classList.add("error");
  } else {
    form.classList.remove("error");
}
});

document.addEventListener("DOMContentLoaded", function() {
  // Add transitions for smooth animations
  const header = document.querySelector('header');
  const navbar = document.querySelector(".navbar");
  const form = document.querySelector('form');

  if (navbar) {
    navbar.style.transition = "all 0.3s ease-in-out";
  }
  if (header) {
    header.style.transition = "all 0.3s ease-in-out";
  }
  if (form) {
    // Form Validation
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.querySelector("input[name='name']");
      const email = document.querySelector("input[name='email']");
      const message = document.querySelector("textarea[name='message']");
      if (name.value === "" || email.value === "" || message.value === "") {
        form.classList.add("error");
      } else {
        form.classList.remove("error");
      }
    });
  }
});

// Use IntersectionObserver to show and hide elements on scroll
const sectionsObserver = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("appear");
} else {
entry.target.classList.remove("appear");
}
});
}, {
threshold: [0, 0.5, 1]
});

const sectionsElements = document.querySelectorAll(".section");
sectionsElements.forEach(section => sectionsObserver.observe(section));

const projectsObserver = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("show-project");
} else {
entry.target.classList.remove("show-project");
}
});
}, {
threshold: [0, 0.5, 1]
});

const projectsElements = document.querySelectorAll(".project");
projectsElements.forEach(project => projectsObserver.observe(project));

// Add background color transition to form input elements on focus
const formInputs = document.querySelectorAll(".form-control");
formInputs.forEach(input => {
input.addEventListener("focus", function() {
this.style.backgroundColor = "#fff";
});
input.addEventListener("blur", function() {
this.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
});
});

// Use fetch to submit form data
form.addEventListener("submit", async function(e) {
e.preventDefault();
const formData = new FormData(this);
const response = await fetch("https://example.com/api/submit-form", {
method: "POST",
body: formData
});
const data = await response.json();
console.log(data);
});
 
