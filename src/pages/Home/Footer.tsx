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
} from "lucide-react";

const companyName = "The Writer Company";
const companyMission = "AI-integrated bible tools for study and research.";
const companyAddress = "Trinidad and Tobago";
const companyEmail = "rvesprey@gmail.com";
const companyPhone = "(***) ***-****";

const Footer: React.FC = () => (
  <footer id="footer" className="py-16 !max-w-[140%]">
    {/* First Column: Information Section */}
    <Flex className="w-full flex-col items-center p-10 !overflow-auto ">
      <Heading size="4" className="text-lg font-bold">
        {companyName}
      </Heading>
      <Text className="mt-2 text-sm">{companyMission}</Text>
      <Text className="mt-2 text-xs">
        {companyAddress} <br />
        {/* <Link href="#" className="text-blue-400 underline">
          Map
        </Link> */}
      </Text>
    </Flex>
    <Flex className="max-w-7xl !flex-wrap mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 w-full !items-center !justify-center p-1">
      {/* Second Column: Support Section */}
      <div className="hidden md:block">
        <Heading size="4" className="text-md font-bold mb-4">
          Support
        </Heading>
        <ul className="space-y-2">
          <li>
            <Link href="#" className="text-sm text-gray-300">
              FAQ
            </Link>
          </li>
          <li>
            <Link href="#" className="text-sm text-gray-300">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="text-sm text-gray-300">
              Terms of Service
            </Link>
          </li>
          {/* <li>
            <Button className="bg-primary text-sm mt-4">Donate Now</Button>
          </li> */}
        </ul>
      </div>

      {/* Third Column: Stay Connected */}
      <div>
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
            className="text-black"
          />
          <Button size="2" variant="solid">
            Sign Up
          </Button>
        </Flex>
        <Flex gap="4" className="mt-4 !overflow-auto">
          <Link href="https://github.com/renniemaharaj/kjv-bible">
            <GitHubLogoIcon className="h-5 w-5 text-gray-300 hover:text-white" />
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=61571490380198">
            <Facebook className="h-5 w-5 text-gray-300 hover:text-white" />
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
      </div>

      {/* Fourth Column: Contact Information */}
      <div>
        <Heading size="4" className="text-md font-bold mb-4">
          Contact Us
        </Heading>
        <Flex className="items-start gap-2 text-sm">
          <MapPin className="h-5 w-5 text-primary" />
          <Text>
            {companyAddress} <br />
            <Link href="#" className="text-blue-400 underline">
              Get Directions
            </Link>
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
      </div>
    </Flex>

    {/* Footer Bottom Section */}
    <div className="text-center mt-12 text-xs">
      &copy; {new Date().getFullYear()} The Writer Company. All rights reserved.
    </div>
  </footer>
);

export default Footer;
