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
import formZh from "./resources/zh/form.json";
import codeEditorZh from "./resources/zh/code-editor.json";
import paymentZh from "./resources/zh/payment.json";
import socialZh from "./resources/zh/social.json";
import mapZh from "./resources/zh/map.json";
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
import formEn from "./resources/en/form.json";
import codeEditorEn from "./resources/en/code-editor.json";
import paymentEn from "./resources/en/payment.json";
import socialEn from "./resources/en/social.json";
import mapEn from "./resources/en/map.json";
import chartJa from "./resources/ja/chart.json";
import commonJa from "./resources/ja/common.json";
import cookieJa from "./resources/ja/cookie.json";
import dataJa from "./resources/ja/data.json";
import errorJa from "./resources/ja/error.json";
import languageJa from "./resources/ja/language.json";
import marketingJa from "./resources/ja/marketing.json";
import mobileJa from "./resources/ja/mobile.json";
import navigationJa from "./resources/ja/navigation.json";
import notificationJa from "./resources/ja/notification.json";
import tourJa from "./resources/ja/tour.json";
import transferJa from "./resources/ja/transfer.json";
import uiJa from "./resources/ja/ui.json";
import uploadJa from "./resources/ja/upload.json";
import formJa from "./resources/ja/form.json";
import codeEditorJa from "./resources/ja/code-editor.json";
import paymentJa from "./resources/ja/payment.json";
import socialJa from "./resources/ja/social.json";
import mapJa from "./resources/ja/map.json";
import chartKo from "./resources/ko/chart.json";
import commonKo from "./resources/ko/common.json";
import cookieKo from "./resources/ko/cookie.json";
import dataKo from "./resources/ko/data.json";
import errorKo from "./resources/ko/error.json";
import languageKo from "./resources/ko/language.json";
import marketingKo from "./resources/ko/marketing.json";
import mobileKo from "./resources/ko/mobile.json";
import navigationKo from "./resources/ko/navigation.json";
import notificationKo from "./resources/ko/notification.json";
import tourKo from "./resources/ko/tour.json";
import transferKo from "./resources/ko/transfer.json";
import uiKo from "./resources/ko/ui.json";
import uploadKo from "./resources/ko/upload.json";
import formKo from "./resources/ko/form.json";
import codeEditorKo from "./resources/ko/code-editor.json";
import paymentKo from "./resources/ko/payment.json";
import socialKo from "./resources/ko/social.json";
import mapKo from "./resources/ko/map.json";

// --- New languages (fr, es, de, ar) ---
import commonFr from "./resources/fr/common.json";
import uiFr from "./resources/fr/ui.json";
import formFr from "./resources/fr/form.json";
import errorFr from "./resources/fr/error.json";
import navigationFr from "./resources/fr/navigation.json";
import commonEs from "./resources/es/common.json";
import uiEs from "./resources/es/ui.json";
import formEs from "./resources/es/form.json";
import errorEs from "./resources/es/error.json";
import navigationEs from "./resources/es/navigation.json";
import commonDe from "./resources/de/common.json";
import uiDe from "./resources/de/ui.json";
import formDe from "./resources/de/form.json";
import errorDe from "./resources/de/error.json";
import navigationDe from "./resources/de/navigation.json";
import commonAr from "./resources/ar/common.json";
import uiAr from "./resources/ar/ui.json";
import formAr from "./resources/ar/form.json";
import errorAr from "./resources/ar/error.json";
import navigationAr from "./resources/ar/navigation.json";

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
    form: formZh,
    "code-editor": codeEditorZh,
    payment: paymentZh,
    social: socialZh,
    map: mapZh,
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
    form: formEn,
    "code-editor": codeEditorEn,
    payment: paymentEn,
    social: socialEn,
    map: mapEn,
  },
  "ja-JP": {
    chart: chartJa,
    common: commonJa,
    cookie: cookieJa,
    data: dataJa,
    error: errorJa,
    language: languageJa,
    marketing: marketingJa,
    mobile: mobileJa,
    navigation: navigationJa,
    notification: notificationJa,
    tour: tourJa,
    transfer: transferJa,
    ui: uiJa,
    upload: uploadJa,
    form: formJa,
    "code-editor": codeEditorJa,
    payment: paymentJa,
    social: socialJa,
    map: mapJa,
  },
  "ko-KR": {
    chart: chartKo,
    common: commonKo,
    cookie: cookieKo,
    data: dataKo,
    error: errorKo,
    language: languageKo,
    marketing: marketingKo,
    mobile: mobileKo,
    navigation: navigationKo,
    notification: notificationKo,
    tour: tourKo,
    transfer: transferKo,
    ui: uiKo,
    upload: uploadKo,
    form: formKo,
    "code-editor": codeEditorKo,
    payment: paymentKo,
    social: socialKo,
    map: mapKo,
  },
  "fr-FR": {
    common: commonFr,
    ui: uiFr,
    form: formFr,
    error: errorFr,
    navigation: navigationFr,
  },
  "es-ES": {
    common: commonEs,
    ui: uiEs,
    form: formEs,
    error: errorEs,
    navigation: navigationEs,
  },
  "de-DE": {
    common: commonDe,
    ui: uiDe,
    form: formDe,
    error: errorDe,
    navigation: navigationDe,
  },
  "ar-SA": {
    common: commonAr,
    ui: uiAr,
    form: formAr,
    error: errorAr,
    navigation: navigationAr,
  },
};

i18n.use(initReactI18next).init({
  lng: "zh-CN",
  fallbackLng: "zh-CN",
  supportedLngs: [
    "zh-CN",
    "en-US",
    "ja-JP",
    "ko-KR",
    "fr-FR",
    "es-ES",
    "de-DE",
    "ar-SA",
  ],
  resources,
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  returnObjects: false,
});

export default i18n;
