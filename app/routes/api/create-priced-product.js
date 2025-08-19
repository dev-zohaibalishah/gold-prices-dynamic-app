// import { json } from '@remix-run/node';
// import shopify from '~/shopify.server'; // adjust path if different

// export async function action({ request }) {
//   const formData = await request.formData();
//   const title = formData.get('title') || 'Custom Gold Product';
//   const karat = parseInt(formData.get('karat'));
//   const weight = parseFloat(formData.get('weight'));
//   const cost = parseFloat(formData.get('makingcost'));
//   const pricePerGram = parseFloat(formData.get('pricePerGram'));

//   const goldPrice = (karat / 24) * weight * pricePerGram + cost;

//   const session = await shopify.session.customAppSession(process.env.SHOPIFY_STORE_DOMAIN);
//   const client = new shopify.api.clients.Rest({ session });

//   const productRes = await client.post({
//     path: 'products',
//     data: {
//       product: {
//         title: `${title} - Auto Priced`,
//         status: 'active',
//         tags: ['auto-priced'],
//         variants: [
//           {
//             price: goldPrice.toFixed(2),
//             sku: `auto-${Date.now()}`,
//             inventory_management: 'shopify',
//             inventory_quantity: 1,
//             requires_shipping: true,
//             option1: 'Default',
//           }
//         ]
//       }
//     },
//     type: 'application/json',
//   });

//   const product = productRes.body.product;
//   const variantId = product.variants[0].id;

//   return json({
//     productId: product.id,
//     variantId,
//     price: goldPrice,
//     productUrl: `/cart/add?id=${variantId}&quantity=1`
//   });
// }
