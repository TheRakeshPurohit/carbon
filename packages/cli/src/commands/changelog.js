/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const clipboard = require('clipboardy');
const { prompt } = require('inquirer');
const { generate } = require('../changelog');
const { fetchLatestFromUpstream } = require('../git');
const { createLogger, displayBanner } = require('../logger');
const { getPackages } = require('../workspace');

const logger = createLogger('changelog');

/**
 * Outputs a changelog for the list of packages in a lerna/yarn workspace for
 * the given tag range. You can specify the range of commits to get the
 * changelog for by using git tags, or the name of a branch. For example:
 * v10.5.1..master or v10.5.0..v10.5.1
 * @returns {void}
 */
async function changelog({ range, noPrompt = false }) {
  if (!noPrompt) {
    displayBanner();
    logger.start('Fetching latest git information from upstream');
  }
  await fetchLatestFromUpstream();
  if (!noPrompt) {
    logger.stop();
  }

  if (!noPrompt) {
    logger.start('Getting a list of all packages in the project');
  }
  const packages = await getPackages();
  if (!noPrompt) {
    logger.stop();
  }

  const [lastTag, tag] = range.split('..');
  if (!noPrompt) {
    logger.start(`Generating a changelog for range: ${range}`);
  }
  const changelog = await generate(packages, lastTag, tag);
  if (!noPrompt) {
    logger.stop();
  }

  let response;
  if (!noPrompt) {
    response = await prompt([
      {
        type: 'confirm',
        name: 'copy',
        message: 'Would you like to copy the changelog to your clipboard?',
      },
    ]);
  }

  if (response?.copy) {
    clipboard.writeSync(changelog);
    console.log('Done!');
  } else {
    console.log(changelog);
  }
}

module.exports = {
  command: 'changelog <range>',
  desc: 'generate the changelog for the given git tag range',
  builder(yargs) {
    yargs.positional('range', {
      describe: 'the git tag range to generate a changelog for',
      type: 'string',
    });
    yargs.options({
      n: {
        alias: 'noPrompt',
        describe: 'disables copy to clipboard prompt',
        type: 'boolean',
      },
    });
  },
  handler: changelog,
};
