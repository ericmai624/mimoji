const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();
  
const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.initialBandwidth = 10 * 1024 * 1024;

context.setLoggerLevel(cast.framework.LoggerLevel.NONE);
context.start({ playbackConfig });