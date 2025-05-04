import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";

import "swiper/css/effect-fade";

export const fade = {
  effect: "fade",
  centeredSlides: true,

  modules: [Pagination, Autoplay, Navigation, EffectFade],
};
