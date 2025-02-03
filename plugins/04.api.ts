export default defineNuxtPlugin(() => {
  const { $ua } = useNuxtApp();

  const api = $fetch.create({
    onRequest({ options }) {
      if (import.meta.server) {
        const existingCookies = options.headers.get("Cookie") || "";
        const cookieList = existingCookies.split("; ");
        const cookieMap = new Map();
        if (cookieList) {
          cookieList.forEach((item) => {
            const [key, value] = item.split("=");
            cookieMap.set(key, value);
          });
        }

        cookieMap.set("os", $ua.os);
        cookieMap.set("device", $ua.deviceType);
        cookieMap.set("browser", $ua.browser);

        options.headers.set(
          "Cookie",
          Array.from(cookieMap)
            .map(([key, value]) => `${key}=${value}`)
            .join("; "),
        );
      }
    },
    async onResponseError({ response, options }) {
      const code = response._data?.code || response.status;
      const status = String(response._data?.status || response.statusText).toUpperCase();
      const message = response._data?.message || `[${options.method}] ${response.url}: ${status} ${code}`;

      throw createError<INuxtCustomError>({
        message,
        statusCode: code,
        statusMessage: status,
      });
    },
  });

  return {
    provide: {
      api,
    },
  };
});
