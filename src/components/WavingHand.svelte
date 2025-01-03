<script>
  // TODO: Refine the debounce counter

  import confetti from "canvas-confetti";
  import { prefersReducedMotion } from "svelte/motion";

  class DebounceCounter {
    count = $state(0);
    timer = null;

    constructor(timeoutMs) {
      this.timeoutMs = timeoutMs;
    }

    hit() {
      this.incrementCount();
      // this.startTimer();
    }

    startTimer() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(this.resetCount.bind(this), this.timeoutMs);
    }

    incrementCount() {
      this.count++;
    }

    resetCount() {
      this.count = 0;
    }
  }

  let hand,
    handIsExploding = false;

  const intensityCounter = new DebounceCounter(5000);

  const handIsWaving = () => hand.getAnimations().length > 0;

  const successiveAnimations = [
    { scaleTo: 1.2, duration: 1250 },
    { scaleTo: 1.6, duration: 1000 },
    { scaleTo: 2, duration: 750 },
    { scaleTo: 3, duration: 500 },
    { scaleTo: 6, duration: 400 },
  ];

  const wave = ({ scaleTo, duration }) => {
    const keyframes = [
      { transform: `rotate(0deg) scale(1)` },
      { transform: `rotate(14deg) scale(${scaleTo})`, offset: 0.15 },
      { transform: `rotate(-8deg) scale(${scaleTo})`, offset: 0.3 },
      { transform: `rotate(14deg) scale(${scaleTo})`, offset: 0.45 },
      { transform: `rotate(-4deg) scale(${scaleTo})`, offset: 0.6 },
      { transform: `rotate(10deg) scale(${scaleTo})`, offset: 0.75 },
      { transform: `rotate(0deg) scale(1)`, offset: 1 },
    ];

    const options = { duration, iterations: 1 };

    const animation = hand.animate(keyframes, options);
    animation.finished.then(() => {
      intensityCounter.startTimer();
    });
  };

  const explode = async () => {
    handIsExploding = true;

    const scalar = 15;
    const handEmoji = confetti.shapeFromText({ text: "👋🏻", scalar });

    // Origin as a percent relative to the viewport
    // where [0,0] = top left and [1,1] = bottom right
    const origin = {
      x: (hand.offsetLeft + hand.offsetWidth / 2) / window.innerWidth,
      y: hand.offsetTop / window.innerHeight,
    };

    // Hand-fetti 🎉
    await confetti({
      shapes: [handEmoji],
      scalar,
      flat: true,
      origin,
      spread: 120,
      angle: 50,
      particleCount: 20,
      useWorker: true,
    });

    handIsExploding = false;
  };

  const trigger = async () => {
    if (handIsWaving() || handIsExploding || prefersReducedMotion.current) {
      return;
    }

    intensityCounter.hit();
    const i = intensityCounter.count;
    if (successiveAnimations[i - 1]) {
      wave(successiveAnimations[i - 1]);
    } else {
      await explode();
      intensityCounter.resetCount();
    }
  };
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<span
  bind:this={hand}
  onmouseover={trigger}
  ontouchstart={trigger}
  aria-hidden="true">👋🏻</span
>

<style>
  /* Adapted from: https://codepen.io/jakejarvis/pen/pBZWZw */

  span {
    animation-name: wave-animation;
    animation-duration: 1.5s;
    animation-iteration-count: 1;
    animation-delay: 0s;
    transform-origin: 70% 70%;
    display: inline-block;
    cursor: default;
  }

  @media (prefers-reduced-motion) {
    span {
      animation: none;
    }
  }

  @keyframes wave-animation {
    0% {
      transform: rotate(0deg);
    }
    15% {
      transform: rotate(14deg);
    }
    30% {
      transform: rotate(-8deg);
    }
    45% {
      transform: rotate(14deg);
    }
    60% {
      transform: rotate(-4deg);
    }
    75% {
      transform: rotate(10deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
</style>
