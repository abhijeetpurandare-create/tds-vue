import React from 'react';

export interface ThemeColors {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  success: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  error: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  warning: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  info: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
}

export interface ButtonBase {
  fontFamily: string;
  fontWeight: string;
  transition: string;
  focus: {
    outline: string;
    ring: string;
  };
  radius?: {
    default: string;
    rounded: string;
  };
}

export interface ButtonVariant {
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
  hoverColor?: string;
  hoverTextColor?: string;
  focusRingColor: string;
  underline?: boolean;
}

export interface ButtonSize {
  padding: string;
  fontSize: string;
  iconSize: string;
  gap: string;
}

export interface ButtonStates {
  disabled: {
    backgroundColor: string;
    textColor: string;
    cursor: string;
  };
  loading: {
    opacity: string;
    cursor: string;
  };
}

export interface ButtonConfig {
  base: ButtonBase;
  variants: {
    primary: ButtonVariant;
    secondary: ButtonVariant;
    outline: ButtonVariant;
  };
  sizes: {
    sm: ButtonSize;
    md: ButtonSize;
    lg: ButtonSize;
  };
  states: ButtonStates;
}

export interface CardBase {
  padding: string;
  backgroundColor: string;
  shadow: string;
  border: string;
  radius: {
    default: string;
    sharp: string;
    rounded: string;
  };
}

export interface CardVariant {
  shadow?: string;
  border?: string;
  backgroundColor?: string;
}

export interface CardConfig {
  base: CardBase;
  variants: {
    elevated: CardVariant;
    outlined: CardVariant;
    flat: CardVariant;
  };
}

export interface InputBase {
  fontFamily: string;
  fontWeight: string;
  transition: string;
  focus: {
    outline: string;
    ring: string;
  };
  radius: {
    default: string;
    sharp: string;
    rounded: string;
  };
}

export interface InputVariant {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  placeholderColor: string;
  focusBorderColor: string;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
}

export interface InputSize {
  padding: string;
  fontSize: string;
  height: string;
}

export interface InputState {
  borderColor: string;
  backgroundColor: string;
  textColor: string;
}

export interface InputStates {
  error: InputState;
  success: InputState;
  disabled: {
    opacity: string;
    cursor: string;
    backgroundColor: string;
  };
}

export interface InputConfig {
  base: InputBase;
  variants: {
    filled: InputVariant;
    outlined: InputVariant;
  };
  sizes: {
    sm: InputSize;
    md: InputSize;
    lg: InputSize;
  };
  states: InputStates;
}

export interface ModalBase {
  fontFamily: string;
  transition: string;
  radius: string;
  shadow: string;
  zIndex: number;
}

