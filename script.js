// Toggle Icon Navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll Sections Active Link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Typed.js Effect Multiple Text
const typed = new Typed('.multiple-text', {
    strings: ['Machine Learning Enthusiast', 'Software Developer', 'Digital Marketer', 'Data Analyst', 'CSE Student'],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000,
    loop: true
});

// Scroll Reveal Animations
ScrollReveal({ 
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-category, .projects-container, .cert-box, .contact-form, .experience-card', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-card, .contact-info', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-card.objective', { origin: 'right' });

// Chatbot functionality
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeBtn = document.querySelector("#close-chatbot");
const chatbox = document.querySelector("#chatbox");
const chatInput = document.querySelector("#chat-textarea");
const sendChatBtn = document.querySelector("#send-btn");

let userMessage = null;
const inputInitHeight = chatInput ? chatInput.scrollHeight : 45;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<i class='bx bx-bot'></i><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");
    
    // Simulate simple bot logic
    setTimeout(() => {
        let response = "Thanks for your message! I'll get back to you soon.";
        
        if (userMessage) {
            const lowerMsg = userMessage.toLowerCase();
            
            if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
                response = "Hello! How can I help you today?";
            } else if (lowerMsg.includes("skills") || lowerMsg.includes("tech")) {
                response = "I have experience with Python, C, JavaScript, HTML, CSS, and MySQL.";
            } else if (lowerMsg.includes("experience") || lowerMsg.includes("internship")) {
                response = "I worked as a Machine Learning Intern at Malaris Software Solutions.";
            } else if (lowerMsg.includes("project")) {
                response = "I have worked on a Fashion Hub E-Commerce Website and a Library Management System. Check out my Projects section!";
            } else if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("message") || lowerMsg.includes("whatsapp")) {
                // Keep the contact links available, but prompt them to email directly.
                chatElement.innerHTML = `<i class='bx bx-bot'></i>
                    <p>You can reach me directly below:<br><br>
                    <a href="https://wa.me/919344709406" target="_blank" style="color: var(--main-color); text-decoration: underline;"><i class='bx bxl-whatsapp'></i> WhatsApp</a><br>
                    <a href="mailto:prakashsiva2004429@gmail.com" style="color: var(--main-color); text-decoration: underline;"><i class='bx bx-envelope'></i> Email Me</a><br><br>
                    <strong>Or simply type <em>"email: your message"</em> right here and I'll send it directly to my inbox!</strong></p>`;
                chatbox.scrollTo(0, chatbox.scrollHeight);
                return;
            } else if (lowerMsg.startsWith("email:")) {
                const mailContent = userMessage.substring(6).trim();
                
                if(mailContent.length < 5) {
                   response = "Please provide a valid message to email.";
                } else {
                   // Sending the direct email via static forms (FormSubmit)
                   sendDirectEmail(mailContent, chatElement);
                   return;
                }
            }
        }

        messageElement.textContent = response;
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 600);
}

const sendDirectEmail = (messageText, chatElement) => {
    const messageElement = chatElement.querySelector("p");
    messageElement.textContent = "Sending your email to Sivaprakash...";
    
    // Using FormSubmit API as a simple backend-less solution
    // This sends an email directly to prakashsiva2004429@gmail.com
    fetch("https://formsubmit.co/ajax/prakashsiva2004429@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: "New Message from Portfolio Chatbot!",
            message: messageText
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            messageElement.textContent = "Email successfully sent! I will get back to you soon.";
        } else {
            messageElement.textContent = "Oops! Something went wrong while sending the email. Please try the direct link above.";
        }
    })
    .catch(error => {
        messageElement.textContent = "Error: Could not connect to the email server. Please use the direct links.";
        console.error("Email Error:", error);
    });
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Clear input field
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append user message
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    // Display "Thinking..." message
    setTimeout(() => {
        const incomingChatLi = createChatLi("Typing...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 400);
}

if (chatInput) {
    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 768) {
            e.preventDefault();
            handleChat();
        }
    });
}
if (sendChatBtn) sendChatBtn.addEventListener("click", handleChat);
if (closeBtn) closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
if (chatbotToggler) chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
