import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '../../../utils/getRedisClient'

interface AmazonProduct {
  id: string
  title: string
  price: string
  image: string
  url: string
  lastUpdated: number
}

const AMAZON_PRODUCTS: Record<string, string> = {
  keyboard: 'https://amzn.to/4m8rsJZ',
  chair: 'https://amzn.to/3UY0F6R',
  'notebook-support': 'https://amzn.to/4fDwJGP',
  'usb-adapter': 'https://amzn.to/4fsmeGd',
  'hub-usbc': 'https://amzn.to/4ljWGws',
  headphone: 'https://amzn.to/4foHywc',
  mouse: 'https://amzn.to/3UhCf8n',
  'monitor-support': 'https://amzn.to/46PK1Og',
  ssd: 'https://amzn.to/3J61ojU',
}

const FALLBACK_DATA: Record<string, Omit<AmazonProduct, 'lastUpdated'>> = {
  keyboard: {
    id: 'keyboard',
    title: 'HyperX Alloy Origins - Teclado Mecânico Gaming',
    price: 'R$ 389,90',
    image: 'https://m.media-amazon.com/images/I/71vzYdH3yNL._AC_SX679_.jpg',
    url: 'https://amzn.to/4m8rsJZ',
  },
  chair: {
    id: 'chair',
    title: 'Cadeira Ergonômica Akira DuOffice',
    price: 'R$ 1.299,90',
    image: 'https://m.media-amazon.com/images/I/51+HUUh5HuL._AC_SX679_.jpg',
    url: 'https://amzn.to/3UY0F6R',
  },
  'notebook-support': {
    id: 'notebook-support',
    title: 'Suporte para Notebook em Aço Carbono',
    price: 'R$ 129,90',
    image: '',
    url: 'https://amzn.to/4fDwJGP',
  },
  'usb-adapter': {
    id: 'usb-adapter',
    title: 'Adaptador USB-C para USB Syntech',
    price: 'R$ 39,90',
    image: '',
    url: 'https://amzn.to/4fsmeGd',
  },
  'hub-usbc': {
    id: 'hub-usbc',
    title: 'Hub USB-C QGeeM 7 em 1',
    price: 'R$ 199,90',
    image: '',
    url: 'https://amzn.to/4ljWGws',
  },
  headphone: {
    id: 'headphone',
    title: 'Beyerdynamic DT 770 PRO 80Ω',
    price: 'R$ 599,90',
    image: '',
    url: 'https://amzn.to/4foHywc',
  },
  mouse: {
    id: 'mouse',
    title: 'Mouse Ergonômico Vertical',
    price: 'R$ 199,90',
    image: '',
    url: 'https://amzn.to/3UhCf8n',
  },
  'monitor-support': {
    id: 'monitor-support',
    title: 'Suporte Articulado para Monitor',
    price: 'R$ 159,90',
    image: '',
    url: 'https://amzn.to/46PK1Og',
  },
  ssd: {
    id: 'ssd',
    title: 'SSD Portátil 2TB',
    price: 'R$ 899,90',
    image: '',
    url: 'https://amzn.to/3J61ojU',
  },
}