export interface ModalVariant {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export interface ModalSize {
  width: string;
  padding: string;
}

export interface ModalStates {
  loading: {
    opacity: string;
    cursor: string;
  };
}

export interface ModalMask {
  backgroundColor: string;
  blur: string;
}

export interface ModalHeader {
  fontSize: string;
  padding: string;
  borderBottom: string;
}

export interface ModalBody {
  padding: string;
}

export interface ModalFooter {
  padding: string;
  borderTop: string;
  gap: string;
}

export interface ModalCloseButton {
  padding: string;
  hover: string;
  radius: string;
  transition: string;
}

export interface ModalConfig {
  base: ModalBase;
  variants: {
    default: ModalVariant;
    info: ModalVariant;
    success: ModalVariant;
    warning: ModalVariant;
    error: ModalVariant;
  };
  sizes: {
    sm: ModalSize;
    md: ModalSize;
    lg: ModalSize;
  };
  states: ModalStates;
  mask: ModalMask;
  header: ModalHeader;
  body: ModalBody;
  footer: ModalFooter;
  closeButton: ModalCloseButton;
}

export interface SpinnerSize {
  size: string;
  strokeWidth: number;
}

export interface SpinnerVariant {
  color: string;
  trackColor: string;
}

export interface SpinnerConfig {
  sizes: {
    sm: SpinnerSize;
    md: SpinnerSize;
    lg: SpinnerSize;
  };
  variants: {
    default: SpinnerVariant;
    primary: SpinnerVariant;
    secondary: SpinnerVariant;
    success: SpinnerVariant;
    error: SpinnerVariant;
    warning: SpinnerVariant;
    info: SpinnerVariant;
  };
}

export interface TableVariantConfig {
  container?: {
    backgroundColor?: string;
    borderRadius?: string;
    overflow?: string;
    border?: string;
  };
  table?: {
    borderCollapse?: string;
    borderSpacing?: string;
  };
  row?: {
    backgroundColor?: string;
    borderRadius?: string;
    borderColor?: string;
  };
  cell?: {
    borderBottom?: string;
  };
  header?: {
    backgroundColor?: string;
  };
  states?: {
    hover?: {
      backgroundColor?: string;
    };
    selected?: {
      backgroundColor?: string;
    };
    striped?: {
      backgroundColor?: string;
    };
    disabled?: {
      cursor?: string;
    };
  };
}

export interface TableConfig {
  base?: {
    fontFamily?: string;
    transition?: string;
    radius?: string;
    borderColor?: string;
    backgroundColor?: string;
  };
  sizes?: {
    small?: {
      headerPadding?: string;
      cellPadding?: string;
      fontSize?: string;
      headerFontSize?: string;
    };
    medium?: {
      headerPadding?: string;
      cellPadding?: string;
      fontSize?: string;
      headerFontSize?: string;
    };
    large?: {
      headerPadding?: string;
      cellPadding?: string;
      fontSize?: string;
      headerFontSize?: string;
    };
  };
  header?: {
    backgroundColor?: string;
    textColor?: string;
    fontWeight?: string;
    hoverBackgroundColor?: string;
  };
  body?: {
    backgroundColor?: string;
    textColor?: string;
    hoverBackgroundColor?: string;
    stripedBackgroundColor?: string;
  };
  states?: {
    selected?: {
      backgroundColor?: string;
    };
    disabled?: {
      cursor?: string;
    };
  };
  selection?: {
    width?: string;
    checkedColor?: string;
    borderColor?: string;
    disabledBorderColor?: string;
    disabledBackgroundColor?: string;
  };
  sorter?: {
    activeColor?: string;
    inactiveColor?: string;
    iconSize?: string;
    gap?: string;
  };
  pagination?: {
    gap?: string;
    fontSize?: string;
    buttonMinWidth?: string;
    buttonHeight?: string;
    buttonPadding?: string;
    buttonBorderColor?: string;
    buttonBackgroundColor?: string;
    buttonRadius?: string;
    activeColor?: string;
    activeFontWeight?: string;
    disabledTextColor?: string;
    disabledBackgroundColor?: string;
    inputWidth?: string;
  };
  empty?: {
    padding?: string;
    textColor?: string;
    iconFill?: string;
    iconStroke?: string;
  };
  loading?: {
    overlayBackground?: string;
    spinnerColor?: string;
    trackColor?: string;
    spinnerSize?: string;
  };
  rowFooter?: {
    borderStyle?: string;
    borderColor?: string;
    padding?: string;
    backgroundColor?: string;
  };
  variants?: {
    default?: TableVariantConfig;
    card?: TableVariantConfig;
    [key: string]: TableVariantConfig | undefined;
  };
  tableHeader?: {
    container?: {
      backgroundColor?: string;
      borderRadius?: string;
    };
    sectionHeader?: {
      padding?: string;
      gap?: string;
      titleFontFamily?: string;
      titleFontSize?: string;
      titleLineHeight?: string;
      titleFontWeight?: string;
      titleColor?: string;
      subtextFontFamily?: string;
      subtextFontSize?: string;
      subtextLineHeight?: string;
      subtextFontWeight?: string;
      subtextColor?: string;
      titlesGap?: string;
      titlesContainerGap?: string;
      iconSize?: string;
      badgesGap?: string;
      actionsGap?: string;
    };
    ghost?: {
      pillColor?: string;
      rectColor?: string;
      pillRadius?: string;
      rectRadius?: string;
    };
    tabs?: {
      fontFamily?: string;
      fontSize?: string;
      lineHeight?: string;
      padding?: string;
      groupPadding?: string;
      gap?: string;
      activeFontWeight?: string;
      inactiveFontWeight?: string;
      activeTextColor?: string;
      inactiveTextColor?: string;
      activeBorderWidth?: string;
      activeBorderColor?: string;
      borderBottomColor?: string;
    };
    search?: {
      borderWidth?: string;
      borderColor?: string;
      borderRadius?: string;
      backgroundColor?: string;
      padding?: string;
      fontSize?: string;
      lineHeight?: string;
      placeholderColor?: string;
      textColor?: string;
      fontFamily?: string;
      width?: string;
      iconSize?: string;
    };
    filter?: {
      borderWidth?: string;
      borderColor?: string;
      borderRadius?: string;
      backgroundColor?: string;
      padding?: string;
      fontSize?: string;
      lineHeight?: string;
      textColor?: string;
      fontFamily?: string;
      activeBorderColor?: string;
      activeBackgroundColor?: string;
    };
    actionBar?: {
      padding?: string;
      gap?: string;
      itemGap?: string;
    };
    buttons?: {
      borderRadius?: string;
      padding?: string;
      fontSize?: string;
      lineHeight?: string;
      fontFamily?: string;
      fontWeight?: string;
      primary?: {
        backgroundColor?: string;
        textColor?: string;
      };
      secondary?: {
        backgroundColor?: string;
        textColor?: string;
        borderWidth?: string;
        borderColor?: string;
      };
      icon?: {
        borderWidth?: string;
        borderColor?: string;
        backgroundColor?: string;
      };
    };
  };

  // ============================================
  // TDS Table Sub-Component Configs
  // ============================================

  /** Table Text Cell — primary data cell with title/subtext hierarchy */
  textCell?: {
    container?: {
      gap?: string;
      padding?: string;
    };
    title?: {
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
      color?: string;
    };
    subtext?: {
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
      color?: string;
    };
    icon?: {
      smSize?: string;
      mdSize?: string;
    };
    ghost?: {
      shortWidth?: string;
      shortHeight?: string;
      longWidth?: string;
      longHeight?: string;
      borderRadius?: string;
      backgroundColor?: string;
    };
  };

  /** Table Header Cell — column identity with sort/selection */
  headerCell?: {
    backgroundColor?: string;
    padding?: string;
    gap?: string;
    label?: {
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
      color?: string;
    };
    checkbox?: {
      size?: string;
      accentColor?: string;
    };
    iconSize?: string;
    loader?: {
      shortWidth?: string;
      longHeight?: string;
      borderRadius?: string;
      backgroundColor?: string;
    };
  };

  /** Divider — row separator */
  divider?: {
    lineColor?: string;
    dashColor?: string;
    weight?: string;
  };

  /** Status Indicator — colored dot + label for status cells */
  statusIndicator?: {
    iconSize?: string;
    label?: {
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
      color?: string;
    };
    variants?: {
      [key: string]: {
        color?: string;
      };
    };
  };

  /** Cell Badge/Pills — badge or pill content in cells */
  cellBadgePills?: {
    container?: {
      gap?: string;
      padding?: string;
    };
    badge?: {
      padding?: string;
      borderRadius?: string;
      backgroundColor?: string;
      borderWidth?: string;
      borderColor?: string;
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
      color?: string;
    };
    pill?: {
      padding?: string;
      borderRadius?: string;
      backgroundColor?: string;
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
      color?: string;
    };
    ghost?: {
      width?: string;
      height?: string;
      borderRadius?: string;
      backgroundColor?: string;
    };
  };

