import fetch from 'node-fetch';
import parseArgsStringToArgv from 'string-argv';
import { ActionInputs } from "./args";

export interface UdepsConfig {
    /**
     * Additional command line options.
     */
    additionalOptions: string[],

    /**
     * The URL to download a tarball of cargo-udeps from.
     */
    downloadUrl: string,
}

/**
 * Resolve the configuration (e.g., download url and options) required to run cargo-udeps
 * from the inputs supplied to the action.
 *
 * @param input The parameters of the action.
 */
export default async function resolveConfig(input: ActionInputs): Promise<UdepsConfig> {
    let releaseEndpoint = 'https://api.github.com/repos/est31/cargo-udeps/releases';
    if (process.env.GITHUB_RELEASE_ENDPOINT) {
        releaseEndpoint = process.env.GITHUB_RELEASE_ENDPOINT;
    }

    const downloadUrl = await getDownloadUrl(releaseEndpoint, input.requestedVersion, input.requestedTarget);

    let additionalOptions: string[] = [];

    if (input.opts !== null) {
        additionalOptions = parseArgsStringToArgv(input.opts);
    }

    return {
        additionalOptions,
        downloadUrl,
    };
}

/**
 * Determine the download URL for the tarball containing the `cargo-udeps` binaries.
 *
 * @param releaseEndpoint The URI of the GitHub API that can be used to fetch release information, sans the version number.
 * @param requestedVersion The Git tag of the cargo-udeps revision to get a download URL for. May be any valid Git tag,
 * or a special-cased `latest`.
 */
async function getDownloadUrl(releaseEndpoint: string, requestedVersion: string, requestedTarget: string): Promise<string> {
    const releaseInfoUri = requestedVersion === 'latest' ?
        `${releaseEndpoint}/latest` :
        `${releaseEndpoint}/tags/${requestedVersion}`;

    const releaseInfoRequest = await fetch(releaseInfoUri);
    const releaseInfo = await releaseInfoRequest.json();
    const asset = releaseInfo["assets"].find(asset => {
        return asset['name'].endsWith(`${requestedTarget}.tar.gz`)
    });

    if (!asset) {
        throw new Error(`Couldn't find a release tarball containing binaries for ${requestedVersion}`);
    }

    return asset["browser_download_url"];
}