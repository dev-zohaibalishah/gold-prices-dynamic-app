async function generateAndAddToCart({ karat, weight, makingcost, title }) {
  const res = await fetch("/api/create-priced-product", {
    method: "POST",
    body: new URLSearchParams({
      karat,
      weight,
      makingcost,
      title,
      pricePerGram: await getLiveGoldPricePerGram()
    }),
  });

  const data = await res.json();
  window.location.href = data.productUrl;
}

async function getLiveGoldPricePerGram() {
  const res = await fetch("https://api.metals.live/v1/spot");
  const data = await res.json();
  const gold = data.find(d => d.gold);
  const pricePerOunce = gold?.gold || 2000;
  return pricePerOunce / 31.1;
}
