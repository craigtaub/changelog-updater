# NPM Dependency updater

Hard to keep track of whats changed or new?
Ever wondered what the last change for a given repo/dependency is?

This tool prints the latest changes inside a CHANGELOG and prints it as readable format to the screen.
It stores your dependencies so its easy to come back and it will instantly show you if anything has changed.

- `Express` -> Server side.
- `Angular2` + `TypeScript` -> Client side.

Run client-side

    npm run dev

Run server-side

    node server

Inside `config.json`:

    {
      "userAgentHeader": "",
      "accessToken": ""
    }
