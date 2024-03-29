import type { InferGetServerSidePropsType } from "next";
import Banner from "../components/layout/clientLayout/Banner";
import SectionOne from "../components/landing/section-1";
import SectionTwo from "../components/landing/section-2";
import SectionThree from "../components/landing/section-3";
import { BASE_URL } from "../apis/commonApi";
import Head from "next/head";
import SectionFour from "../components/landing/section-4";
import { useWindowSize } from "../hooks/hooks";

export const getServerSideProps = async () => {
  const getAllProducts = async () => {
    const res = await fetch(`${BASE_URL}api/product`);
    const data = await res.json();
    return data;
  };

  const getLuffyProduct = async () => {
    const res = await fetch(`${BASE_URL}api/product/detail?categoryId=50`);
    const data = await res.json();
    return data;
  };

  const getZoroProduct = async () => {
    const res = await fetch(`${BASE_URL}api/product/detail?categoryId=51`);
    const data = await res.json();
    return data;
  };

  const getChopperProduct = async () => {
    const res = await fetch(`${BASE_URL}api/product/detail?categoryId=52`);
    const data = await res.json();
    return data;
  };

  const getNamiProduct = async () => {
    const res = await fetch(`${BASE_URL}api/product/detail?categoryId=53`);
    const data = await res.json();
    return data;
  };

  const getSanjiProduct = async () => {
    const res = await fetch(`${BASE_URL}api/product/detail?categoryId=54`);
    const data = await res.json();
    return data;
  };

  const listProduct = await getAllProducts();
  const luffyProduct = await getLuffyProduct();
  const zoroProduct = await getZoroProduct();
  const chopperProduct = await getChopperProduct();
  const sanjiProduct = await getSanjiProduct();
  const namiProduct = await getNamiProduct();
  return {
    props: {
      listProduct,
      luffyProduct,
      zoroProduct,
      chopperProduct,
      sanjiProduct,
      namiProduct,
    },
  };
};

const Home = ({
  listProduct,
  luffyProduct,
  zoroProduct,
  chopperProduct,
  sanjiProduct,
  namiProduct,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Kun's Shop</title>
        <meta name="description" content="Kun's Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <SectionOne
        listProduct={listProduct}
        luffyProduct={luffyProduct}
        zoroProduct={zoroProduct}
        chopperProduct={chopperProduct}
        namiProduct={namiProduct}
        sanjiProduct={sanjiProduct}
      />
      {/* <SectionTwo listProduct={listProduct} /> */}
      <SectionFour />
      {/* <SectionThree /> */}
    </>
  );
};

export default Home;
