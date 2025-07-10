import { client } from '@/sanity/lib/client'
import type { NextApiRequest, NextApiResponse } from 'next'

// Define types for the response
type Data = {
  success: boolean
  message: string
  shortSlug?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' })
    }

    const { originalUrl, shortSlug } = req.body

    if (!originalUrl || !shortSlug) {
        return res.status(400).json({ success: false, message: 'Missing originalUrl or shortSlug' })
    }

    //check if the slug already exists
    try {
        const query = `*[_type == "link" && shortSlug == $slug][0]`
        const existingLink = await client.fetch(query, { slug: shortSlug }) 

        if (existingLink) {
            return res.status(409).json({ success: false, message: 'Slug already exists' })
        }

        //else save new link 
        const doc = {
            _type: 'link',
            originalUrl,
            shortSlug,
            clicks: 0,
            createdAt: new Date().toISOString()
        }

        await client.create(doc)

        return res.status(200).json({
            success: true,
            message: 'Short link Generated',
            shortSlug
        })
        
    } catch (error) {
        console.error('Error checking existing slug:', error)
        return res.status(500).json({ success: false, message: 'Server error'})
    }
}
