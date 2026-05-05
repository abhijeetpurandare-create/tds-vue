import { ThemeProvider } from "@delhivery/tarmac";
import React, { useEffect, useState } from "react";
interface MarqueeBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  downtimeMessage?: string[];
  serviceUpdateMessage?: string[];
  downtimeStart?: string;
  downtimeEnd?: string;
  dotClassName?: string;
  titleClassName?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  [key: string]: any;
  children?: React.Re
}

const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  downtimeMessage = [
    "Due to a planned upgrade activity on Wednesday, 3rd April, 8:00 pm to 10:00 pm, we will be temporarily unable to accept support requests from website or phone. Regret the inconvenience and request you to try later.",
  ],
  serviceUpdateMessage = [
    "Please do not transfer money to payment links that are not shared from Delhivery's official accounts. Delhivery does not require OTP or credentials for address confirmation for your delivery. Our Customer Support team is reachable only from our website or app. Login with your phone number and raise your support request with us.",
  ],
  downtimeStart = "Apr 03, 2024 19:30:00 GMT+5:30",
  downtimeEnd = "Apr 03, 2029 22:00:00 GMT+5:30",
  dotClassName = "w-3 h-3 bg-red-500 mx-4 inline-block", // Class for the red dot
  titleClassName = "marquee-content inline-block animate-marqueeHeaderTwenty mr-24",
  backgroundColor = "bg-red-100",
  borderColor = "bg-red-800",
  textColor = " text-gray-900 ",
  ...props
}) => {
  const [showDowntimeBanner, setShowDowntimeBanner] = useState(false);
  const baseClass = `flex w-full overflow-hidden relative text-base lg:text-xl leading-5 lg:leading-6 p-3 lg:p-5 ${backgroundColor} border-b-2 border-${borderColor} ${textColor} font-medium whitespace-nowrap w-full`;

  useEffect(() => {
    const marqueeTimer = () => {
      const now = new Date();
      const start = new Date(downtimeStart).getTime();
      const end = new Date(downtimeEnd).getTime();
      const nowTime = now.getTime();

      return nowTime > start && nowTime < end;
    };

    if (marqueeTimer()) {
      setShowDowntimeBanner(true);
    }
  }, [downtimeStart, downtimeEnd]);

  return (
    <><ThemeProvider>
      {showDowntimeBanner
        ? downtimeMessage && (
          <div
            className={baseClass}
            onMouseOver={(e) => e.currentTarget.classList.add("paused")}
            onMouseOut={(e) => e.currentTarget.classList.remove("paused")}
            {...props}
          >
            <div className={titleClassName}>
              <span className="font-bold">PLANNED DOWNTIME:</span>
              {downtimeMessage.map((msg, index) => (
                <React.Fragment key={index}>
                  <span className={dotClassName} />
                  {msg}
                </React.Fragment>
              ))}
            </div>
          </div>
        )
        : serviceUpdateMessage && (
          <div
            className={baseClass}
            onMouseOver={(e) => e.currentTarget.classList.add("paused")}
            onMouseOut={(e) => e.currentTarget.classList.remove("paused")}
            {...props}
          >
            <div className={titleClassName}>
              <span className="font-bold">SERVICE UPDATES:</span>
              {serviceUpdateMessage.map((msg, index) => (
                <React.Fragment key={index}>
                  <span className={dotClassName} />
                  {msg}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
    </ThemeProvider>
    </>
  );
};

export default MarqueeBanner;
