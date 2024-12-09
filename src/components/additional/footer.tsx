// components/Footer.tsx
import React from "react";
import { Flex, Link, Spinner, Text } from "@radix-ui/themes";
import {
  InstagramLogoIcon,
  TwitterLogoIcon,
  // FacebookLogoIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";

// Define the FooterItem type
type FooterItem = {
  text: string;
  href?: string; // href is optional for plain text
  weight: "regular" | "medium" | "bold";
};

type SocialMediaLink = {
  platform: string;
  href: string;
  icon: React.ReactNode;
  animateLoading: boolean;
};

// Footer items array
const footerItems: FooterItem[] = [
  { text: "© 2024 The Writer Company", weight: "medium" },
  { text: "Privacy Policy", href: "/privacy-policy", weight: "regular" },
  { text: "Terms of Service", href: "/terms", weight: "regular" },
];

const socialMediaLinksList: SocialMediaLink[] = [
  {
    platform: "Facebook",
    href: "https://facebook.com",
    animateLoading: false,
    icon: <QuestionMarkIcon />,
  },
  {
    platform: "Twitter",
    href: "https://twitter.com",
    icon: <TwitterLogoIcon />,
    animateLoading: false,
  },
  {
    platform: "Instagram",
    href: "https://instagram.com",
    icon: <InstagramLogoIcon />,
    animateLoading: false,
  },
  {
    platform: "Gmail",
    href: "mailto:rvesprey@gmail.com",
    icon: <EnvelopeClosedIcon />,
    animateLoading: false,
  },
  {
    platform: "GitHub",
    href: "https://github.com/renniemaharaj/kjv-bible",
    icon: <GitHubLogoIcon />,
    animateLoading: false,
  },
];
const Footer: React.FC = () => {
  const [socialMediaLinks, setSocialMediaLinks] =
    React.useState<SocialMediaLink[]>(socialMediaLinksList);

  const toggleSocialMediaLink = (platform: string, state: boolean) => {
    setSocialMediaLinks(
      socialMediaLinks.map((item) => {
        if (item.platform === platform) {
          return { ...item, animateLoading: state };
        }
        return item;
      }),
    );
  };

  const handleOnClick = (link: SocialMediaLink) => {
    toggleSocialMediaLink(link.platform, true);
    setTimeout(() => {
      toggleSocialMediaLink(link.platform, false);
    }, 1000);
  };
  return (
    <footer id="footer" className="w-full py-8 pb-20">
      <div className="container mx-auto text-center">
        {/* Render footer items */}
        <Flex direction="column" gap="2" as="div" className="mb-4">
          {footerItems.map((item, index) =>
            item.href ? (
              <Link
                key={index}
                href={item.href}
                size="3"
                weight={item.weight}
                className="text-gray-700 hover:text-blue-500"
              >
                {item.text}
              </Link>
            ) : (
              <Text key={index} size="3" weight={item.weight}>
                {item.text}
              </Text>
            ),
          )}
        </Flex>

        {/* Social media links */}
        <Flex justify="center" gap="4" mt="4" as="div">
          {socialMediaLinks.map((link) => (
            <Link
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
              onClick={() => handleOnClick(link)}
            >
              <span>{link.animateLoading ? <Spinner /> : link.icon}</span>
            </Link>
          ))}
        </Flex>
      </div>
    </footer>
  );
};

export default Footer;
