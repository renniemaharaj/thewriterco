import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Heading, Text, Flex, Link, TextField, Button } from "@radix-ui/themes";
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

const companyName = "The Writer Company";
const companyMission =
  "Bible, writing, resources and open source biblical tools.";
const companyAddress = "Trinidad and Tobago";
const companyEmail = "rvesprey@gmail.com";
const companyPhone = "(***) ***-****";

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="py-16 !max-w-[140% bg-[#171918] text-white">
      {/* First Column: Information Section */}

      {/* <Box className="relative p-4"> */}
      <Flex className="w-full !overflow-hidden !items-center !justify-center">
        <Flex className="!flex-col p-10 !items-center !relative !overflow-visible">
          <Heading className="text-2xl font-bold">{companyName}</Heading>
          <Text className="mt-2 text-sm">{companyMission}</Text>
          <Text className="mt-2 text-xs">
            {companyAddress} <br />
          </Text>
        </Flex>
      </Flex>
      {/* </Box> */}

      <Flex className="max-w-7xl !flex-wrap mx-auto flex !gap-10 w-full !text-center !items-center !justify-center p-1">
        {/* Second Column: Support Section */}
        <Flex className="!flex-col">
          <Heading size="4" className="text-md font-bold mb-4">
            Support
          </Heading>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-sm !text-gray-300 hover:!text-white"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm !text-gray-300 hover:!text-white"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm !text-gray-300 hover:!text-white"
              >
                Terms of Service
              </Link>
            </li>
            {/* <li>
            <Button className="bg-primary text-sm mt-4">Donate Now</Button>
          </li> */}
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
            {/* <Link href="#">
            <Twitter className="h-5 w-5 text-gray-300 hover:text-white" />
          </Link>
          <Link href="#">
            <Instagram className="h-5 w-5 text-gray-300 hover:text-white" />
          </Link>
          <Link href="#">
            <Linkedin className="h-5 w-5 text-gray-300 hover:text-white" />
          </Link>
          <Link href="#">
            <Youtube className="h-5 w-5 text-gray-300 hover:text-white" />
          </Link> */}
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
                <Link href="#" className="!text-gray-300 hover:!text-white">
                  {companyAddress}
                </Link>
              )}
            </Text>
          </Flex>
          <Flex className="items-center gap-2 text-sm mt-2">
            <Mail className="h-5 w-5 text-primary" />
            <Link
              href={`mailto:${companyEmail}`}
              className="!text-gray-300 hover:!text-white"
            >
              Email: {companyEmail}
            </Link>
          </Flex>

          <Flex className="items-center gap-2 text-sm mt-2">
            <Phone className="h-5 w-5 text-primary" />
            <Text>Phone: {companyPhone}</Text>
          </Flex>
        </Flex>

        <div className="basis-[100%]" />
        {/* Fifth Column: Support */}
        <Flex className="!flex-col">
          <Heading size="4" className="text-md font-bold mb-4 mt-4">
            Support Us
          </Heading>
          <Flex className="items-center gap-2 text-sm mt-2">
            <HandCoinsIcon className="h-5 w-5 text-primary" />
            <Link
              href="https://paypal.me/newrennie"
              className="!text-gray-300 hover:!text-white"
            >
              Paypal Contribute
            </Link>
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
