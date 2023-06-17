import { useRoutes } from "raviger";
import AppContainer from "../hoc/AppContainer";
import About from "../components/About";
import Errorpage from "../components/Errorpage";
import CreateForm from "../CreateForm";
import Login from "../components/Login";
import Registration from "../components/Registration";
import { User } from "../types/userTypes";
// import FormBuilder from "../components/FormBuilder";
import UpdatedPreview from "../components/preview/UpdatedPreview";
import { Suspense, lazy } from "react";
import Loading from "../common/Loading";

const Home = lazy(() => import("../components/Home"));
const FormBuilder = lazy(() => import("../components/builder/FormBuilder"));

const routes = {
  "/": () => (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  ),
  "/error": () => <Errorpage />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => (
    <Suspense fallback={<Loading />}>
      <FormBuilder formId={id} />
    </Suspense>
  ),
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
