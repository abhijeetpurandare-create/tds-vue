import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../index";

// Mock the Icon component
jest.mock("@delhivery/tarmac", () => ({
  Icon: {
    arrowRightFromLine: () => <div data-testid="mock-arrow-icon" />,
  },
}));

describe("Navbar Component", () => {
  const mockHeaderConfig = [
    {
      title: "Home",
      url: "/home",
      subTitles: [
        {
          text: "Dashboard",
          url: "/dashboard",
          icon: <span data-testid="dashboard-icon">📊</span>,
        },
        {
          text: "Profile",
          url: "/profile",
        },
      ],
    },
    {
      title: "Ship Now",
      isButton: true,
      subTitles: [
        {
          text: "Create Shipment",
          url: "/create-shipment",
        },
      ],
    },
  ];

  it("renders navbar with header items", () => {
    render(<Navbar headerConfig={mockHeaderConfig} />);
    
    // Check if regular link is rendered
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.tagName).toBe("A");
    expect(homeLink).toHaveAttribute("href", "/home");

    // Check if button is rendered
    const shipNowButton = screen.getByText("Ship Now");
    expect(shipNowButton).toBeInTheDocument();
    expect(shipNowButton.tagName).toBe("BUTTON");
  });

  it("shows submenu on mouse enter and hides on mouse leave", () => {
    render(<Navbar headerConfig={mockHeaderConfig} />);
    
    const homeLink = screen.getByText("Home").parentElement;
    expect(homeLink).toBeInTheDocument();

    // Mouse enter
    if (homeLink) {
      fireEvent.mouseEnter(homeLink);
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByTestId("dashboard-icon")).toBeInTheDocument();

      // Mouse leave
      fireEvent.mouseLeave(homeLink);
      expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
      expect(screen.queryByText("Profile")).not.toBeInTheDocument();
    }
  });

  it("shows button submenu on mouse enter", () => {
    render(<Navbar headerConfig={mockHeaderConfig} />);
    
    const shipNowButton = screen.getByText("Ship Now").parentElement;
    expect(shipNowButton).toBeInTheDocument();

    if (shipNowButton) {
      // Mouse enter
      fireEvent.mouseEnter(shipNowButton);
      expect(screen.getByText("Create Shipment")).toBeInTheDocument();

      // Mouse leave
      fireEvent.mouseLeave(shipNowButton);
      expect(screen.queryByText("Create Shipment")).not.toBeInTheDocument();
    }
  });

  it("applies correct styling for button type header", () => {
    render(<Navbar headerConfig={mockHeaderConfig} />);
    
    const shipNowButton = screen.getByText("Ship Now");
    expect(shipNowButton.parentElement).toHaveClass(
      "bg-white",
      "text-black",
      "border",
      "border-white",
      "rounded-[3px]"
    );
  });

  it("applies correct styling for link type header", () => {
    render(<Navbar headerConfig={mockHeaderConfig} />);
    
    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveClass(
      "text-white",
      "cursor-pointer"
    );
  });

  it("renders submenu items with correct attributes", () => {
    render(<Navbar headerConfig={mockHeaderConfig} />);
    
    const homeLink = screen.getByText("Home").parentElement;
    if (homeLink) {
      fireEvent.mouseEnter(homeLink);
      
      const dashboardLink = screen.getByText("Dashboard").parentElement;
      expect(dashboardLink).toHaveAttribute("href", "/dashboard");
      expect(dashboardLink).toHaveClass(
        "flex",
        "py-3",
        "px-6",
        "items-center",
        "gap-[10px]",
        "hover:bg-[#e0e3ea]"
      );
    }
  });

  it("shows red indicator for non-button headers on hover", () => {
    render(<Navbar headerConfig={mockHeaderConfig} />);
    
    const homeLink = screen.getByText("Home").parentElement;
    if (homeLink) {
      fireEvent.mouseEnter(homeLink);
      
      const indicator = homeLink.querySelector(".bg-delhivery-red");
      expect(indicator).toBeInTheDocument();
    }
  });

  it("rotates arrow icon for button type header on hover", () => {
    render(<Navbar headerConfig={mockHeaderConfig} />);
    
    const shipNowButton = screen.getByText("Ship Now").parentElement;
    if (shipNowButton) {
      fireEvent.mouseEnter(shipNowButton);
      
      const arrow = shipNowButton.querySelector("img");
      expect(arrow).toHaveClass("rotate-180");
    }
  });

  it("handles empty subTitles array", () => {
    const configWithEmptySubTitles = [
      {
        title: "Empty",
        url: "/empty",
        subTitles: [],
      },
    ];

    render(<Navbar headerConfig={configWithEmptySubTitles} />);
    
    const emptyLink = screen.getByText("Empty").parentElement;
    if (emptyLink) {
      fireEvent.mouseEnter(emptyLink);
      // No submenu should be rendered
      expect(emptyLink.querySelector(".bg-white")).not.toBeInTheDocument();
    }
  });
}); 