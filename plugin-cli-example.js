#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const { program, CommandRunner } = require("and-cli");

// #endregion Imports

CommandRunner.run(async () => {
    // -----------------------------------------------------------------------------------------
    // #region Entrypoint
    // -----------------------------------------------------------------------------------------

    program
        .usage("option(s)")
        .description("This is an example command not found in and-cli")
        .parse(process.argv);

    // If no options are passed in, just output help
    if (process.argv.slice(2).length === 0) {
        program.outputHelp();
    }

    // #endregion Entrypoint
});
