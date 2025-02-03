// User-agent is currently not support Nuxt 3 -- refer https://nuxt.com/modules/user-agent

import * as woothee from "woothee";

type IUserAgent = {
  deviceType: string;
  os: string;
  browser: string;
};

// const ANDROID_MOBILE: RegExp = /Android.+Mobi(le)?/;

const createUA = (ua: string): IUserAgent => {
  const { category: deviceType, os, name: browser } = woothee.parse(ua);

  return {
    deviceType,
    os,
    browser,
    // browserVersion,
    // browserVendor,
    // isFromIos: ["iPhone", "iPad", "iPod", "iOS"].includes(os),
    // isFromIphone: os === "iPhone",
    // isFromIpad: os === "iPad",
    // isFromIpod: os === "iPod",
    // isFromAndroidOs: os === "Android",
    // isFromAndroidMobile: os === "Android" && ANDROID_MOBILE.test(ua),
    // isFromAndroidTablet: os === "Android" && !ANDROID_MOBILE.test(ua),
    // isFromWindowsPhone: os === "Windows Phone OS",
    // isFromPc: deviceType === "pc",
    // isFromSmartphone: deviceType === "smartphone" && !["iPad", "Android"].includes(os),
    // isFromMobilephone: deviceType === "mobilephone",
    // isFromAppliance: deviceType === "appliance",
    // isFromCrawler: deviceType === "crawler",
    // isFromTablet: os === "iPad" || (os === "Android" && !ANDROID_MOBILE.test(ua)),
  };
};

const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36";

export default defineNuxtPlugin(({ ssrContext }) => {
  let userAgent = DEFAULT_USER_AGENT;

  if (ssrContext?.event?.node?.req?.headers?.["user-agent"]) {
    userAgent = ssrContext.event.node.req.headers["user-agent"];
  } else if (typeof navigator !== "undefined") {
    userAgent = navigator.userAgent;
  }

  return {
    provide: {
      ua: createUA(userAgent),
    },
  };
});
