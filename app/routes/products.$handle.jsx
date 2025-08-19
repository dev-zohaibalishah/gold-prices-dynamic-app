import { useLoaderData, json } from "@remix-run/react";
import { useEffect, useState } from "react";
import shopify from '../shopify.server';

export async function loader({ params }) {
  const handle = params.handle;

  const session = await shopify.session.customAppSession(process.env.SHOPIFY_STORE_DOMAIN);
  const client = new shopify.api.clients.Graphql({ session });

  const productRes = await client.query({
    data: {
      query: `
        query getProductByHandle($handle: String!) {
          productByHandle(handle: $handle) {
            id
            title
            variants(first: 1) {
              edges {
                node {
                  id
                  metafields(namespace: "custom", first: 10) {
                    edges {
                      node {
                        key
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: { handle },
    },
  });

  const product = productRes.body.data.productByHandle;
  const metafields = {};
  const edges = product.variants.edges[0]?.node?.metafields?.edges || [];
  edges.forEach(({ node }) => {
    if (node.namespace === "gold_data") metafields[node.key] = node.value;
  });

  product.variants.edges[0].node.metafields.edges.forEach(edge => {
    metafields[edge.node.key] = edge.node.value;
  });

  return json({ product, metafields });
}

export default function ProductPage() {
  const { product, metafields } = useLoaderData();
  const [goldPrice, setGoldPrice] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);

  useEffect(() => {
    async function fetchGoldPrice() {
      const res = await fetch("/api/gold-price");
      const data = await res.json();
      setGoldPrice(data.pricePerGram24k);
    }
    fetchGoldPrice();
  }, []);

  useEffect(() => {
    if (goldPrice && metafields.weight && metafields.karat && metafields.makingcost) {
      const karat = parseInt(metafields.karat);       // e.g., 22
      const weight = parseFloat(metafields.weight);   // e.g., 11g
      const making = parseFloat(metafields.makingcost); // e.g., 20

      const adjustedPrice = (karat / 24) * goldPrice * weight + making;
      setFinalPrice(adjustedPrice.toFixed(2));
    }
  }, [goldPrice, metafields]);
  if (!metafields.karat || !metafields.weight || !metafields.makingcost) {
    return <p>Product pricing details are missing.</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p><strong>Price:</strong> {finalPrice ? `$${finalPrice}` : "Calculating..."}</p>

      <form method="POST" action="/cart">
        <input type="hidden" name="id" value={product.variants.edges[0].node.id} />
        <input type="hidden" name="properties[_finalPrice]" value={finalPrice} />
        <button type="submit">Add to Cart</button>
      </form>
    </div>
  );
}