  /** Cell Addons — rich cell content (checkbox, button, multistop, slot) */
  cellAddons?: {
    container?: {
      gap?: string;
      padding?: string;
    };
    title?: {
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
      color?: string;
    };
    subtext?: {
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
      color?: string;
    };
    checkbox?: {
      size?: string;
      accentColor?: string;
    };
    inlineBadge?: {
      padding?: string;
      borderRadius?: string;
      borderWidth?: string;
      borderColor?: string;
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
      color?: string;
    };
    slot?: {
      height?: string;
      backgroundColor?: string;
      borderRadius?: string;
      fontSize?: string;
      color?: string;
    };
    ghost?: {
      height?: string;
      borderRadius?: string;
      backgroundColor?: string;
    };
    multistop?: {
      originColor?: string;
      destinationColor?: string;
      lineColor?: string;
      stopColor?: string;
    };
    button?: {
      primaryBackgroundColor?: string;
      primaryTextColor?: string;
      primaryBorderRadius?: string;
      secondaryBorderColor?: string;
      secondaryTextColor?: string;
      padding?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
    };
  };

  /** Section Header — title bar with badges and actions */
  sectionHeader?: {
    container?: {
      backgroundColor?: string;
      borderRadius?: string;
      padding?: string;
    };
    title?: {
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
      color?: string;
    };
    subtext?: {
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
      color?: string;
    };
    iconSize?: string;
    badgesGap?: string;
    actionsGap?: string;
    sectionGap?: string;
    titlesGap?: string;
    iconGap?: string;
    ghost?: {
      titleBarWidth?: string;
      titleBarHeight?: string;
      subtextBarWidth?: string;
      subtextBarHeight?: string;
      badgeWidth?: string;
      badgeHeight?: string;
      buttonWidth?: string;
      buttonHeight?: string;
      barRadius?: string;
      rectRadius?: string;
      barColor?: string;
      rectColor?: string;
    };
  };

  /** Section Footer — action bar with slot and tabs */
  sectionFooter?: {
    container?: {
      backgroundColor?: string;
      borderRadius?: string;
    };
    actionBar?: {
      padding?: string;
      gap?: string;
    };
    buttonsGap?: string;
    slotHeight?: string;
    tabs?: {
      padding?: string;
      fontFamily?: string;
      fontSize?: string;
      lineHeight?: string;
      fontWeight?: string;
      activeFontWeight?: string;
      textColor?: string;
      activeBorderColor?: string;
      activeBorderWidth?: string;
      cellPadding?: string;
    };
    ghost?: {
      buttonWidth?: string;
      buttonHeight?: string;
      iconButtonSize?: string;
      rectRadius?: string;
      rectColor?: string;
    };
  };

  /** Table Row — card-style row with cells and footer */
  tableRow?: {
    container?: {
      backgroundColor?: string;
      borderRadius?: string;
      borderWidth?: string;
      borderColor?: string;
    };
    innerPadding?: string;
    innerGap?: string;
    footer?: {
      backgroundColor?: string;
      borderRadius?: string;
      actionBarPadding?: string;
      actionBarGap?: string;
      buttonsGap?: string;
      slotGap?: string;
    };
    ghost?: {
      cellBarShortWidth?: string;
      cellBarShortHeight?: string;
      cellBarLongWidth?: string;
      cellBarLongHeight?: string;
      textBarShortWidth?: string;
      textBarShortHeight?: string;
      textBarLongWidth?: string;
      textBarLongHeight?: string;
      buttonWidth?: string;
      buttonHeight?: string;
      iconButtonSize?: string;
      cellHeight?: string;
      cellGap?: string;
      cellPadding?: string;
      textCellGap?: string;
      textCellPadding?: string;
      barRadius?: string;
      rectRadius?: string;
      barColor?: string;
      rectColor?: string;
    };
  };

  /** Modern Layout — card area, header row, proof chips */
  modernLayout?: {
    headerRow?: {
      backgroundColor?: string;
      padding?: string;
      gap?: string;
    };
    cardArea?: {
      backgroundColor?: string;
      padding?: string;
      gap?: string;
    };
    proofChip?: {
      borderWidth?: string;
      borderColor?: string;
      borderRadius?: string;
      height?: string;
      backgroundColor?: string;
      iconBg?: string;
      iconSize?: string;
      iconContainerSize?: string;
      label?: {
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
        lineHeight?: string;
        color?: string;
      };
    };
    proofLabel?: {
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      lineHeight?: string;
      color?: string;
    };
  };

