// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const child_process = require("child_process");
const { CommandStringBuilder, Echo, OptionStringBuilder } = require("and-cli");
const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Functions
// -----------------------------------------------------------------------------------------

const dotnetVersion = {
    cmd() {
        return new CommandStringBuilder("dotnet", "--info");
    },
    description() {
        return `Outputs information about the installed dotnet SDKs (via ${this.cmd()})`;
    },
    getOptions() {
        return new OptionStringBuilder("sdk-version");
    },
    run() {
        const { cmd, args } = this.cmd();

        Echo.message(`Printing dotnet info (via ${this.cmd()})...`);
        const { status } = child_process.spawnSync(cmd, args, {
            stdio: "inherit",
            shell: true,
        });

        if (status !== 0) {
            Echo.error(
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
