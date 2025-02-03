export default defineNuxtPlugin(() => {
  const { $api } = useNuxtApp();
  const userService = UserService($api);
  const depositService = DepositService($api);
  const transactionHistoryService = TransactionHistoryService($api);
  const betsHistoryService = BetsHistoryService($api);
  const systemService = SystemService($api);
  const withdrawService = WithdrawService($api);
  const bonusService = BonusService($api);
  const gameService = GameService($api);
  const staticPageService = StaticAndNewsService($api);
  const liveStreamService = LiveStreamService($api);
  const sportService = SportService($api);

  return {
    provide: {
      systemService,
      userService,
      depositService,
      transactionHistoryService,
      betsHistoryService,
      withdrawService,
      bonusService,
      gameService,
      staticPageService,
      liveStreamService,
      sportService,
    },
  };
});
