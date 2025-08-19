// import { json } from "@remix-run/node";

// export async function loader() {
//   const apiKey = process.env.GOLD_PRICE_API_KEY;

//   const response = await fetch("https://api.metals.live/v1/spot", {
//     headers: {
//       'Authorization': `Bearer ${apiKey}` // optional, only if required by your API
//     }
//   });

//   const data = await response.json();
//   const goldObj = data.find(d => d.gold);
//   const goldPricePerOunce = goldObj?.gold || 2000;
//   const goldPricePerGram = goldPricePerOunce / 31.1;

//   return json({ pricePerGram24k: goldPricePerGram });
// }