  /** Ghost — skeleton placeholder config for loading state */
  ghost?: {
    barColor?: string;
    barDarkColor?: string;
    rectColor?: string;
    barRadius?: string;
    rectRadius?: string;
    headerCell?: {
      backgroundColor?: string;
      height?: string;
      padding?: string;
      iconWidth?: string;
      iconHeight?: string;
      labelHeight?: string;
    };
    checkboxCell?: {
      checkboxSize?: string;
      titleWidth?: string;
      titleHeight?: string;
      subtextHeight?: string;
    };
    textCell?: {
      titleWidth?: string;
      titleHeight?: string;
      subtextWidth?: string;
      subtextHeight?: string;
    };
    badgeCell?: {
      width?: string;
      height?: string;
    };
    actionCell?: {
      width?: string;
      height?: string;
    };
  };
}

export interface SelectBase {
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
}

export interface SelectVariant {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export interface SelectSize {
  fontSize: string;
  padding: string;
}

export interface SelectConfig {
  base: SelectBase;
  variants: {
    default: SelectVariant;
    outlined: SelectVariant;
    filled: SelectVariant;
  };
  sizes: {
    sm: SelectSize;
    md: SelectSize;
    lg: SelectSize;
  };
}

export interface PillSize {
  padding: string;
  fontSize: string;
}

export interface PillVariant {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  closeIconColor: string;
}

export interface PillConfig {
  borderRadius: string;
  sizes: {
    sm: PillSize;
    md: PillSize;
    lg: PillSize;
  };
  variants: {
    default: PillVariant;
    success: PillVariant;
    danger: PillVariant;
    warning: PillVariant;
    info: PillVariant;
  };
}

export interface InputTagConfig {
  container: {
    borderColor: string;
    borderRadius: string;
    backgroundColor: string;
    focusBorderColor: string;
    errorBorderColor: string;
    disabledBackgroundColor: string;
    disabledBorderColor: string;
    minHeight: string;
    maxHeight: string;
    padding: string;
    gap: string;
  };
  tag: {
    borderRadius: string;
    padding: string;
    fontSize: string;
    fontWeight: number;
    backgroundColor: string;
    textColor: string;
    errorBackgroundColor: string;
    errorTextColor: string;
    closeIconColor: string;
    errorCloseIconColor: string;
  };
  input: {
    fontSize: string;
    minWidth: string;
    minHeight: string;
    color: string;
    placeholderColor: string;
  };
  label: {
    fontSize: string;
    fontWeight: number;
    color: string;
    marginBottom: string;
  };
  helperText: {
    fontSize: string;
    errorColor: string;
  };
  clearButton: {
    fontSize: string;
    color: string;
  };
}

export interface DropdownConfig {
  base: {
    fontFamily: string;
    fontWeight: string;
    transition: string;
    focus: {
      outline: string;
      ring: string;
    };
    radius: {
      default: string;
      rounded: string;
    };
  };
  variants: {
    primary: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      hoverBackgroundColor: string;
      hoverBorderColor: string;
      focusRingColor: string;
    };
    secondary: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      hoverBackgroundColor: string;
      hoverBorderColor: string;
      focusRingColor: string;
    };
    outline: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      hoverBackgroundColor: string;
      hoverBorderColor: string;
      focusRingColor: string;
    };
  };
  sizes: {
    sm: {
      padding: string;
      fontSize: string;
      iconSize: string;
      iconSpacing: string;
    };
    md: {
      padding: string;
      fontSize: string;
      iconSize: string;
      iconSpacing: string;
    };
    lg: {
      padding: string;
      fontSize: string;
      iconSize: string;
      iconSpacing: string;
    };
  };
  states: {
    disabled: {
      opacity: number;
      backgroundColor: string;
      color: string;
      borderColor: string;
      cursor: string;
    };
    loading: {
      opacity: number;
      cursor: string;
    };
  };
  popup: {
    backgroundColor: string;
    borderColor: string;
    boxShadow: string;
    zIndex: number;
  };
  options: {
    hoverBackgroundColor: string;
    selectedBackgroundColor: string;
    selectedTextColor: string;
    disabledOpacity: number;
  };
  search: {
    borderColor: string;
    backgroundColor: string;
    textColor: string;
    focusBorderColor: string;
    focusBoxShadow: string;
  };
  multiSelect?: {
    tagBackgroundColor?: string;
    tagTextColor?: string;
  };
  label?: {
    fontWeight?: string;
  };
}

export interface TabsConfig {
  base: {
    fontFamily: string;
    transition: string;
  };
  borderColor?: string;
  cardBackgroundColor?: string;
  tabTextColor?: string;
  tabHoverTextColor?: string;
  tabHoverBackgroundColor?: string;
  activeTabTextColor?: string;
  activeTabBackgroundColor?: string;
  indicatorColor?: string;
  disabledTabTextColor?: string;
  cardTabBackgroundColor?: string;
  cardTabBorderColor?: string;
  cardTabBoxShadow?: string;
  sizes: {
    sm: {
      padding: string;
      fontSize: string;
    };
    md: {
      padding: string;
      fontSize: string;
    };
    lg: {
      padding: string;
      fontSize: string;
    };
  };
}

export interface PaginationConfig {
  base: {
    fontFamily: string;
    transition: string;
  };
  container: {
    padding: string;
    gap: string;
    fontSize: string;
  };
  sizes: {
    default: {
      padding: string;
      fontSize: string;
      minWidth: string;
      height: string;
      iconSize: string;
    };
    small: {
      padding: string;
      fontSize: string;
      minWidth: string;
      height: string;
      iconSize: string;
    };
  };
  button: {
    backgroundColor: string;
    borderColor: string;
    borderRadius: string;
    hoverBorderColor: string;
    hoverColor: string;
    disabledTextColor: string;
    disabledBackgroundColor: string;
  };
  activeButton: {
    backgroundColor: string;
    color: string;
    fontWeight: string;
    hoverBackgroundColor: string;
    hoverColor: string;
  };
  navButton: {
    backgroundColor: string;
    fontSize: string;
    hoverBorderColor: string;
    hoverColor: string;
    disabledColor: string;
  };
  select: {
    height: string;
    padding: string;
    borderColor: string;
    borderRadius: string;
    fontSize: string;
  };
  input: {
    width: string;
    height: string;
    padding: string;
    borderColor: string;
    borderRadius: string;
    fontSize: string;
    textAlign: string;
  };
  iconButton: {
    width: string;
    height: string;
    borderColor: string;
    borderRadius: string;
    backgroundColor: string;
    fontSize: string;
    hoverBorderColor: string;
    hoverColor: string;
    disabledColor: string;
    disabledBackgroundColor: string;
  };
  ellipsis: {
    padding: string;
    lineHeight: string;
  };
  states: {
    disabled: {
      cursor: string;
      color: string;
      backgroundColor: string;
    };
  };
}

export interface SwitchBase {
  fontFamily: string;
  transition: string;
  focus: {
    outline: string;
    ring: string;
  };
  radius: {
    default: string;
    rounded: string;
  };
}

export interface SwitchVariant {
  backgroundColor: string;
  uncheckedBackgroundColor: string;
  borderColor?: string;
  hoverColor: string;
  focusRingColor: string;
}

export interface SwitchSize {
  width: string;
  height: string;
  handleSize: string;
  fontSize: string;
  padding: string;
}

export interface SwitchStates {
  disabled: {
    opacity: string;
    cursor: string;
  };
  loading: {
    opacity: string;
    cursor: string;
  };
}

export interface SwitchConfig {
  base: SwitchBase;
  variants: {
    primary: SwitchVariant;
    secondary: SwitchVariant;
    outline: SwitchVariant;
  };
  sizes: {
    sm: SwitchSize;
    md: SwitchSize;
    lg: SwitchSize;
  };
  states: SwitchStates;
}

