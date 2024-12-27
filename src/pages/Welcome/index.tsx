import {
  Button,
  Flex,
  Text,
  Skeleton,
  DataList,
  Box,
  Tabs,
  Select,
  Card,
  Separator,
} from "@radix-ui/themes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  logOut,
  // selectCurrentToken,
  selectCurrentUser,
} from "../../app/api/auth/authSlice";
import { useLogoutMutation } from "../../app/api/auth/authApiSlice";
import { useThemeContext } from "../../components/context/useThemeContext";
import { ExitIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Hint from "../../components/Hint";
import { AllowedColors } from "../../components/RadixColors";

export default function Welcome() {
  const currentUser = useAppSelector(selectCurrentUser);
  // const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const welcome = currentUser ? `Welcome ${currentUser.firstName}!` : "Welcome";
  // const tokenAbbr = ${token?.slice(0, 9)} ...;
  const { theme, specifyTheme, usesSystemTheme } = useThemeContext();

  const handleThemeChange = (theme: "Light" | "Dark" | "System") => {
    specifyTheme(theme.toLowerCase() as "light" | "dark" | "system");
  };

  const headingFontColor = theme === "light" ? "gray" : "white";
  const handleLogout = async () => {
    const result = await logout(undefined).unwrap();
    if (!result.user) dispatch(logOut());
  };

  const [services, setServices] = useState<
    { title: string; description: string; href: string }[]
  >([]);

  const fetchAuthorizedServices = async () => {
    // Fetch services from an API or define them here
    setTimeout(() => {
      setServices([]);
    }, 2000);
  };

  useEffect(() => {
    fetchAuthorizedServices();
  }, []);

  return (
    <Flex
      align="center"
      justify="center"
      gap={"6"}
      className="min-h-screen p-5 !flex-wrap"
    >
      {/* Left Column - User Information */}
      <Flex
        direction="column"
        className="max-w-[350px] min-w-[350px] p-5 rounded-lg shadow-[gray] shadow-sm"
      >
        <Text
          as="div"
          size="6"
          weight="bold"
          color={headingFontColor as AllowedColors}
          className="text-center mb-4"
        >
          {welcome}
        </Text>
        <Tabs.Root defaultValue="account">
          <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
          </Tabs.List>
          <Box pt="3">
            <Tabs.Content value="account">
              {/* <Separator className="!w-full" /> */}
              <DataList.Root className="mt-4">
                {/* User Name */}
                <DataList.Item>
                  <DataList.Label minWidth="88px">Username</DataList.Label>
                  <DataList.Value>
                    <Text>{currentUser?.userName}</Text>
                  </DataList.Value>
                </DataList.Item>

                {/* User Full Name */}
                <DataList.Item>
                  <DataList.Label minWidth="88px">Full Name</DataList.Label>
                  <DataList.Value>
                    <Text>
                      {currentUser?.firstName} {currentUser?.lastName}
                    </Text>
                  </DataList.Value>
                </DataList.Item>

                {/* User Email Address */}
                <DataList.Item>
                  <DataList.Label minWidth="88px">Email</DataList.Label>
                  <DataList.Value>
                    <Text>{currentUser?.emailAddress}</Text>
                  </DataList.Value>
                </DataList.Item>
              </DataList.Root>
              <Box className="!mt-2 !mb-2 !flex gap-2">
                <Button
                  onClick={() => (location.href = "/")}
                  color="crimson"
                  className="!mt-4 !w-full"
                >
                  <ExitIcon />
                  Home
                </Button>
              </Box>
              <Box className="!mt-2 !mb-2 !flex gap-2">
                <Button
                  onClick={handleLogout}
                  color="red"
                  className="!mt-4 !w-full"
                >
                  <ExitIcon />
                  Return to portal
                </Button>
              </Box>
            </Tabs.Content>

            <Tabs.Content value="preferences">
              <Text size="2">Access and update your preferences</Text>
              <Separator size={"4"} />
              <Flex className="!flex-row !justify-between !w-full mt-2">
                <Text size="2">Theme</Text>
                <Flex className="!flex-col gap-1 mt-1 mb-1">
                  <Select.Root
                    defaultValue={(usesSystemTheme && "system") || theme}
                    onValueChange={handleThemeChange}
                  >
                    <Select.Trigger>
                      <Flex align="center" gap="2">
                        {theme === "light" && <SunIcon />}
                        {theme === "dark" && <MoonIcon />}
                        {(usesSystemTheme && "System") ||
                          theme.substring(0, 1).toUpperCase() +
                            theme.substring(1)}
                      </Flex>
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Group>
                        <Select.Label>Theme Modes</Select.Label>
                        {["Light", "Dark", "System"].map(
                          (themeChoice, index) => (
                            <Select.Item
                              key={index}
                              value={themeChoice.toLowerCase()}
                              disabled={
                                (themeChoice == "System" && usesSystemTheme) ||
                                themeChoice.toLowerCase() === theme
                              }
                            >
                              {themeChoice}
                            </Select.Item>
                          ),
                        )}
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                  <Box className="!flex !flex-row gap-1">
                    {usesSystemTheme ? (
                      <Hint>System detected: {theme}</Hint>
                    ) : (
                      <Hint>Theme override: {theme}</Hint>
                    )}
                  </Box>
                </Flex>
              </Flex>
              {/* </Box> */}
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
      {/* Services Section with Skeletons */}
      <Flex
        direction="column"
        className="max-w-[400px] min-w-[350px] p-5 rounded-lg shadow-[gray]"
      >
        <Text size="6" weight="bold" className="text-center mb-4">
          Actions and Services
        </Text>

        <Flex direction="column" gap="3">
          {/* Render Cards for Services */}
          {services.length > 0
            ? services.map((service, index) => (
                <Card key={index} className="p-4 rounded-lg text-white">
                  <Text size="4" weight="bold">
                    {service.title}
                  </Text>
                  <Text size="2" color="gray">
                    {service.description}
                  </Text>
                  <Button
                    // href={service.href}
                    variant="outline"
                    size="2"
                    className="mt-2"
                  >
                    Visit
                  </Button>
                </Card>
              ))
            : // Display Skeletons for Loading State
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="p-4 rounded-lg">
                  <Skeleton height="20px" className="mb-2" />
                  <Skeleton height="16px" />
                </Card>
              ))}
        </Flex>
        <Hint>We will display your available actions and services here</Hint>
      </Flex>
    </Flex>
  );
}
