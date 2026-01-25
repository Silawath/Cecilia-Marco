/* <=================== SISTEMA DI ACCESSO GLOBALE ===================> */

const PASSWORD_UNICA = "272300"; 

// 1. CONTROLLO ACCESSO (Eseguito su tutte le pagine)
(function checkAccess() {
    const isAuth = sessionStorage.getItem('site_access'); 
    const path = window.location.pathname;
    const isIntroPage = path.indexOf('intro.html') !== -1; 

    // Se non sei autenticato e NON sei nella intro -> Vai alla intro
    if (!isAuth && !isIntroPage) {
        window.location.href = 'intro.html';
    } 
    // Se sei già autenticato e sei nella intro -> Vai alla home
    else if (isAuth && isIntroPage) {
        window.location.href = 'index.html';
    }
})();

document.addEventListener('DOMContentLoaded', () => {

    // --- A. GESTIONE PASSWORD UNICA (Solo su intro.html) ---
    const enterBtn = document.getElementById('enter-site-btn');
    const inputCode = document.getElementById('access-code');
    const errorMsg = document.getElementById('error-msg');
    
    if (enterBtn && inputCode) {
        function performLogin() {
            const code = inputCode.value.trim();
            
            if (code === PASSWORD_UNICA) {
                sessionStorage.setItem('site_access', 'true');
                document.getElementById('intro-overlay').classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            } else {
                errorMsg.style.display = 'block';
                errorMsg.innerText = "Password errata.";
                inputCode.classList.add('shake-animation');
                setTimeout(() => inputCode.classList.remove('shake-animation'), 500);
            }
        }

        enterBtn.addEventListener('click', performLogin);
        inputCode.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performLogin();
        });
    }

    // --- B. MENU MOBILE ---
    const menuCheckbox = document.getElementById('check');
    const menuLinks = document.querySelectorAll('nav ul li a');

    if (menuCheckbox && menuLinks.length > 0) {
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuCheckbox.checked = false; 
                document.body.style.overflow = 'auto'; 
            });
        });
        menuCheckbox.addEventListener('change', () => {
            document.body.style.overflow = menuCheckbox.checked ? 'hidden' : 'auto';
        });
    }

    // --- C. PARALLASSE & REVEAL ---
    const parallax = document.getElementById("home-img-lg");
    if (parallax) {
        window.addEventListener("scroll", function() {
            let offset = window.pageYOffset;
            parallax.style.backgroundPositionX = offset*(-0.3)-100 + "px";
        });
    }

    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); 
});

// Funzioni Navigazione Globali
function goRSPV() { window.location.href = "rsvp.html"; }
function goRegalo() { window.location.href = "listanozze.html"; }