# Rust `udeps` Action

![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)

This GitHub Action installs and runs [cargo-udeps](https://github.com/est31/cargo-udeps).

Credit to [actions-rs/tarpaulin](https://github.com/actions-rs/tarpaulin) for providing a great starting point.

## Example workflow

```yaml
on: [push]

name: build

jobs:
  check:
    name: Rust project
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Install nightly toolchain
        uses: actions-rs/toolchain@v1
        with:
          toolchain: nightly
          override: true

      - name: Run cargo-udeps
        uses: aig787/cargo-udeps-action@v1
        with:
          version: 'latest'
          args: '--all-targets'
```

See [additional recipes here](https://github.com/actions-rs/meta).

## Inputs

| Name        | Required | Description                                                                                              | Type   | Default |
| ------------| :------: | ---------------------------------------------------------------------------------------------------------| ------ | --------|
| `version`   |          | The version of `cargo-udeps` that will be installed.                                                     | string | latest  |
| `target`    |          | Binary target that will be installed.                                                                    | string | x86_64-unknown-linux-gnu  |
| `args`      |          | Extra command line arguments that are passed to `cargo-udeps`.                                       | string |         |
