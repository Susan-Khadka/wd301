import { useRoutes } from "raviger";
import AppContainer from "../hoc/AppContainer";
import About from "../components/About";
import Errorpage from "../components/Errorpage";
import CreateForm from "../CreateForm";
import Login from "../components/Login";
import Registration from "../components/Registration";
import Home from "../components/Home";
import { User } from "../types/userTypes";
import FormBuilder from "../components/FormBuilder";
import UpdatedPreview from "../components/UpdatedPreview";

const routes = {
  "/": () => <Home />,
  "/error": () => <Errorpage />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <FormBuilder formId={id} />,
  "/preview/:id": ({ id }: { id: string }) => <UpdatedPreview formId={id} />,
  "/createForm": () => <CreateForm />,
  "/login": () => <Login />,
  "/registration": () => <Registration />,
};

export default function AppRouter(props: { currentUser: User }) {
  let routeResult = useRoutes(routes);
  return (
    <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
  );
}
