import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../components/layout/AdminLayout";
import ClientLayout from "../components/layout/ClientLayout";
import "../styles/app.scss";
interface MyAppProps extends AppProps {}
function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter();

  // useEffect(() => {
  //   console.log("hello 12344");
  //   const isLoggedIn = localStorage?.getItem("isLoggedIn");
  //   if (!isLoggedIn && isLoggedIn === "false") {
  //     router.push("/login");
  //   }
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
        <ClientLayout>
          <Component {...pageProps} />
          <ToastContainer />
        </ClientLayout>
      );
  }
}

export default MyApp;
