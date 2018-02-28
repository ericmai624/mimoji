const context = cast.framework.CastReceiverContext.getInstance();

/* Config for playback */
const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.initialBandwidth = 10 * 1024 * 1024;

/* Set up the player to handle messages and events */
const playerManager = context.getPlayerManager();

/* Customer messages */
const ADD_TEXTTRACK = 'urn:x-cast:texttrack.add';
const handleAddTextTrackMessage = e => {
  // Create text tracks object
  const textTracksManager = playerManager.getTextTracksManager();
  const track = textTracksManager.createTrack();
  track.trackId = Math.round(Math.random() * 100);
  track.trackContentType = 'text/vtt';
  track.trackContentId = e.data.url;
  track.language = 'zh';

  // Add tracks
  textTracksManager.addTracks([track]);

  // Activate the track
  textTracksManager.setActiveByIds([track.trackId]);
};

context.addCustomMessageListener(ADD_TEXTTRACK, handleAddTextTrackMessage);

/* Start the receiver app */
// context.setLoggerLevel(cast.framework.LoggerLevel.NONE);
context.start({ playbackConfig });