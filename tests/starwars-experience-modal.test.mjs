import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const experiencePath = join(root, 'src', 'components', 'Experience.tsx');
const modalPath = join(root, 'src', 'components', 'StarWarsExperienceModal.tsx');
const modalStylesPath = join(root, 'src', 'components', 'StarWarsExperienceModal.css');
const titleImagePath = join(root, 'public', 'starwars_title_name.png');
const starWarsAudioPath = join(root, 'public', 'audio', 'starwars_5min.mp3');

assert.ok(existsSync(modalPath), 'StarWarsExperienceModal component should exist');
assert.ok(existsSync(modalStylesPath), 'StarWarsExperienceModal styles should exist');
assert.ok(existsSync(titleImagePath), 'Star Wars title image should exist in public assets');
assert.ok(existsSync(starWarsAudioPath), 'Star Wars audio file should exist in public assets');

const experienceSource = readFileSync(experiencePath, 'utf8');
const modalSource = readFileSync(modalPath, 'utf8');
const modalStyles = readFileSync(modalStylesPath, 'utf8');

assert.match(
  experienceSource,
  /import StarWarsExperienceModal from '\.\/StarWarsExperienceModal';/,
  'Experience should import the Star Wars modal'
);
assert.match(
  experienceSource,
  /useState\(false\)/,
  'Experience should track the modal open state'
);
assert.match(
  experienceSource,
  /View Star Wars Experience/,
  'Work Experience should render a View Star Wars Experience button'
);
assert.match(
  experienceSource,
  /<StarWarsExperienceModal[\s\S]*isOpen=\{isStarWarsOpen\}[\s\S]*onClose=\{\(\) => setIsStarWarsOpen\(false\)\}/,
  'Experience should mount the modal with open and close props'
);

[
  'A long time ago in a support queue far, far away...',
  '/starwars_title_name.png',
  'EPISODE 2026',
  'Stephen Skalamera',
  'Support Operations Leader',
  'Speed',
  'Scroll',
  'Audio',
  '/audio/starwars_5min.mp3',
  'audioStartDelayMs = 5000',
  'scheduleAudioPlayback',
  'pauseAudio',
  'resumeAudioPlayback',
  'pausedAudioPositionRef',
  'hasCrawlStarted',
  'isAudioLockedOff',
  'isCrawlComplete',
  'showAudioPrompt',
  'showAudioRestartNotice',
  'Would you like to enable audio?',
  'Start with audio',
  'Continue without audio',
  'The Star Wars Experience will need to start over in order to enable audio.',
  'Restart with audio',
  'Close Star Wars Experience',
  'handleCrawlAnimationEnd',
  'stopAudio',
  'audioRef',
  'role="dialog"',
  'aria-modal="true"',
  'Escape'
].forEach((expectedText) => {
  assert.ok(
    modalSource.includes(expectedText),
    `StarWarsExperienceModal should include "${expectedText}"`
  );
});

assert.match(
  modalSource,
  /const \[isPaused, setIsPaused\] = useState\(true\)/,
  'StarWarsExperienceModal should launch paused by default'
);

assert.match(
  modalSource,
  /if \(nextPausedState\) \{[\s\S]*pauseAudio\(\);[\s\S]*return;[\s\S]*\}[\s\S]*resumeAudioPlayback\(\);/,
  'Pause should preserve audio position and Play should resume audio playback'
);

assert.match(
  modalSource,
  /onAnimationEnd=\{handleCrawlAnimationEnd\}/,
  'Crawl should mark completion from the crawl animation end'
);

assert.match(
  modalSource,
  /data-audio-locked=\{isAudioLockedOff && hasCrawlStarted && !isCrawlComplete \? 'true' : undefined\}/,
  'Audio button should be visibly locked once a silent crawl has started'
);

[
  '.starwars-modal',
  '.starwars-scene',
  '.starwars-crawl-frame',
  '.starwars-crawl',
  '.starwars-complete-screen',
  '.starwars-audio-prompt',
  '.starwars-audio-notice',
  '@media (max-width: 700px)',
  '@media (prefers-reduced-motion: reduce)'
].forEach((expectedRule) => {
  assert.ok(
    modalStyles.includes(expectedRule),
    `StarWarsExperienceModal styles should include "${expectedRule}"`
  );
});
