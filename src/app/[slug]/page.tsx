import { client } from "@/sanity/lib/client"
import { redirect, notFound } from "next/navigation"

interface LinkData {
  _id: string
  shortSlug: string
  originalUrl: string
  clicks: number
  createdAt: string
}

interface PageProps {
  params: {
    slug: string
  }
}

async function incrementClickCount(linkId: string, currentClicks: number) {
  try {
    await client
      .patch(linkId)
      .set({ clicks: currentClicks + 1 })
      .commit()
  } catch (error) {
    console.error("Error incrementing click count:", error)
    // Don't fail the redirect if click tracking fails
  }
}

export default async function SlugRedirectPage({ params }: PageProps) {
  const { slug } = params

  try {
    // Query Sanity for the link data
    const query = `*[_type == "link" && shortSlug == $slug][0]`
    const linkData: LinkData = await client.fetch(query, { slug })

    // If no link found, show 404
    if (!linkData) {
      notFound()
    }

    // Increment the click count asynchronously
    await incrementClickCount(linkData._id, linkData.clicks)

    // Redirect to the original URL
    redirect(linkData.originalUrl)
  } catch (error) {
    console.error("Error processing redirect:", error)
    notFound()
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  const { slug } = params

  try {
    const query = `*[_type == "link" && shortSlug == $slug][0]`
    const linkData: LinkData = await client.fetch(query, { slug })

    if (!linkData) {
      return {
        title: "Link Not Found - Little Links",
        description: "The requested shortened link could not be found.",
      }
    }

    return {
      title: `Redirecting... - Little Links`,
      description: `Redirecting to ${linkData.originalUrl}`,
      robots: "noindex, nofollow", // Don't index redirect pages
    }
  } catch (error) {
      console.log(error)
    return {
      title: "Error - Little Links",
      description: "An error occurred while processing the link.",
    }
  }
}
