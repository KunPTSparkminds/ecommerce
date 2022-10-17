import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../components/layout/AdminLayout";
import ClientLayout from "../components/layout/ClientLayout";
import { store } from "../redux/store";
import "../styles/app.scss";
interface MyAppProps extends AppProps {}
function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter();

  // const getUserDetail = async () => {
  //   await fetch("http://localhost:8081/api/user-detail", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Access-Control-Allow-Credentials": "true",
  //       "Content-Type": "application/json;charset=UTF-8",
  //       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         return;
  //       }
  //     })
  //     .then((data) => {
  //       if (data?.name && data?.role) {
  //         router.push("/admin");
  //       }
  //       if (data?.name && !data.role) {
  //         router.push("/");
  //       }
  //     });
  // };

  // useEffect(() => {
  //   getUserDetail();
  // }, []);

  switch (router?.pathname.includes("/admin")) {
    case true:
      return (
        <AdminLayout>
          <Component {...pageProps} />
          <ToastContainer />
        </AdminLayout>
      );
    default:
      return (
        <Provider store={store}>
          <ClientLayout>
            <Component {...pageProps} />
            <ToastContainer />
          </ClientLayout>
        </Provider>
      );
  }
}

export default MyApp;
