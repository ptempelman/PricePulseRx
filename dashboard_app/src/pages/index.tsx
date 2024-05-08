import Head from "next/head";
import { useRouter } from 'next/router';
import React from 'react';


export default function Home() {

  const router = useRouter();

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get('searchTerm');
    router.push(`./${searchTerm}`);
  };

  return (
    <>
      <Head>
        <title>PricePulseRx</title>
        <meta name="description" content="Transparent Prescription Drug Prices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#3C373D]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <form className='w-full max-w-4xl px-10 py-2 rounded-full bg-[#CCCCCC] text-gray-800 focus:outline-none focus:border-indigo-500'
            onSubmit={handleSearch} >
            <input
              type="text"
              name='searchTerm'
              placeholder="Search for a drug here..."
              className="w-full max-w-4xl px-10 py-2 rounded-full bg-[#CCCCCC] text-gray-800 focus:outline-none focus:border-indigo-500"
            />
          </form>
          <div className="text-white text-2xl font-serif text-center leading-10">
            Unlocking <strong className="underline"> Affordable </strong> Healthcare <br /> your transparent drug pricing companion.
          </div>
        </div>
      </main>
    </>
  );
}
