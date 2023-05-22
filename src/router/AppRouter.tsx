import { useRoutes } from "raviger";
import AppContainer from "../hoc/AppContainer";
import App from "../App";
import About from "../components/About";
import Form from "../components/Form";

const routes = {
  "/": () => <App />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <Form selectedFormID={Number(id)} />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