export interface AlertConfig {
  base: {
    fontFamily: string;
    fontWeight: string;
    transition: string;
    radius: string;
    padding: string;
  };
  variants: {
    default: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      iconColor: string;
    };
    primary: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      iconColor: string;
    };
    destructive: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      iconColor: string;
    };
    success: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      iconColor: string;
    };
    warning: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      iconColor: string;
    };
    info: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      iconColor: string;
    };
  };
  sizes: {
    sm: {
      padding: string;
      fontSize: string;
      iconSize: string;
    };
    md: {
      padding: string;
      fontSize: string;
      iconSize: string;
    };
    lg: {
      padding: string;
      fontSize: string;
      iconSize: string;
    };
  };
}

export interface StepsConfig {
  base: {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
    backgroundColor: string;
    borderColor: string;
  };
  sizes: {
    small: {
      iconSize: string;
      iconBorderRadius: string;
      fontSize: string;
      fontFamily: string;
      lineHeight: string;
      stepPadding: string;
      stepGap: string;
      containerPadding: string;
      containerGap: string;
      connectorHeight: string;
      iconInnerPadding: string;
      iconInnerSize: string;
      iconContentSize: string;
    };
    medium: {
      iconSize: string;
      iconBorderRadius: string;
      fontSize: string;
      fontFamily: string;
      lineHeight: string;
      stepPadding: string;
      stepGap: string;
      containerPadding: string;
      containerGap: string;
      connectorHeight: string;
      iconInnerPadding: string;
      iconInnerSize: string;
      iconContentSize: string;
    };
    large: {
      iconSize: string;
      iconBorderRadius: string;
      fontSize: string;
      fontFamily: string;
      lineHeight: string;
      stepPadding: string;
      stepGap: string;
      containerPadding: string;
      containerGap: string;
      connectorHeight: string;
      iconInnerPadding: string;
      iconInnerSize: string;
      iconContentSize: string;
    };
  };
  colors: {
    wait: {
      backgroundColor: string;
      borderColor: string;
      textColor: string;
      iconColor: string;
    };
    process: {
      backgroundColor: string;
      borderColor: string;
      textColor: string;
      iconColor: string;
    };
    finish: {
      backgroundColor: string;
      borderColor: string;
      textColor: string;
      iconColor: string;
    };
    error: {
      backgroundColor: string;
      borderColor: string;
      textColor: string;
      iconColor: string;
    };
  };
  connectors: {
    default: string;
    active: string;
  };
}

export interface CollapseConfig {
  base: {
    fontFamily: string;
    backgroundColor: string;
    borderColor: string;
    borderRadius: string;
    primaryColor: string;
  };
  sizes: {
    small: {
      borderRadius: string;
      headerBackgroundColor: string;
      headerFontWeight: string;
      headerTextColor: string;
      headerHoverBackgroundColor: string;
      contentBackgroundColor: string;
      contentTextColor: string;
      iconColor: string;
      arrowColor: string;
      fontFamily: string;
      lineHeight: string;
    };
    medium: {
      borderRadius: string;
      headerBackgroundColor: string;
      headerFontWeight: string;
      headerTextColor: string;
      headerHoverBackgroundColor: string;
      contentBackgroundColor: string;
      contentTextColor: string;
      iconColor: string;
      arrowColor: string;
      fontFamily: string;
      lineHeight: string;
    };
    large: {
      borderRadius: string;
      headerBackgroundColor: string;
      headerFontWeight: string;
      headerTextColor: string;
      headerHoverBackgroundColor: string;
      contentBackgroundColor: string;
      contentTextColor: string;
      iconColor: string;
      arrowColor: string;
      fontFamily: string;
      lineHeight: string;
    };
  };
}

export interface UploadConfig {
  base: {
    fontFamily: string;
    fontWeight: string;
    borderRadius: string;
    backgroundColor: string;
    textColor: string;
    descriptionColor: string;
    iconColor: string;
    iconBackgroundColor: string;
    actionColor: string;
    actionHoverColor: string;
    borderStyle: string;
  };
  variants: {
    default: {
      backgroundColor: string;
      borderColor: string;
      hoverBackgroundColor: string;
      hoverBorderColor: string;
      borderStyle: string;
    };
    drag: {
      backgroundColor: string;
      borderColor: string;
      hoverBackgroundColor: string;
      hoverBorderColor: string;
      borderStyle: string;
    };
    error: {
      backgroundColor: string;
      borderColor: string;
      hoverBackgroundColor: string;
      hoverBorderColor: string;
      borderStyle: string;
    };
  };
  sizes: {
    small: {
      padding: string;
      fontSize: string;
      descriptionFontSize: string;
      iconSize: string;
      iconContainerSize: string;
      gap: string;
      width: string;
      minHeight: string;
      listMarginTop: string;
      listGap: string;
      listItemGap: string;
      listItemPadding: string;
      actionGap: string;
    };
    medium: {
      padding: string;
      fontSize: string;
      descriptionFontSize: string;
      iconSize: string;
      iconContainerSize: string;
      gap: string;
      width: string;
      minHeight: string;
      listMarginTop: string;
      listGap: string;
      listItemGap: string;
      listItemPadding: string;
      actionGap: string;
    };
    large: {
      padding: string;
      fontSize: string;
      descriptionFontSize: string;
      iconSize: string;
      iconContainerSize: string;
      gap: string;
      width: string;
      minHeight: string;
      listMarginTop: string;
      listGap: string;
      listItemGap: string;
      listItemPadding: string;
      actionGap: string;
    };
  };
}

