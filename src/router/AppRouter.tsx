import { useRoutes } from "raviger";
import AppContainer from "../hoc/AppContainer";
import App from "../App";
import About from "../components/About";
import Form from "../components/Form";
import Preview from "../components/Preview";
import Errorpage from "../components/Errorpage";

const routes = {
  "/": () => <App />,
  "/error": () => <Errorpage />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <Form selectedFormID={id} />,
  "/preview/:id": ({ id }: { id: string }) => (
    <Preview formId={(id)} />
  ),
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
