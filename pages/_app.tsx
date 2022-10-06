import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import ClientLayout from "../components/layout/ClientLayout";
import "../styles/app.scss";
interface MyAppProps extends AppProps {
  title: string;
}
function MyApp({ Component, pageProps, title }: MyAppProps) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage?.getItem("isLoggedIn");
    if (!isLoggedIn && isLoggedIn === "false") {
      router.push("/login");
    }
  }, []);

  switch (router?.pathname) {
    case "/admin":
      return (
        <AdminLayout title={title}>
          <Component {...pageProps} />
        </AdminLayout>
      );
    default:
      return (
        <ClientLayout>
          <Component {...pageProps} />
        </ClientLayout>
      );
  }
}

export default MyApp;
