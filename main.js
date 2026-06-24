/*
=========================================================
USMAN PORTFOLIO SYSTEM JAVASCRIPT
Theme System, Scroll Dynamics & Dynamic Modal Rendering
=========================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Load saved theme or fall back to system default (defaulting to dark if none)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });


    // --- 2. Sticky Navbar & Active Section Link ---
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Active Section Tracker
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // --- 3. Mobile Navigation Menu ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    const toggleMenu = () => {
        navMenu.classList.toggle('open');
        navOverlay.classList.toggle('open');
    };

    const closeMenu = () => {
        navMenu.classList.remove('open');
        navOverlay.classList.remove('open');
    };

    menuToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // --- 4. Back-to-Top Button ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // --- 5. Interactive Floating Tech Orbit (Mouse Parallax) ---
    const heroVisual = document.querySelector('.hero-visual');
    const orbitItems = document.querySelectorAll('.orbit-item');

    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - (rect.width / 2);
            const mouseY = e.clientY - rect.top - (rect.height / 2);

            orbitItems.forEach((item, index) => {
                const depth = (index % 3 + 1) * 0.05; // Different speeds
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                item.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });

        heroVisual.addEventListener('mouseleave', () => {
            orbitItems.forEach(item => {
                item.style.transform = 'translate(0px, 0px)';
                item.style.transition = 'transform 0.5s ease';
            });
        });
    }


    // --- 6. Project Details Modal Logic ---
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalBack = document.getElementById('modalBack');
    const modalBody = document.getElementById('modalBody');
    const projectCards = document.querySelectorAll('.project-card');

    // Projects Database
    const projectsData = {
        ecommerce: {
            title: "E-Commerce Website",
            subtitle: "Responsive Online Store",
            image: "project_ecommerce.png",
            tags: ["React.js", "Tailwind CSS", "Node.js", "Express API"],
            desc: "A fully functional e-commerce website with responsive product listings, real-time cart capabilities, user session mockups, and structured backend APIs built using Node.js.",
            features: [
                "Responsive Layout matching all viewports",
                "Product filter and details overlays",
                "Add to Cart and checkout state mockups",
                "Clean APIs for fetching and processing orders"
            ],
            
        },
        portfolio: {
            title: "Book Reader",
            subtitle: "Modern Portfolio",
            image: "Book.png",
            tags: ["HTML5", "Vanilla CSS", "JavaScript"],
            desc: "Book Reader is a modern digital reading platform that allows users to read, organize, and track their books effortlessly. It includes features like bookmarks, highlights, notes, reading progress tracking, and dark/light mode support, providing a smooth and enjoyable reading experience across all devices.",
            features: [
                "Dynamic theme customizer (cream-brown / neon-violet)",
                "Full-stack skills progress layout",
                "Reading Progress Tracking",
                "Reading Progress Tracking"
            ],
           
        },
        taskapp: {
            title: "Task Management App",
            subtitle: "Team Productivity Dashboard",
            image: "Task.png",
            tags: ["React.js", "Bootstrap", "Python", "Data Automation"],
            desc: "A clean dashboard workspace that helps team managers monitor cards, milestones, task statuses, and data flows. Integrated with automated Python scripts for report summaries.",
            features: [
                "Interactive board layout (Todo, In Progress, Done)",
                "Task statistics and automated progress bars",
                "Responsive sidebar navigation",
                "Python-based data processing utilities"
            ],
          
        }
    };

    const openModal = (projectId) => {
        const project = projectsData[projectId];
        if (!project) return;

        // Construct modal body HTML
        modalBody.innerHTML = `
            <div class="modal-media-col">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="modal-info-col">
                <h3 class="modal-project-title">${project.title}</h3>
                <div class="project-tags" style="margin-bottom: 20px;">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p class="modal-desc">${project.desc}</p>
                <div class="modal-features-list">
                    <h4 class="modal-features-title">Core Features</h4>
                    <ul>
                        ${project.features.map(feat => `<li>${feat}</li>`).join('')}
                    </ul>
                </div>
               
            </div>
        `;

        projectModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock main scroll
    };

    const closeModal = () => {
        projectModal.classList.remove('open');
        document.body.style.overflow = ''; // Unlock main scroll
    };

    // Card triggers
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    // Close triggers
    modalClose.addEventListener('click', closeModal);
    modalBack.addEventListener('click', closeModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });

    // Close on Escape press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('open')) {
            closeModal();
        }
    });


    // --- 7. Contact Form Simulation ---
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            // Visual loading state
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Success message
                formResponse.style.color = '#10b981'; // Green color
                formResponse.textContent = 'Message sent successfully! Muhammad Usman will get back to you shortly.';
                
                // Clear fields
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Fade out notification
                setTimeout(() => {
                    formResponse.textContent = '';
                }, 5000);

            }, 1200);
        });
    }
});
