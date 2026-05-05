import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RatingSet, ThemeProvider, Button, TextArea } from "@delhivery/tarmac";
import type { RatingSetProps, RatingItem } from "@delhivery/tarmac";

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);

const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider
    initialSource="./tarmac-theme.json"
    activeTheme="tarmac-theme"
    modeOverrides={{ "DLV_Mapped ": "Dark" }}
  >
    <div style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 8 }}>
      {children}
    </div>
  </ThemeProvider>
);

const meta = {
  title: "Tarmac TDS/Rating Set",
  component: RatingSet,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story: React.FC) => <Wrap><Story /></Wrap>],
} satisfies Meta;
export default meta;
type Story = StoryObj;

const FEEDBACK_INPUT = (
  <TextArea
    textAreaStyle="tarmac-01"
    textAreaType="regular"
    textAreaSize="md"
    styleVariant="standard"
    placeholder="Comment your feedback"
    rows={3}
  />
);

const DELIVERY_ITEMS: RatingItem[] = [
  { icon: "😡", label: "Terrible" },
  { icon: "😞", label: "Bad" },
  { icon: "😐", label: "Okay" },
  { icon: "😊", label: "Good" },
  { icon: "🥰", label: "Amazing" },
];

const FOOD_ITEMS: RatingItem[] = [
  { icon: "🤮", label: "Awful" },
  { icon: "😕", label: "Not great" },
  { icon: "😋", label: "Tasty" },
  { icon: "😍", label: "Delicious" },
  { icon: "🤩", label: "Outstanding" },
];

/* ─── Playground ─── */
const PlaygroundRender: React.FC<RatingSetProps> = (args) => {
  const [value, setValue] = React.useState(args.value ?? 3);
  React.useEffect(() => { setValue(args.value ?? 3); }, [args.value]);
  return (
    <div style={{ padding: 24 }}>
      <RatingSet
        {...args}
        value={value}
        onChange={setValue}
        feedbackInput={args.showFeedback ? FEEDBACK_INPUT : undefined}
        onSubmit={() => alert(`Submitted: ${value}`)}
        onClose={() => alert("Closed")}
      />
    </div>
  );
};

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: { ratingStyle: "emojis", title: "Rate Us !", value: 3, showFeedback: true, showBadge: true },
  render: (args: any) => <PlaygroundRender {...args} />,
};

/* ─── Emojis ─── */
export const EmojisDefault: Story = {
  name: "Emojis — Default Items",
  render: () => {
    const [value, setValue] = React.useState(3);
    return (
      <div style={{ padding: 24 }}>
        <RatingSet ratingStyle="emojis" value={value} onChange={setValue}
          feedbackInput={FEEDBACK_INPUT}
          onSubmit={() => alert(`Emoji: ${value}`)} onClose={() => alert("Close")} />
      </div>
    );
  },
};

export const EmojisCustomItems: Story = {
  name: "Emojis — Custom Items",
  render: () => {
    const [value, setValue] = React.useState(0);
    return (
      <div style={{ padding: 24 }}>
        <h4 style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Custom items: delivery experience</h4>
        <RatingSet ratingStyle="emojis" items={DELIVERY_ITEMS}
          value={value} onChange={setValue} title="How was your delivery?"
          feedbackInput={FEEDBACK_INPUT}
          onSubmit={() => alert(`Delivery: ${value}`)} onClose={() => alert("Close")} />
      </div>
    );
  },
};

export const EmojisFoodItems: Story = {
  name: "Emojis — Food Rating",
  render: () => {
    const [value, setValue] = React.useState(0);
    return (
      <div style={{ padding: 24 }}>
        <h4 style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Custom items: food rating</h4>
        <RatingSet ratingStyle="emojis" items={FOOD_ITEMS}
          value={value} onChange={setValue} title="Rate the food"
          onSubmit={() => alert(`Food: ${value}`)} onClose={() => alert("Close")} />
      </div>
    );
  },
};

/* ─── Stars ─── */
export const StarsDefault: Story = {
  name: "Stars — Default",
  render: () => {
    const [value, setValue] = React.useState(4);
    return (
      <div style={{ padding: 24 }}>
        <RatingSet ratingStyle="stars" value={value} onChange={setValue}
          feedbackInput={FEEDBACK_INPUT}
          onSubmit={() => alert(`Stars: ${value}`)} onClose={() => alert("Close")} />
      </div>
    );
  },
};

export const StarsCustomLabels: Story = {
  name: "Stars — Custom Labels",
  render: () => {
    const [value, setValue] = React.useState(0);
    const items: RatingItem[] = [
      { icon: "⭐", label: "Needs work" }, { icon: "⭐", label: "Fair" },
      { icon: "⭐", label: "Good" }, { icon: "⭐", label: "Very Good" }, { icon: "⭐", label: "Perfect" },
    ];
    return (
      <div style={{ padding: 24 }}>
        <RatingSet ratingStyle="stars" items={items} value={value} onChange={setValue}
          title="Rate our service"
          onSubmit={() => alert(`Stars: ${value}`)} onClose={() => alert("Close")} />
      </div>
    );
  },
};

