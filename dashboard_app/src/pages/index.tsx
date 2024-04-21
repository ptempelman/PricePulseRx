import Head from "next/head";


export default function Home() {

  return (
    <>
      <Head>
        <title>PricePulseRx</title>
        <meta name="description" content="Transparent Prescription Drug Prices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#3C373D]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <input
            type="text"
            placeholder="Search for a drug here..."
            className="w-full max-w-4xl px-10 py-2 rounded-full bg-[#CCCCCC] text-gray-800 focus:outline-none focus:border-indigo-500"
          />
          <div className="text-white text-2xl font-serif text-center leading-10">
            Unlocking <strong className="underline"> Affordable </strong> Healthcare <br /> your transparent drug pricing companion.
          </div>
        </div>
      </main>
    </>
  );
}
