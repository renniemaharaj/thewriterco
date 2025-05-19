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
    title="The Rise of Christianity:"
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
        and believe in your heart that God raised him from the dead, you will be
        saved.
        <br />
        <br />
        For with the heart one believes and is justified, and with the mouth one
        confesses and is saved.
      </>
    }
  />,
  <Slide
    title={<>Imaginary Lines</>}
    quote={
      <>
        This steadfast faith of mine; I'm steadfast—I hold fast to imaginary
        lines.
        <br />
        I cannot see, and my feelings are contrary to His promises—mere promises
        indeed.
        <br />
        My reasoning fails me, and all I have is what I initially believed.
        <br />
        That first belief, even with His presence moving on my seas; that
        surety, on and off, evades me.
      </>
    }
  />,
  <Slide
    title={<>Her Shaking</>}
    quote={
      <>
        I will be moved out of my place in heaven, in all this unbearable
        shaking,
        <br />I will drift away from light—my—sun; and His moon will be turned
        blood red; light-forsaken.
        <br />
        To outer darkness forever, and eternal separation from God; caught in: a
        curse of unbelief, a free fall.
        <br />A worthy event, demanding the much-debated proof of God. He will
        come, and as a terrifying sight-seen on clouds.
      </>
    }
  />,
  <Slide
    title={<>For Purpose</>}
    quote={
      <>
        I will raise her up: on a high platform; above the flood. Her voice will
        transcend the limit of friends, mutuals and followers, reaching the four
        ends of the internet.
        <br />
        Because I am militant and my voice can be harsh, but she will speak in
        grace, gracefully balancing on the shoulders of my wit.
        <br />
        Count the frequency of eclipses the earth sees per year. I have a
        vision, we will increase this. The earth is yet to see many more
        eclipses.
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
        Biblical Perspective <br /> on Today's Headlines
      </>
    }
    quote={
      <>
        And he said unto them, Take heed what ye hear. <br />
        With what measure ye mete, it shall be measured to you.
      </>
    }
    actionBar={
      <Link
        as="button"
        variant="soft"
        href="/daily"
        aria-label="View daily news report"
      >
        View News Report
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
        <br /> wherewith ye shall be able to quench all the fiery darts of the
        wicked.
      </>
    }
    actionBar={
      <Link
        as="button"
        variant="soft"
        href="/reasoning"
        aria-label="Study reasoning"
      >
        Study reasoning
      </Link>
    }
  />,

  <Slide
    title={
      <>
        Create study-ready documents <br />
        as web pages, with our tools
      </>
    }
    quote={
      <>
        But sanctify the Lord God in your hearts: <br />
        and be ready always to give an answer to every man that asketh you a
        reason of the hope that is in you with meekness and fear.
      </>
    }
    actionBar={
      <Link
        as="button"
        variant="soft"
        href="/doc/studyDocument"
        aria-label="Learn about study documents"
      >
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
