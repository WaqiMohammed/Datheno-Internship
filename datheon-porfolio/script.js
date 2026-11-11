
// Select theme button
const themeButton = document.querySelector("#theme-toggle");

// Get saved theme
let currentTheme = localStorage.getItem("theme") || "dark";

// Apply saved theme when page loads
if (currentTheme === "light") {
    document.body.classList.add("light-theme");
    themeButton.textContent = "🌙";
}

// Theme toggle function
themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");
    
    
    if (document.body.classList.contains("light-theme")) {
        currentTheme = "light";
        themeButton.textContent = "🌙";
    } else {
        currentTheme = "dark";
        themeButton.textContent = "☀️";
    }
    
    
    localStorage.setItem("theme", currentTheme);
});

const menuButton = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');

menuButton.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  if (navLinks.classList.contains('active')) {
    menuButton.textContent = "✕";
  } else {
    menuButton.textContent = "☰";
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click' , () => {
    navLinks.classList.remove('active');
    menuButton.textContent = "☰";
  });
});

// creating list for skills using map() 

const skills = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'React',
  'Tailwind CSS',
  'Git',
  'GitHub'
];

const skillsContainer = document.querySelector('#skills-container');

skillsContainer.innerHTML = skills.map(skill => {
  return `<div class="skills-card">${skill}</div>`;
}).join("");


// adding project section via maps


const projects = [
    {
        title: "Coffee Shop Website",
        description: "A coffee shop website built using HTML and CSS.",
        technologies: ["HTML", "CSS"],
        details: "A website featuring a clean layout, coffee menu, and modern styling."
    },
    {
        title: "Personal Portfolio",
        description: "A personal developer portfolio showcasing my skills and projects.",
        technologies: ["HTML", "CSS", "JavaScript"],
        details: "A responsive portfolio with dark and light themes, interactive navigation and project showcases."
    },
    {
        title: "Weather Forecast App",
        description: "A weather application that displays real-time weather information.",
        technologies: ["HTML", "CSS", "JavaScript", "API"],
        details: "A weather dashboard with city search, current weather conditions and a five-day forecast."
    }
];

const projectsContainer = document.querySelector("#projects-container");

projectsContainer.innerHTML = projects.map((project, index) => {
    return `
        <div class="project-card">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p class="tech-stack">
        ${project.technologies.join(" • ")}
        </p>
        
        <button class="details-btn" data-index="${index}">
        View Details
        </button>
        </div>
        `;
      }).join("");


const modal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const closeModal = document.querySelector("#close-modal");

// Open modal using event delegation
projectsContainer.addEventListener("click", (event) => {
  
  const button = event.target.closest(".details-btn");

  if (!button) return;

  const index = button.dataset.index;

  const selectedProject = projects[index];

  modalTitle.textContent = selectedProject.title;
  modalDescription.textContent = selectedProject.details;

  modal.classList.add("show");
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Close when clicking outside the modal
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

// Close using Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.classList.remove("show");
  }
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

contactForm.addEventListener('submit', function(e) {
  //stop page refresh
  e.preventDefault()
  
  
  // get input values
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();



  // check empty fields
  if(!name || !email || !message) {
    formStatus.textContent = "please fill in all fields.";
    return;
  }

  // show success message 
  formStatus.textContent = `Thank you, ${name}! Your Message is sent.`;

  // clear the form
  e.target.reset()

})