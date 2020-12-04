#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const { program, CommandRunner, Js } = require("and-cli");

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
    if (Js.hasNoArguments()) {
        program.outputHelp();
    }

    // #endregion Entrypoint
});
