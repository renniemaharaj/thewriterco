import Link from "../../components/link/Link";
import Slide from "./Slide";

export const swiperSlides = [
  <Slide
    title="Be Thou My Vision"
    quote="Introducing youtube slides"
    videoUrl="https://www.youtube.com/watch?v=mQ8gqTA-F9M&list=RDmQ8gqTA-F9M&index=1"
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
        That if thou shalt confess with thy mouth the Lord Jesus, <br />
        and shalt believe in thine heart that God hath raised him from the dead,
        thou shalt be saved.
        <br />
        <br />
        For with the heart man believeth unto righteousness; and with the mouth
        confession is made unto salvation.
      </>
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
        <br /> wherewith ye shall be able to quench all the fiery darts of the
        wicked.
      </>
    }
    actionBar={
      <Link as="button" variant="soft" href="/reasoning">
        Explore reasoning
      </Link>
    }
  />,

  <Slide
    title={
      <>
        Explore the Bible through our <br /> AI-powered study tools
      </>
    }
    quote={
      <>
        Study to shew thyself approved unto God, <br /> a workman that needeth
        not to be ashamed, rightly dividing the word of truth.
      </>
    }
    actionBar={
      <Link as="button" variant="soft" href="/ai">
        Begin Studying Now
      </Link>
    }
  />,

  <Slide
    title={
      <>
        Convert your conversations to bible studies <br />
        as web pages, with our tools
      </>
    }
    quote={
      <>
        Study to shew thyself approved unto God, <br /> a workman that needeth
        not to be ashamed, rightly dividing the word of truth.
      </>
    }
    actionBar={
      <Link as="button" variant="soft" href="/doc/studyDocument">
        Learn More
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
        >
          React Front-End
        </Link>
        <Link
          as="button"
          variant="soft"
          href="https://github.com/renniemaharaj/thewriterco-auth-go"
          external
        >
          Golang Back-End
        </Link>
      </>
    }
  />,
];
