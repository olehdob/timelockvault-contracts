const MultiSig = artifacts.require("MultiSig");
const TimeLockupMultiSigVault = artifacts.require("TimeLockupMultiSigVault");

const { TEST_TIMELOCK_SECONDS, TEST_KEYHOLDER_LIMIT } = require("../utils");

module.exports = function (deployer, network) {
  if (network == "development") {
    console.log(
      `Testing a TimeLockupMultiSigVault and a MultiSig with a ${TEST_KEYHOLDER_LIMIT} keyholder limit and a ${TEST_TIMELOCK_SECONDS} second timelock.`
    );

    deployer.deploy(MultiSig, TEST_KEYHOLDER_LIMIT);
    deployer.deploy(
      TimeLockupMultiSigVault,
      TEST_KEYHOLDER_LIMIT,
      TEST_TIMELOCK_SECONDS
    );
  } else {
    const TIMELOCK_SECONDS = process.env.TIMELOCK_SECONDS;
    const KEYHOLDER_LIMIT = process.env.KEYHOLDER_LIMIT;

    console.log(
      `Deploying TimeLockupMultiSigVault to ${network} with a ${KEYHOLDER_LIMIT} keyholder limit and a ${TIMELOCK_SECONDS} second timelock.`
    );

    deployer.deploy(TimeLockupMultiSigVault, KEYHOLDER_LIMIT, TIMELOCK_SECONDS);
  }
};
