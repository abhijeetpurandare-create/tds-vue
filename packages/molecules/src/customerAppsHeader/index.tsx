import DelhiveryLogo from "../assets/delhiveryLogo.png";
import expressParcel from "../assets/headerIcons/express-parcel.svg";
import warehousing from "../assets/headerIcons/warehousing.svg";
import freight from "../assets/headerIcons/freight.svg";
import freightFull from "../assets/headerIcons/freight-full.svg";
import crossBorder from "../assets/headerIcons/cross-border.svg";
import intelligence from "../assets/headerIcons/intelligence.svg";
import dcBrands from "../assets/headerIcons/dc-brands.svg";
import endConsumers from "../assets/headerIcons/end-consumers.svg";
import bbSupply from "../assets/headerIcons/bb-supply.svg";
import bbRto from "../assets/headerIcons/bb-rto.svg";
import partner from "../assets/headerIcons/partner.svg";
import constellation from "../assets/headerIcons/constellation.svg";
import lastMile from "../assets/headerIcons/last-mile.svg";
import fleetOwner from "../assets/headerIcons/fleet-owner.svg";
import company from "../assets/headerIcons/company.svg";
import about from "../assets/headerIcons/about.svg";
import governance from "../assets/headerIcons/governance.svg";
import investorRelations from "../assets/headerIcons/investor-relations.svg";
import news from "../assets/headerIcons/news.svg";
import careers from "../assets/headerIcons/careers.svg";
import track from "../assets/headerIcons/track.svg";
import support from "../assets/headerIcons/support.svg";
import pc from "../assets/headerIcons/pc.svg";
import bs from "../assets/headerIcons/bs.svg";
import arrowRight from "../assets/headerIcons/arrow-right.svg";
import arrowLeft from "../assets/headerIcons/arrow-left.svg";
import { useEffect, useState, React } from "react";
import { BottomSheet, ThemeProvider,  Button } from "@delhivery/tarmac";

