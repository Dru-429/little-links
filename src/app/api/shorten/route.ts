import { client } from "@/sanity/lib/client"
import { NextResponse } from "next/server"


export async function POST(
    req: Request
) {
    try {

        const body = await req.json()
        const { originalUrl, shortSlug } = body

        if (!originalUrl || !shortSlug) {
            return NextResponse.json(
                { success: false, message: "Missing originalUrl or shortSlug" },
                { status: 400 }
            )
        }

        //check if the slug already exist
        const query = `*[_type == "link" && shortSlug == $slug][0]`
        const existingLink = await client.fetch(query, { slug: shortSlug })

        if (existingLink) {
            return NextResponse.json(
                { success: false, message: "slug already exists" },
                { status: 409 }
            )
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

        return NextResponse.json(
            { success: true, message: 'Short link Generated & saved' },
            { status: 500 }
        )

    } catch (error) {
        console.error('Error at api/shorten', error)
        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500 }
        )
    }
}
