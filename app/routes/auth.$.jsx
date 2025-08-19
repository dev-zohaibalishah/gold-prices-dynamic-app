import { shopify } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  return shopify.auth.callback({
    async afterAuth({ session }) {
      const { shop, accessToken } = session;

      // Store shop + token in DB
      await prisma.shop.upsert({
        where: { shop },
        update: { accessToken },
        create: { shop, accessToken },
      });

      // Register webhook ONCE
      await fetch(`https://${shop}/admin/api/2024-07/webhooks.json`, {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          webhook: {
            topic: "orders/create",
            address: `https://${process.env.APP_URL}/webhooks/orders-create`,
            format: "json",
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ Webhook registered:", data))
        .catch((err) =>
          console.error("❌ Failed to register webhook:", err)
        );

      // Continue the normal flow
      return shopify.redirectToShopifyOrAppRoot({ request, session });
    },
  });
};
