import {
  Pagination,
  Autoplay,
  Navigation,
  EffectCoverflow,
} from "swiper/modules"; // Import modules

import "swiper/css/effect-coverflow"; // Import coverflow effect CSS
export const coverflow = {
  effect: "coverflow",
  centeredSlides: true,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },

  modules: [Pagination, Autoplay, Navigation, EffectCoverflow],
};
