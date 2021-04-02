import { describe } from "jest-circus";
import getActionInputs from "../src/args";

const testEnvVars = {
    INPUT_VERSION: '0.1.20',
};

describe('aig787/cargo-udeps', () => {
    beforeEach(() => {
        console.log(testEnvVars);
        Object.entries(testEnvVars).forEach(([key, value]) => {
            process.env[key] = value
        })
    });

    it('action inputs should be resolved from env vars', async () => {
        const input = getActionInputs();

        expect(input.requestedVersion).toBe('0.1.20');
    });
});