import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const projectsPath = join(root, 'src', 'components', 'Projects.tsx');
const deepDivePath = join(root, 'src', 'components', 'MyCareerMaxDeepDive.tsx');

assert.ok(existsSync(deepDivePath), 'MyCareerMaxDeepDive component should exist');

const projectsSource = readFileSync(projectsPath, 'utf8');
const deepDiveSource = readFileSync(deepDivePath, 'utf8');

assert.match(
  projectsSource,
  /import MyCareerMaxDeepDive from '\.\/MyCareerMaxDeepDive';/,
  'Projects should import the MyCareerMax deep dive modal'
);
assert.match(
  projectsSource,
  /showMyCareerMaxDeepDive/,
  'Projects should track MyCareerMax modal state'
);
assert.match(
  projectsSource,
  /featured\.id === 'mycareermax'[\s\S]*Read Deep Dive/,
  'MyCareerMax featured card should render a Read Deep Dive button'
);
assert.match(
  projectsSource,
  /featured\.id === 'mycareermax'[\s\S]*bg-yellow-900\/30[\s\S]*Read Deep Dive/,
  'MyCareerMax Read Deep Dive button should use a yellow-tinted background'
);
assert.match(
  projectsSource,
  /<MyCareerMaxDeepDive isOpen=\{showMyCareerMaxDeepDive\}/,
  'Projects should mount the MyCareerMax deep dive modal'
);

[
  'Project Deep Dive: myCareerMax',
  'Building myCareerMax: An AI Career Operating System',
  'AI Job Search',
  'Resume Builder',
  'ATS Resume Report',
  'MagicMax',
  'Android',
  '/mycareermax/2.png',
  '/mycareermax/3.png',
  '/mycareermax/5.png',
  '/mycareermax/6.png',
  '/mycareermax/top ranked business app on play store in 17 countries.png'
].forEach((expectedText) => {
  assert.ok(
    deepDiveSource.includes(expectedText),
    `MyCareerMax deep dive should include "${expectedText}"`
  );
});

assert.ok(
  !deepDiveSource.includes('Open App'),
  'MyCareerMax deep dive should not include an Open App CTA'
);

assert.match(
  deepDiveSource,
  /href="https:\/\/github\.com\/skalamera\/mycareermax"[\s\S]*View Code/,
  'MyCareerMax View Code CTA should link to the GitHub repository'
);
