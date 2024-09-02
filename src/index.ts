import * as core from '@actions/core'
import { GitRepo } from '@rindeal/git-remote-ref-compare'


function isValidUrl(url: string | URL) {
    try {
        new URL(url)
    } catch (err) {
        return false
    }
    return true
}

async function run() {
    const urlIoNames = ['source-repo-url', 'target-repo-url']

    const [sourceRepo, targetRepo] = urlIoNames.map(name => {
        const url = core.getInput(name)
        if ( ! isValidUrl(url) ) {
            throw new Error(`Invalid URL provided for input \`${name}\`: \`${url}\``)
        }
        core.setOutput(name, url)
        return new GitRepo(url)
    })
      
    const diffResult = await sourceRepo.refsDiffer(targetRepo)

    if ( diffResult ) {
        core.setOutput('refs-differ',  true)
        core.setOutput('diff-message', diffResult.message)
        core.setOutput('diff-type',    diffResult.type.toString())
    } else {
        core.setOutput('refs-differ',  false)
    }
}


run()
