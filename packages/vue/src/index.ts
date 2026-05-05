/**
 * @tarmac/vue
 *
 * Vue 3 wrappers for the Tarmac Design System.
 */

export { TarmacPlugin } from './plugin';

// Vue wrapper components
export { default as TarmacButton } from './components/TarmacButton.vue';
export { default as TarmacAlert } from './components/TarmacAlert.vue';
export { default as TarmacBadge } from './components/TarmacBadge.vue';
export { default as TarmacSpinner } from './components/TarmacSpinner.vue';
export { default as TarmacChip } from './components/TarmacChip.vue';
export { default as TarmacCheckbox } from './components/TarmacCheckbox.vue';
export { default as TarmacPill } from './components/TarmacPill.vue';
export { default as TarmacAvatar } from './components/TarmacAvatar.vue';
export { default as TarmacToggle } from './components/TarmacToggle.vue';
export { default as TarmacDivider } from './components/TarmacDivider.vue';
export { default as TarmacStepperIcon } from './components/TarmacStepperIcon.vue';
export { default as TarmacThemeProvider } from './components/TarmacThemeProvider.vue';
export { default as TarmacLink } from './components/TarmacLink.vue';
export { default as TarmacStatusIndicator } from './components/TarmacStatusIndicator.vue';
export { default as TarmacRating } from './components/TarmacRating.vue';
export { default as TarmacProgressBar } from './components/TarmacProgressBar.vue';
export { default as TarmacSlider } from './components/TarmacSlider.vue';
export { default as TarmacBreadcrumbCell } from './components/TarmacBreadcrumbCell.vue';
export { default as TarmacBreadcrumbs } from './components/TarmacBreadcrumbs.vue';
export { default as TarmacTabCell } from './components/TarmacTabCell.vue';
export { default as TarmacInput } from './components/TarmacInput.vue';
export { default as TarmacTextArea } from './components/TarmacTextArea.vue';
export { default as TarmacRadio } from './components/TarmacRadio.vue';
export { default as TarmacOtpInput } from './components/TarmacOtpInput.vue';
export { default as TarmacModal } from './components/TarmacModal.vue';
export { default as TarmacToast } from './components/TarmacToast.vue';
export { default as TarmacSnackbar } from './components/TarmacSnackbar.vue';
export { default as TarmacTooltip } from './components/TarmacTooltip.vue';
export { default as TarmacPopup } from './components/TarmacPopup.vue';
export { default as TarmacDialogBox } from './components/TarmacDialogBox.vue';
export { default as TarmacSideDrawer } from './components/TarmacSideDrawer.vue';
export { default as TarmacCollapse } from './components/TarmacCollapse.vue';
export { default as TarmacFab } from './components/TarmacFab.vue';
export { default as TarmacCoachmarks } from './components/TarmacCoachmarks.vue';
export { default as TarmacTabGroup } from './components/TarmacTabGroup.vue';
export { default as TarmacFilterDropdown } from './components/TarmacFilterDropdown.vue';

// Re-export types
export type {
  ButtonVariant, ButtonSize, ButtonStyle, ButtonType,
  AlertVariant, AlertSize, TarmacAlertVariant, TarmacAlertStyle, TarmacAlertSize,
  BadgeVariant, BadgeSize, BadgeType,
  SpinnerSize, SpinnerVariant, TarmacSpinnerVariant, TarmacSpinnerSize,
  ChipType, ChipVariant, ChipSize,
  TarmacCheckboxVariant, TarmacCheckboxStyle, TarmacCheckboxSize,
  PillVariant, PillSize, PillType,
  AvatarSize, AvatarShape, AvatarType, AvatarStatusDotType,
  TarmacToggleColor, TarmacToggleStyle, TarmacToggleSize,
  DividerType, DividerSize,
  StepperIconStyle, StepperIconVariant, StepperIconSize,
  LinkStyle, LinkSize,
  StatusVariant, StatusSize,
  RatingSize,
  ProgressBarSize, ProgressBarVariant,
  SliderVariant, SliderSize, SliderType,
  BreadcrumbCellStyle, BreadcrumbCellSize,
  DividerStyle, BreadcrumbsSize,
  TabType, TabOrientation, TabStyle, TabSize,
  InputStyle, InputType, InputSize, InputStyleVariant,
  TextAreaStyle, TextAreaType, TextAreaSize, TextAreaResize,
  RadioVariant, RadioStyle, RadioSize,
  OtpStyle, OtpSize, OtpVariant, OtpInputType,
  ModalSize,
  ToastVariant, ToastSize, ToastPosition,
  SnackbarVariant, SnackbarStyle, SnackbarSize, SnackbarPosition,
  TooltipPlacement, TooltipTrigger, TooltipVariant, TooltipSize,
  PopupSize,
  DialogBoxType, DialogBoxSize,
  SideDrawerVariant,
  FABPosition, FABVariant, FABPositionMode,
  CoachmarksVariant, CoachmarksSize, CoachmarksArrowPosition,
  TabGroupOrientation, TabGroupSize,
  FilterDropdownSize,
} from '@tarmac/web-components';

export { themeVariables, colors, brandColors } from '@tarmac/tokens';
