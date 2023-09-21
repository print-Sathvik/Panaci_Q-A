import React from "react";
import { useRoutes } from "raviger";
import AppContainer from "./AppContainer";
import Questions from "./components/Questions";

export default function AppRouter() {
  const routes = {
    "/": () => <Questions />,
    "/question": () => <Questions />,
  };

  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
