// import { getJBDirectory } from "juice-sdk";
// import { useEffect, useState } from "react";

// export default function useJuiceboxController({ projectId }, mainnetProvider) {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function getController(projectId) {
//       // Get a project's controller address
//         const controller = await getJBDirectory(mainnetProvider).controllerOf(projectId);

//         return controller;
//       }

//       setLoading(true);
//       getController(projectId)
//       .then(controller => {
//         setLoading(false);
//         setData(controller);
//       })
//       .catch(e => {
//         setError(e);
//       });
//   }, [mainnetProvider, projectId]);

//   return { loading, data, error };
// }

