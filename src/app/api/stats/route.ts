import { client } from '@/sanity/lib/client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Missing shortSlug' },
        { status: 400 }
      )
    }

    const query = `*[_type == "link" && shortSlug == $slug][0]`
    const stats = await client.fetch(query, { slug })

    if (!stats) {
      return NextResponse.json(
        { success: false, message: 'Short link not found :(' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Stats fetched successfully',
        stats: {
          shortSlug: stats.shortSlug,
          originalUrl: stats.originalUrl,
          clicks: stats.clicks,
          createdAt: stats.createdAt
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}
