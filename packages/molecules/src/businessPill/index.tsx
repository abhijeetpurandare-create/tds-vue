import { Pill, ThemeProvider } from "@delhivery/tarmac";
import { getPillConfig } from "./utils";


export interface PillProps {
  text: string;
  [key: string]: any;
}

const BusinessPill: React.FC<PillProps> = ({ ...props }) => {
  const status = props.text || '';
  const displayText = getPillConfig(status)?.text;
  return (
    <> 
    <ThemeProvider ><Pill size="md" {...{ ...getPillConfig(props.text || '') , ...props , text:displayText }} /></ThemeProvider></>
  )
}

export default BusinessPill