import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

import "swiper/css/free-mode";

export const freeMode = {
  effect: "freemode",
  centeredSlides: true,

  modules: [Pagination, Autoplay, Navigation, FreeMode],
};
