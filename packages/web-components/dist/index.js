import { TarmacButton as n } from "./button.js";
import { TarmacAlert as b } from "./alert.js";
import { TarmacBadge as h } from "./badge.js";
import { TarmacSpinner as u } from "./spinner.js";
import { TarmacChip as C } from "./chip.js";
import { TarmacCheckbox as k } from "./checkbox.js";
import { TarmacPill as I } from "./pill.js";
import { TarmacAvatar as $ } from "./avatar.js";
import { TarmacToggle as v } from "./toggle.js";
import { TarmacDivider as F } from "./divider.js";
import { TarmacStepperIcon as j } from "./stepper-icon.js";
import { i as e, r as m, a as t, b as c } from "./index-8C405PPW.js";
import { T as z } from "./index-8C405PPW.js";
import { TarmacLink as M } from "./link.js";
import { TarmacStatusIndicator as R } from "./status-indicator.js";
import { TarmacRating as K } from "./rating.js";
import { TarmacProgressBar as _ } from "./progress-bar.js";
import { TarmacSlider as H } from "./slider.js";
import { TarmacBreadcrumbCell as Q } from "./breadcrumb-cell.js";
import { TarmacBreadcrumbs as V } from "./breadcrumbs.js";
import { TarmacTabCell as X } from "./tab-cell.js";
import { TarmacInput as Z } from "./input.js";
import { TarmacTextArea as or } from "./textarea.js";
import { TarmacRadio as er } from "./radio.js";
import { TarmacOtpInput as tr } from "./otp-input.js";
import { TarmacModal as pr } from "./modal.js";
import { TarmacToast as xr } from "./toast.js";
import { TarmacSnackbar as fr } from "./snackbar.js";
import { TarmacTooltip as nr } from "./tooltip.js";
import { TarmacPopup as br } from "./popup.js";
import { TarmacDialogBox as hr } from "./dialog-box.js";
import { TarmacSideDrawer as ur } from "./side-drawer.js";
import { TarmacCollapse as Cr } from "./collapse.js";
import { TarmacFab as kr } from "./fab.js";
import { TarmacCoachmarks as Ir } from "./coachmarks.js";
import { TarmacTabGroup as $r } from "./tab-group.js";
import { TarmacFilterDropdown as vr } from "./filter-dropdown.js";
import { g as Fr, s as Or } from "./theme-context-BRj4LHEr.js";
function p() {
  return `:host {
${Object.entries(c).map(([o, a]) => `  ${o}: ${a};`).join(`
`)}
}`;
}
const T = p();
class s extends e {
  static {
    this.tokenStyles = m(T);
  }
  static {
    this.baseStyles = t`
    :host {
      display: inline-block;
      box-sizing: border-box;
      font-family: 'Noto Sans', 'IBM Plex Sans', sans-serif;
    }

    :host *,
    :host *::before,
    :host *::after {
      box-sizing: border-box;
    }

    :host([hidden]) {
      display: none;
    }
  `;
  }
}
export {
  b as TarmacAlert,
  $ as TarmacAvatar,
  h as TarmacBadge,
  s as TarmacBaseElement,
  Q as TarmacBreadcrumbCell,
  V as TarmacBreadcrumbs,
  n as TarmacButton,
  k as TarmacCheckbox,
  C as TarmacChip,
  Ir as TarmacCoachmarks,
  Cr as TarmacCollapse,
  hr as TarmacDialogBox,
  F as TarmacDivider,
  kr as TarmacFab,
  vr as TarmacFilterDropdown,
  Z as TarmacInput,
  M as TarmacLink,
  pr as TarmacModal,
  tr as TarmacOtpInput,
  I as TarmacPill,
  br as TarmacPopup,
  _ as TarmacProgressBar,
  er as TarmacRadio,
  K as TarmacRating,
  ur as TarmacSideDrawer,
  H as TarmacSlider,
  fr as TarmacSnackbar,
  u as TarmacSpinner,
  R as TarmacStatusIndicator,
  j as TarmacStepperIcon,
  X as TarmacTabCell,
  $r as TarmacTabGroup,
  or as TarmacTextArea,
  z as TarmacThemeProvider,
  xr as TarmacToast,
  v as TarmacToggle,
  nr as TarmacTooltip,
  Fr as getThemeFromContext,
  Or as subscribeToTheme
};
