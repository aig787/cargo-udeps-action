import { input } from '@actions-rs/core';

export interface ActionInputs {
    requestedVersion: string,
    requestedTarget: string,
    opts: string | null,
}

export default function getActionInputs(): ActionInputs {
    const requestedVersion = input.getInput('version');
    const requestedTarget = input.getInput('target')
    const opts = input.getInput('args');

    return {
        requestedVersion,
        requestedTarget,
        opts,
    };
}