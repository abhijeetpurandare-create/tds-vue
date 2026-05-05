import delhiveryLogoDark from "../assets/delhivery-logo-dark.png";
import fb from "../assets/fb.png";
import twitterNew from "../assets/twitter-new.png";
import linkedin from "../assets/linkedin.png";
import yt from "../assets/yt.png";
import insta from "../assets/insta.png";
import { ThemeProvider } from "@delhivery/tarmac";

// Footer data structure
const footerDataConfig = {
  header: {
    img: (
      <img width="180" height="29" src={delhiveryLogoDark} alt="Delhivery" />
    ),
    certifications: [
      "ISO 9001: 2015, ISO 27001: 2013 Certified Company",
      "CIN: L63090DL2011PLC221234",
    ],
  },
  sections: [
    {
      title: "Services",
      links: [
        { text: "Express Parcel", url: "/services/express-parcel" },
        { text: "Warehousing", url: "/services/warehousing" },
        { text: "Part Truckload", url: "/services/part-truckload" },
        { text: "Full Truckload", url: "/services/truckload-freight" },
        { text: "Cross Border", url: "/services/cross-border" },
        { text: "Data Intelligence", url: "/services/data-intelligence" },
        {
          text: "Software Platform",
          url: "https://getos1.com/",
          external: true,
        },
      ],
    },
    {
      title: "Solutions",
      links: [
        { text: "D2C Brands", url: "/solutions/d2c-brands" },
        { text: "Personal Courier", url: "/solutions/personal-courier" },
        { text: "B2B Enterprises", url: "/solutions/b2b-enterprises" },
      ],
    },
    {
      title: "Partners",
      links: [
        {
          text: "Franchise Opportunities",
          url: "/start-a-franchisee-business",
        },
        { text: "Delivery Partner", url: "/partner/delivery-partner" },
        { text: "Fleet Owners", url: "/partner/fleet-owner" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About us", url: "/about-us" },
        { text: "Governance", url: "/company/governance" },
        {
          text: "Investor Relations",
          url: "/company/investor-relations",
        },
        { text: "ODR Portal", url: "https://smartodr.in/login", external: true },
        { text: "Press Release", url: "/company/press-release" },
        { text: "Careers", url: "/careers" },
      ],
    },
    {
      title: "Get in Touch",
      links: [
        { text: "Support", url: "/support" },
        { text: "Raise a Query", url: "/support#raise-a-query" },
        { text: "Store Locator", url: "/locator" },
        { text: "Rate Calculator", url: "/rate-calculator" },
      ],
    },
    {
      title: "Policies",
      links: [
        { text: "Terms & Conditions", url: "/terms-and-conditions" },
        { text: "Privacy Policy", url: "/privacy-policy" },
        { text: "Cookie Policy", url: "/cookie-policy" },
        { text: "Fraud Disclaimer", url: "/fraud-disclaimer" },
        { text: "ONDC Disclaimer", url: "/fraud-disclaimer" },
      ],
    },
  ],
  bottomInfo: {
    securityPolicy: {
      title: "Information Security Policy",
      descriptionA:
        "Delhivery is committed to safeguarding the confidentiality, integrity and availability of all physical and electronic information assets of the organization.",
      descriptionB:
        "We ensure that the regulatory, operational and contractual requirements are fulfilled.",
    },
    disclaimer: {
      title: "Disclaimer",
      description: "Operational metrics listed are as of August 04, 2023",
    },
  },
  socialLinks: [
    {
      url: "https://www.facebook.com/delhivery",
      img: <img className="min-w-7 h-7" src={fb} alt="Facebook" />,
      alt: "Facebook",
    },
    {
      url: "https://twitter.com/delhivery",
      img: <img className="min-w-7 h-7" src={twitterNew} alt="Twitter" />,
      alt: "Twitter",
    },
    {
      url: "https://in.linkedin.com/company/delhivery",
      img: <img className="min-w-7 h-7" src={linkedin} alt="LinkedIn" />,
      alt: "LinkedIn",
    },
    {
      url: "https://www.youtube.com/user/delhivery",
      img: <img className="min-w-7 h-7" src={yt} alt="YouTube" />,
      alt: "YouTube",
    },
    {
      url: "https://www.instagram.com/delhivery_official/",
      img: <img className="min-w-7 h-7" src={insta} alt="Instagram" />,
      alt: "Instagram",
    },
  ],
};

const Footer = (props: any) => {
  const footerData = props.footerData || footerDataConfig;
  return (
    <ThemeProvider>
      {footerData && (<div className="border-t border-black/15 bg-white font-archivo pt-12 md:pt-24">
        <div className="mx-auto w-full px-3 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1140px] 2xl:max-w-[1536px] ">
          {/* Logo Section */}
          <div className="pb-10 border-b border-gray-300">
            <a href="/">
              <div className="mb-6">{footerData?.header?.img}</div>
            </a>
            {footerData?.header?.certifications.map((cert, index) => (
              <div
                key={index}
                className="mb-2 text-[9px] text-[#00000080] leading-[12.5px] font-semibold"
              >
                {cert}
              </div>
            ))}
          </div>

          {/* Footer Links Section */}
          <div className="border-b border-gray-300 flex justify-between pt-2 pb-8 lg:py-10 flex-wrap lg:flex-nowrap">
            {footerData?.sections?.map((section, index) => (
              <div key={index} className="w-1/2 lg:w-1/6 px-2 mt-6 lg:mt-0">
                <div className="link-title mb-6 uppercase font-bold text-[16px] leading-6">
                  {section.title}
                </div>
                <ul>
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.url}
                        target={link.external ? "_blank" : "_self"}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="text-[14px] leading-[30px]"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          {footerData.bottomInfo && (
            <div className="flex justify-between pb-8 flex-wrap md:flex-nowrap py-5">
              <div className="text-sm">
                <div className="first font-bold mb-1">
                  {footerData.bottomInfo.securityPolicy?.title || ''}
                </div>
                <div className="second mb-4">
                  <div>{footerData.bottomInfo.securityPolicy?.descriptionA || ''}</div>
                  <div>{footerData.bottomInfo.securityPolicy?.descriptionB || ''}</div>
                </div>

                <div className="first font-bold mt-4 mb-1">
                  {footerData.bottomInfo.disclaimer?.title || ''}
                </div>
                <div className="second">
                  {footerData.bottomInfo.disclaimer?.description || ''}
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex gap-1.5 mt-5">
                {footerData.socialLinks.map((social: any, idx: string) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social?.img}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>)}
    </ThemeProvider>

  );
};

export default Footer;