export interface UploadV2Config {
  base: {
    fontFamily: string;
    fontWeight: string;
    borderRadius: string;
    borderWidth: string;
    borderStyle: string;
    titleFontSize: string;
    titleFontWeight: string;
    titleColor: string;
    descriptionFontSize: string;
    descriptionColor: string;
    padding: string;
    gap: string;
  };
  variants: {
    default: {
      backgroundColor: string;
      borderColor: string;
      hoverBackgroundColor: string;
      hoverBorderColor: string;
    };
    drag: {
      backgroundColor: string;
      borderColor: string;
    };
    error: {
      backgroundColor: string;
      borderColor: string;
      errorTextColor: string;
    };
    fileSelected: {
      backgroundColor: string;
      borderColor: string;
      borderStyle: string;
    };
    fileSelectedError: {
      backgroundColor: string;
      borderColor: string;
      borderStyle: string;
    };
  };
  button: {
    backgroundColor: string;
    borderColor: string;
    borderWidth: string;
    textColor: string;
    fontSize: string;
    fontWeight: string;
    paddingX: string;
    paddingY: string;
    borderRadius: string;
    hoverBackgroundColor: string;
  };
  deleteButton: {
    borderColor: string;
    borderWidth: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
    padding: string;
    borderRadius: string;
    iconSize: string;
  };
  fileInfo: {
    nameFontSize: string;
    nameFontWeight: string;
    nameColor: string;
    sizeFontSize: string;
    sizeColor: string;
  };
  iconSize: {
    width: string;
    height: string;
  };
}

export interface ToggleBase {
  fontFamily: string;
  fontWeight: string;
  transition: string;
  focus: {
    outline: string;
    ring: string;
  };
  radius: string;
}

export interface ToggleVariant {
  backgroundColor: string;
  uncheckedBackgroundColor: string;
  checkedTextColor: string;
  uncheckedTextColor: string;
  borderColor: string;
  hoverBackgroundColor: string;
  hoverTextColor: string;
  hoverBorderColor: string;
  focusRingColor: string;
}

export interface ToggleSize {
  width: string;
  height: string;
  padding: string;
  fontSize: string;
  iconSize: string;
  gap: string;
}

export interface ToggleStates {
  disabled: {
    opacity: string;
    cursor: string;
  };
  loading: {
    opacity: string;
    cursor: string;
  };
}

export interface ToggleConfig {
  base: ToggleBase;
  variants: {
    primary: ToggleVariant;
    secondary: ToggleVariant;
    outline: ToggleVariant;
    success: ToggleVariant;
    warning: ToggleVariant;
    danger: ToggleVariant;
  };
  sizes: {
    sm: ToggleSize;
    md: ToggleSize;
    lg: ToggleSize;
  };
  states: ToggleStates;
}

export interface TooltipBase {
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  transition: string;
  radius: string;
  shadow: string;
}

