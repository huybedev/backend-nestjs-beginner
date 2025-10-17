// PRACTICE: Write your own async function

// TODO 1: Tạo 1 hàm simulate delay (giống setTimeout)
function delay(ms) {
  // Viết code ở đây
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO 2: Tạo hàm fetchProduct(productId) - return promise
// Giả lập fetch sản phẩm từ database
// Delay 500ms
// Return: { id, name, price }

const products = {
  1: { id: 1, name: "Phone", price: 1000 },
  2: { id: 2, name: "Laptop", price: 2000 },
  3: { id: 3, name: "Tablet", price: 1500 },
}
function fetchProduct(productId) {
  // Viết code ở đây
  const product = products[productId]
  return delay(500).then(() => product)
}

// TODO 3: Tạo hàm applyDiscount(product, discountPercent) - return promise
// Delay 200ms
// Return: product với price đã giảm
function applyDiscount(product, discountPercent) {
  // Viết code ở đây
  const discountedPrice = product.price * (1 - discountPercent / 100);
  const discountedProduct = { ...product, price: discountedPrice };
  return delay(200).then(() => discountedProduct);

}

// TODO 4: Sử dụng async/await để:
// - Fetch sản phẩm ID 1
// - Apply 20% discount
// - In ra kết quả
async function main() {
  // Viết code ở đây
  const product = await fetchProduct(1);
  const discountedProduct = await applyDiscount(product, 20);
  console.log(discountedProduct);
}

// Gọi main
main();