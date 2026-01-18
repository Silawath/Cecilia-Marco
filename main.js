/* <=================== SISTEMA DI PROTEZIONE PASSWORD ===================> */

// PASSWORD SEGRETA (Modificala qui!)
const PASSWORD_CORRETTA = "272300"; 

// 1. CONTROLLO ACCESSO IMMEDIATO
(function checkAccess() {
    const hasAccess = sessionStorage.getItem('access_granted');
    const path = window.location.pathname;
    // Verifica se siamo nella pagina intro (supporta anche /intro.html)
    const isIntroPage = path.indexOf('intro.html') !== -1; 

    // Se NON ho il pass e NON sono nella intro -> CALCIO FUORI -> Intro
    if (!hasAccess && !isIntroPage) {
        window.location.href = 'intro.html';
    } 
    // Se HO il pass e sono nella intro -> VAI DENTRO -> Index
    else if (hasAccess && isIntroPage) {
        window.location.href = 'index.html';
    }
})();


/* <=================== LOGICA PAGINA ===================> */
document.addEventListener('DOMContentLoaded', () => {

    // --- A. GESTIONE PASSWORD (Solo su intro.html) ---
    const enterBtn = document.getElementById('enter-site-btn');
    const inputCode = document.getElementById('access-code');
    const errorMsg = document.getElementById('error-msg');
    
    // Funzione che controlla la password
    function checkPassword() {
        const userCode = inputCode.value.trim(); // Toglie spazi vuoti

        if (userCode === PASSWORD_CORRETTA) {
            // 1. Password Giusta!
            sessionStorage.setItem('access_granted', 'true'); // Diamo il pass
            document.getElementById('intro-overlay').classList.add('fade-out');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500); 
        } else {
            // 2. Password Sbagliata
            errorMsg.style.display = 'block';
            inputCode.classList.add('shake-animation'); // Effetto errore
            
            // Rimuovi animazione dopo 0.5s per poterla rifare
            setTimeout(() => {
                inputCode.classList.remove('shake-animation');
            }, 500);
        }
    }

    if (enterBtn && inputCode) {
        // Controllo al click del bottone
        enterBtn.addEventListener('click', checkPassword);

        // Controllo se premi INVIO sulla tastiera
        inputCode.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }


    // --- B. GESTIONE MENU MOBILE ---
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
            if(menuCheckbox.checked) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
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
            var elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); 
});