async function fetchAmazonProduct(
  url: string
): Promise<Partial<AmazonProduct> | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        'Sec-Ch-Ua':
          '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
      },
      redirect: 'follow',
    })

    if (!response.ok) {
      return null
    }

    const html = await response.text()

    // Extract title - multiple patterns for better accuracy
    const titlePatterns = [
      // Amazon product title span
      /<span[^>]*id="productTitle"[^>]*>\s*([^<]+)\s*<\/span>/i,
      // Alternative product title patterns
      /<h1[^>]*class="[^"]*product[^"]*title[^"]*"[^>]*>([^<]+)<\/h1>/i,
      // Title from structured data
      /"name"\s*:\s*"([^"]+)"/,
      // Title tag as last resort
      /<title[^>]*>([^<]+?)\s*[|\-:]\s*Amazon/i,
    ]

    let title = ''
    for (const pattern of titlePatterns) {
      const titleMatch = html.match(pattern)
      if (titleMatch) {
        title = titleMatch[1]
          .replace(/\s+/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .trim()
        if (
          title &&
          title.length > 10 &&
          !title.includes('flyoutError') &&
          !title.includes('Error')
        ) {
          break
        }
      }
    }

    // If we still have a bad title, try to extract from the URL structure or use fallback
    if (
      !title ||
      title.includes('flyoutError') ||
      title.includes('Error') ||
      title.length < 10
    ) {
      title = '' // Will use fallback in main function
    }

    // Extract price - multiple patterns
    const pricePatterns = [
      /R\$\s*[\d.,]+/g,
      /"priceAmount":"R\$([^"]+)"/,
      /class="[^"]*price[^"]*"[^>]*>([^<]*R\$[^<]+)</i,
    ]

    let price = ''
    for (const pattern of pricePatterns) {
      const priceMatch = html.match(pattern)
      if (priceMatch) {
        price = priceMatch[0].includes('R$')
          ? priceMatch[0]
          : `R$ ${priceMatch[1]}`
        break
      }
    }

    // Extract image - comprehensive patterns for Amazon product images
    const imagePatterns = [
      // High resolution images from product data
      /"hiRes":"([^"]+)"/g,
      /"large":"([^"]+)"/g,
      // Main product image data attributes
      /data-old-hires="([^"]+)"/g,
      /data-a-dynamic-image="[^"]*([^"]*https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)[^"]*"/g,
      // Image JSON data structures
      /"mainUrl":"([^"]+)"/g,
      /"url":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g,
      // Direct image src attributes
      /src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g,
      // Alternative image hosts
      /src="(https:\/\/images-na\.ssl-images-amazon\.com\/images\/I\/[^"]+)"/g,
      // Product gallery images
      /"thumb":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g,
      // Structured data images
      /"image":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g,
    ]

    let image = ''
    let bestImageQuality = 0

    for (const pattern of imagePatterns) {
      const matches = html.matchAll(pattern)
      for (const match of matches) {
        if (match[1]) {
          const imgUrl = match[1].replace(/\\u[\dA-F]{4}/gi, '') // Remove Unicode escapes

          // Prioritize higher quality images
          let quality = 0
          if (imgUrl.includes('_SL1500_') || imgUrl.includes('_AC_SL1500_'))
            quality = 100
          if (imgUrl.includes('_SX679_') || imgUrl.includes('_AC_SX679_'))
            quality = 90
          if (imgUrl.includes('_SL1000_')) quality = 80
          if (imgUrl.includes('_SX466_')) quality = 70
          if (imgUrl.includes('_SX300_')) quality = 60

          if (quality > bestImageQuality && imgUrl.startsWith('https://')) {
            image = imgUrl
            bestImageQuality = quality
          }
        }
      }

      // If we found a high-quality image, stop searching
      if (bestImageQuality >= 90) break
    }

    // Clean up image URL
    if (image) {
      image = image.split('?')[0] // Remove query parameters
      image = decodeURIComponent(image) // Decode URL encoding
    }

    if (title && (price || image)) {
      return { title, price, image }
    }

    return null
  } catch (error) {
    return null
  }
}

async function getCachedProduct(
  redis: any,
  productId: string
): Promise<AmazonProduct | null> {
  try {
    const cached = await redis.get(`amazon-product:${productId}`)
    if (cached) {
      const product = JSON.parse(cached)
      const isExpired = Date.now() - product.lastUpdated > 4 * 60 * 60 * 1000 // 4 hours
      if (!isExpired) {
        return product
      }
    }
    return null
  } catch (error) {
    return null
  }
}

async function setCachedProduct(
  redis: any,
  product: AmazonProduct
): Promise<void> {
  try {
    await redis.setEx(
      `amazon-product:${product.id}`,
      6 * 60 * 60,
      JSON.stringify(product)
    ) // 6 hours TTL
  } catch (error) {
    // Silently handle error
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let redis: any = null

  try {
    const productId = params.id

    if (!AMAZON_PRODUCTS[productId]) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
          availableProducts: Object.keys(AMAZON_PRODUCTS),
        },
        { status: 404 }
      )
    }

    redis = await getRedisClient()

    // Try to get from cache first
    let product = await getCachedProduct(redis, productId)

    if (!product) {
      // Fetch from Amazon
      const productUrl = AMAZON_PRODUCTS[productId]
      const fetchedData = await fetchAmazonProduct(productUrl)

      if (fetchedData && (fetchedData.title || fetchedData.image)) {
        product = {
          id: productId,
          title:
            fetchedData.title ||
            FALLBACK_DATA[productId]?.title ||
            `Produto ${productId}`,
          price: fetchedData.price || 'Consulte o preço',
          image: fetchedData.image || '',
          url: productUrl,
          lastUpdated: Date.now(),
        }

        // Cache the result
        await setCachedProduct(redis, product)
      } else {
        // If Amazon fetch fails, create minimal product with just the link
        product = {
          id: productId,
          title: FALLBACK_DATA[productId]?.title || `Produto ${productId}`,
          price: 'Consulte o preço',
          image: '',
          url: productUrl,
          lastUpdated: Date.now(),
        }

        // Cache fallback data with shorter TTL
        try {
          await redis.setEx(
            `amazon-product:${product.id}`,
            10 * 60,
            JSON.stringify(product)
          ) // 10 minutes for failed attempts
        } catch (cacheError) {
          // Silently handle error
        }
      }
    }

    return NextResponse.json({
      success: true,
      product,
      cached: !!product,
      timestamp: Date.now(),
    })
  } catch (error) {
    // Return fallback data on error
    const fallbackProduct = FALLBACK_DATA[params.id]
    if (fallbackProduct) {
      return NextResponse.json({
        success: false,
        product: {
          ...fallbackProduct,
          lastUpdated: Date.now(),
        },
        cached: false,
        error: 'Failed to fetch product',
        timestamp: Date.now(),
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Product not found and no fallback available',
        timestamp: Date.now(),
      },
      { status: 500 }
    )
  } finally {
    // Close Redis connection
    if (redis) {
      try {
        await redis.quit()
      } catch (closeError) {
        // Silently handle error
      }
    }
  }
}
