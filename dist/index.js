"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const git_remote_ref_compare_1 = require("@rindeal/git-remote-ref-compare");
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (err) {
        return false;
    }
}
async function run() {
    const urlIoNames = ['source-repo-url', 'target-repo-url'];
    const [sourceRepo, targetRepo] = urlIoNames.map(name => {
        const url = core.getInput(name);
        if (!isValidUrl(url)) {
            throw new Error(`Invalid URL provided for input \`${name}\`: \`${url}\``);
        }
        core.setOutput(name, url);
        return new git_remote_ref_compare_1.GitRepo(url);
    });
    const diffResult = await sourceRepo.refsDiffer(targetRepo);
    if (diffResult) {
        core.setOutput('refs-differ', true);
        core.setOutput('diff-message', diffResult.message);
        core.setOutput('diff-type', diffResult.type.toString());
    }
    else {
        core.setOutput('refs-differ', false);
    }
}
run();
//# sourceMappingURL=index.js.map