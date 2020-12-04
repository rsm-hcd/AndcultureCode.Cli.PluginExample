#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const { program, CommandRunner, Js } = require("and-cli");
const dotnetVersion = require("./modules/dotnet-version");

// #endregion Imports

CommandRunner.run(async () => {
    // -----------------------------------------------------------------------------------------
    // #region Entrypoint
    // -----------------------------------------------------------------------------------------

    program
        .usage("option(s)")
        .description("This is my custom version of the dotnet command")
        .option(dotnetVersion.getOptions().toString(), dotnetVersion.description())
        .parse(process.argv);

    // If no options are passed in, just runs dotnet version module
    if (Js.hasNoArguments()) {
        dotnetVersion.run();
    }

    // #endregion Entrypoint
});
