const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const getAllProducts = async () => {
  const products = await fetch(`${BASE_URL}/products`, {
    method: 'GET',
  })
  return products
}

export { getAllProducts }