export interface TooltipVariant {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export interface TooltipSize {
  padding: string;
  fontSize: string;
}

export interface TooltipConfig {
  base: TooltipBase;
  variants: {
    default: TooltipVariant;
    primary: TooltipVariant;
    success: TooltipVariant;
    warning: TooltipVariant;
    error: TooltipVariant;
    info: TooltipVariant;
  };
  sizes: {
    sm: TooltipSize;
    md: TooltipSize;
    lg: TooltipSize;
  };
}

export interface SidebarIcon {
  name: string;
  pack: string;
  size?: string;
}

/**
 * Sidebar icon can be a FontAwesome icon name (string) or a ReactNode.
 */
export type SidebarIconType = string | React.ReactNode;

export interface SidebarChildItem {
  name: string;
  to: string;
  count?: number;
  hidden?: boolean;
  /** Icon for the child item (optional) */
  icon?: SidebarIconType;
}

export interface SidebarItem {
  name: string;
  to: string;
  /** Icon for the item (FontAwesome icon name or ReactNode) */
  icon?: SidebarIconType;
  count?: number;
  hidden?: boolean;
  children?: SidebarChildItem[];
}

export interface SidebarBase {
  fontFamily: string;
  transition: string;
  transitionTime?: string;
  radius: {
    default: string;
  };
  width?: string;
  collapsedWidth?: string;
  toggler?: {
    width: string;
    height: string;
    top: string;
    borderRadius: string;
    boxShadow: string;
    backgroundColor: string;
    color?: string;
  };
  padding?: {
    sidebarParentLeft?: string;
    sidebarParentRight?: string;
    logoTop?: string;
    item?: string;
    chipMarginLeft?: string;
    disclosurePanelPaddingLeftExpanded?: string;
    disclosurePanelPaddingLeftCollapsed?: string;
  };
  zIndex?: number;
}

export interface SidebarVariant {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  activeBackgroundColor: string;
  activeTextColor: string;
  hoverBackgroundColor: string;
  hoverTextColor: string;
  iconColor: string;
  activeIconColor: string;
  chipBackgroundColor: string;
  chipTextColor: string;
  activeChipBackgroundColor: string;
  activeChipTextColor: string;
  itemFontSize?: string;
  itemFontWeight?: string;
  itemBorderRadius?: string;
  chipFontSize?: string;
  chipBorderRadius?: string;
  sidebarBoxShadowLeftHovered?: string;
  sidebarBoxShadowRightHovered?: string;
}

export interface SidebarConfig {
  base: SidebarBase;
  variants: {
    light: SidebarVariant;
    dark: SidebarVariant;
    "dark-plus": SidebarVariant;
  }
}

export interface SidebarProps {
  openByDefault?: boolean;
  expandable?: boolean;
  position?: "left" | "right";
  variant?: "light" | "dark" | "dark-plus";
  iconSize?: string;
  routes: SidebarItem[];
  value?: string;
  width?: string;
  onRouteActive?: (item: SidebarItem | SidebarChildItem) => void;
  onValueChange?: (value: string) => void;
  onExpanded?: (expanded: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  onRouteChange?: (path: string) => void;
  onToggle?: (isOpen: boolean) => void;
  renderNavBefore?: (expanded: boolean) => React.ReactNode;
  renderNavAfter?: (expanded: boolean) => React.ReactNode;
  /** Background image URL for the sidebar */
  bgImage?: string;
  /** Icon for expand action (FontAwesome icon name or ReactNode) */
  expandIcon?: SidebarIconType;
  /** Icon for collapse action (FontAwesome icon name or ReactNode) */
  collapseIcon?: SidebarIconType;
  /** Top icon (FontAwesome icon name or ReactNode) */
  topIcon?: SidebarIconType;
  /** Hide all sidebar items if true */
  hidden?: boolean;
}

export interface ToastBase {
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  radius: string;
  shadow: string;
  transition: string;
  zIndex: number;
}

export interface ToastVariant {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
}

export interface ToastSize {
  padding: string;
  fontSize: string;
  titleSize: string;
  messageSize: string;
  iconSize: string;
  maxWidth: string;
}

export interface ToastConfig {
  base: ToastBase;
  variants: {
    default: ToastVariant;
    success: ToastVariant;
    error: ToastVariant;
    warning: ToastVariant;
    info: ToastVariant;
  };
  sizes: {
    sm: ToastSize;
    md: ToastSize;
    lg: ToastSize;
  };
}

export interface RadioBase {
  fontFamily: string;
  fontWeight: string;
  transition: string;
  focus: {
    outline: string;
    ring: string;
  };
  wrapper?: {
    className?: string;
    style?: React.CSSProperties;
  };
  input?: {
    style?: React.CSSProperties;
  };
  icon?: {
    size?: string;
    borderColor?: string;
    backgroundColor?: string;
    hoverBorderColor?: string;
    focusRingColor?: string;
  };
  label?: {
    color?: string;
    style?: React.CSSProperties;
  };
}

export interface RadioSize {
  wrapper?: {
    className?: string;
  };
  icon?: {
    size?: string;
  };
  label?: {
    fontSize?: string;
  };
}

export interface RadioStates {
  checked?: {
    icon?: {
      backgroundColor?: string;
      borderColor?: string;
      hoverBorderColor?: string;
      dotColor?: string;
    };
  };
  disabled?: {
    wrapper?: {
      className?: string;
      style?: React.CSSProperties;
    };
    icon?: {
      opacity?: number;
    };
    label?: {
      color?: string;
    };
  };
}

export interface RadioButton {
  padding?: string;
  borderRadius?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  checked?: {
    borderColor?: string;
    solidBackgroundColor?: string;
    outlineBackgroundColor?: string;
    solidTextColor?: string;
    outlineTextColor?: string;
    hoverBackgroundColor?: string;
    hoverOutlineBackgroundColor?: string;
    hoverBorderColor?: string;
  };
  disabled?: {
    opacity?: number;
  };
}

export interface RadioPill {
  padding?: string;
  borderRadius?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  checked?: {
    borderColor?: string;
    textColor?: string;
    hoverBorderColor?: string;
  };
  disabled?: {
    opacity?: number;
  };
  wrapper?: {
    className?: string;
  };
}

export interface RadioGroup {
  base?: {
    className?: string;
    style?: React.CSSProperties;
  };
  horizontal?: {
    className?: string;
  };
  vertical?: {
    className?: string;
  };
  block?: {
    className?: string;
  };
  sizes?: {
    sm?: {
      className?: string;
    };
    md?: {
      className?: string;
    };
    lg?: {
      className?: string;
    };
  };
}

export interface RadioButtonGroup {
  backgroundColor?: string;
  borderRadius?: string;
  padding?: string;
  borderColor?: string;
}

export interface RadioPillGroup {
  gap?: string;
}

export interface RadioConfig {
  base: RadioBase;
  sizes: {
    sm: RadioSize;
    md: RadioSize;
    lg: RadioSize;
  };
  states: RadioStates;
  button?: RadioButton;
  pill?: RadioPill;
  group?: RadioGroup;
  buttonGroup?: RadioButtonGroup;
  pillGroup?: RadioPillGroup;
}

export interface CheckboxBase {
  fontFamily: string;
  fontWeight: string;
  transition: string;
  focus: {
    outline: string;
    ring: string;
  };
  wrapper?: {
    className?: string;
    style?: React.CSSProperties;
  };
  input?: {
    style?: React.CSSProperties;
  };
  icon?: {
    size?: string;
    borderColor?: string;
    backgroundColor?: string;
    hoverBorderColor?: string;
    focusRingColor?: string;
    borderRadius?: string;
  };
  label?: {
    color?: string;
    style?: React.CSSProperties;
  };
}

export interface CheckboxSize {
  wrapper?: {
    className?: string;
  };
  icon?: {
    size?: string;
  };
  label?: {
    fontSize?: string;
  };
}

export interface CheckboxStates {
  checked?: {
    icon?: {
      backgroundColor?: string;
      borderColor?: string;
      hoverBorderColor?: string;
      checkmarkColor?: string;
    };
  };
  indeterminate?: {
    icon?: {
      backgroundColor?: string;
      borderColor?: string;
      dashColor?: string;
    };
  };
  disabled?: {
    wrapper?: {
      className?: string;
      style?: React.CSSProperties;
    };
    icon?: {
      opacity?: number;
    };
    label?: {
      color?: string;
    };
  };
}

export interface CheckboxButton {
  padding?: string;
  borderRadius?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  checked?: {
    borderColor?: string;
    solidBackgroundColor?: string;
    outlineBackgroundColor?: string;
    solidTextColor?: string;
    outlineTextColor?: string;
    hoverBackgroundColor?: string;
    hoverOutlineBackgroundColor?: string;
    hoverBorderColor?: string;
  };
  disabled?: {
    opacity?: number;
  };
  wrapper?: {
    className?: string;
  };
}

export interface CheckboxGroup {
  base?: {
    className?: string;
    style?: React.CSSProperties;
  };
  horizontal?: {
    className?: string;
  };
  vertical?: {
    className?: string;
  };
  block?: {
    className?: string;
  };
  sizes?: {
    sm?: {
      className?: string;
    };
    md?: {
      className?: string;
    };
    lg?: {
      className?: string;
    };
  };
}

export interface CheckboxButtonGroup {
  backgroundColor?: string;
  borderRadius?: string;
  padding?: string;
  borderColor?: string;
}

export interface CheckboxConfig {
  base: CheckboxBase;
  sizes: {
    sm: CheckboxSize;
    md: CheckboxSize;
    lg: CheckboxSize;
  };
  states: CheckboxStates;
  button?: CheckboxButton;
  group?: CheckboxGroup;
  buttonGroup?: CheckboxButtonGroup;
}

export interface AudioPlayerSizeConfig {
  height: number;
  fontSize: number;
  iconSize: number;
  thumbSize: number;
  trackHeight: number;
  gap: number;
  paddingX: number;
}

export interface AudioPlayerConfig {
  base: {
    fontFamily: string;
    borderRadius: number;
    backgroundColor: string;
    borderColor: string;
    buttonColor: string;
    timeColor: string;
  };
  sizes: {
    sm: AudioPlayerSizeConfig;
    md: AudioPlayerSizeConfig;
    lg: AudioPlayerSizeConfig;
  };
  track: {
    color: string;
    playedColor?: string;
    thumbColor: string;
  };
}

export interface MapPopupConfig {
  base: {
    backgroundColor: string;
    borderRadius: string;
    shadow: string;
    fontFamily: string;
    minWidth: string;
    maxWidth: string;
    titleColor: string;
    addressColor: string;
    labelColor: string;
    valueColor: string;
    separatorColor: string;
    iconBg: string;
    iconColor: string;
    closeBtnColor: string;
    closeBtnHoverBg: string;
    closeBtnHoverColor: string;
  };
  /** Spacing and padding tokens for every region of the popup */
  spacing: {
    /** Padding for the header section, e.g. `"14px 16px 10px"` */
    headerPadding: string;
    /** Padding for the body section, e.g. `"12px 16px"` */
    bodyPadding: string;
    /** Padding for the footer/actions section, e.g. `"10px 16px 14px"` */
    footerPadding: string;
    /** Gap between the location icon and the title block */
    headerGap: string;
    /** Vertical gap between consecutive detail rows */
    detailRowGap: string;
    /** Gap between the optional row icon and its label text */
    detailLabelGap: string;
    /** Gap between action buttons in the footer */
    actionGap: string;
    /** Bottom margin below the status badge (before details) */
    statusMarginBottom: string;
    /** Width and height of the square location-icon wrapper */
    iconWrapperSize: string;
  };
  /** Font-size tokens for popup text elements */
  typography: {
    titleFontSize: string;
    addressFontSize: string;
    detailFontSize: string;
    statusFontSize: string;
  };
  marker: {
    defaultColor: string;
    size: number;
  };
  actions: {
    primary: {
      backgroundColor: string;
      textColor: string;
    };
    secondary: {
      backgroundColor: string;
      textColor: string;
    };
    ghost: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
    };
  };
}

export interface DateRangePickerConfig {
  base: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    hoverBorderColor: string;
    placeholderColor: string;
    iconColor: string;
    fontFamily: string;
    borderRadius: string;
    shadow: string;
  };
  variants: Record<string, {
    backgroundColor: string;
    textColor: string;
    hoverColor: string;
    lightBackground: string;
    lightTextColor: string;
  }>;
  sizes: Record<string, {
    padding: string;
    fontSize: string;
    iconSize: string;
  }>;
  calendar: {
    backgroundColor: string;
    headerTextColor: string;
    weekDayTextColor: string;
    dayTextColor: string;
    dayHoverBackgroundColor: string;
    dayHoverTextColor: string;
    todayBorderColor: string;
    disabledTextColor: string;
    outsideMonthOpacity: string;
    outsideMonthTextColor: string;
    borderColor: string;
    navArrowHoverColor: string;
    gridHoverBackgroundColor: string;
  };
  sidebar: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    hoverBackgroundColor: string;
  };
  footer: {
    clearTextColor: string;
    doneBackgroundColor: string;
    doneTextColor: string;
    borderColor: string;
  };
  states: {
    disabled: {
      opacity: string;
      cursor: string;
    };
  };
  dropdown: {
    activeBackgroundColor: string;
    activeTextColor: string;
    inactiveBackgroundColor: string;
    inactiveTextColor: string;
    clearIconColor: string;
    clearIconHoverColor: string;
  };
}

