export default defineNuxtPlugin((nuxtApp) => {
  const appEnv = useRuntimeConfig().public.APP_ENV;
  const nuxtAppSsrContext = nuxtApp.ssrContext;
  // Get the hostname (client-side: window.location.origin, server-side: headers.host)
  const protocol = ["STG", "PROD"].includes(appEnv) ? "https" : "http";
  const domainName = nuxtAppSsrContext ? nuxtAppSsrContext.event?.node?.req?.headers?.host : window.location.host;
  const domainUrl = nuxtAppSsrContext ? `${protocol}://${domainName}` : window.location.origin;

  return {
    provide: {
      domainName,
      domainUrl,
    },
  };
});
