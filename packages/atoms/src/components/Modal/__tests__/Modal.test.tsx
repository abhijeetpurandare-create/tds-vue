import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Modal from "../index";

// Mock ReactDOM.createPortal
const mockCreatePortal = jest.fn((element, container) => {
  return element;
});

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (element: React.ReactNode, container: Element) => mockCreatePortal(element, container),
}));

describe("Modal Component", () => {
  beforeEach(() => {
    // Clear mock calls between tests
    mockCreatePortal.mockClear();
  });

  it("renders modal when isOpen is true", () => {
    render(
      <Modal isOpen title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render modal when isOpen is false", () => {
    render(
      <Modal isOpen={false} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("renders modal with different sizes", () => {
    const { rerender } = render(
      <Modal isOpen size="sm" title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveStyle({ width: "400px" });

    rerender(
      <Modal isOpen size="md" title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveStyle({ width: "560px" });

    rerender(
      <Modal isOpen size="lg" title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveStyle({ width: "720px" });
  });

  it("renders modal with custom width", () => {
    render(
      <Modal isOpen width={800} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveStyle({ width: "800px" });
  });

  it("calls onClose when clicking the close button", () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking the mask if maskClosable is true", () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose} maskClosable title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    const mask = screen.getByTestId("modal-mask");
    fireEvent.click(mask);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking the mask if maskClosable is false", () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose} maskClosable={false} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    const mask = screen.getByTestId("modal-mask");
    fireEvent.click(mask);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("calls onClose when pressing Escape key if closable is true", () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose} closable title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when pressing Escape key if closable is false", () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose} closable={false} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("renders modal with custom close icon", () => {
    const customCloseIcon = <span data-testid="custom-close">×</span>;
    render(
      <Modal isOpen closeIcon={customCloseIcon} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByTestId("custom-close")).toBeInTheDocument();
  });

  it("renders modal with loading state", () => {
    render(
      <Modal isOpen loading title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByRole("status")).toBeInTheDocument(); // Spinner
    const mask = screen.getByTestId("modal-mask");
    fireEvent.click(mask);
    // Modal should not close when loading
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("renders modal with custom footer", () => {
    const customFooter = <div data-testid="custom-footer">Custom Footer</div>;
    render(
      <Modal isOpen footer={customFooter} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByTestId("custom-footer")).toBeInTheDocument();
  });

  it("renders modal with custom styles", () => {
    const customStyle = { backgroundColor: "red" };
    const customBodyStyle = { padding: "20px" };
    const customHeaderStyle = { borderBottom: "none" };
    const customFooterStyle = { borderTop: "none" };
    const customMaskStyle = { backgroundColor: "rgba(0,0,0,0.8)" };

    render(
      <Modal
        isOpen
        style={customStyle}
        bodyStyle={customBodyStyle}
        headerStyle={customHeaderStyle}
        footerStyle={customFooterStyle}
        maskStyle={customMaskStyle}
        title="Test Modal"
      >
        <div>Modal Content</div>
      </Modal>
    );

    const modal = screen.getByRole("dialog");
    const mask = screen.getByTestId("modal-mask");

    expect(modal).toHaveStyle(customStyle);
    expect(screen.getByTestId("modal-body")).toHaveStyle(customBodyStyle);
    expect(screen.getByTestId("modal-header")).toHaveStyle(customHeaderStyle);
    expect(screen.getByTestId("modal-footer")).toHaveStyle(customFooterStyle);
    expect(mask).toHaveStyle(customMaskStyle);
  });

  it("renders modal with custom animation", () => {
    const customAnimation = {
      duration: 500,
      timingFunction: "ease-in-out",
    };

    render(
      <Modal isOpen animation={customAnimation} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    const modal = screen.getByRole("dialog");
    expect(modal).toHaveStyle({
      transition: `all ${customAnimation.duration}ms ${customAnimation.timingFunction}`,
    });
  });

  it("renders modal with custom z-index", () => {
    render(
      <Modal isOpen zIndex={2000} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    const container = screen.getByTestId("modal-container");
    expect(container).toHaveStyle({ zIndex: 2000 });
  });

  it("handles OK button click", () => {
    const handleOk = jest.fn();
    render(
      <Modal
        isOpen
        onOk={handleOk}
        okButtonProps={{ text: "Submit" }}
        title="Test Modal"
      >
        <div>Modal Content</div>
      </Modal>
    );

    const okButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(okButton);
    expect(handleOk).toHaveBeenCalledTimes(1);
  });

  it("disables OK and Cancel buttons when specified", () => {
    render(
      <Modal
        isOpen
        okButtonProps={{ disabled: true, text: "Submit" }}
        cancelButtonProps={{ disabled: true, text: "Cancel" }}
        title="Test Modal"
      >
        <div>Modal Content</div>
      </Modal>
    );

    const okButton = screen.getByRole("button", { name: "Submit" });
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    expect(okButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });
}); 