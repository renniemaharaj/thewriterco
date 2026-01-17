import Link from "../../pkg/link/Link";
import Slide from "./Slide";

export const swiperSlides = [
  <Slide
    title="Eric Ludy - He is (The Names of God)"
    quote="Who is like the Lord Jesus Christ?"
    videoUrl="https://www.youtube.com/watch?v=NscHCa395-M"
    videoMeta={{
      title: "Eric Ludy - He is (The Names of God)",
      author: "Ellerslie Discipleship Training",
      originalUrl: "https://www.youtube.com/watch?v=NscHCa395-M",
      album: "",
      country: "",
    }}
  />,
  <Slide
    title="The Rise of Christianity"
    quote="Why It's Spreading Fast and What It Means for the Church"
    videoUrl="https://www.youtube.com/watch?v=87IGqrjDooo"
    videoMeta={{
      title: "The Rise of Christianity",
      author: "Daniel Maritz",
      originalUrl: "https://www.youtube.com/watch?v=87IGqrjDooo",
      album: "",
      country: "",
    }}
  />,
  <Slide
    title={
      <>
        Confess with your mouth the Lord Jesus, <br />
        and believe in your heart ❤️
      </>
    }
    quote={
      <>
        If you confess with your mouth that Jesus is Lord, <br />
        and believe in your heart that God raised him from the dead, you will be saved.
        <br />
        <br />
        For with the heart one believes and is justified, and with the mouth one confesses and is
        saved.
      </>
    }
  />,
  <Slide
    title={
      <>
        Read, listen, or both <br />
        with native Browser Voice Synthesis
      </>
    }
    quote={
      <>
        Your word I have hidden in my heart, <br />
        that I might not sin against You.
      </>
    }
    actionBar={
      <Link as="button" variant="soft" href="/kjv" aria-label="Read kjv">
        Read KJV
      </Link>
    }
  />,

  <Slide
    title={
      <>
        Reinforce your faith with <br /> reasoning
      </>
    }
    quote={
      <>
        Above all, taking the shield of faith,
        <br /> wherewith ye shall be able to quench all the fiery darts of the wicked.
      </>
    }
    actionBar={
      <Link as="button" variant="soft" href="/read" aria-label="Study reasoning">
        Study rationale
      </Link>
    }
  />,

  <Slide
    title={
      <>
        Open source on <br /> Github
      </>
    }
    quote={<>Pull Requests are welcome!</>}
    actionBar={
      <>
        <Link
          as="button"
          variant="soft"
          href="https://github.com/renniemaharaj/thewriterco"
          external
          aria-label="React front end github"
        >
          React Front-End
        </Link>
        <Link
          as="button"
          variant="soft"
          href="https://github.com/renniemaharaj/thewriterco-auth-go"
          external
          aria-label="Golang back end github"
        >
          Golang Back-End
        </Link>
      </>
    }
  />,
];
