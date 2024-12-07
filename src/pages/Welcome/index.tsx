import {
  Button,
  Flex,
  Text,
  Table,
  Skeleton,
  DataList,
  Badge,
  Box,
  Tabs,
  Select,
} from "@radix-ui/themes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  logOut,
  // selectCurrentToken,
  selectCurrentUser,
} from "../../app/api/auth/authSlice";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../app/api/auth/authApiSlice";
import { useThemeContext } from "../../components/context/useThemeContext";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Hint from "../../components/Hint";
import { AllowedColors } from "../../components/RadixColors";

export default function Welcome() {
  const user = useAppSelector(selectCurrentUser);
  // const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const welcome = user ? `Welcome ${user.firstName}!` : "Welcome";
  // const tokenAbbr = `${token?.slice(0, 9)} ...`;
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
    const fetchedServices = [
      {
        title: "Flow",
        description: "Flow designer, workflow manager and automations",
        href: "/flow",
      },
    ];
    setTimeout(() => {
      setServices(fetchedServices);
    }, 2000);
  };

  useEffect(() => {
    fetchAuthorizedServices();
  }, []);

  const refreshBtn = () => {
    return (
      <Button
        className="!mx-1"
        variant="ghost"
        size={"1"}
        disabled={services.length == 0}
        highContrast
        onClick={() => {
          setServices([]);
          fetchAuthorizedServices();
        }}
      >
        refreshing
      </Button>
    );
  };

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
            <Tabs.Trigger value="preference">Preference</Tabs.Trigger>
          </Tabs.List>
          <Box pt="3">
            <Tabs.Content value="account">
              {/* <Separator className="!w-full" /> */}
              <DataList.Root className="mt-4">
                {/* Access Status */}
                <DataList.Item>
                  <DataList.Label minWidth="88px">Status</DataList.Label>
                  <DataList.Value>
                    <Badge color="jade" variant="soft" radius="full">
                      Authorized
                    </Badge>
                  </DataList.Value>
                </DataList.Item>

                {/* User Name */}
                <DataList.Item>
                  <DataList.Label minWidth="88px">Username</DataList.Label>
                  <DataList.Value>
                    <Text>{user?.userName}</Text>
                  </DataList.Value>
                </DataList.Item>

                {/* User Full Name */}
                <DataList.Item>
                  <DataList.Label minWidth="88px">Full Name</DataList.Label>
                  <DataList.Value>
                    <Text>
                      {user?.firstName} {user?.lastName}
                    </Text>
                  </DataList.Value>
                </DataList.Item>

                {/* User Email Address */}
                <DataList.Item>
                  <DataList.Label minWidth="88px">Email</DataList.Label>
                  <DataList.Value>
                    <Text>{user?.emailAddress}</Text>
                  </DataList.Value>
                </DataList.Item>
              </DataList.Root>
              <Box className="!mt-2 !mb-2 !flex gap-2">
                <Button
                  onClick={handleLogout}
                  color="red"
                  className="!mt-4 !w-full"
                >
                  Sign Out
                </Button>
              </Box>
            </Tabs.Content>

            <Tabs.Content value="preference">
              <Text size="2">Access and update your preferences</Text>
              {/* <Box className="!mt-2 !mb-2 !flex content-between"> */}
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
      {/* Right Column - Available Services */}
      <Flex
        direction="column"
        className="max-w-[400px] min-w-[350px] p-5 rounded-lg shadow-[gray] shadow-sm"
      >
        <Text
          as="div"
          size="6"
          weight="bold"
          color={headingFontColor as AllowedColors}
          className="text-center mb-4"
        >
          Authorized Services
        </Text>
        <Table.Root className="w-full text-center">
          <Table.Header>
            <Table.Row>
              <Table.RowHeaderCell>Service</Table.RowHeaderCell>
              <Table.RowHeaderCell>Description</Table.RowHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {services.length > 0 ? (
              services.map((service, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Link to={service.href}>
                      <Button variant="outline" size={"1"}>
                        {service.title}
                      </Button>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{service.description}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Skeleton />
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </>
            )}
          </Table.Body>
        </Table.Root>
        <Hint>
          Services you've subscribed to will be displayed here. Please contact
          support if some services are missing or try {refreshBtn()} which may
          resolve missing services.
        </Hint>
      </Flex>
    </Flex>
  );
}
