import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';

interface DrugInfo {
    drugName: string;
    datetime: string;
    price: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    console.log(req.body);

    const drugs: DrugInfo[] = req.body as DrugInfo[];

    // Save to database
    for (const drug of drugs) {
        const price = await db.price.create({
            data: {
                drugName: drug.drugName,
                price: parseFloat(drug.price),
                platform: 'Amazon',
            }
        });
    }

    return res.status(200).json({ message: 'Prices saved successfully' });
}