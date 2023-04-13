const BASE_URL = 'https://api.buildadom.net/api/v1'

const getAllProducts = async () => {
  const products = await fetch(`${BASE_URL}/products`, {
    method: 'GET',
  })
  return products
}

export { getAllProducts }
