const BASE_URL = '/merchant/dashboard'
export const sideLinks = [
  {
    name: 'Account Dashboard',
    link: `${BASE_URL}` || `${BASE_URL}/product/[id]`,
  },
  {
    name: 'Payment (Escrow)',
    link: `${BASE_URL}/escrow`,
  },
  {
    name: 'Customer Orders',
    link: `${BASE_URL}/orders`,
  },
  {
    name: 'History',
    link: `${BASE_URL}/history`,
  },
  {
    name: 'Dispatch Drivers',
    link: `${BASE_URL}/drivers`,
  },
  {
    name: 'Account Information',
    link: `${BASE_URL}/account-info`,
  },
]
