import { Pagination, Autoplay, Navigation, FreeMode } from "swiper/modules";

// import "swiper/css/effect-fade";
import "swiper/css/free-mode";

export const freeMode = {
  effect: "freemode",
  centeredSlides: true,

  modules: [Pagination, Autoplay, Navigation, FreeMode],
};
