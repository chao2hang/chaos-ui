import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import chartZh from "./resources/zh/chart.json";
import commonZh from "./resources/zh/common.json";
import cookieZh from "./resources/zh/cookie.json";
import dataZh from "./resources/zh/data.json";
import errorZh from "./resources/zh/error.json";
import languageZh from "./resources/zh/language.json";
import marketingZh from "./resources/zh/marketing.json";
import mobileZh from "./resources/zh/mobile.json";
import navigationZh from "./resources/zh/navigation.json";
import notificationZh from "./resources/zh/notification.json";
import tourZh from "./resources/zh/tour.json";
import transferZh from "./resources/zh/transfer.json";
import uiZh from "./resources/zh/ui.json";
import uploadZh from "./resources/zh/upload.json";
import chartEn from "./resources/en/chart.json";
import commonEn from "./resources/en/common.json";
import cookieEn from "./resources/en/cookie.json";
import dataEn from "./resources/en/data.json";
import errorEn from "./resources/en/error.json";
import languageEn from "./resources/en/language.json";
import marketingEn from "./resources/en/marketing.json";
import mobileEn from "./resources/en/mobile.json";
import navigationEn from "./resources/en/navigation.json";
import notificationEn from "./resources/en/notification.json";
import tourEn from "./resources/en/tour.json";
import transferEn from "./resources/en/transfer.json";
import uiEn from "./resources/en/ui.json";
import uploadEn from "./resources/en/upload.json";

const resources = {
  "zh-CN": {
    chart: chartZh,
    common: commonZh,
    cookie: cookieZh,
    data: dataZh,
    error: errorZh,
    language: languageZh,
    marketing: marketingZh,
    mobile: mobileZh,
    navigation: navigationZh,
    notification: notificationZh,
    tour: tourZh,
    transfer: transferZh,
    ui: uiZh,
    upload: uploadZh,
  },
  "en-US": {
    chart: chartEn,
    common: commonEn,
    cookie: cookieEn,
    data: dataEn,
    error: errorEn,
    language: languageEn,
    marketing: marketingEn,
    mobile: mobileEn,
    navigation: navigationEn,
    notification: notificationEn,
    tour: tourEn,
    transfer: transferEn,
    ui: uiEn,
    upload: uploadEn,
  },
};

i18n.use(initReactI18next).init({
  lng: "zh-CN",
  fallbackLng: "zh-CN",
  resources,
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  returnObjects: false,
});

export default i18n;
