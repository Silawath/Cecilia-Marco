const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");

window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionX = offset*(-0.3)-100 + "px";
})


window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    offset-=3100;
    parallax1.style.backgroundPositionY = offset*(0.1) + "px";
})

window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    offset-=4800;
    parallax2.style.backgroundPositionY = offset*(-0.1) + "px";
})

function myFunction() {
    document.getElementById("check").checked = false;
  }


  
function reveal() {
var reveals = document.querySelectorAll(".reveal");
  
for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
}
  
window.addEventListener("scroll", reveal);

$(document).ready(function() {
  let clock;

  // Grab the current date
  let currentDate = new Date();

  // Target future date/24 hour time/Timezone
  let targetDate = moment.tz("2026-06-27 15:00", "europe/Rome");

  // Calculate the difference in seconds between the future and current date
  let diff = targetDate / 1000 - currentDate.getTime() / 1000;

  if (diff <= 0) {
    // If remaining countdown is 0
    clock = $(".clock").FlipClock(0, {
      clockFace: "DailyCounter",
      countdown: true,
      autostart: false
    });
    console.log("Date has already passed!")
    
  } else {
    // Run countdown timer
    clock = $(".clock").FlipClock(diff, {
      clockFace: "DailyCounter",
      countdown: true,
      callbacks: {
        stop: function() {
          console.log("Timer has ended!")
        }
      }
    });
    
    // Check when timer reaches 0, then stop at 0
    setTimeout(function() {
      checktime();
    }, 1000);
    
    function checktime() {
      t = clock.getTime();
      if (t <= 0) {
        clock.setTime(0);
      }
      setTimeout(function() {
        checktime();
      }, 1000);
    }
  }
});

/* <=== GESTIONE INTRO & MENU (Versione Intelligente) ===> */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTIONE INTRO CON MEMORIA ---
    const introOverlay = document.getElementById('intro-overlay');
    const introBtn = document.querySelector('.intro-btn');

    if (introOverlay) {
        // CONTROLLO: L'utente ha già visto l'intro in questa sessione?
        if (sessionStorage.getItem('intro_visto') === 'true') {
            // SÌ: Nascondi immediatamente l'overlay senza animazione
            introOverlay.style.display = 'none';
        } else {
            // NO: L'overlay è visibile (via CSS). Attiva il bottone.
            if (introBtn) {
                introBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    // Avvia animazione uscita
                    introOverlay.classList.add('fade-out');
                    
                    // Rimuovi dopo 1.5 secondi
                    setTimeout(() => { 
                        introOverlay.style.display = 'none'; 
                    }, 1500);

                    // IMPORTANTE: Salva in memoria che l'abbiamo visto
                    sessionStorage.setItem('intro_visto', 'true');
                });
            }
        }
    }

    // --- 2. GESTIONE MENU MOBILE (Il codice che avevamo fatto prima) ---
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
});
