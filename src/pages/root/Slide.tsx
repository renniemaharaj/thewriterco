import { Flex, Quote, Separator, Text } from "@radix-ui/themes";
import { FC, ReactNode, useState } from "react";
import MetaText from "./MetaText";

export type SlideProps = {
  title: ReactNode;
  quote?: ReactNode;
  actionBar?: ReactNode;
  media?: ReactNode;
  videoUrl?: string;
  showBlurOverlay?: boolean;
  videoMeta?: {
    title: string;
    author: string;
    originalUrl: string;
    album: string;
    country: string;
  };
};

const getYouTubeEmbedUrl = (url: string): string | null => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const Slide: FC<SlideProps> = ({
  title,
  quote,
  actionBar,
  media,
  videoUrl,
  videoMeta,
}) => {
  const [revealMeta, setRevealMeta] = useState(false);
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="w-full h-full max-w-3xl mx-auto px-4 text-center gap-4"
    >
      <Text className="text-2xl font-semibold text-foreground leading-snug">
        {title}
      </Text>

      {quote && (
        <>
          <Separator size="1" />
          <Quote className="italic text-lg sm:text-xl opacity-90 px-6 leading-relaxed">
            {quote}
          </Quote>
        </>
      )}

      {(media || embedUrl) && (
        <div className="w-full max-w-[500px] aspect-video">
          {media || (
            <iframe
              width="100%"
              height="100%"
              src={embedUrl!}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            />
          )}
        </div>
      )}

      {embedUrl && videoMeta && (
        <div
          className="mt-4 w-full px-1 cursor-pointer"
          onClick={() => setRevealMeta(true)}
        >
          <Flex direction="row" justify="between" gap="2" wrap="wrap">
            <Flex direction="column" gap="1" className="flex-1 min-w-[45%]">
              <MetaText reveal={revealMeta}>{videoMeta.title}</MetaText>
              {videoMeta.album && (
                <MetaText reveal={revealMeta}>{videoMeta.album}</MetaText>
              )}
            </Flex>
            <Flex direction="column" gap="1" className="flex-1 min-w-[45%]">
              <MetaText reveal={revealMeta} asLink href={videoMeta.originalUrl}>
                {videoMeta.author}
              </MetaText>
              {videoMeta.country && (
                <MetaText
                  reveal={revealMeta}
                  className={`country-colored-text-${videoMeta.country}`}
                >
                  {videoMeta.country}
                </MetaText>
              )}
            </Flex>
          </Flex>
          {!revealMeta && (
            <Text className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs italic opacity-70 mt-2">
              Click to reveal source metadata
            </Text>
          )}
        </div>
      )}

      {actionBar && (
        <>
          <Separator size="1" />
          <div className="mt-2 flex gap-2">{actionBar}</div>
        </>
      )}
    </Flex>
  );
};

export default Slide;
