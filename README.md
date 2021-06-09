# AndcultureCode.Cli.PluginExample

![build status](https://github.com/AndcultureCode/AndcultureCode.Cli.PluginExample/actions/workflows/main.yml/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

_The plugin feature is available from [v1.2.0](https://github.com/AndcultureCode/AndcultureCode.Cli/releases/tag/v1.2.0) and later._
_The alias feature is available from [v1.3.1](https://github.com/AndcultureCode/AndcultureCode.Cli/releases/tag/v1.3.1) and later._
_Prior to [v2.0.0](https://github.com/AndcultureCode/AndcultureCode.Cli/releases/tag/v2.0.0) modules were lowercase-first and "default" imports. Check the git history for examples if still using versions < v2.0.0._

In order to run this demo locally, you will need to:

1. Clone this repository

```SH
git clone https://github.com/AndcultureCode/AndcultureCode.Cli.PluginExample
```

2. Install dependencies

```SH
cd AndcultureCode.Cli.PluginExample
npm install
```

3. Run the plugin cli

```SH
$ ./plugin-cli.js
```

## Examples

#### Importing the base CLI and registering all of the base commands (`copy`, `dotnet`, `dotnet-test`, etc...)

<details>
<summary>
Click to see code sample
</summary>

```JS
    #!/usr/bin/env node

    // -----------------------------------------------------------------------------------------
    // #region Imports
    // -----------------------------------------------------------------------------------------

    const { CommandRegistry, program } = require("and-cli");

    // #endregion Imports

    // -----------------------------------------------------------------------------------------
    // #region Entrypoint
    // -----------------------------------------------------------------------------------------

    // Register all of the base commands from the and-cli with this application
    CommandRegistry.registerAllBase();

    program.parse(process.argv);

    // #endregion Entrypoint
```

</details>

<details>
<summary>
Click to see CLI output
</summary>

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

</details>

#### Importing the base CLI and registering just one base command

<details>
<summary>
Click to see code sample
</summary>

```JS
    #!/usr/bin/env node

    // -----------------------------------------------------------------------------------------
    // #region Imports
    // -----------------------------------------------------------------------------------------

    const { CommandRegistry, program } = require("and-cli");

    // #endregion Imports

    // -----------------------------------------------------------------------------------------
    // #region Entrypoint
    // -----------------------------------------------------------------------------------------

    // Register a single base command from the and-cli with this application
    CommandRegistry.registerBase("dotnet");

    program.parse(process.argv);

    // #endregion Entrypoint
```

</details>

<details>
<summary>
Click to see CLI output
</summary>

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

</details>

#### Importing the base CLI, registering all of the base commands, adding a custom command

<details>
<summary>
Click to see code sample
</summary>

```JS
    #!/usr/bin/env node

    // -----------------------------------------------------------------------------------------
    // #region Imports
    // -----------------------------------------------------------------------------------------

    const { CommandRegistry, program } = require("and-cli");

    // #endregion Imports

    // -----------------------------------------------------------------------------------------
    // #region Entrypoint
    // -----------------------------------------------------------------------------------------

    // Register all of the base commands from the and-cli with this application
    CommandRegistry.registerAllBase();

    // Register a custom command in the current project (filename must match <cli-name>-<command-name>.js)
    // ie, this command maps up to `plugin-cli-example.js`
    CommandRegistry.register(
        {
            command: "example",
            description: "Some example command",
        },
    );

    program.parse(process.argv);

    // #endregion Entrypoint
```

</details>

<details>
<summary>
Click to see CLI output
</summary>

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

</details>

#### Importing the base CLI, registering all of the base commands, adding aliases through the command registry

<details>
<summary>
Click to see code sample
</summary>

```JS
    #!/usr/bin/env node

    // -----------------------------------------------------------------------------------------
    // #region Imports
    // -----------------------------------------------------------------------------------------

    const { CommandRegistry, program } = require("and-cli");

    // #endregion Imports

    // -----------------------------------------------------------------------------------------
    // #region Entrypoint
    // -----------------------------------------------------------------------------------------

    // Register all of the base commands from the and-cli with this application
    CommandRegistry.registerAllBase();

    // Register an alias for the dotnet command and the dotnet command with specific options
    CommandRegistry
        .registerAlias({
            command: "d",
            description: "dotnet",
        })
        .registerAlias({
            command: "dcRb",
            description: "dotnet -cRb",
        });

    // Call CommandRegistry.parseWithAliases() instead of program.parse() to ensure aliases are handled
    // before attempting to parse regular commands.
    CommandRegistry.parseWithAliases();

    // #endregion Entrypoint
```

`d` will be displayed in the help menu and map to the `dotnet` command when run, while `dcRb` maps to `dotnet -cRb`.

</details>

<details>
<summary>
Click to see CLI output
</summary>

```SH
    Usage: plugin-cli [options] [command]

    Sandbox project to showcase extending functionality of and-cli

    Options:
      -V, --version   output the version number
      -h, --help      display help for command

    Commands:
      copy            Copy files and/or directories
      d               (alias) dotnet
      dcRb            (alias) dotnet -cRb
      deploy          Deploy various application types
      dotnet          Some custom version of the dotnet command
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

</details>

#### Importing the base CLI, registering a custom command, adding an alias through the package.json

<details>
<summary>
Click to see code sample
</summary>

```JS
    #!/usr/bin/env node

    // -----------------------------------------------------------------------------------------
    // #region Imports
    // -----------------------------------------------------------------------------------------

    const { CommandRegistry, program } = require("and-cli");

    // #endregion Imports

    // -----------------------------------------------------------------------------------------
    // #region Entrypoint
    // -----------------------------------------------------------------------------------------

    // Register a custom command in the current project (filename must match <cli-name>-<command-name>.js)
    // ie, this command maps up to `plugin-cli-example.js`
    CommandRegistry.register(
        {
            command: "example",
            description: "Some example command",
        },
    );

    // Aliases will be loaded from the local package.json file under an 'and-cli' > 'aliases' section.
    CommandRegistry.registerAliasesFromConfig();

    // Call CommandRegistry.parseWithAliases() instead of program.parse() to ensure aliases are handled
    // before attempting to parse regular commands.
    CommandRegistry.parseWithAliases();

    // #endregion Entrypoint
```

The package.json would have entries in it like this:

```JSON
"and-cli": {
    "aliases": {
        "ex": "example"
    }
},
```

`ex` will be displayed in the help menu and map to the `example` command when run.

</details>

<details>
<summary>
Click to see CLI output
</summary>

```SH
    Usage: plugin-cli [options] [command]

    Sandbox project to showcase extending functionality of and-cli

    Options:
      -V, --version   output the version number
      -h, --help      display help for command

    Commands:
      ex              (alias) example
      example         Some example command
      help [command]  display help for command
```

</details>

## Notes / limitations

#### Adding an option to an existing base command

As of right now, consumers are unable to add additional options/flags to a base command that is exported from the [`and-cli`](https://github.com/andculturecode/AndcultureCode.Cli). I think that would require some way to run a 'pre-parse' hook to tack on additional options before parsing arguments and running the command body, or possibly a larger refactor of the way we are registering commands in the base CLI. There is a [documented issue](https://github.com/tj/commander.js/issues/1197) (that is still being updated/vetted) on the [`commander.js`](https://github.com/tj/commander.js) repo for discussion around pre/post hooks.

If the proposed option makes sense to live in the base CLI, open up an issue in the [`and-cli`](https://github.com/andculturecode/AndcultureCode.Cli) repo and the team will discuss if it is a direction we want to go in.

Otherwise, the only workaround is to add a new command. Post-fixing the command to denote it is the custom to this project/extended cli might be a good idea (such as `dotnet-local` or `dotnet-ext`).

#### Overriding a base command

To override a base command with one that you've implemented yourself, each `register*Command` function has an `overrideIfRegistered` flag that needs to be set to `true`. This will ensure that you are intentionally attempting to replace the command(s) that have already been registered.

```JS
// ... imports, entrypoint, etc.

// Register a single base command from the and-cli with this application
CommandRegistry.registerBase("dotnet");

// Override the 'dotnet' command from and-cli with our own custom version
CommandRegistry.register(
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
CommandRegistry.registerAllBase();

// Remove just the base 'dotnet' command
CommandRegistry.removeCommand("dotnet");

// Add our custom version of the 'dotnet' command now that there's no name conflict
CommandRegistry.register(
    {
        command: "dotnet",
        description: "Some custom version of the dotnet command",
    }
);
```

#### Running without being in the current project directory (aliasing/global installation)

As of [v1.5.0](https://github.com/AndcultureCode/AndcultureCode.Cli/releases/tag/v1.5.0), your CLI project can be installed globally using the same `install` command that the base `and-cli` provides.

1. Add/update the bin name for your entrypoint file in `package.json`

```JSON
"bin": {
    "plugin-cli": "plugin-cli.js"
},
```

_Note: While not required for the executable to run, it is probably a good idea to ensure the bin name is the same as your package name, ie:_

```JSON
"name": "plugin-cli",
```

This will allow you to easily identify your globally installed CLI.

2. Run the `install` command. Ensure you've properly registered at least the base `install` command in your project.

```SH
./plugin-cli.js install
```

3. You can then change to another directory and run it directly by the bin name.

```SH
cd ~/some/other/directory
plugin-cli dotnet -cRb
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/brandongregoryscott"><img src="https://avatars.githubusercontent.com/u/11774799?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brandon Scott</b></sub></a><br /><a href="https://github.com/AndcultureCode/AndcultureCode.Cli.PluginExample/commits?author=brandongregoryscott" title="Code">💻</a> <a href="https://github.com/AndcultureCode/AndcultureCode.Cli.PluginExample/commits?author=brandongregoryscott" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/jhugs"><img src="https://avatars.githubusercontent.com/u/14300627?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Joshua Hughes</b></sub></a><br /><a href="https://github.com/AndcultureCode/AndcultureCode.Cli.PluginExample/pulls?q=is%3Apr+reviewed-by%3Ajhugs" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://www.snsavage.com"><img src="https://avatars.githubusercontent.com/u/6299224?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Scott Savage</b></sub></a><br /><a href="https://github.com/AndcultureCode/AndcultureCode.Cli.PluginExample/pulls?q=is%3Apr+reviewed-by%3Asnsavage" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/jstevenson"><img src="https://avatars.githubusercontent.com/u/91424?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jim Stevenson</b></sub></a><br /><a href="https://github.com/AndcultureCode/AndcultureCode.Cli.PluginExample/pulls?q=is%3Apr+reviewed-by%3Ajstevenson" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
