import { NextRequest, NextResponse } from 'next/server'

interface MapCoordinate {
  z: string
  x: string
  y: string
}

const generateMapUrl = ({ z, x, y }: MapCoordinate): string => {
  const apiKey = process.env.MAPTILER_API_KEY
  return `https://api.maptiler.com/maps/streets-v2-dark/${z}/${x}/${y}.png?key=${apiKey}`
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const [z, x, yWithExtension] = params.slug || []
  const y = yWithExtension?.replace('.png', '')

  if (!z || !x || !y) {
    return new NextResponse('Bad request', { status: 400 })
  }

  try {
    const response = await fetch(generateMapUrl({ z, x, y }))
    
    if (!response.ok) {
      return new NextResponse('Error fetching tile', { status: response.status })
    }

    const imageBuffer = await response.arrayBuffer()

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 })
  }
}