export default defineNuxtPlugin(async (nuxtApp) => {
  const { ssrContext } = nuxtApp;

  const appStore = useAppStore();
  const { isLoggedIn, currentUser } = storeToRefs(appStore);

  const {
    resumeIntervalRefreshUserInfo,
    isActiveIntervalRefreshUserInfo,
    pauseIntervalRefreshUserInfo,
    refreshUserInfo,
  } = useRefresh();

  const { initSystemData } = useSystemDataHandler();

  // Use the runtime hook to pause the interval to refresh the user info when the page is finished
  useRuntimeHook("page:finish", (_) => {
    if (isActiveIntervalRefreshUserInfo.value && !isLoggedIn.value) {
      pauseIntervalRefreshUserInfo();
    }
  });

  // If SSR, set the user info from the cookie
  if (ssrContext) {
    const userInfo = useCookie<IUserInfo>("user");
    if (userInfo.value) {
      currentUser.value = userInfo.value;
    }
    return;
  }

  // If logged in, resume the interval to refresh the user info and fetch the master data
  if (!ssrContext && isLoggedIn.value) {
    refreshUserInfo();
    resumeIntervalRefreshUserInfo();
    await initSystemData();
  }
});
