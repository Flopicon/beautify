export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export const calculateTax = (subtotal, taxRate = 0.08) => {
  return subtotal * taxRate
}

export const calculateTotal = (subtotal, taxRate = 0.08) => {
  return subtotal + calculateTax(subtotal, taxRate)
}