/* ─── Slider ─── */
export const SliderDefault: Story = {
  name: "Slider — Default",
  render: () => {
    const [value, setValue] = React.useState(75);
    return (
      <div style={{ padding: 24 }}>
        <RatingSet ratingStyle="slider" value={value} onChange={setValue}
          feedbackInput={FEEDBACK_INPUT}
          onSubmit={() => alert(`Slider: ${value}`)} onClose={() => alert("Close")} />
      </div>
    );
  },
};

export const SliderCustomItems: Story = {
  name: "Slider — Custom Items",
  render: () => {
    const [value, setValue] = React.useState(50);
    const items: RatingItem[] = [
      { icon: "🥶", label: "Freezing" }, { icon: "😬", label: "Cold" },
      { icon: "😊", label: "Warm" }, { icon: "🔥", label: "Hot" },
    ];
    return (
      <div style={{ padding: 24 }}>
        <h4 style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Custom slider items (4 ranges)</h4>
        <RatingSet ratingStyle="slider" items={items} value={value} onChange={setValue}
          title="Temperature check"
          onSubmit={() => alert(`Temp: ${value}`)} onClose={() => alert("Close")} />
      </div>
    );
  },
};

/* ─── Full Matrix ─── */
export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 32 }}>
      {(["emojis", "stars", "slider"] as const).map((style) => (
        <div key={style}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#555" }}>Style: {style}</h3>
          <RatingSet ratingStyle={style} value={style === "slider" ? 75 : 3}
            showFeedback feedbackInput={FEEDBACK_INPUT} showBadge onClose={() => {}} />
        </div>
      ))}
    </div>
  ),
};

/* ─── Compound Composition ─── */
export const CompoundComposition: Story = {
  name: "Compound Composition",
  render: () => {
    const [value, setValue] = React.useState(0);
    const customItems: RatingItem[] = [
      { icon: "👎", label: "Nope" }, { icon: "🤷", label: "Meh" }, { icon: "👍", label: "Nice" },
      { icon: "💪", label: "Great" }, { icon: "🚀", label: "Awesome" },
    ];
    return (
      <div style={{ padding: 24 }}>
        <h4 style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Full composition mode</h4>
        <RatingSet ratingStyle="emojis" items={customItems} value={value} onChange={setValue}
          title="How was your experience?" onClose={() => alert("Close")}
          footerActions={
            <Button buttonStyle="primary" variant="black" size="sm"
              text="Send Feedback" onClick={() => alert(`Rating: ${value}`)} />
          }
        >
          <RatingSet.Content>
            <RatingSet.EmojiRating />
            {value > 0 && <RatingSet.BadgeLabel />}
            <RatingSet.Feedback>{FEEDBACK_INPUT}</RatingSet.Feedback>
          </RatingSet.Content>
        </RatingSet>
      </div>
    );
  },
};

/* ─── Custom Footer ─── */
export const CustomFooterActions: Story = {
  name: "Custom Footer Actions",
  render: () => {
    const [value, setValue] = React.useState(4);
    return (
      <div style={{ padding: 24 }}>
        <RatingSet ratingStyle="stars" value={value} onChange={setValue}
          onClose={() => alert("Closed")}
          footerActions={
            <Button buttonStyle="primary" variant="black" size="sm"
              text="Submit Rating" onClick={() => alert(`Rating: ${value}`)} />
          }
        />
      </div>
    );
  },
};

/* ─── Ghost State ─── */
export const GhostState: Story = {
  name: "Ghost / Skeleton",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24 }}>
      <div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Website Popup</div>
        <RatingSet isGhost variant="websitePopup" />
      </div>
      <div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Mobile Bottom Sheet</div>
        <RatingSet isGhost variant="mobileBottomSheet" />
      </div>
    </div>
  ),
};

/* ─── Light vs Dark Mode ─── */
export const LightVsDarkMode: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24 }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 12, fontSize: 14, color: "#888" }}>Light Mode</h4>
        <Wrap>
          <RatingSet ratingStyle="emojis" value={3} showFeedback feedbackInput={FEEDBACK_INPUT} showBadge onClose={() => {}} />
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 12, fontSize: 14, color: "#888" }}>Dark Mode</h4>
        <DarkWrap>
          <RatingSet ratingStyle="emojis" value={3} showFeedback feedbackInput={FEEDBACK_INPUT} showBadge onClose={() => {}} />
        </DarkWrap>
      </div>
    </div>
  ),
};
