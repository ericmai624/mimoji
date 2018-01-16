const context = cast.framework.CastReceiverContext.getInstance();

/* Config for playback */
const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.initialBandwidth = 10 * 1024 * 1024;

/* Set up the player to handle messages and events */
const playerManager = context.getPlayerManager();

playerManager.addEventListener(cast.framework.events.EventType.PLAYER_LOAD_COMPLETE, () => {
  context.sendCustomMessage('urn:x-cast:playermanager.ready', undefined, 'Player is ready');
});

/* Customer messages */
const ADD_TEXTTRACK = 'urn:x-cast:texttrack.add';
context.addCustomMessageListener(ADD_TEXTTRACK, (evt) => {
  // Create text tracks object
  const textTracksManager = playerManager.getTextTracksManager();
  const track = textTracksManager.createTrack();
  track.trackId = Math.round(Math.random() * 100);
  track.trackContentType = 'text/vtt';
  track.trackContentId = evt.data.url;
  track.language = 'zh';

  // Add tracks
  textTracksManager.addTracks([track]);

  // Activate the track
  textTracksManager.setActiveByIds([track.trackId]);
});

/* Start the receiver app */
// context.setLoggerLevel(cast.framework.LoggerLevel.NONE);
context.start({ playbackConfig });