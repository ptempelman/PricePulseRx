import Chart from 'chart.js/auto';
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'; // Import useRef
import { api } from "~/utils/api";
import placeholderData from '../../placeholder_data.json';

export default function Search() {

    const router = useRouter();
    const drugName = router.query.drugPage
    const [jsonData, setJsonData] = useState(placeholderData);

    const histData = placeholderData.Lisinopril.historicPrices

    const [prices, setPrices] = useState<number[]>([]);
    const [dates, setDates] = useState<string[]>([]);

    const { data, error, isLoading } = api.price.getPricesForDrug.useQuery({ drugName: drugName as string ?? '' });

    console.log(prices);

    useEffect(() => {
        if (data) {
            data.forEach(({ price, createdAt }) => {
                setPrices(prev => [...prev, price]);
                setDates(prev => [...prev, new Date(createdAt).toISOString()]);
            });
        }
    }, [data]);

    const chartRef = useRef<HTMLCanvasElement>(null); // Ref for chart canvas
    const chartInstance = useRef<Chart>(); // Ref for chart instance

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            label: 'Price',
                            data: prices,
                            borderColor: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Date',
                                    color: 'black' // Set x-axis title color to black
                                },
                                grid: {
                                    color: 'black' // Set x-axis grid lines color to black
                                },
                                ticks: {
                                    color: 'black' // Set x-axis ticks color to black
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Price',
                                    color: 'black' // Set y-axis title color to black
                                },
                                grid: {
                                    color: 'black' // Set y-axis grid lines color to black
                                },
                                ticks: {
                                    color: 'black' // Set y-axis ticks color to black
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Price vs. Date',
                                color: 'black' // Set chart title color to black
                            }
                        }
                    }
                });
            }
        }
    }, [dates, prices]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
                            <div className="bg-[#D0A509] text-center flex flex-grow justify-center items-center">
                                {prices.length === 0 ? 'No data available for this drug name' : <canvas id="myChart" ref={chartRef} style={{ width: '100%', maxWidth: '600px' }}></canvas>}
                            </div>
                            <div className="bg-[#F8CF24] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                        </div>
                        <div className="flex flex-grow gap-5 justify-center pr-10">
                            <div className="bg-[#F8CF24] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                            <div className="bg-[#D0A509] text-center flex-grow flex justify-center items-center"> Placeholder </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
}
