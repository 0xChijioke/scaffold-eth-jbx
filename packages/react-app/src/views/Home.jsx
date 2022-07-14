import { useContractReader } from "eth-hooks";
import millify from "millify";
import { Col, Row, Statistic, Typography, message, Image } from "antd";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import { Address, EtherInput } from "../components";
import { useState } from "react";
import { web } from "../image";

const { Title } = Typography;

// Add your juicebox project ID
const PROJECT_ID = 44;

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({
  yourLocalBalance,
  readContracts,
  writeContracts,
  tx,
  mainnetContracts,
  mainnetProvider,
  blockExplorer,
  DEBUG,
}) {
  // you can also use hooks locally in your component of choice

  // This will return an aray of set terminal for project
  const terminals = useContractReader(mainnetContracts, "JBDirectory", "terminalsOf", [PROJECT_ID]);
  const terminal = terminals ? terminals[0] : "";
  if (DEBUG) console.log(terminal);

  // This will return the balance of your project's unclaimed tokens
  const getTotalSupply = useContractReader(mainnetContracts, "JBTokenStore", "unclaimedTotalSupplyOf", [PROJECT_ID]);
  const totalSupply = getTotalSupply ? ethers.utils.formatEther(getTotalSupply) : 0;
  if (DEBUG) console.log(totalSupply);

  // This will return the balance avaliable in the selected terminal
  const myMainnetJuiceBalance = useContractReader(mainnetContracts, "JBSingleTokenPaymentTerminalStore", "balanceOf", [
    terminal,
    PROJECT_ID,
  ]);
  const juiceProjectBalance = myMainnetJuiceBalance
    ? Number(ethers.utils.formatEther(myMainnetJuiceBalance)).toFixed(2)
    : 0;

  // This will return the project owner of the set PROJECT_ID
  const juiceProjectOwner = useContractReader(mainnetContracts, "JBProjects", "ownerOf", [44]);
  const juiceProject = useContractReader(mainnetContracts, "JBProject", "tokenURI", [44]);
  if (DEBUG) console.log(juiceProject);

  // The funding cycle that is currently active for the specified project.
  // If a current funding cycle of the project is not found, returns an empty funding cycle with all properties set to 0.
  // https://github.com/jbx-protocol/juice-docs-v2/blob/main/docs/dev/api/contracts/jbfundingcyclestore/read/currentof.md
  const juiceProjectFundingCycle = useContractReader(mainnetContracts, "JBFundingCycleStore", "currentOf", [
    PROJECT_ID,
  ]);
  if (DEBUG) console.log(juiceProjectFundingCycle);

  const [fundValue, setFundValue] = useState();

  return (
    <div style={{ margin: "0 auto" }}>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Title level={1} style={{ padding: 30 }}>
          BUIDLGUIDL ⚔️ JUICEBOX
        </Title>
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Statistic title="Treasury Balance" value={`🪙${millify(juiceProjectBalance)}`} />
          </Col>
          <Col span={12}>
            <Statistic title="Unclaimed Token Balance" value={`🪙${millify(totalSupply)}`} />
          </Col>
        </Row>
      </div>
      <div style={{ margin: "0 auto", width: "50%" }}>
        <h6 style={{ fontSize: 14, textColor: "#808080" }}>Project Owner</h6>
        <Address
          address={juiceProjectOwner}
          ensProvider={mainnetProvider}
          blockExplorer={blockExplorer}
          fontSize={20}
          alignItems="center"
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Image height={400} width={400} src={web} alt="project logo" />
      </div>
      <p>contract is not yet deployed</p>
      <div style={{ width: "fit-content", margin: "0 auto" }}>
        <EtherInput
          autofocus
          placeholder="Enter amount"
          onChange={value => {
            setFundValue(value);
          }}
        />
        <button
          style={{
            margin: 30,
            backgroundColor: "purple",
            border: "none",
            width: "fit-content",
            fontSize: 30,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          onClick={async () => {
            try {
              const sendTransaction = await tx(
                writeContracts.YourContract.Fund({
                  value: fundValue,
                }),
              );
              await sendTransaction.wait();
              message.success("Happy 420!!");
            } catch (e) {
              console.log("mint failed", e);
            }
          }}
        >
          Fund
        </button>
      </div>
    </div>
  );
}

export default Home;
