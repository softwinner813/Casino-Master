// You can customize the theme with the help of this file
//Template config options
import {fairbets,starkasino} from "../authServices/rootconfig"

const themeConfig = {
  layout: "horizontal", // options[String]: "vertical"(default), "horizontal"
  theme: fairbets  ? "real-dark" : starkasino ? "blue-dark" : 'real-dark', // options[String]: 'pink-dark', 'green-dark', 'real-dark', 'blue-dark', 'golden-dark'
  sidebarCollapsed: true, // options[Boolean]: true, false(default)
  navbarColor: "warning", // options[String]: default / primary / success / danger / info / warning / dark
  navbarType: "sticky", // options[String]: floating(default) / static / sticky / hidden
  footerType: "static", // options[String]: static(default) / sticky / hidden
  disableCustomizer: true, // options[Boolean]: true, false(default)
  hideScrollToTop: false, // options[Boolean]: true, false(default)
  disableThemeTour: false, // options[Boolean]: true, false(default)
  menuTheme: "warning", // options[String]: primary / success / danger / info / warning / dark
  direction: "ltr" // options[String] : ltr / rtl
}

export default themeConfig
  