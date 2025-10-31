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
      start: "top 80%",
      end: "bottom 30%",
      toggleActions: "play none none none",
    },
  });
});

// Animation of sections intro
gsap.utils.toArray(".gsap-section-intro").forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    pin: true,
    pinSpacing: false,
    markers: false,
  });
});

// Sun scaling animation
ScrollTrigger.create({
  trigger: "#sol .section-container",
  start: "top bottom",
  end: "top top",
  scrub: true,
  animation: gsap.fromTo(
    ".sun",
    {
      scale: 1,
      transformOrigin: "center center",
    },
    {
      scale: 25,
      ease: "power2.out",
    }
  ),
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
    },
  });
});

// events: "onEnter onLeave onEnterBack onLeaveBack",
// options: play, pause, resume, reset, restart,
