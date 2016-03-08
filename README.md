# Github Changelog tool

https://github-changelog.com/

Or download the Chrome extension: https://chrome.google.com/webstore/detail/github-changelog-notifier/amedcooaljaccpdffdkcflgiagpcjldn

## Problem
Tired of repeatedly keeping an eye on multiple repositories on Github at once? scanning CHANGELOG's for changes?

## Solution
Add your interested repositories and we will always print the latest update or release (including accompanying notes and commits/links). Try it yourself.

## Architecture

- `Express` -> Server side.
- `Angular2` + `TypeScript` -> Client side.

## Running the app

Run client-side

    npm run dev

Run server-side

    node server

Inside `config.json`:

    {
      "userAgentHeader": "",
      "accessToken": ""
    }
