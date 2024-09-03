/**
 * SPDX-FileCopyrightText: 2024 Jan Chren ~rindeal
 *
 * SPDX-License-Identifier: GPL-3.0-only OR GPL-2.0-only
 */

import * as core from '@actions/core'
import { GitRepo, Logger } from '@rindeal/git-remote-ref-compare'


function isValidUrl(urlStr: string | URL) {
    Logger.trace(`Entering isValidUrl with urlStr: \`${urlStr}\``)
    try {
        const url = new URL(urlStr);
        Logger.debug(`Parsed URL: \`${url}\``)
        if (url.protocol !== 'https:') {
            Logger.warn(`URL protocol is not https: \`${url.protocol}\``)
            return false;
        }
    } catch (err) {
        Logger.error(`Error parsing URL: \`${urlStr}\``)
        Logger.error(err)
        return false
    }
    Logger.info(`URL is valid: \`${urlStr}\``)
    return true;
}

async function run() {
    Logger.trace('Entering run function')
    const urlIoNames = ['source-repo-url', 'target-repo-url']

    const [sourceRepo, targetRepo] = urlIoNames.map(name => {
        Logger.debug(`Processing input name: \`${name}\``)
        const url = core.getInput(name)
        Logger.info(`Retrieved URL for \`${name}\`: \`${url}\``)
        if (!isValidUrl(url)) {
            Logger.fatal(`Invalid URL provided for input \`${name}\`: \`${url}\``)
            throw new Error(`Invalid URL provided for input \`${name}\`: \`${url}\``)
        }
        core.setOutput(name, url)
        Logger.info(`Set output for \`${name}\`: \`${url}\``)
        return new GitRepo(url)
    });

    try {
        const diffResult = await sourceRepo.refsDiffer(targetRepo)
        Logger.debug(`Diff result: \`${diffResult}\``)

        if (diffResult) {
            Logger.info('Repositories differ')
            core.setOutput('refs-differ', true)
            core.setOutput('diff-message', diffResult.message)
            core.setOutput('diff-type', diffResult.type.toString())
        } else {
            Logger.info('Repositories do not differ')
            core.setOutput('refs-differ', false)
        }
    } catch (err) {
        Logger.error('Error during refsDiffer operation')
        Logger.error(err)
        throw err
    }
}


run()
