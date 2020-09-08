# and-cli-plugin-example

A sample project setup showcasing the ability to extend the base functionality of the [`and-cli`](https://github.com/andculturecode/AndcultureCode.Cli) package for project-specific needs.

## Project structure

```
.
├── modules                # Modules are shared functions to be imported & called by commands
│   └── dotnet-version.js  # A custom module that prints dotnet sdk version information
├── package.json
├── package-lock.json
├── plugin-cli.js          # Main entrypoint of the CLI program
├── plugin-cli-dotnet.js   # A custom implementation of the dotnet command
├── plugin-cli-example.js  # An empty example command
└── README.md
```

## Getting started

In order to run this demo locally, you will need to:

1. Clone my fork of the [`and-cli`](https://github.com/brandongregoryscott/AndcultureCode.Cli), switch to the feature branch, and install dependencies

```SH
git clone https://github.com/brandongregoryscott/AndcultureCode.Cli brandongregoryscott-AndcultureCode.Cli
cd brandongregoryscott-AndcultureCode.Cli
git checkout feature/project-specific-plugin-model-2
npm install
```

2. Clone this repository

```SH
git clone https://github.com/brandongregoryscott/and-cli-plugin-example
```

3. Update the package.json in this cloned repository to reference the local version of the [`and-cli`](https://github.com/brandongregoryscott/AndcultureCode.Cli) and link the package

```JSON
"dependencies": {
        "and-cli": "file://<location of brandongregoryscott-AndcultureCode.Cli>",
        "commander": "6.0.0",
        "shelljs": "0.8.4"
    },
```

```SH
npm link <location brandongregoryscott-AndcultureCode.Cli>
```

4. Install dependencies

```SH
npm install
```

5. Run the plugin cli

```SH
$ ./plugin-cli.js
```

## Examples

#### Importing the base CLI and registering all of the base commands (`copy`, `dotnet`, `dotnet-test`, etc...)

```JS
#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const commandRegistry = require("and-cli/modules/command-registry");
const program = require("and-cli");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Entrypoint
// -----------------------------------------------------------------------------------------

// Register all of the base commands from the and-cli with this application
commandRegistry.registerBaseCommands();

program.parse(process.argv);

// #endregion Entrypoint
```

```SH
$ ./plugin-cli.js
```

```SH
Usage: plugin-cli [options] [command]

andculture cli

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  copy            Copy files and/or directories
  deploy          Deploy various application types
  dotnet          Run various dotnet commands for the project
  dotnet-test     Run various dotnet test runner commands for the project
  github          Commands for interacting with AndcultureCode github resources
  install         Collection of commands related to installation and configuration of the and-cli
  migration       Run commands to manage Entity Framework migrations
  nuget           Manages publishing of nuget dotnet core projects
  webpack         Run various webpack commands for the project
  webpack-test    Run various webpack test commands for the project
  help [command]  display help for command
```

#### Importing the base CLI and registering just one base command

```JS
#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const commandRegistry = require("and-cli/modules/command-registry");
const program = require("and-cli");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Entrypoint
// -----------------------------------------------------------------------------------------

// Register a single base command from the and-cli with this application
commandRegistry.registerBaseCommand("dotnet");

program.parse(process.argv);

// #endregion Entrypoint
```

```SH
$ ./plugin-cli.js
```

```SH
Usage: plugin-cli [options] [command]

andculture cli

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  dotnet          Run various dotnet commands for the project
  help [command]  display help for command
```

#### Importing the base CLI, registering all of the base commands, adding a custom command

```JS
#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const commandRegistry = require("and-cli/modules/command-registry");
const program = require("and-cli");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Entrypoint
// -----------------------------------------------------------------------------------------

// Register all of the base commands from the and-cli with this application
commandRegistry.registerBaseCommands();

// Register a custom command in the current project (filename must match <cli-name>-<command-name>.js)
// ie, this command maps up to `plugin-cli-example.js`
commandRegistry.registerCommand(
    {
        command: "example",
        description: "Some example command",
    },
);

program.parse(process.argv);

// #endregion Entrypoint
```

```SH
$ ./plugin-cli.js
```

```SH
Usage: plugin-cli [options] [command]

andculture cli

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  copy            Copy files and/or directories
  deploy          Deploy various application types
  dotnet          Run various dotnet commands for the project
  dotnet-test     Run various dotnet test runner commands for the project
  example         Some example command
  github          Commands for interacting with AndcultureCode github resources
  install         Collection of commands related to installation and configuration of the and-cli
  migration       Run commands to manage Entity Framework migrations
  nuget           Manages publishing of nuget dotnet core projects
  webpack         Run various webpack commands for the project
  webpack-test    Run various webpack test commands for the project
  help [command]  display help for command
```

## Notes / limitations

-   Adding an option to an existing base command

As of right now, consumers are unable to add additional options/flags to a base command that is exported from the [`and-cli`](https://github.com/andculturecode/AndcultureCode.Cli). I think that would require some way to run a 'pre-parse' hook to tack on additional options before parsing arguments and running the command body, or possibly a larger refactor of the way we are registering commands in the base CLI. There is a [documented issue](https://github.com/tj/commander.js/issues/1197) (that is still being updated/vetted) on the [`commander.js`](https://github.com/tj/commander.js) repo for discussion around pre/post hooks.

If the proposed option makes sense to live in the base CLI, open up an issue in the [`and-cli`](https://github.com/andculturecode/AndcultureCode.Cli) repo and the team will discuss if it is a direction we want to go in.

Otherwise, the only workaround is to add a new command. Post-fixing the command to denote it is the custom to this project/extended cli might be a good idea (such as `dotnet-local` or `dotnet-ext`).

-   Overriding a base command

To override a base command with one that you've implemented yourself, each `register*Command` function has an `overrideIfRegistered` flag that needs to be set to `true`. This will ensure that you are intentionally attempting to replace the command(s) that have already been registered.

```JS
// ... imports, entrypoint, etc.

// Register a single base command from the and-cli with this application
commandRegistry.registerBaseCommand("dotnet");

// Override the 'dotnet' command from and-cli with our own custom version
commandRegistry.registerCommand(
    {
        command: "dotnet",
        description: "Some custom version of the dotnet command",
    },
    true
);
```

Under the hood, this is just checking to see if a command of the same name has already been added, and removing it before registering the new one. You could remove this command manually, in which case the `overrideIfRegistered` flag is not necessary:

```JS
// ... imports, entrypoint, etc.

// Register all of the base commands from the and-cli with this application
commandRegistry.registerBaseCommands();

// Remove just the base 'dotnet' command
commandRegistry.removeCommand("dotnet");

// Add our custom version of the 'dotnet' command now that there's no name conflict
commandRegistry.registerCommand(
    {
        command: "dotnet",
        description: "Some custom version of the dotnet command",
    }
);
```
