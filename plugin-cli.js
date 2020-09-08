#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const baseCommands = require("and-cli/modules/commands");
const commandRegistry = require("and-cli/modules/command-registry");
const program = require("and-cli");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Entrypoint
// -----------------------------------------------------------------------------------------

// Override the description from the and-cli
program.description(
    "Sandbox project to showcase extending functionality of and-cli"
);

// Register all of the base commands from the and-cli with this application
commandRegistry.registerBaseCommands();

// Register a single base command from the and-cli with this application
commandRegistry.registerBaseCommand("dotnet", true);

// Or, strongly typed with the command definitions
commandRegistry.registerBaseCommand(baseCommands.dotnet.command, true);

// Override the 'dotnet' command from and-cli with our own custom version
commandRegistry.registerCommand(
    {
        command: "dotnet",
        description: "Some custom version of the dotnet command",
    },
    true
);

// The command registry also provides a function for registering multiple commands at once
commandRegistry.registerCommands([
    {
        command: "example",
        description: "Some example command",
    },
]);

program.parse(process.argv);

// #endregion Entrypoint
