import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { api } from "~/utils/api";

const MainLayout = (props: { children: ReactNode }) => {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gray-900 text-white">
      <BackgroundDecorationOne />
      <Navigation />
      <main className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8 lg:pb-40">
        {props.children}
      </main>
      <BackgroundDecorationTwo />
    </div>
  );
};

const BackgroundDecorationOne = () => {
  return (
    <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu blur-3xl sm:top-[-20rem]">
      <svg
        className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
      >
        <path
          fill="url(#f4773080-2a16-4ab4-9fd7-579fec69a4f7)"
          fillOpacity=".2"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="f4773080-2a16-4ab4-9fd7-579fec69a4f7"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9089FC" />
            <stop offset={1} stopColor="#FF80B5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Navigation = () => {
  const apiUtils = api.useContext();

  return (
    <nav className="flex items-center px-8 pt-6">
      <div className="flex flex-1">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">PiXell</span>
          <Image width={32} height={32} src="/images/favicon.svg" alt="Logo" />
        </Link>
      </div>
      <Link
        href="/images"
        onMouseEnter={() => apiUtils.image.getAll.prefetch()}
        className="text-sm font-semibold leading-6"
      >
        Images
      </Link>
    </nav>
  );
};

const BackgroundDecorationTwo = () => {
  return (
    <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu blur-3xl sm:top-[calc(100%-30rem)]">
      <svg
        className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
      >
        <path
          fill="url(#ee0717bf-3e43-49df-b1bd-de36422ed3d3)"
          fillOpacity=".2"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="ee0717bf-3e43-49df-b1bd-de36422ed3d3"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9089FC" />
            <stop offset={1} stopColor="#FF80B5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default MainLayout;
