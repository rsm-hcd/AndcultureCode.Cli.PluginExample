#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------


const { program, Commands, CommandRegistry } = require("and-cli");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Entrypoint
// -----------------------------------------------------------------------------------------

// Override the description from the and-cli
program.description(
    "Sandbox project to showcase extending functionality of and-cli"
);

// Register all of the base commands from the and-cli with this application
CommandRegistry.registerBaseCommands();

// Register a single base command from the and-cli with this application
CommandRegistry.registerBaseCommand("dotnet", true);

// Or, strongly typed with the command definitions
CommandRegistry.registerBaseCommand(Commands.dotnet.command, true);

// Override the 'dotnet' command from and-cli with our own custom version
CommandRegistry.registerCommand(
    {
        command: "dotnet",
        description: "Some custom version of the dotnet command",
    },
    true
);

// The command registry also provides a function for registering multiple commands at once
CommandRegistry.registerCommands([
    {
        command: "example",
        description: "Some example command",
    },
]);

// Aliases can be registered to provide an easier way to type or remember a command and/or option(s)
// The 'command' is the alias, and the 'description' is the command and option(s) that it should be mapped to.
CommandRegistry
    .registerAlias({
        command: "d",
        description: "dotnet",
    })
    .registerAlias({
        command: "dcRb",
        description: "dotnet -cRb",
    });

// Aliases can be registered from the package.json as well - see the 'and-cli' section for the aliased
// example command.
CommandRegistry.registerAliasesFromConfig();

// Both this function and registerAlias() have an 'overrideIfTrue' parameter to opt-in to overwriting
// of a registered command of the same name, if desired.
CommandRegistry.registerAliasesFromConfig(true);

// Note - in order to preprocess the command line args, you must call CommandRegistry.parseWithAliases()
// instead of just program.parse()! Without calling this, the command string will be interpreted literally
// and will likely fall through to the 'unknown command' error.
CommandRegistry.parseWithAliases();

// #endregion Entrypoint