interface HeaderProps {
  showProfileAvatar?: boolean;
  headerJSON?: any;
  hasMarquee?: boolean;
}
export const headerJSONConfig = [
  {
    title: "Services",
    icon: <img src={expressParcel} alt="Services" />,
    subTitles: [
      {
        text: "Express Parcel",
        url: "/services/express-parcel",
        icon: <img src={expressParcel} alt="express parcel" />,
      },
      {
        text: "Warehousing",
        url: "/services/warehousing",
        icon: <img src={warehousing} alt="warehousing" />,
      },
      {
        text: "Part Truckload",
        url: "/services/part-truckload",
        icon: <img src={freight} alt="freight" />,
      },
      {
        text: "Full Truckload",
        url: "/services/truckload-freight",
        icon: <img src={freightFull} alt="full truckload" />,
      },
      {
        text: "Cross Border",
        url: "/services/cross-border",
        icon: <img src={crossBorder} alt="cross border" />,
      },
      {
        text: "Data Intelligence",
        url: "/services/data-intelligence",
        icon: <img src={intelligence} alt="data intelligence" />,
      },
    ],
  },
  {
    title: "Solutions",
    icon: <img src={warehousing} alt="Solutions" />,
    subTitles: [
      {
        text: "D2C Brands",
        url: "/solutions/d2c-brands",
        icon: <img src={dcBrands} alt="D2C Brands" />,
      },
      {
        text: "Personal Courier",
        url: "/solutions/personal-courier",
        icon: <img src={endConsumers} alt="Personal Courier" />,
      },
      {
        text: "B2B Enterprises",
        url: "/solutions/b2b-enterprises",
        icon: <img src={bbSupply} alt="B2B Enterprises" />,
      },
      {
        text: "RTO Predictor",
        url: "/solutions/NDR-RTO-Returns",
        icon: <img src={bbRto} alt="RTO Predictor" />,
      },
    ],
  },
  {
    title: "Partner",
    icon: <img src={partner} alt="Partners" />,
    subTitles: [
      {
        text: "Franchise Opportunities",
        url: "/start-a-franchisee-business",
        icon: <img src={constellation} alt="Franchise Opportunities" />,
      },
      {
        text: "Delivery Partner",
        url: "/partner/delivery-partner",
        icon: <img src={lastMile} alt="Delivery Partner" />,
      },
      {
        text: "Fleet Owners",
        url: "/partner/fleet-owner",
        icon: <img src={fleetOwner} alt="Fleet Owners" />,
      },
    ],
  },
  {
    title: "Company",
    icon: <img src={company} alt="Company" />,
    subTitles: [
      {
        text: "About Us",
        url: "/about-us",
        icon: <img src={about} alt="About Us" />,
      },
      {
        text: "Governance",
        url: "/company/governance",
        icon: <img src={governance} alt="Governance" />,
      },
      {
        text: "Investor Relations",
        url: "/company/investor-relations",
        icon: <img src={investorRelations} alt="Investor Relations" />,
      },
      {
        text: "Press Release",
        url: "/company/press-release",
        icon: <img src={news} alt="Press Release" />,
      },
      {
        text: "Careers",
        url: "/careers",
        icon: <img src={careers} alt="Careers" />,
      },
    ],
  },
  {
    title: "Track",
    icon: <img src={track} alt="Track" />,
    url: "/tracking",
    subTitles: [],
  },
  {
    title: "Support",
    icon: <img src={support} alt="Support" />,
    url: "/support",
    subTitles: [],
  },
  {
    title: "Ship Now",
    isButton: true,
    subTitles: [
      {
        text: "Personal Courier",
        url: "/solutions/personal-courier",
        icon: <img src={pc} alt="Personal Courier" />,
      },
      {
        text: "Business Shipments",
        url: "https://one.delhivery.com/register",
        icon: <img src={bs} alt="Business Shipments" />,
      },
    ],
  },
];

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const [isNavDialogOpen, setIsNavDialogOpen] = useState(false);
  const [currentSelectedHeader, setCurrentSelectedHeader] = useState("");
  const headerConfig = props.headerJSON || headerJSONConfig;
  const showMarquee = props.hasMarquee;

  const onNavDialogClose = () => {
    setIsNavDialogOpen(false);
  };

  const handleHeaderClick = (url: string | undefined, title: string) => {
    if (url) {
      window.location.href = url;
      return;
    }
    setCurrentSelectedHeader(title);
  };

  return (
    <>
      <ThemeProvider>
        {showMarquee && <MarqueeBanner />}
        <>
          <div className="min-h-[68px] lg:min-h-[100px] bg-black flex items-center">
            <div className="flex items-center px-6 lg:px-3 mx-auto justify-between w-full lg:max-w-[1024px] xl:max-w-[1140px] 2xl:max-w-[1536px]">
              <a href="/">
                <img
                  className="w-[113px] lg:w-[180px]"
                  src={DelhiveryLogo}
                  alt="delhivery logo"
                />
              </a>
              <img
                className="cursor-pointer block md:hidden lg:hidden"
                onClick={() => setIsNavDialogOpen(true)}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABiSURBVHgB7dJRDcAgDIThHxQgAQmTMAlzuklAAg6Gg81BaUVceOFLgL5dQi+Z2QHEUWjJA14fKhp/9mug09iWixYVdDXt6pqOjJj8i9iWiyXf/l5oPBHw+VDQGBFQfTjR6BPx/CVhG5bjwAAAAABJRU5ErkJggg=="
                alt="hamburger"
              />
              <div className="sm:hidden md:block lg:block">
                <Navbar headerConfig={headerConfig} />
              </div>
            </div>
            <div className="lg:hidden">
              <BottomSheet
                isOpen={isNavDialogOpen}
                onClose={onNavDialogClose}
                cancellable={!currentSelectedHeader}
              >
                {currentSelectedHeader ? (
                  <>
                    <div
                      className="p-4 border-b border-sections-and-dividers flex items-center gap-3 text-default-black"
                      onClick={() => setCurrentSelectedHeader("")}
                    >
                      <img
                        className="cursor-pointer"
                        src={arrowLeft}
                        alt="go back"
                      />
                      <h1 className="text-2xl font-semibold ">
                        {currentSelectedHeader}
                      </h1>
                    </div>
                    <div className="mb-3">
                      {headerConfig
                        .find((header) => header.title === currentSelectedHeader)
                        ?.subTitles.map((subTitle) => {
                          return (
                            <div className="py-1 pr-9 pl-6 " key={subTitle.text}>
                              <div
                                className="py-2 pl-4 flex items-center gap-4 cursor-pointer leading-5"
                                onClick={() =>
                                  (window.location.href = subTitle.url)
                                }
                              >
                                {subTitle.icon}
                                <div>{subTitle.text}</div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 border-b border-sections-and-dividers text-default-black">
                      <h1 className="text-2xl font-semibold ">Our offerings</h1>
                    </div>
                    <div>
                      {headerConfig.map((header) => {
                        const icon = header.icon;
                        return (
                          <div key={header.title}>
                            {header.isButton ? (
                              <div className="pt-2 px-6 pb-5 " key={header.title}>
                                <div
                                  className="py-4 pr-3 pl-7 bg-black text-white flex items-center gap-4 rounded-md cursor-pointer leading-5"
                                  onClick={() =>
                                    handleHeaderClick(header.url, header.title)
                                  }
                                >
                                  {icon}
                                  <div>{header.title}</div>
                                  {header.subTitles?.length > 0 && (
                                    <img
                                      className="ml-auto"
                                      src={arrowRight}
                                      alt="right arrow"
                                    />
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="py-1 pr-9 pl-6 " key={header.title}>
                                <div
                                  className="py-2 pl-4 flex items-center gap-4 cursor-pointer leading-5"
                                  onClick={() =>
                                    handleHeaderClick(header.url, header.title)
                                  }
                                >
                                  {icon}
                                  <div>{header.title}</div>
                                  {header.subTitles?.length > 0 && (
                                    <img
                                      className="ml-auto"
                                      src={arrowRight}
                                      alt="right arrow"
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </BottomSheet>
            </div>
          </div></>
      </ThemeProvider>
    </>
  );
};

export default Header;



const MarqueeBanner = () => {
  const [showDowntimeBanner, setShowDowntimeBanner] = useState(false);

  useEffect(() => {
    const marqueeTimer = () => {
      const now = new Date();
      const start = new Date("Apr 03, 2024 19:30:00 GMT+5:30").getTime();
      const end = new Date("Apr 03, 2024 22:00:00 GMT+5:30").getTime();

      const nowTime = now.getTime();

      if (nowTime > start && nowTime < end) {
        return true;
      }
      return false;
    };

    if (marqueeTimer()) {
      setShowDowntimeBanner(true);
    }
  }, []);

  return (
    <>
      {showDowntimeBanner ? (
        <div
          className="marquee-container overflow-hidden relative text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] p-[10px] lg:p-[12px] bg-red-100 border-b-[2px] lg:border-b-[3px] lg:border-red-500 text-gray-900 font-medium whitespace-nowrap w-full"
          onMouseOver={(e) => e.currentTarget.classList.add("paused")}
          onMouseOut={(e) => e.currentTarget.classList.remove("paused")}
        >
          <div className="marquee-content inline-block animate-marqueeHeaderTwenty mr-24">
            <span className="font-bold">PLANNED DOWNTIME:</span>
            <span className="w-3 h-3 bg-red-500 mx-4 inline-block"></span>
            Due to a planned upgrade activity on Wednesday, 3rd April, 8:00 pm
            to 10:00 pm, we will be temporarily unable to accept support
            requests from website or phone. Regret the inconvenience and request
            you to try later.
            <span className="w-3 h-3 bg-red-500 mx-4 inline-block"></span>
            Due to a planned upgrade activity on Wednesday, 3rd April, 8:00 pm
            to 10:00 pm, we will be temporarily unable to accept support
            requests from website or phone. Regret the inconvenience and request
            you to try later.
          </div>
        </div>
      ) : (
        <div
          className="marquee-container overflow-hidden relative text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] p-[10px] lg:p-[12px] bg-red-100 border-b-[2px] lg:border-b-[3px] lg:border-red-500 text-gray-900 font-medium whitespace-nowrap w-full"
          onMouseOver={(e) => e.currentTarget.classList.add("paused")}
          onMouseOut={(e) => e.currentTarget.classList.remove("paused")}
        >
          <div className="marquee-content inline-block animate-marqueeHeaderTwenty mr-24">
            <span className="font-bold">SERVICE UPDATES:</span>
            <span className="w-3 h-3 bg-red-500 mx-4 inline-block"></span>
            Please do not transfer money to payment links that are not shared
            from Delhivery's official accounts
            <span className="w-3 h-3 bg-red-500 mx-4 inline-block"></span>
            Delhivery does not require OTP or credentials for address
            confirmation for your delivery
            <span className="w-3 h-3 bg-red-500 mx-4 inline-block"></span>
            Our Customer Support team is reachable only from our website or app.
            Login with your phone number and raise your support request with us.
          </div>
        </div>
      )}
    </>
  );
};

type headerConfigType = {
  title: string;
  url?: string;
  isButton?: boolean;
  icon?: JSX.Element;
  subTitles: {
    text: string;
    url: string;
    icon?: JSX.Element;
  }[];
}[];
interface NavbarProps {
  headerConfig: headerConfigType;
}

const Navbar: React.FC<NavbarProps> = ({ headerConfig }) => {
  const [showSubmenuTitle, setShowSubmenuTitle] = useState("");

  const arrowBaseStyles = `absolute w-0 h-0 border-solid`;

  const handleMouseEnter = (title: string) => {
    setShowSubmenuTitle(title);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setShowSubmenuTitle("");
  };

  return (
    <div className="items-center mr-3 lg:flex">
      {headerConfig.map((header) => {
        return (
          <div
            key={header.title}
            className="flex items-center relative"
            onMouseEnter={() => handleMouseEnter(header.title)}
            onMouseLeave={handleMouseLeave}
          >
            {header?.isButton ? (
              <Button backgroundColor="#ffffff" textColor="#000000" hoverColor="#ffffff" hoverTextColor="#000000" className="bg-white text-base border border-white text-black flex items-center justify-center gap-3 font-semibold px-5 p-2.5 2xl:py-2.5 2xl:px-5 rounded-[3px] ml-5">
                {header.title}
                <img
                  className={`transition-transform duration-300 ${showSubmenuTitle === "Ship Now" ? "rotate-180" : ""
                    }`}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAYAAAA7KqwyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD4SURBVHgBnVBBTsMwEJy1nVuR8gN4QrgWKiVEvfeI2iLRH9CXwA/SU8WtvIBEQkIc+4PyhBzg5KzNmipSBZYQnYut9czseJDnkxRHImgVm5PdqJxV+CdG45uKzWBHF1ezO6XonoCt6kzRNKv2r63ODGoPZA5+Sd9u5XwiRwVFrbW2eGse3+Pi6zNOkhrOp/Bu+fK8XlH/OMynmda0gVKImRyKmV3x2qy3Ya56Qhho5gLOIRHicDzNDs33YgfL3XkvDqBoTK1rEElMLAAWlqkkcmtlwc9kFP/rbcqm24TrnuSl4E8p+OlXwVGDHpfl/EEIp5o/FjFxwBd1YHDaoHSd8gAAAABJRU5ErkJggg=="
                  alt="arrow"
                />
              </Button>
            ) : (
              <a
                href={header.url}
                className="text-white cursor-pointer py-[0.25rem] px-[0.625rem] 2xl:py-3 2xl:px-[20px] text-lg"
              >
                {header.title}
              </a>
            )}
            {showSubmenuTitle === header.title && (
              <>
                {!header?.isButton && (
                  <div className="bg-delhivery-red min-h-[4px] w-[2rem] absolute left-3 top-8 2xl:top-[38px] 2xl:left-5 z-20"></div>
                )}
                {header.subTitles.length > 0 && (
                  <>
                    <div
                      className={`flex items-center flex-col absolute z-10 ${header?.isButton
                          ? "top-[46px] right-0"
                          : "top-9 2xl:top-10 2xl:left-4"
                        }`}
                    >
                      <div className="w-full h-4 bg-black"></div>
                      <div
                        className={arrowBaseStyles}
                        style={{
                          borderColor: `transparent transparent white transparent`,
                          borderWidth: "0 6px 6px 6px",
                          top: "10px",
                          transform: "translateX(-50%)",
                          left: header?.isButton ? "200px" : "20px",
                        }}
                      />
                      <div className="bg-white rounded-[6px] w-max shadow-lg py-2">
                        {header.subTitles.map((subTitle) => {
                          const icon = subTitle?.icon;
                          return (
                            <a
                              href={subTitle.url}
                              key={subTitle.text}
                              className="flex py-3 px-6 pr-8 items-center gap-[10px] hover:bg-[#e0e3ea]"
                            >
                              {icon}
                              <span>{subTitle.text}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
