import { Autoplay, EffectCreative, Navigation, Pagination } from "swiper/modules";

import "swiper/css/effect-creative";

export const creative = {
  effect: "creative",
  centeredSlides: true,
  creativeEffect: {
    prev: {
      //   shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },

  modules: [Pagination, Autoplay, Navigation, EffectCreative],
};
