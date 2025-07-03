import { client } from "@/sanity/lib/client";
import { NextApiRequest, NextApiResponse } from "next";


type Data = {
    success: boolean
    message: string
    stats?: {
        shortSlug: string
        originalUrl: string
        clicks: number
        createdAt: string
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {

    if( req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' })
    }

    const slug = req.query.slug as string

    if (!slug) {
        return res.status(400).json({ success: false, message: 'Missing shortSlug' })
    }

    try {
        const query = `*[_type == "link" && shortSlug == $slug][0]`

        const stats = await client.fetch(query, { slug })

        if (!stats) {
            return res.status(404).json({ success: false, message: 'Short link not found :(' })
        }

        return res.status(200).json({
            success: true,
            message: 'Stats fetched successfully',
            stats: {
                shortSlug: stats.shortSlug,
                originalUrl: stats.originalUrl,
                clicks: stats.clicks,
                createdAt: stats.createdAt
            }
        })
        
    } catch (error) {
        console.error('Error fetching stats:', error)
        return res.status(500).json({ success: false, message: 'Server error'})
    }
    
}