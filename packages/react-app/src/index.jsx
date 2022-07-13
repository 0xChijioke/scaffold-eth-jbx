import { ApolloClient, ApolloProvider, InMemoryCache, gql } from "@apollo/client";
import React from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { JUICE } from "./views/Home";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem("theme");
// Subgraph local development
//const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

// const client = new ApolloClient({
//   uri: subgraphUri,
//   cache: new InMemoryCache(),
// });
const GRAPH_API = process.env.REACT_APP_GRAPH_API;


// Endpoint to juicebox mainnet subgraph
const endpoint =
  `https://gateway.thegraph.com/api/${GRAPH_API}/subgraphs/id/FVmuv3TndQDNd2BWARV8Y27yuKKukryKXPzvAS5E7htC`;

const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: JUICE,
//   })
//   .then(data => console.log("Subgraph data: ", data))
//   .catch(err => {
//     console.log("Error fetching data: ", err);
//   });

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || "light"}>
      <BrowserRouter>
        <App subgraphUri={endpoint} />
      </BrowserRouter>
    </ThemeSwitcherProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);
