import i18next from "i18next"
import HttpBackend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

const apiKey = "WqWPepa8EnHhe9daQ1-2mQ"
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    ns: ["default"],
    defaultNS: "en",

    supportedLngs: ["en", "hi", "te", "zh", "ru", "mr", "bn", "ta", "pa", "gu"],
    
    backend: {
      loadPath
    }
  })