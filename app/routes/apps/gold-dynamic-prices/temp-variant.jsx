// import { json } from "@remix-run/node";
// import { prisma } from "../../../db.server";

// export async function loader({ request }) {
//   const url = new URL(request.url);
//   const productId = url.searchParams.get("productId");
//   if (!productId) {
//     return json({ error: "Missing productId" }, { status: 400 });
//   }

//   const record = await prisma.goldProduct.findUnique({
//     where: { productId }
//   });

//   return json({ temp_variant_id: record?.temp_variant_id || null });
// }
