import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Search() {

    const router = useRouter();
    const drugName = router.query.drugPage;
    console.log(drugName)

    return (
        <>
            <Head>
                <title>PricePulseRx</title>
                <meta name="description" content="Transparent Prescription Drug Prices" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen max-h-screen bg-[#3C373D] pl-10 pt-20 flex flex-col">

                <div className="flex flex-col mb-20 justify-around pr-10">
                    <div className="flex gap-80 items-end">
                        <div className="text-white text-3xl max-w-64 flex-grow"> {drugName} </div>
                        <div className="flex gap-3 flex-grow items-center text-lg text-white gap-14">
                            <div> Time Frame: </div>
                            <button> 1D </button>
                            <button> 5D </button>
                            <button> 10D </button>
                            <button> 6M </button>
                            <button> 1Y </button>
                            <button> 5Y </button>
                            <div className="flex gap-5 flex-grow justify-center">
                                {/* Wrapped the button in a div with border */}
                                <div className="p-2 border-2 border-white rounded-lg">
                                    <button> Select Companies </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-grow gap-7 pb-12">
                    <div className="flex flex-col max-w-64 justify-center gap-5 flex-grow">
                        <div className="bg-[#FBE68C] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                        <div className="bg-[#FADE6A] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                        <div className="bg-[#F9D747] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                        <div className="bg-[#F8CF24] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                        <div className="bg-[#F2C506] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                        <div className="bg-[#D0A509] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                    </div>

                    <div className="flex flex-col gap-5 flex-grow justify-center">
                        <div className="flex flex-grow gap-5 justify-center pr-10">
                            <div className="bg-[#D0A509] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                            <div className="bg-[#F8CF24] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                        </div>
                        <div className="flex flex-grow gap-5 justify-center pr-10">
                            <div className="bg-[#F8CF24] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                            <div className="bg-[#D0A509] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                        </div>
                    </div>
                </div>

            </main >
        </>
    );
}
