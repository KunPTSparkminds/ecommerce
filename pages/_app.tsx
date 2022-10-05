import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AdminLayout from "../components/layout/AdminLayout";
import ClientLayout from "../components/layout/ClientLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  switch (router?.pathname) {
    case "/admin":
      return (
        <AdminLayout>
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
