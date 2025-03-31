document.addEventListener('DOMContentLoaded', () => {
    const bunniesContainer = document.querySelector('.bubbles-container');
    const modal = document.getElementById('message-modal');
    const closeBtn = document.querySelector('.close-btn');
    const messageContent = document.querySelector('.message-content');

    // Messages for each bunny with media
    const messages = [
        {
            title: "First Memory",
            content: "The place we first met",
            icon: "💫",
            media: "media/image1.png",
            mediaType: "image"
        },
        {
            title: "Love",
            content: "The moment you said you realized that you love me",
            icon: "✨",
            media: "media/image2.jpg",
            mediaType: "image"
        },
        {
            title: "You make me happy",
            content: "We laugh together",
            icon: "💝",
            media: "media/Clip - VALORANT_05-27-2024_19-42-07-551_-_Trim3_mp4-2025-03-30-22-30-41-855.mp4",
            mediaType: "video"
        },
        {
            title: "Fun",
            content: "I have fun with you!",
            icon: "💖",
            media: "media/Clip - VALORANT 08-05-2024_14-45-14-395_mp4-2025-03-30-22-12-33-821.mp4",
            mediaType: "video"
        },
        {
            title: "Trying new things",
            content: "",
            icon: "💗",
            media: "media/pngwing.com.png",
            mediaType: "image"
        },
        {
            title: "Love",
            content: "The place you said you love me for the first time",
            icon: "💓",
            media: "media/960x0.webp",
            mediaType: "image"
        },
        {
            title: "Memorable Times",
            content: "Our first conversation",
            icon: "💘",
            media: "media/Screenshot 2025-03-30 215731.png",
            mediaType: "image"
        },
        {
            title: "Pet",
            content: "Our first pet",
            icon: "💞",
            media: "media/image3.png",
            mediaType: "image"
        },
        {
            title: "Munchkin",
            content: "How I see you",
            icon: "💞",
            media: "media/bunny.png",
            mediaType: "image"
        },
        {
            title: "Movie",
            content: "You make bad things good",
            icon: "💞",
            media: "media/theythem.jpg",
            mediaType: "image"
        },
        {
            title: "The Big Question",
            content: "Will you be my girlfriend?",
            icon: "💝",
            media: "media/Screenshot 2024-08-14 185824.png",
            mediaType: "image",
            isQuestion: true
        }
    ];

    let clickedBunnies = 0;
    let activeBunnies = new Set();

    function createBunnyElement(message) {
        const bunny = document.createElement('div');
        bunny.className = 'bunny';
        
        // Create bunny face
        const bunnyFace = document.createElement('div');
        bunnyFace.className = 'bunny-face';
        
        // Create bunny eyes
        const bunnyEyes = document.createElement('div');
        bunnyEyes.className = 'bunny-eyes';
        
        const leftEye = document.createElement('div');
        leftEye.className = 'bunny-eye';
        const rightEye = document.createElement('div');
        rightEye.className = 'bunny-eye';
        
        bunnyEyes.appendChild(leftEye);
        bunnyEyes.appendChild(rightEye);
        
        // Create bunny nose
        const bunnyNose = document.createElement('div');
        bunnyNose.className = 'bunny-nose';
        
        bunnyFace.appendChild(bunnyEyes);
        bunnyFace.appendChild(bunnyNose);
        bunny.appendChild(bunnyFace);
        
        // Create media container
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'bunny-media';
        
        if (message.mediaType === 'image') {
            const img = document.createElement('img');
            img.src = message.media;
            img.alt = message.title;
            mediaContainer.appendChild(img);
        } else if (message.mediaType === 'video') {
            const video = document.createElement('video');
            video.src = message.media;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            mediaContainer.appendChild(video);
        }
        
        bunny.appendChild(mediaContainer);
        
        // Random size between 80px and 120px
        const size = Math.random() * 40 + 80;
        bunny.style.width = `${size}px`;
        bunny.style.height = `${size}px`;
        
        // Random starting position
        bunny.style.left = `${Math.random() * (window.innerWidth - size)}px`;
        bunny.style.top = `${Math.random() * (window.innerHeight - size)}px`;
        
        // Random speed and direction
        const speed = Math.random() * 3 + 2;
        const direction = Math.random() * 360;
        const offset = Math.random() * 100;
        
        bunny.style.setProperty('--speed', `${speed}s`);
        bunny.style.setProperty('--direction', `${direction}deg`);
        bunny.style.setProperty('--offset', `${offset}px`);
        bunny.style.transform = `rotate(${direction}deg)`;
        
        // Add click handler
        bunny.addEventListener('click', () => {
            if (message.isQuestion) {
                showQuestionScreen();
            } else {
                showMessage(message);
                clickedBunnies++;
                activeBunnies.delete(message.title);
                bunny.remove();
                
                // Check if we should show the question bunny
                if (clickedBunnies === messages.length - 1) {
                    createBunnyElement(messages[messages.length - 1]);
                }
            }
        });
        
        activeBunnies.add(message.title);
        bunniesContainer.appendChild(bunny);
    }

    function createInitialBunnies() {
        bunniesContainer.innerHTML = '';
        activeBunnies.clear();
        clickedBunnies = 0;

        // Create initial bunnies with regular messages only
        const regularMessages = messages.slice(0, -1);
        const shuffledMessages = [...regularMessages].sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < regularMessages.length; i++) {
            createBunnyElement(shuffledMessages[i]);
        }
    }

    function showMessage(message) {
        messageContent.innerHTML = `
            <h2>${message.title}</h2>
            <div class="message-media">
                ${message.mediaType === 'image' 
                    ? `<img src="${message.media}" alt="${message.title}">`
                    : `<video src="${message.media}" controls loop playsinline></video>`
                }
            </div>
            <p>${message.content}</p>
        `;
        modal.classList.add('active');
    }

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Show question screen
    function showQuestionScreen() {
        const questionScreen = document.createElement('div');
        questionScreen.className = 'question-screen';
        questionScreen.innerHTML = `
            <div class="question-content">
                <img src="media/chimp.png" alt="Cute Chimp" class="question-image">
                <h1>Will you be my girlfriend?</h1>
                <div class="button-container">
                    <button class="btn" id="yes-btn">Yes! 💖</button>
                    <button class="btn" id="no-btn">No 💔</button>
                </div>
            </div>
        `;
        document.body.appendChild(questionScreen);

        const yesBtn = questionScreen.querySelector('#yes-btn');
        const noBtn = questionScreen.querySelector('#no-btn');

        yesBtn.addEventListener('click', () => {
            questionScreen.remove();
            showSuccessMessage();
        });

        // Make the no button move away when hovered
        noBtn.addEventListener('mouseover', (e) => {
            const maxX = window.innerWidth - noBtn.offsetWidth;
            const maxY = window.innerHeight - noBtn.offsetHeight;
            
            // Get mouse position
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate new position that's away from mouse
            let newX, newY;
            do {
                newX = Math.random() * maxX;
                newY = Math.random() * maxY;
            } while (
                // Check if new position is too close to mouse (within 100px radius)
                Math.sqrt(
                    Math.pow(newX - mouseX, 2) + 
                    Math.pow(newY - mouseY, 2)
                ) < 100
            );
            
            // Ensure the button stays within the viewport
            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));
            
            noBtn.style.position = 'fixed';
            noBtn.style.left = `${newX}px`;
            noBtn.style.top = `${newY}px`;
            noBtn.style.transition = 'all 0.2s ease';
        });

        // Add touch event for mobile devices
        noBtn.addEventListener('touchstart', (e) => {
            const maxX = window.innerWidth - noBtn.offsetWidth;
            const maxY = window.innerHeight - noBtn.offsetHeight;
            
            // Get touch position
            const touch = e.touches[0];
            const touchX = touch.clientX;
            const touchY = touch.clientY;
            
            // Calculate new position that's away from touch
            let newX, newY;
            do {
                newX = Math.random() * maxX;
                newY = Math.random() * maxY;
            } while (
                // Check if new position is too close to touch (within 100px radius)
                Math.sqrt(
                    Math.pow(newX - touchX, 2) + 
                    Math.pow(newY - touchY, 2)
                ) < 100
            );
            
            // Ensure the button stays within the viewport
            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));
            
            noBtn.style.position = 'fixed';
            noBtn.style.left = `${newX}px`;
            noBtn.style.top = `${newY}px`;
            noBtn.style.transition = 'all 0.2s ease';
        });
    }

    // Show success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="ending-content">
                <div class="blue-bells"></div>
                <div class="message-box">
                    <h1>I Love You 💖</h1>
                    <p>Thank you for making me happy! 💕</p>
                    <img src="media/ending.png" alt="Our Love" class="ending-image">
                </div>
                <div class="blue-bells"></div>
            </div>
        `;
        document.body.appendChild(successMessage);
        createBlueBells();
    }

    // Create floating blue bell flowers
    function createBlueBells() {
        const blueBellsContainer = document.querySelector('.blue-bells');
        setInterval(() => {
            const flower = document.createElement('div');
            flower.className = 'blue-bell';
            // Create a more realistic bluebell flower
            flower.innerHTML = `
                <svg viewBox="0 0 100 200" class="bluebell-svg">
                    <!-- Main curved stem -->
                    <path class="stem" d="M50 200 C 50 150, 60 100, 50 80" stroke="#2E7D32" stroke-width="2" fill="none"/>
                    
                    <!-- Small leaves -->
                    <path class="leaf" d="M50 150 C 30 140, 30 160, 50 150" stroke="#2E7D32" stroke-width="1" fill="#4CAF50"/>
                    <path class="leaf" d="M50 120 C 70 110, 70 130, 50 120" stroke="#2E7D32" stroke-width="1" fill="#4CAF50"/>
                    
                    <!-- Flower bells -->
                    <g class="flower-group">
                        <!-- Bell 1 -->
                        <path class="flower" d="M50 80 C 45 80, 40 60, 45 40 C 50 20, 60 20, 65 40 C 70 60, 65 80, 60 80" 
                              fill="#4169E1" opacity="0.9"/>
                        <!-- Bell 2 -->
                        <path class="flower" d="M45 90 C 40 90, 35 70, 40 50 C 45 30, 55 30, 60 50 C 65 70, 60 90, 55 90" 
                              fill="#6495ED" opacity="0.85"/>
                        <!-- Bell 3 -->
                        <path class="flower" d="M55 85 C 50 85, 45 65, 50 45 C 55 25, 65 25, 70 45 C 75 65, 70 85, 65 85" 
                              fill="#4169E1" opacity="0.8"/>
                        <!-- Bell 4 -->
                        <path class="flower" d="M40 95 C 35 95, 30 75, 35 55 C 40 35, 50 35, 55 55 C 60 75, 55 95, 50 95" 
                              fill="#6495ED" opacity="0.75"/>
                        
                        <!-- Bell details -->
                        <path class="bell-detail" d="M45 40 C 50 35, 55 35, 60 40" stroke="#1A237E" stroke-width="0.5" fill="none" opacity="0.5"/>
                        <path class="bell-detail" d="M40 50 C 45 45, 50 45, 55 50" stroke="#1A237E" stroke-width="0.5" fill="none" opacity="0.5"/>
                        <path class="bell-detail" d="M50 45 C 55 40, 60 40, 65 45" stroke="#1A237E" stroke-width="0.5" fill="none" opacity="0.5"/>
                        <path class="bell-detail" d="M35 55 C 40 50, 45 50, 50 55" stroke="#1A237E" stroke-width="0.5" fill="none" opacity="0.5"/>
                    </g>
                </svg>
            `;
            
            // Random position and size
            flower.style.left = `${Math.random() * 100}%`;
            flower.style.fontSize = `${Math.random() * 40 + 30}px`; // Bigger size range
            flower.style.animationDuration = `${Math.random() * 5 + 6}s`; // Longer animation for full height
            flower.style.animationDelay = `${Math.random() * 2}s`;
            
            blueBellsContainer.appendChild(flower);
            
            setTimeout(() => {
                flower.remove();
            }, 12000); // Longer display time to match longer animation
        }, 300);
    }

    // Initialize
    createInitialBunnies();
}); 