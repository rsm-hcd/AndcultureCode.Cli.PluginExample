// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const child_process = require("child_process");
const commandStringFactory = require("and-cli/utilities/command-string-factory");
const echo = require("and-cli/modules/echo");
const optionStringFactory = require("and-cli/utilities/option-string-factory");
const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Functions
// -----------------------------------------------------------------------------------------

const dotnetVersion = {
    cmd() {
        return commandStringFactory.build("dotnet", "--info");
    },
    description() {
        return `Outputs information about the installed dotnet SDKs (via ${this.cmd()})`;
    },
    getOptions() {
        return optionStringFactory.build("version", "v");
    },
    run() {
        const { cmd, args } = this.cmd();

        echo.message(`Printing dotnet info (via ${this.cmd()})...`);
        const { status } = child_process.spawnSync(cmd, args, {
            stdio: "inherit",
            shell: true,
        });

        if (status !== 0) {
            echo.error(
                "Failed to retrieve dotnet info. See output for details."
            );
            shell.exit(status);
        }

        return status;
    },
};

// #endregion Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

module.exports = dotnetVersion;

// #endregion Exports
