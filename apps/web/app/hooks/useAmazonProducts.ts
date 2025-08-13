'use client'
import { useState, useEffect, useCallback } from 'react'

interface AmazonProduct {
  id: string
  title: string
  price: string
  image: string
  url: string
  lastUpdated: number
}

interface UseAmazonProductsReturn {
  products: AmazonProduct[]
  loading: boolean
  loadingStates: Record<string, boolean>
  error: string | null
  refetch: () => Promise<void>
}

const PRODUCT_IDS = [
  'keyboard',
  'chair',
  'notebook-support',
  'usb-adapter',
  'hub-usbc',
  'headphone',
  'mouse',
  'monitor-support',
  'ssd',
]

export const useAmazonProducts = (): UseAmazonProductsReturn => {
  const [products, setProducts] = useState<AmazonProduct[]>([])
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSingleProduct = useCallback(
    async (productId: string): Promise<AmazonProduct | null> => {
      try {
        setLoadingStates((prev) => ({ ...prev, [productId]: true }))

        const response = await fetch(`/api/amazon-product/${productId}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.success && data.product) {
          return data.product
        } else {
          return null
        }
      } catch (err) {
        return null
      } finally {
        setLoadingStates((prev) => ({ ...prev, [productId]: false }))
      }
    },
    []
  )

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setProducts([]) // Clear existing products

      // Initialize loading states
      const initialLoadingStates: Record<string, boolean> = {}
      PRODUCT_IDS.forEach((id) => {
        initialLoadingStates[id] = false
      })
      setLoadingStates(initialLoadingStates)

      // Fetch products sequentially with a small delay for better UX
      for (const productId of PRODUCT_IDS) {
        const product = await fetchSingleProduct(productId)

        if (product) {
          setProducts((prev) => {
            // Check if product already exists to avoid duplicates
            const exists = prev.some((p) => p.id === product.id)
            if (!exists) {
              return [...prev, product]
            }
            return prev
          })
        }

        // Small delay between requests to show progressive loading
        await new Promise((resolve) => setTimeout(resolve, 200))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }, [fetchSingleProduct])

  const refetch = useCallback(async () => {
    await fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    loading,
    loadingStates,
    error,
    refetch,
  }
}
