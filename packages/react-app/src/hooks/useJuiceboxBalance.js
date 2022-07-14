// import { useEffect, useState } from "react";
// import { getJBDirectory, getJBSingleTokenPaymentTerminalStore } from "juice-sdk";

// export default function useJuiceboxBalance({ projectId }, mainnetProvider) {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function getBalance(projectId) {
//       // Get a list of the project's terminals
//       const terminals = await getJBDirectory(mainnetProvider).terminalsOf(projectId);
//       const primaryTerminal = terminals[0];
//       // Get the balance of the projects' primary terminal.
//       const balance = await getJBSingleTokenPaymentTerminalStore(mainnetProvider).balanceOf(primaryTerminal, projectId);

//       return balance;
//     }

//     setLoading(true);

//     getBalance(projectId)
//       .then(balance => {
//         setLoading(false);
//         setData(balance);
//       })
//       .catch(e => {
//         setError(e);
//       });
//   }, [mainnetProvider, projectId]);

//   return { loading, data, error };
// }
