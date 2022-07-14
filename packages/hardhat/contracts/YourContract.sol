// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;


import "hardhat/console.sol";
import '@jbx-protocol/contracts-v2/contracts/JBController.sol';
import "@jbx-protocol/contracts-v2/contracts/interfaces/IJBProjectPayer.sol";
import "@jbx-protocol/contracts-v2/contracts/interfaces/IJBProjectPayer.sol";
import "@jbx-protocol/contracts-v2/contracts/libraries/JBTokens.sol";




contract YourContract {
JBController public jbController;
IJBProjectPayer public juiceBoxPayer;
uint256 public juiceBoxProjectId;


constructor(uint256 _juiceBoxProjectId, address payable _juiceBoxPayerAddress){
    juiceBoxProjectId = _juiceBoxProjectId;
    juiceBoxPayer = IJBProjectPayer(_juiceBoxPayerAddress);
}

    

// An example function for creating a new project with juicebox
    function newProject(
        JBController jbController,
        address _owner,
        JBProjectMetadata calldata _projectMetadata,
        JBFundingCycleData calldata _data,
        JBFundingCycleMetadata calldata _metadata,
        uint256 _mustStartAtOrAfter,
        JBGroupedSplits[] calldata _groupedSplits,
        JBFundAccessConstraints[] calldata _fundAccessConstraints,
        IJBPaymentTerminal[] memory _terminals,
        string memory _memo) public returns (uint256 projectId) {
        
        projectId = jbController.launchProjectFor(_owner, _projectMetadata, _data, _metadata, _mustStartAtOrAfter, _groupedSplits, _fundAccessConstraints, _terminals, _memo);
        
        return projectId;
    }
// A function to fund a juicebox project
    function fund() {
        juiceBoxPayer.pay{value: msg.value}(juiceBoxProjectId, JBTokens.ETH, 0, 0, msg.sender, 0, false, "", "");
    }



}