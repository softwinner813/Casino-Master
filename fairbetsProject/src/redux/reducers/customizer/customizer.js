import themeConfig from "../../../configs/themeConfig"

const customizerReducer = (state = themeConfig, action) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...state, theme: action.mode }
    case "COLLAPSE_SIDEBAR":
      return { ...state, sidebarCollapsed: action.value }
    case "CHANGE_NAVBAR_COLOR":
      return { ...state, navbarColor: action.color }
    case "CHANGE_NAVBAR_TYPE":
      return { ...state, navbarType: action.style }
    case "CHANGE_FOOTER_TYPE":
      return { ...state, footerType: action.style }
    case "CHANGE_MENU_COLOR":
      return { ...state, menuTheme: action.style }
    case "HIDE_SCROLL_TO_TOP":
      return { ...state, hideScrollToTop: action.value }
    case "THEMSET":
      return {
        ...state,
        theme: action.theme.theme,
        direction: action.theme.direction,
        disableCustomizer: action.theme.disableCustomizer,
        disableThemeTour: action.theme.disableThemeTour,
        footerType: action.theme.footerType,
        hideScrollToTop: action.theme.hideScrollToTop,
        layout: action.theme.layout,
        menuTheme: action.theme.menuTheme,
        navbarColor: action.theme.navbarColor,
        navbarType: action.theme.navbarType,
        sidebarCollapsed: action.theme.sidebarCollapsed
      }

    case "PLAYERTHEMSET":
      return {
        ...state,
        theme: action.theme.theme,
        footerType: action.theme.footerType,
        menuTheme: action.theme.menuTheme,
        navbarColor: action.theme.navbarColor,
        navbarType: action.theme.navbarType
      }
    default:
      return state
  }
}

export default customizerReducer
