// // app/routes/api.temp-variant-id.ts
// import { json, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
// import shopify from "~/shopify.server";

// /** CORS helper */
// function withCors(data, init = {}) {
//   return json(data, {
//     ...init,
//     headers: {
//       ...(init.headers || {}),
//       "Access-Control-Allow-Origin": "https://junaidkhanfabrics.myshopify.com", // or restrict to your store: "https://junaidkhanfabrics.myshopify.com"
//       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   });
// }

// /** Handle preflight OPTIONS requests */
// export async function loader({ request }) {
// if (request.method === "OPTIONS") {
//   return new Response(null, {
//     status: 204,
//     headers: {
//       "Access-Control-Allow-Origin": "*", // 🔒 use your store domain in production
//       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   });
// }


//   const OUNCE_TO_GRAM = 31.1034768;
//   try {
//     const controller = new AbortController();
//     const t = setTimeout(() => controller.abort(), 5000);
//     const res = await fetch("https://api.metals.live/v1/spot", { signal: controller.signal });
//     clearTimeout(t);

//     const data = await res.json();
//     const goldObj = Array.isArray(data) ? data.find(d => d.gold) : null;
//     const pricePerOunce = Number(goldObj?.gold) || 2000;
//     const k24 = pricePerOunce / OUNCE_TO_GRAM;

//     return withCors(
//       { k24, k22: k24 * (22 / 24), k18: k24 * (18 / 24) },
//       { headers: { "Cache-Control": "public, max-age=60" } }
//     );
//   } catch {
//     const k24 = 2000 / 31.1034768;
//     return withCors(
//       { k24, k22: k24 * (22 / 24), k18: k24 * (18 / 24), stale: true },
//       { headers: { "Cache-Control": "public, max-age=60" } }
//     );
//   }
// }

// /** Create a TEMP VARIANT on an existing product */
// export async function action({ request }) {
//   try {
//     const body = await request.json();
//     const { productId, price, weight, karat, making_cost, title = "Custom Price" } = body || {};

//     if (!productId) return withCors({ error: "Missing productId" }, { status: 400 });
//     if (price == null) return withCors({ error: "Missing price" }, { status: 400 });

//     const shop = process.env.SHOPIFY_STORE_DOMAIN; // e.g. "junaidkhanfabrics.myshopify.com"
//     if (!shop) return withCors({ error: "SHOPIFY_STORE_DOMAIN not set" }, { status: 500 });

//     const session = await shopify.session.customAppSession(shop);
//     const client = new shopify.api.clients.Graphql({ session });

//     const mutation = `
//       mutation CreateTempVariant($input: ProductVariantInput!) {
//         productVariantCreate(input: $input) {
//           productVariant { id }
//           userErrors { field message }
//         }
//       }
//     `;

//     const variables = {
//       input: {
//         productId,
//         title: String(title),
//         price: String(price),
//         metafields: [
//           { namespace: "gold_data", key: "weight",      type: "single_line_text_field", value: String(weight ?? "") },
//           { namespace: "gold_data", key: "karat",       type: "single_line_text_field", value: String(karat ?? "") },
//           { namespace: "gold_data", key: "making_cost", type: "single_line_text_field", value: String(making_cost ?? "") },
//         ],
//       },
//     };

//     const res = await client.query({ data: { query: mutation, variables } });
//     const payload = res.body?.data?.productVariantCreate;

//     if (!payload) return withCors({ error: "No response from Shopify", raw: res.body }, { status: 502 });
//     if (payload.userErrors?.length) return withCors({ error: "Shopify userErrors", details: payload.userErrors }, { status: 400 });

//     const variantId = payload.productVariant?.id;
//     if (!variantId) return withCors({ error: "Variant not created", raw: payload }, { status: 500 });

//     return withCors({ variantId });
//   } catch (err) {
//     return withCors({ error: err.message || "Unexpected error" }, { status: 500 });
//   }
// }
