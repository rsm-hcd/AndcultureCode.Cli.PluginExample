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

    const { sdkVersion } = program.opts();

    if (Js.hasNoArguments() || sdkVersion) {
        dotnetVersion.run();
    }

    // #endregion Entrypoint
});
