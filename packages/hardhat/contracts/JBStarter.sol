// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;


import "hardhat/console.sol";
import '@jbx-protocol/contracts-v2/contracts/JBController.sol';




contract JBX {
JBController jbController;

    // address public owner;
    // JBProjectMetadata public projectMetadata;
    // JBFundingCycleData public data;
    // JBFundingCycleMetadata public metadata;
    // uint256 _mustStartAtOrAfter;
    // JBGroupedSplits[] public groupedSplits;
    // JBFundAccessConstraints[] public fundAccessConstraints;
    // IJBPaymentTerminal[] public terminals;
    // string public memo;
    


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



}