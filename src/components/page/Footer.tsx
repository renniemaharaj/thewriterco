import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Heading,
  Text,
  Flex,
  Link,
  TextField,
  Button,
  Separator,
} from "@radix-ui/themes";
import {
  Facebook,
  //   Instagram,
  //   Twitter,
  //   Linkedin,
  //   Youtube,
  MapPin,
  Mail,
  Phone,
  HandCoinsIcon,
} from "lucide-react";
import Hero from "../Hero";
import Hint from "../Hint";

const companyName = "The Writer Company";
const companyMission =
  "Bible, writing, resources and open source biblical tools.";
const companyAddress = "Trinidad and Tobago ";
const companyEmail = "rvesprey@gmail.com";
const companyPhone = "(***) ***-****";

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="flex !flex-col !gap-5 py-16">
      {/* First Column: Information Section */}
      <Hero
        header={companyName}
        className="!text-center max-w-[500px] mx-auto"
        subHeader={
          <div>
            <Text className="country-colored-text-tt">{companyAddress}</Text>
            <br />
            <Hint>{companyMission}</Hint>
          </div>
        }
      />
      <Separator size={"1"} className="mx-auto" />
      {/* </Box> */}
      <Flex className="max-w-7xl !flex-wrap mx-auto flex !gap-10 w-full !text-center !items-center !justify-center p-1">
        {/* Second Column: Support Section */}
        <Flex className="!flex-col">
          <Heading size="4" className="text-md font-bold mb-4">
            Support
          </Heading>
          <ul className="space-y-2">
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/tos">Terms of Service</Link>
            </li>
          </ul>
        </Flex>

        {/* Third Column: Stay Connected */}
        <Flex className="!flex-col">
          <Heading size="4" className="text-md font-bold mb-4">
            Stay Connected
          </Heading>
          <Text className="text-sm mb-4">
            Subscribe to our mailing list to get news and updates.
          </Text>
          <Flex className="gap-2">
            <TextField.Root
              disabled
              size="2"
              placeholder="Enter your email"
              // className="text-black"
            />
            <Button size="2" variant="solid" highContrast disabled>
              Sign Up
            </Button>
          </Flex>
          <Flex gap="4" className="mt-4 !overflow-auto">
            <Link href="https://github.com/renniemaharaj/kjv-bible">
              <GitHubLogoIcon className="h-5 w-5 text-gray-300 hover:!text-white" />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61571490380198">
              <Facebook className="h-5 w-5 text-gray-300 hover:!text-white" />
            </Link>
          </Flex>
        </Flex>

        {/* Fourth Column: Contact Information */}
        <Flex className="!flex-col">
          <Heading size="4" className="text-md font-bold mb-4">
            Contact Us
          </Heading>
          <Flex className="items-start gap-2 text-sm">
            <MapPin className="h-5 w-5 text-primary" />
            <Text>
              {companyAddress && (
                <Text className="country-colored-text-tt">
                  {companyAddress}
                </Text>
              )}
            </Text>
          </Flex>
          <Flex className="items-center gap-2 text-sm mt-2">
            <Mail className="h-5 w-5 text-primary" />
            <Link href={`mailto:${companyEmail}`}>Email: {companyEmail}</Link>
          </Flex>

          <Flex className="items-center gap-2 text-sm mt-2">
            <Phone className="h-5 w-5 text-primary" />
            <Text>Phone: {companyPhone}</Text>
          </Flex>
        </Flex>

        <div className="basis-[100%]" />
        {/* Fifth Column: Support */}
        <Flex className="!flex-col">
          <Heading size="4" className="text-md font-bold">
            Support Us
          </Heading>
          <Flex className="items-center gap-2 text-sm mt-2">
            <HandCoinsIcon className="h-5 w-5 text-primary" />
            <Link href="https://paypal.me/newrennie">Paypal Contribute</Link>
          </Flex>
        </Flex>
      </Flex>

      {/* Footer Bottom Section */}
      <div className="text-center mt-12 text-xs">
        &copy; {new Date().getFullYear()} The Writer Company. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
