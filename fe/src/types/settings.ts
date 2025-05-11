export interface Settings {
  global: GlobalSettings;
  menus: Menu[];
  library: unknown;
  other: unknown;
}

interface Menu {
  type: "default" | "textSelection" | "inputSelection";
  slots: Slot[];
}

interface Slot {
  id: string;
  position: number;
  button: Button | null;
}

interface Button {
  id: string;
  label: string; // eg: 'Translate to english'
  action: ButtonAction;
  tooltip: string | null;
  icon: string | null;
}

type ButtonAction =
  | {
    type: "llm_call";
    prompt: string;
  }
  | {
    type: "common";
    command: "copy" | "paste" | "uppercase";
  }
  | {
    type: "settings";
  };

interface GlobalSettings {
  color: string;
  textColor: string;
  size: number;
  buttonWidth: number;
  buttonHeight: number;
  buttonStyle: string;
  borderRadius: number;
  borderThickness: number;
  layoutType: "circle" | "grid";
  hoverScale: number;
  gradientTo: string;
  gradientDirection: string;
  gradientAngle: number;
  longPressDuration: number;
  clickAndRelease: boolean;
  hoverBorderGradientStart: string;
  hoverBorderGradientEnd: string;
  hoverBorderGradientAngle: number;
  borderColor: string;
  borderGradientStart: string;
  borderGradientEnd: string;
  borderGradientAngle: number;
  defaultBorderGradientStart: string;
  defaultBorderGradientEnd: string;
  defaultBorderGradientAngle: number;
}
