// import { json } from '@remix-run/node';
// import prisma from '../db.server';

// export const loader = async ({ request }) => {
//   const url = new URL(request.url);
//   const productId = url.searchParams.get('productId');

//   if (!productId) {
//     return json({ error: 'Missing productId' }, { status: 400 });
//   }

//   const product = await prisma.goldProduct.findUnique({
//     where: { productId },
//   });

//   if (!product) {
//     return json({ price: null }, { status: 404 });
//   }

//   return json({ price: product.totalPrice });
// };
