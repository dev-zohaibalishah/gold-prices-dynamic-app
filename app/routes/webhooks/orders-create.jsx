// import { prisma } from "../../db.server";
// import { setLatestTempVariantId } from "./api/temp-variant-id";
// let latestTempVariantId = null;

// // Call this from your webhook or creation logic when you make the variant
// export function setLatestTempVariantId(id) {
//   latestTempVariantId = id;
// }

// export const loader = async () => {
//   return json({ variantId: latestTempVariantId });
// };
// export async function action({ request }) {
//   const body = await request.json();
  
//   for (const item of body.line_items) {
//     if (item.sku && item.sku.startsWith("GOLD-TEMP-")) {
//       // Delete variant from Shopify
//       await fetch(`https://${process.env.SHOPIFY_SHOP}/admin/api/2024-07/variants/${item.variant_id}.json`, {
//         method: 'DELETE',
//         headers: {
//           'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN,
//           'Content-Type': 'application/json',
//         }
//       });

//       // Delete record from DB
//       await prisma.goldProduct.deleteMany({
//         where: { temp_variant_id: String(item.variant_id) }
//       });
//     }
//   }

//   return new Response("ok", { status: 200 });
// }
