import {
  getJBController,
  // getJBChainlinkV3PriceFeed,
  // getJBCurrencies,
  // getJBDirectory,
  // getJBFundingCycleStore,
  // getJBOperatorStore,
  // getJBProjects,
  // getJBSingleTokenPaymentTerminalStore,
  // getJBETHERC20ProjectPayerDeployer,
  // getJBETHERC20SplitsPayerDeployer,
  // getJBETHPaymentTerminal,
  // getJBPrices,
  // getJB3DayReconfigurationBufferBallot,
  // getJB7DayReconfigurationBufferBallot,
  // getJBTokenStore,
  // getJBSplitsStore,
  //getJBToken
} from "juice-sdk";

export default function useJuicebox({ projectId }, mainnetProvider) {
  async function getController(projectId) {
    // Get a list of the project's terminals
    //const terminals = await getJBDirectory(mainnetProvider).projects
    const controller = await getJBController(mainnetProvider).distributeReservedTokensOf(projectId);
    //const primaryTerminal = terminals[0];
    // Get the balance of the projects' primary terminal.
    //const balance = await getJBSingleTokenPaymentTerminalStore(mainnetProvider).balanceOf(primaryTerminal, projectId);

    return controller;
  }

  getController(projectId);
}
