#!/usr/bin/env node

require("and-cli/command-runner").run(async () => {
    // -----------------------------------------------------------------------------------------
    // #region Imports
    // -----------------------------------------------------------------------------------------

    const dotnetVersion = require("./modules/dotnet-version");
    const program = require("and-cli");

    // #endregion Imports

    // -----------------------------------------------------------------------------------------
    // #region Entrypoint
    // -----------------------------------------------------------------------------------------

    program
        .usage("option(s)")
        .description("This is my custom version of the dotnet command")
        .option(dotnetVersion.getOptions(), dotnetVersion.description())
        .parse(process.argv);

    // If no options are passed in, just runs dotnet version module
    if (process.argv.slice(2).length === 0) {
        dotnetVersion.run();
    }

    // #endregion Entrypoint
});