export interface SideNavigationStyleConfig {
  backgroundColor?: string;
  borderColor?: string;
  defaultBg?: string;
  textColor?: string;
  subtextColor?: string;
  iconColor?: string;
  hoverBg?: string;
  hoverTextColor?: string;
  pressedBg?: string;
  pressedTextColor?: string;
  activeBg?: string;
  activeTextColor?: string;
  activeIconColor?: string;
  disabledTextColor?: string;
  disabledIconColor?: string;
  cellGap?: string;
  cellPadding?: string;
  cellRadius?: string;
  iconSize?: string;
  subNavIndent?: string;
}

export interface SideNavigationConfig {
  base?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    gap?: string;
    padding?: string;
    expandedWidth?: string;
    collapsedWidth?: string;
  };
  styles?: Record<string, SideNavigationStyleConfig>;
}

export interface ThemeConfig {
  colors: ThemeColors;
  components: {
    button: ButtonConfig;
    card?: CardConfig;
    input?: InputConfig;
    floatingButton?: ButtonConfig;
    modal?: ModalConfig;
    spinner?: SpinnerConfig;
    table?: TableConfig;
    select?: SelectConfig;
    pill?: PillConfig;
    dropdown?: DropdownConfig;
    switch?: SwitchConfig;
    steps?: StepsConfig;
    collapse?: CollapseConfig;
    alert?: AlertConfig;
    upload?: UploadConfig;
    toggle?: ToggleConfig;
    tooltip?: TooltipConfig;
    sidebar?: SidebarConfig;
    toast?: ToastConfig;
    radio?: RadioConfig;
    checkbox?: CheckboxConfig;
    pagination?: PaginationConfig;
    tabs?: TabsConfig;
    inputTag?: InputTagConfig;
    map?: MapPopupConfig;
    audioPlayer?: AudioPlayerConfig;
    uploadV2?: UploadV2Config;
    dateRangePicker?: DateRangePickerConfig;
    badge?: Record<string, any>;
    avatar?: Record<string, any>;
    chip?: Record<string, any>;
    link?: Record<string, any>;
    rating?: Record<string, any>;
    sideNavigation?: SideNavigationConfig;
  };
}

export interface Theme {
  light: ThemeConfig;
  dark: ThemeConfig;
}
