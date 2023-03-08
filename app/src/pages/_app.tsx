import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import MainLayout from "~/layouts/MainLayout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>PiXell</title>
        <meta
          name="description"
          content="Create visual art by editing one PiXell at a time."
        />
        <link rel="icon" href="/images/favicon.svg" />
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
};

export default api.withTRPC(MyApp);
