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

// events: "onEnter onLeave onEnterBack onLeaveBack",
// options: play, pause, resume, reset, restart, complete,

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
