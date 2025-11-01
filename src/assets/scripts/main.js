/**
 * Import dependencies from node_modules
 * see commented examples below
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/**
 * Write any other JavaScript below
 */

// Animation of bouny elements
gsap.utils.toArray(".bouncy").forEach((item) => {
  gsap.from(item, {
    y: 100,
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "bounce.out",
    scrollTrigger: {
      trigger: item,
      start: "top 90%",
      end: "bottom 30%",
      toggleActions: "play reset restart restart",
      markers: false,
      invalidateOnRefresh: true,
      refreshPriority: -1,
    },
  });
});

// events: "onEnter onLeave onEnterBack onLeaveBack",
// options: play, pause, resume, reset, restart,

// Animation of sections intro
// gsap.utils.toArray(".gsap-section-intro").forEach((section) => {
//   ScrollTrigger.create({
//     trigger: section,
//     start: "top top",
//     pin: false,
//     pinSpacing: false,
//     markers: true,
//   });
// });

// Sun scaling animation
ScrollTrigger.create({
  trigger: ".sun",
  start: "top 30%",
  end: "top top",
  scrub: true,
  toggleActions: "play reset none reverse",
  animation: gsap.fromTo(
    ".sun",
    {
      scale: 1,
      transformOrigin: "center center",
    },
    {
      scale: 25,
      ease: "power2.out",
      position: "fixed",
    }
  ),
});

// Sun disappear animation when leaving Sol section
ScrollTrigger.create({
  trigger: "#sol",
  start: "bottom top",
  end: "bottom top",
  toggleActions: "none none none reverse",
  onLeave: () => {
    gsap.to(".sun", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  },
  onEnterBack: () => {
    gsap.to(".sun", {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  },
});

// Main-card entrance animation (from bottom to top)
gsap.utils.toArray(".main-card").forEach((card) => {
  gsap.from(card, {
    y: 600,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
      end: "top 70%",
      toggleActions: "play none none reverse",
      markers: false,
    },
  });
});

// Horizontal scroll animation for .places
const placesElements = document.querySelectorAll(".places");

function getScrollAmount(placesElement) {
  const containers = placesElement.querySelectorAll(".info-card-container");

  // Calculate scroll
  const lastContainerStart = containers[containers.length - 1].offsetLeft;
  return -lastContainerStart;
}

placesElements.forEach((places, index) => {
  const tween = gsap.to(places, {
    x: () => getScrollAmount(places),
    duration: 6,
    ease: "none",
  });

  ScrollTrigger.create({
    trigger: places.closest(".places-wrapper"), // To select various .places-wrapper
    start: "top top",
    end: () => `+=${getScrollAmount(places) * -1}`,
    pin: true,
    pinSpacing: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
  });
});

// Nieve animation
function createSnowAnimation() {
  const nieveSection = document.querySelector("#nieve");
  const originalSnowflake = nieveSection.querySelector(".snowflake");

  if (!originalSnowflake || !nieveSection) return;

  const numberOfSnowflakes = 20;
  const snowflakes = [];

  // Crear copos de nieve clonando el original
  for (let i = 0; i < numberOfSnowflakes; i++) {
    const snowflake = originalSnowflake.cloneNode(true);
    snowflake.classList.remove("snowflake--1");
    snowflake.classList.add(`snowflake--${i + 2}`);

    // Posición inicial aleatoria
    gsap.set(snowflake, {
      x: Math.random() * window.innerWidth,
      y: -500,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      rotation: Math.random() * 360,
    });

    nieveSection.appendChild(snowflake);
    snowflakes.push(snowflake);
  }

  // Animar cada copo de nieve
  snowflakes.forEach((snowflake) => {
    const fallDuration = Math.random() * 3 + 6; // 2-5 s duration
    const horizontalMovement = Math.random() * 100 - 50; // Horizontal random movement

    gsap.to(snowflake, {
      y: window.innerHeight + 50, // Disapears to bottom of screen
      x: `+=${horizontalMovement}`,
      rotation: `+=${Math.random() * 360 + 180}`,
      duration: fallDuration,
      ease: "none",
      repeat: -1, // Repeat infinite
      delay: Math.random() * 3, // Random delay
      onComplete: () => {
        gsap.set(snowflake, {
          y: -50,
          x: Math.random() * window.innerWidth,
        });
      },
    });
  });
}

// Activar animación de nieve cuando se llega a la sección
ScrollTrigger.create({
  trigger: "#nieve",
  start: "top bottom",
  onEnter: () => createSnowAnimation(),
  once: true, // Solo ejecutar una vez
});

// Animación del texto de la sección nieve - Escalonada
ScrollTrigger.create({
  trigger: "#nieve",
  start: "top 70%",
  onEnter: () => {
    // Timeline para animación escalonada
    const nieveTimeline = gsap.timeline();

    // Primero aparece el título (h2)
    nieveTimeline
      .to(".nieve-title", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      })
      // Después aparece el párrafo con un delay
      .to(
        ".nieve-text",
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "+=0.3"
      ); // 0.3 segundos después del título
  },
  once: true,
});

// Estado inicial del texto de nieve
gsap.set([".nieve-title", ".nieve-text"], {
  scale: 0.5, // Empiezan pequeños
  opacity: 0,
});
