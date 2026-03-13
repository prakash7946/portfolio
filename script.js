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

// Puzzle Widget Functionality
const puzzleToggler = document.querySelector("#puzzle-toggler");
const closePuzzleBtn = document.querySelector("#close-puzzle");
const puzzleContent = document.querySelector("#puzzle-content");

if (puzzleToggler) {
    puzzleToggler.addEventListener("click", () => {
        document.body.classList.toggle("show-puzzle");
        if(document.body.classList.contains("show-puzzle")) {
            initPuzzle();
        }
    });
}
if (closePuzzleBtn) {
    closePuzzleBtn.addEventListener("click", () => document.body.classList.remove("show-puzzle"));
}

function initPuzzle() {
    const currentHour = new Date().getHours();
    const gameIndex = currentHour % 3;
    
    // Clear previous content
    puzzleContent.innerHTML = '';
    
    if (gameIndex === 0) {
        initTicTacToe();
    } else if (gameIndex === 1) {
        initMemoryGame();
    } else {
        initGuessNumber();
    }
}

function initTicTacToe() {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    
    puzzleContent.innerHTML = `
        <h3 class="puzzle-message">Tic Tac Toe</h3>
        <p class="puzzle-message" id="ttt-status" style="margin-bottom: 1rem;">Player X's turn</p>
        <div class="ttt-board" id="ttt-board"></div>
        <button class="puzzle-btn" id="ttt-restart">Restart</button>
    `;
    
    const boardElement = document.getElementById('ttt-board');
    const statusElement = document.getElementById('ttt-status');
    const restartBtn = document.getElementById('ttt-restart');
    
    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let condition of winConditions) {
            let [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                statusElement.textContent = `Player ${board[a]} Wins!`;
                return;
            }
        }
        
        if (!board.includes('')) {
            gameActive = false;
            statusElement.textContent = 'Draw!';
        }
    }
    
    function createBoard() {
        boardElement.innerHTML = '';
        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('ttt-cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => {
                if (board[index] === '' && gameActive) {
                    board[index] = currentPlayer;
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    statusElement.textContent = `Player ${currentPlayer}'s turn`;
                    createBoard();
                    checkWin();
                }
            });
            boardElement.appendChild(cellElement);
        });
    }
    
    restartBtn.addEventListener('click', () => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        statusElement.textContent = `Player X's turn`;
        createBoard();
    });
    
    createBoard();
}

function initMemoryGame() {
    const baseEmojis = ['🚀', '🌟', '💻', '🎮', '💡', '🔥', '🎨', '🧩'];
    let emojis = [...baseEmojis, ...baseEmojis];
    emojis.sort(() => Math.random() - 0.5);
    
    puzzleContent.innerHTML = `
        <h3 class="puzzle-message">Memory Game</h3>
        <p class="puzzle-message" style="margin-bottom: 2rem; font-size: 1.4rem;">Find all matching pairs</p>
        <div class="memory-board" id="memory-board"></div>
        <button class="puzzle-btn" id="memory-restart">Restart</button>
    `;
    
    const boardElement = document.getElementById('memory-board');
    const restartBtn = document.getElementById('memory-restart');
    
    let flippedCards = [];
    let matchedCards = [];
    
    function createBoard() {
        boardElement.innerHTML = '';
        emojis.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.emoji = emoji;
            card.innerHTML = `<span class="emoji-hidden">${emoji}</span>`;
            
            card.addEventListener('click', () => {
                if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) return;
                
                card.classList.add('flipped');
                flippedCards.push(card);
                
                if (flippedCards.length === 2) {
                    setTimeout(checkMatch, 800);
                }
            });
            boardElement.appendChild(card);
        });
    }
    
    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
            if (matchedCards.length === emojis.length) {
                setTimeout(() => alert('You won!'), 300);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        flippedCards = [];
    }
    
    restartBtn.addEventListener('click', () => {
        emojis.sort(() => Math.random() - 0.5);
        flippedCards = [];
        matchedCards = [];
        createBoard();
    });
    
    createBoard();
}

function initGuessNumber() {
    let targetNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    
    puzzleContent.innerHTML = `
        <h3 class="puzzle-message">Guess the Number</h3>
        <p class="puzzle-message" id="guess-message" style="margin-bottom: 2rem;">I'm thinking of a number from 1 to 100.</p>
        <div class="guess-container">
            <input type="number" id="guess-input" min="1" max="100" placeholder="e.g. 50" />
            <br>
            <button class="puzzle-btn" id="guess-submit">Submit Guess</button>
            <br>
            <button class="puzzle-btn" id="guess-restart" style="margin-top: 15px; background: transparent; border: 1px solid var(--main-color); color: var(--main-color);">Restart Game</button>
        </div>
    `;
    
    const submitBtn = document.getElementById('guess-submit');
    const inputElement = document.getElementById('guess-input');
    const messageElement = document.getElementById('guess-message');
    const restartBtn = document.getElementById('guess-restart');
    
    function handleGuess() {
        const guess = parseInt(inputElement.value);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            messageElement.textContent = "Please enter a valid number (1-100)";
            return;
        }
        
        attempts++;
        if (guess === targetNumber) {
            messageElement.textContent = `Correct! You guessed it in ${attempts} attempts!`;
            submitBtn.disabled = true;
        } else if (guess < targetNumber) {
            messageElement.textContent = "Too low! Try again.";
        } else {
            messageElement.textContent = "Too high! Try again.";
        }
        inputElement.value = '';
    }
    
    submitBtn.addEventListener('click', handleGuess);
    inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleGuess();
    });
    
    restartBtn.addEventListener('click', () => {
        targetNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        messageElement.textContent = "I'm thinking of a number from 1 to 100.";
        submitBtn.disabled = false;
        inputElement.value = '';
    });
}
