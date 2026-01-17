import { Helmet } from "react-helmet-async";

type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
};

const defaultMeta = {
  title: "TheWriterCo",
  description:
    "TheWriterCo: Christian writing, Bible study, theological reflections, poetry, and software solutions rooted in faith.",
  keywords:
    "Bible study, Christian writing, theology, scripture, faith, poetry, Christian software, TheWriterCo",
  author: "TheWriterCo",
  image: "/src/assets/favicon_io/android-chrome-512x512.png",
  url: "https://www.thewriterco.com",
};

const Seo = ({
  title = defaultMeta.title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  author = defaultMeta.author,
  image = defaultMeta.image,
  url = defaultMeta.url,
}: SeoProps) => (
  <Helmet>
    <title>{title}</title>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={author} />

    {/* Open Graph */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />

    {/* Twitter Card */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image} />

    {/* Favicon */}
    <link rel="icon" href="/src/assets/favicon.ico" type="image/x-icon" />

    {/* Fonts */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap"
      rel="stylesheet"
    />
  </Helmet>
);

export default Seo;
