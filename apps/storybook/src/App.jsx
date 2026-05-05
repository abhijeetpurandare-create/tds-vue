import {useEffect, useState} from "react";
import {
  Pill,
  ThemeProvider,
  Input,
  Button,
  Avatar,
  Card,
  FloatingButton,
  Sidebar,
} from "@delhivery/tarmac";
import "@delhivery/tarmac/dist/style.css";
import "./App.css";
import "./input.css";

function App() {
  const [themeData, setThemeData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTheme, setActiveTheme] = useState("light");
  const [activeRoute, setActiveRoute] = useState("/dashboard");
  const [sidebarVariation, setSidebarVariation] = useState("light");

  useEffect(() => {
    async function fetchTheme() {
      try {
        const response = await fetch("/Theme_Red.json");
        if (!response.ok) {
          throw new Error("Failed to load theme");
        }
        const data = await response.json();
        setThemeData(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchTheme();
  }, []);

  const toggleTheme = () => {
    setActiveTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const navigation = [
    {
      name: "Dashboard",
      icon: {
        name: "gauge-simple",
        pack: "fas",
      },
      to: "/dashboard",
      count: 7,
    },
    {
      name: "Team",
      icon: {
        name: "user",
        pack: "fas",
      },
      children: [
        {name: "Overview", to: "/teams/overview", count: 2},
        {
          name: "Members",
          to: "/teams/members",
          count: 1,
          hidden: true,
        },
        {name: "Calendar", to: "/teams/calendar"},
        {name: "Settings", to: "/teams/settings"},
      ],
    },
    {
      name: "Projects",
      icon: {
        name: "folder",
        pack: "fas",
      },
      children: [
        {name: "Overview", to: "/projects/overview"},
        {name: "Members", to: "/projects/members"},
        {name: "Calendar", to: "/projects/calendar"},
        {name: "Settings", to: "/projects/settings"},
      ],
    },
    {
      name: "Calendar",
      icon: {
        name: "calendar",
        pack: "fas",
      },
      children: [
        {name: "Overview", to: "/calendar/overview"},
        {name: "Members", to: "/calendar/members"},
        {name: "Calendar", to: "/calendar"},
        {name: "Settings", to: "/calendar/settings"},
      ],
    },
    {
      name: "Documents",
      icon: {
        name: "inbox",
        pack: "fas",
      },
      children: [
        {name: "Overview", to: "/documents/overview"},
        {name: "Members", to: "/documents/members"},
        {name: "Calendar", to: "/documents/calendar"},
        {name: "Settings", to: "/documents/settings"},
      ],
    },
    {
      name: "Reports",
      icon: {
        name: "chart-line",
        pack: "fas",
      },
      children: [
        {name: "Overview", to: "/reports/overview", count: 5},
        {name: "Members", to: "/reports/members", count: 3},
        {name: "Calendar", to: "/reports/calendar"},
        {name: "Settings", to: "/reports/settings"},
      ],
    },
  ];

  if (error) return <div>Error loading theme: {error}</div>;
  if (!themeData) return <div>No theme data available</div>;

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-2">
        {/* or can use initialTheme which has the JSON */}
        <ThemeProvider
          key={activeTheme}
          activeTheme={activeTheme}
          initialSource="/Theme_Red.json"
        >
          <Button
            className="uppercase"
            padding="p-4"
            textColor="bg-black"
            onClick={toggleTheme}
          >
            TOGGLE THEME : {activeTheme}
          </Button>
          <Button
            className="ml-4 uppercase"
            padding="p-4"
            textColor="bg-black"
            onClick={() =>
              setSidebarVariation((prev) =>
                prev === "light" ? "dark" : "light"
              )
            }
          >
            TOGGLE SIDEBAR VARIANT : {sidebarVariation}
          </Button>
          <div className="flex flex-row gap-4">
            <Pill variant="success" size="lg" radius="rounded-full" closable>
              Pill [lg]
            </Pill>
            <Pill variant="info" size="md">
              Pill [md]
            </Pill>
            <Pill variant="danger" size="sm" radius="rounded-full">
              Pill [sm]
            </Pill>
            <Pill variant="warning" size="lg" closable>
              Pill
            </Pill>
          </div>

          <Card
            className="flex flex-col gap-2"
            padding="p-4"
            radius="rounded-sm"
          >
            <div>This is the child</div>
            <Pill variant="info" size="sm">
              Pill inside a card
            </Pill>
          </Card>
          <FloatingButton
            text="Add New Address"
            position="bottom-center"
            backgroundColor="bg-black"
            isExpanded={true}
          ></FloatingButton>
        </ThemeProvider>

        {/* ---------------------------------- This is without Theme Provider ---------------------------- */}
        <Pill variant="warning" size="lg" closable>
          Pill without Theme
        </Pill>
        <h1>Avatars</h1>
        <section className="flex items-center gap-x-2">
          <Avatar
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            alt="Guy"
            size="sm"
            shape="circle"
            bordered
            borderColor="border-blue-500"
            backgroundColor="bg-gray-200"
            color="text-gray-800"
            radius="rounded-full"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            alt="Guy"
            size="md"
            shape="circle"
            bordered
            borderColor="border-blue-500"
            backgroundColor="bg-gray-200"
            color="text-gray-800"
            radius="rounded-full"
          />
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Guy"
            size="lg"
            shape="circle"
            bordered
            borderColor="border-blue-500"
            backgroundColor="bg-gray-200"
            color="text-gray-800"
            radius="rounded-full"
          />
          <Avatar size="sm" backgroundColor="bg-gray-200" color="text-gray-800">
            Sa
          </Avatar>
          <Avatar size="md" backgroundColor="bg-gray-500" color="text-white">
            AB
          </Avatar>
          <Avatar
            size="lg"
            backgroundColor="bg-gray-500"
            color="text-white"
            textFontSize="text-xl"
          >
            AB
          </Avatar>
        </section>
        <Card className="flex flex-col gap-2">
          <div>This is the card without Theme</div>
        </Card>

        <Input
          placeholder="Type something..."
          size="md"
          variant="outlined"
          defaultValue="Hello, Orca!"
          onChange={(e) => console.log("Input changed:", e.target.value)}
        />

        <Input
          placeholder="Type something..."
          allowClear
          prefixIcon="☯️"
          suffixIcon="☯️"
          showCount={true}
          variant="outlined"
          status="warning"
          defaultValue="Hello, Orca!"
          onPressEnter={(e) => console.log("Enter key pressed:", e)}
          onClear={() => console.log("Input cleared!")}
        />

        <Input
          label="Website URL"
          required
          helperText="Please enter your website URL."
          placeholder="Enter URL"
          size="md"
          variant="outlined"
          allowClear
          addonBefore={
            <select>
              <option>https</option>
              <option>http</option>
            </select>
          }
          addonAfter=".org"
          onChange={(e) => console.log("URL changed:", e.target.value)}
        />

        {/* Multiline Input (Textarea) */}

        <Input
          label="Description"
          helperText="Enter a detailed description."
          placeholder="Type your description here..."
          size="lg"
          variant="outlined"
          multiline
          rows={6}
          onChange={(e) => console.log("Description changed:", e.target.value)}
        />
      </div>
      <div>fvsefd</div>
      <Icon name="xmark" />

      <Sidebar
        value={activeRoute}
        expandable={true}
        openByDefault={false}
        routes={navigation}
        width="240px"
        variant={sidebarVariation}
        onRouteActive={(item) => setActiveRoute(item.to)}
        renderNavBefore={(expanded) =>
          !expanded ? (
            // collapsed
            sidebarVariation === "light" ? (
              // small‑light
              <svg
                width="52"
                height="38"
                viewBox="0 0 52 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M52 0.00268555H50.1033V2.91183L49.3359 3.75335L48.5653 2.91183V0.00268555H46.6686V3.52894L48.3874 5.40159V7.40778H50.2812V5.40159L52 3.52894V0.00268555Z"
                  fill="#3D445C"
                />
                <path
                  d="M25.0863 0.0432129H26.9799V7.42425H25.0863V0.0432129Z"
                  fill="#3D445C"
                />
                <path
                  d="M43.1315 7.37839H41.2349V0.854837L42.1833 0H45.7097V1.70967H43.1315V7.37839Z"
                  fill="#3D445C"
                />
                <path
                  d="M37.0143 5.70337V4.58674H39.0919V2.87972H37.0143V1.71232L37.7492 1.70967L39.9482 1.71776L39.9542 0.00801962L37.7522 0L36.06 0.00801962L35.1176 0.862856V6.55556L36.066 7.4104H37.7433L39.9482 7.41842L39.9542 5.71146L37.7464 5.70337H37.0143Z"
                  fill="#3D445C"
                />
                <path
                  d="M31.7753 4.69014L31.0048 5.52901L30.2343 4.69014V0.0393066H28.3407V5.30194L30.2669 7.40696H31.7426L33.6689 5.30194V0.0393066H31.7753V4.69014Z"
                  fill="#3D445C"
                />
                <path
                  d="M3.89406 5.72151H1.90259V1.71442H3.89406V5.72151ZM3.16206 0.0234375H0V7.42846H4.83936L5.7818 6.57363V0.878274L4.83348 0.0234375H3.16206Z"
                  fill="#3D445C"
                />
                <path
                  d="M9.63659 1.70967L11.8355 1.71776L11.8444 0.00801962L9.6396 0L7.94744 0.00801962L7.00501 0.862856V6.55556L7.9534 7.4104H9.63071L11.8355 7.41842L11.8444 5.71146L9.63659 5.70337H8.90171V4.58674H10.9791V2.87972H8.90171V1.71232L9.63659 1.70967Z"
                  fill="#3D445C"
                />
                <path
                  d="M14.8083 0.0234375H12.9146V6.56561L13.8629 7.4178H17.3865V5.71084H14.8083V0.0234375Z"
                  fill="#3D445C"
                />
                <path
                  d="M21.9095 0.0394767V2.8791H20.2086V0.0234375H18.3149V7.42317H20.2086V4.58612H21.9095V7.42317H23.8062V0.0394767H21.9095Z"
                  fill="#3D445C"
                />
                <path
                  d="M0.0117645 5.72217H1.8995V7.42382H0.0117645V5.72217Z"
                  fill="#ED4136"
                />
                <path
                  d="M50.11 0.00268555H51.9978V1.70441H50.11V0.00268555Z"
                  fill="#ED4136"
                />
              </svg>
            ) : (
              // small‑dark
              <svg
                width="52"
                height="38"
                viewBox="0 0 52 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M52 0.00268555H50.1033V2.91183L49.3359 3.75335L48.5653 2.91183V0.00268555H46.6686V3.52894L48.3874 5.40159V7.40778H50.2813V5.40159L52 3.52894V0.00268555Z"
                  fill="white"
                />
                <path
                  d="M25.0863 0.0432129H26.9799V7.42425H25.0863V0.0432129Z"
                  fill="white"
                />
                <path
                  d="M43.1315 7.37839H41.235V0.854837L42.1833 0H45.7097V1.70967H43.1315V7.37839Z"
                  fill="white"
                />
                <path
                  d="M37.0143 5.70337V4.58674H39.0919V2.87972H37.0143V1.71232L37.7492 1.70967L39.9482 1.71776L39.9542 0.00801962L37.7522 0L36.06 0.00801962L35.1176 0.862856V6.55556L36.0661 7.4104H37.7433L39.9482 7.41842L39.9542 5.71146L37.7464 5.70337H37.0143Z"
                  fill="white"
                />
                <path
                  d="M31.7753 4.69014L31.0048 5.52901L30.2343 4.69014V0.0393066H28.3407V5.30194L30.267 7.40696H31.7427L33.6689 5.30194V0.0393066H31.7753V4.69014Z"
                  fill="white"
                />
                <path
                  d="M3.89406 5.72151H1.90259V1.71442H3.89406V5.72151ZM3.16206 0.0234375H0V7.42846H4.83936L5.7818 6.57363V0.878274L4.83348 0.0234375H3.16206Z"
                  fill="white"
                />
                <path
                  d="M9.63658 1.70967L11.8355 1.71776L11.8444 0.00801962L9.6396 0L7.94744 0.00801962L7.005 0.862856V6.55556L7.9534 7.4104H9.6307L11.8355 7.41842L11.8444 5.71146L9.63658 5.70337H8.90171V4.58674H10.9791V2.87972H8.90171V1.71232L9.63658 1.70967Z"
                  fill="white"
                />
                <path
                  d="M14.8083 0.0234375H12.9146V6.56561L13.8629 7.4178H17.3865V5.71084H14.8083V0.0234375Z"
                  fill="white"
                />
                <path
                  d="M21.9095 0.0394767V2.8791H20.2086V0.0234375H18.3149V7.42317H20.2086V4.58612H21.9095V7.42317H23.8063V0.0394767H21.9095Z"
                  fill="white"
                />
                <path
                  d="M0.0117493 5.72217H1.89948V7.42382H0.0117493V5.72217Z"
                  fill="#ED4136"
                />
                <path
                  d="M50.11 0.00268555H51.9978V1.70441H50.11V0.00268555Z"
                  fill="#ED4136"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.9116 32.1546L8.84758 32.1664L5.3215 32.1509V19.0439L8.84908 19.0592H10.9116V32.1546ZM8.8591 13.4553L5.32059 13.44V13.4352H4.19058L2.67122 13.4285V13.4352L0 16.2586V34.945L2.64936 37.7379V37.7481L8.83724 37.7751L13.5853 37.7481L16.2311 34.945V16.2586L13.571 13.4553H8.8591Z"
                  fill="#ED4136"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29.3923 13.4893V25.6873L24.63 13.4285H19.3228V37.5907H24.63V31.1441V24.7357L29.3923 37.5907H34.6996V13.4893H29.3923Z"
                  fill="#ED4136"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M45.5199 19.0347L51.9771 19.0615L52 13.4551L45.5297 13.4285L40.5646 13.4551L37.7978 16.2584V34.9449L40.5798 37.7481H45.5069L51.9771 37.7751L52 32.169L45.5183 32.142H43.3616V28.4793L49.4632 28.4795L49.4634 22.8732L43.3616 22.873V19.0464L45.5199 19.0347Z"
                  fill="#ED4136"
                />
              </svg>
            )
          ) : // expanded
          sidebarVariation === "dark" || sidebarVariation === "dark-plus" ? (
            // big‑dark
            <svg
              width="169"
              height="51"
              viewBox="0 0 169 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M137.044 45.5205L135.333 45.5302L132.411 45.5173V34.6541L135.334 34.6668H137.044V45.5205ZM135.343 30.0222L132.41 30.0095V30.0056H131.473L130.214 30V30.0056L128 32.3456V47.8331L130.196 50.148V50.1564L135.324 50.1787L139.26 50.1564L141.452 47.8331V32.3456L139.248 30.0222H135.343Z"
                fill="#ED4136"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M151.312 30.0504V40.1603L147.365 30H142.966V50.0259H147.365V44.6829V39.3716L151.312 50.0259H155.71V30.0504H151.312Z"
                fill="#ED4136"
              />
              <path
                d="M147.368 45.8101H142.966V50.1789H147.368V45.8101Z"
                fill="#ED4136"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M163.629 34.6465L168.981 34.6687L169 30.0221L163.637 30L159.522 30.0221L157.229 32.3455V47.8331L159.535 50.1564H163.618L168.981 50.1787L169 45.5324L163.628 45.51H161.84V42.4743L166.897 42.4744L166.898 37.8279L161.84 37.8277V34.6562L163.629 34.6465Z"
                fill="#ED4136"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M159 0.0114746H153.205V10.1765L150.85 13.1126L148.496 10.1765V0.0114746H142.7V12.3227L147.953 18.8726V25.8796H153.748V18.8726L159 12.3227V0.0114746Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M82.4879 25.9375H76.6926L76.6928 0.143555H82.4883L82.4879 25.9375Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M131.871 25.7787H126.076V2.98446L128.974 0H139.756V5.96912H131.871V25.7787Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M113.166 19.9241V16.0244L119.522 16.0246L119.522 10.0557L113.166 10.0555V5.98139L115.414 5.96891L122.141 5.99745L122.165 0.0283308L115.425 0L110.253 0.0283308L107.371 3.013V22.9084L110.268 25.8928H115.401L122.141 25.9216L122.165 19.9529L115.413 19.9241H113.166Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M97.1464 16.3851L94.792 19.3212L92.4379 16.3851V0.143555H86.6423V18.5311L92.5354 25.8806H97.0489L102.942 18.5311V0.143555H97.1464V16.3851Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.8856 19.9947L9.63732 20.0072L5.79651 19.9907V6.03564L9.63896 6.05192H11.8856V19.9947ZM9.64986 0.0856711L5.7955 0.0693915V0.0643173H4.56463L2.90966 0.0571289V0.0643173H0V25.9394H2.88584V25.9502L9.62604 25.9789L14.7979 25.9502L17.6798 22.9657V3.07034L14.7823 0.0856711H9.64986Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29.4459 5.96891L36.1724 5.99745L36.1962 0.0283308L29.4562 0L24.2841 0.0283308L21.402 3.013V22.9084L24.2999 25.8928H29.4324L36.1724 25.9216L36.1962 19.9529L29.4443 19.9241H27.1977V16.0244L33.5536 16.0246L33.5538 10.0557L27.1977 10.0555V5.98139L29.4459 5.96891Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M45.2637 0.0776367H39.4684V22.9368L42.366 25.9212H53.148V19.9525H45.2637V0.0776367Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M66.9786 0.142755V10.0554H61.7784V0.0776367H55.9832V25.9367H61.7784V16.0241L66.9786 16.0243V25.9367H72.7741V0.142755H66.9786Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.0112305 25.9371H5.78435V19.9912H0.0112305V25.9371Z"
                fill="#ED4136"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M153.218 5.95954H158.991V0.0136719H153.218V5.95954Z"
                fill="#ED4136"
              />
            </svg>
          ) : (
            // big‑light
            <svg
              width="169"
              height="51"
              viewBox="0 0 169 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M137.044 45.5205L135.333 45.5302L132.411 45.5173V34.6541L135.334 34.6668H137.044V45.5205ZM135.343 30.0222L132.41 30.0095V30.0056H131.473L130.214 30V30.0056L128 32.3456V47.8331L130.196 50.148V50.1564L135.324 50.1787L139.26 50.1564L141.452 47.8331V32.3456L139.248 30.0222H135.343Z"
                fill="#ED4136"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M151.312 30.0504V40.1603L147.365 30H142.966V50.0259H147.365V44.6829V39.3716L151.312 50.0259H155.71V30.0504H151.312Z"
                fill="#ED4136"
              />
              <path
                d="M147.368 45.8101H142.966V50.1789H147.368V45.8101Z"
                fill="#ED4136"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M163.629 34.6465L168.981 34.6687L169 30.0221L163.637 30L159.522 30.0221L157.229 32.3455V47.8331L159.535 50.1564H163.618L168.981 50.1787L169 45.5324L163.628 45.51H161.84V42.4743L166.897 42.4744L166.898 37.8279L161.84 37.8277V34.6562L163.629 34.6465Z"
                fill="#ED4136"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M159 0.0114746H153.205V10.1765L150.85 13.1126L148.496 10.1765V0.0114746H142.7V12.3227L147.953 18.8726V25.8796H153.748V18.8726L159 12.3227V0.0114746Z"
                fill="#3D445C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M82.4879 25.9375H76.6926L76.6928 0.143555H82.4883L82.4879 25.9375Z"
                fill="#3D445C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M131.871 25.7787H126.076V2.98446L128.974 0H139.756V5.96912H131.871V25.7787Z"
                fill="#3D445C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M113.166 19.9241V16.0244L119.522 16.0246L119.522 10.0557L113.166 10.0555V5.98139L115.414 5.96891L122.141 5.99745L122.165 0.0283308L115.425 0L110.253 0.0283308L107.371 3.013V22.9084L110.268 25.8928H115.401L122.141 25.9216L122.165 19.9529L115.413 19.9241H113.166Z"
                fill="#3D445C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M97.1464 16.3851L94.792 19.3212L92.4379 16.3851V0.143555H86.6423V18.5311L92.5354 25.8806H97.0489L102.942 18.5311V0.143555H97.1464V16.3851Z"
                fill="#3D445C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.8856 19.9947L9.63732 20.0072L5.79651 19.9907V6.03564L9.63896 6.05192H11.8856V19.9947ZM9.64986 0.0856711L5.7955 0.0693915V0.0643173H4.56463L2.90966 0.0571289V0.0643173H0V25.9394H2.88584V25.9502L9.62604 25.9789L14.7979 25.9502L17.6798 22.9657V3.07034L14.7823 0.0856711H9.64986Z"
                fill="#3D445C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29.4459 5.96891L36.1724 5.99745L36.1962 0.0283308L29.4562 0L24.2841 0.0283308L21.402 3.013V22.9084L24.2999 25.8928H29.4324L36.1724 25.9216L36.1962 19.9529L29.4443 19.9241H27.1977V16.0244L33.5536 16.0246L33.5538 10.0557L27.1977 10.0555V5.98139L29.4459 5.96891Z"
                fill="#3D445C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M45.2637 0.0776367H39.4684V22.9368L42.366 25.9212H53.148V19.9525H45.2637V0.0776367Z"
                fill="#3D445C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M66.9786 0.142755V10.0554H61.7784V0.0776367H55.9832V25.9367H61.7784V16.0241L66.9786 16.0243V25.9367H72.7741V0.142755H66.9786Z"
                fill="#3D445C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.0112305 25.9371H5.78435V19.9912H0.0112305V25.9371Z"
                fill="#ED4136"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M153.218 5.95954H158.991V0.0136719H153.218V5.95954Z"
                fill="#ED4136"
              />
            </svg>
          )
        }
        renderNavAfter={(expanded) =>
          sidebarVariation === "light" ? (
            <div
              className={`${
                expanded ? "w-full" : ""
              } flex-shrink-0 flex border-t border-gray-200 p-4 mt-5`}
            >
              <a
                href="#"
                className="flex-shrink-0 w-full group block flex items-center"
              >
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                {expanded && (
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Tom Cook
                    </p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                      View profile
                    </p>
                  </div>
                )}
              </a>
            </div>
          ) : (
            <div className="flex-shrink-0 flex bg-gray-700 p-4 w-full">
              <a
                href="#"
                className="flex-shrink-0 w-full group block flex items-center"
              >
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                {expanded && (
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Tom Cook</p>
                    <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                      View profile
                    </p>
                  </div>
                )}
              </a>
            </div>
          )
        }
      />
    </>
  );
}

export default App;
