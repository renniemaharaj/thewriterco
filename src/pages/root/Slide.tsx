import { FC, ReactNode } from "react";
import { Flex, Quote, Separator, Text } from "@radix-ui/themes";

export type SlideProps = {
  title: ReactNode;
  quote?: ReactNode;
  actionBar?: ReactNode;
  media?: ReactNode;
  videoUrl?: string; // NEW!
};

const getYouTubeEmbedUrl = (url: string): string | null => {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
  const match = url.match(youtubeRegex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const Slide: FC<SlideProps> = ({
  title,
  quote,
  actionBar,
  media,
  videoUrl,
}) => {
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
        <div className="mt-4 w-full max-w-2xl aspect-video">
          {media ? (
            media
          ) : (
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
