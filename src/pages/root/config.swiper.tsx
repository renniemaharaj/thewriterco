// import { coverflow } from "./effects/coverflow";
// import { fade } from "./effects/fade";
import { creative } from "./effects/creative";
// import { freeMode } from "./effects/freeMode";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export const swiperProps = {
  // ...coverflow,
  // ...fade,
  // ...freeMode,
  ...creative,
  grabCursor: true,
  speed: 800,
  pagination: { clickable: true, dynamicBullets: true },
  navigation: true,
  autoplay: { delay: 10000, disableOnInteraction: false },
};
