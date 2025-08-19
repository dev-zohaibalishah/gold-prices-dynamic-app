// import { json } from '@remix-run/node';
// import prisma from '../../db.server';

// export const loader = async ({ request }) => {
//   const url = new URL(request.url);
//   const productId = url.searchParams.get("product_id");

//   if (!productId) {
//     return json({ error: 'Missing product_id' }, { status: 400 });
//   }

//   const product = await prisma.goldProduct.findUnique({
//     where: { productId },
//   });

//   if (!product) {
//     return json({ error: 'Product not found' }, { status: 404 });
//   }

//   let goldPricePerGram = 0;
//   try {
//     const response = await fetch(`https://api.metalpriceapi.com/v1/latest?api_key=${process.env.METALPRICE_API_KEY}&base=USD&currencies=XAU`);
//     const data = await response.json();
//     const rateXAU = data?.rates?.XAU;
//     if (rateXAU) {
//       goldPricePerGram = (1 / rateXAU) / 31.1035;
//     }
//   } catch (error) {
//     console.error("Gold price fetch error:", error);
//   }

//   const { weight, purity, manufacturing_cost } = product;
//   const karatRatio = purity / 24;
//   const goldValue = weight * karatRatio * goldPricePerGram;
//   const totalPrice = goldValue + manufacturing_cost;

//   return json({ price: totalPrice.toFixed(2) });
// };
