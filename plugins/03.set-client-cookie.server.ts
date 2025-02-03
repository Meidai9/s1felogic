const setDeviceCookies = () => {
  const { $ua } = useNuxtApp();

  const cookies = {
    os: $ua.os,
    device: $ua.deviceType,
    browser: $ua.browser,
  };

  Object.entries(cookies).forEach(([name, value]) => {
    useCookie(name, { path: "/" }).value = value;
  });
};

const setMarketingCookies = () => {
  const url = useRequestURL();
  const MKT_COOKIE_DURATION = 7 * 60 * 60 * 24;

  // ex: https://bu88.com/?a=123&utm_source=456&utm_medium=789&utm_campaign=xxx&utm_term=yyy
  Object.entries(MKT_PARAMS).forEach(([paramKey, cookieName]) => {
    if (url.searchParams.has(paramKey))
      useCookie(cookieName, { path: "/", maxAge: MKT_COOKIE_DURATION }).value = url.searchParams.get(paramKey);
  });
};

export default defineNuxtPlugin(() => {
  setDeviceCookies();
  setMarketingCookies();
});
