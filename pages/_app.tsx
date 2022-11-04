import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadUserDetail from "../components/auth/LoadUserDetail";
import AdminLayout from "../components/layout/AdminLayout";
import ClientLayout from "../components/layout/ClientLayout";
import { store } from "../redux/store";
import "../styles/app.scss";
interface MyAppProps extends AppProps {}
function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter();

  switch (router?.pathname.includes("/admin")) {
    case true:
      return (
        <Provider store={store}>
          <AdminLayout>
            <LoadUserDetail />
            <Component {...pageProps} />
            <ToastContainer />
          </AdminLayout>
        </Provider>
      );
    default:
      return (
        <Provider store={store}>
          <LoadUserDetail />
          <ClientLayout>
            <Component {...pageProps} />
            <ToastContainer />
          </ClientLayout>
        </Provider>
      );
  }
}

export default MyApp;
