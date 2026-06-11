import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qusijmraszacderhmvmj.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1c2lqbXJhc3phY2Rlcmhtdm1qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTAwMTA5NCwiZXhwIjoyMDk2NTc3MDk0fQ.0Rw-XoYLClZ7ITEAT8T1fUxVDLASboyolJIorMYKZMk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const allProducts = [
  {
    name: "GENRAGE BLACK VEST",
    price: "₹1,999",
    raw_price: 1999,
    category: "vests",
    src: "https://genrage.com/cdn/shop/files/apocalypse-black-boxy-unisex-vest-genrage-1.png?v=1780470235&width=1080",
    description: "Heavyweight drop-shoulder tactical vest. Engineered with robust box silhouette styling, reinforced hardware stitch-lines, and unrefined cotton structures. Features raw edge details for a worn-in cyber-industrial look.",
    details: ["100% French Terry Cotton", "360 GSM Heavyweight Build", "Oversized silhouette", "Hand wash cold, line dry"],
    stock: 4,
    spec: { fabric: "French Terry Cotton", gsm: "360 GSM", fit: "Oversized Silhouette", finish: "Raw edge details" }
  },
  {
    name: "GENRAGE BLACK BOXY FIT T SHIRT",
    price: "₹1,999",
    raw_price: 1999,
    category: "tees",
    src: "https://genrage.com/cdn/shop/files/aghora-black-boxy-oversized-tshirt-genrage-2.png?v=1779978043&width=1080",
    description: "Premium boxy drop-shoulder tee. Features signature GENRAGE screen print at front, distressed hems, and thick ribbed collar. Crafted for ultimate comfort and durability in urban environments.",
    details: ["100% Combed Organic Cotton", "240 GSM Premium Jersey", "Boxy drop-shoulder silhouette", "Machine wash cold"],
    stock: 8,
    spec: { fabric: "Combed Organic Cotton", gsm: "240 GSM", fit: "Boxy drop-shoulder", finish: "Thick ribbed collar" }
  },
  {
    name: "GENRAGE GREY ART BAGGY TRACK PANTS",
    price: "₹2,999",
    raw_price: 2999,
    category: "pants",
    src: "https://genrage.com/cdn/shop/files/basic-grey-baggy-pants-genrage-1.png?v=1780668495&width=1000",
    description: "Ultra-baggy straight-fit track pants in melange grey. Completed with adjustable metal toggle drawstrings, deep side pockets, and signature embroidered logo on left pocket. Designed for fluid movement.",
    details: ["80% Cotton, 20% Polyester fleece", "380 GSM Heavyweight fabric", "Baggy straight-fit pattern", "Embroidered brand detailing"],
    stock: 3,
    spec: { fabric: "80% Cotton, 20% Polyester fleece", gsm: "380 GSM", fit: "Baggy straight-fit pattern", finish: "Metal toggle drawstrings" }
  },
  {
    name: "GENRAGE BLACK SLEEVELESS HOODIE",
    price: "₹1,999",
    raw_price: 1999,
    category: "hoodies",
    src: "https://genrage.com/cdn/shop/files/gaze-black-boxy-sleeveless-hoodie-genrage-1.png?v=1779977481&width=1000",
    description: "Boxy sleeveless crop hoodie with a double-lined hood and raw edge armholes. The absolute core layering utility piece for high-impact streetwear aesthetics.",
    details: ["100% Organic Loopback Cotton", "320 GSM Midweight fabric", "Double layered structured hood", "Raw cut armholes"],
    stock: 5,
    spec: { fabric: "Organic Loopback Cotton", gsm: "320 GSM", fit: "Sleeveless crop fit", finish: "Raw cut armholes" }
  },
  {
    name: "GENRAGE BLACK BAGGY PANTS",
    price: "₹999",
    raw_price: 999,
    category: "pants",
    src: "https://genrage.com/cdn/shop/files/basic-black-baggy-pants-genrage-1.png?v=1780668291&width=1000",
    description: "High-contrast bold red signature vest. Made from premium elastic cotton rib, featuring an aesthetic racerback cut and signature printed typography along the back collar line.",
    details: ["95% Ribbed Cotton, 5% Elastane", "280 GSM Stretch Fit", "Breathable core layering", "High impact colorway"],
    stock: 12,
    spec: { fabric: "95% Ribbed Cotton, 5% Elastane", gsm: "280 GSM", fit: "Racerback stretch fit", finish: "High impact colorway" }
  },
  {
    name: "GENRAGE DARK GREY BASIC BAGGY PANTS",
    price: "₹1,999",
    raw_price: 1999,
    category: "pants",
    src: "https://genrage.com/cdn/shop/files/dark-grey-basic-baggy-pants-genrage-1.png?v=1780668486&width=1000",
    description: "The definitive GENRAGE heavy oversized hoodie. Featuring double-layered hood without drawstrings, dropped armholes, kangaroo pocket, and rib-knit cuffs and waist hem. The ultimate cozy armor.",
    details: ["100% French Terry Cotton", "420 GSM Heavyweight Armor", "Deep double-lined hood", "Preshrunk for perfect fit"],
    stock: 6,
    spec: { fabric: "French Terry Cotton", gsm: "420 GSM", fit: "Heavy oversized silhouette", finish: "Preshrunk fit" }
  },
  {
    name: "VAMP CORDUROY FULL SLEEVES T SHIRT",
    price: "₹2,499",
    raw_price: 2499,
    category: "t-shirts",
    src: "https://genrage.com/cdn/shop/files/vamp-corduroy-full-sleeves-t-shirt-genrage-1.png?v=1779977953&width=1080",
    description: "Heavyweight full-zip hoodie featuring custom cybernetic screenprint designs, custom metal zipper, double-lined hood, and deep utility pockets.",
    details: ["100% Cotton Fleece", "400 GSM Ultra-heavyweight", "Full zipper closure", "Cyber graphic details"],
    stock: 3,
    spec: { fabric: "Cotton Fleece", gsm: "400 GSM", fit: "Boxy unisex fit", finish: "Custom screenprint" }
  },
  {
    name: "WHITE PHENOM WOMEN'S LONG SLEEVE BABY TEE",
    price: "₹1,199",
    raw_price: 1199,
    category: "t-shirts",
    src: "https://genrage.com/cdn/shop/files/white-phenom-women-s-long-sleeve-baby-tee-genrage-2.png?v=1780118543&width=1000",
    description: "Minimalist urban utility vest with side slits and raw sleeve holes. Made from durable bio-washed cotton, designed as a premium foundational layering piece.",
    details: ["100% Combed Cotton", "320 GSM Heavy Rib", "Slightly cropped fit", "High durability stitch lines"],
    stock: 9,
    spec: { fabric: "Combed Cotton", gsm: "320 GSM", fit: "Slightly cropped fit", finish: "Bio-washed rib" }
  },
  {
    name: "MINI-MUTATION UNISEX BLACK SHORTS",
    price: "₹1,299",
    raw_price: 1299,
    category: "shorts",
    src: "https://genrage.com/cdn/shop/files/mini-mutation-unisex-black-shorts-genrage-1.png?v=1779978077&width=1000",
    description: "Deep charcoal heavy ribbed tactical vest. Featuring reinforced neck bindings, unrefined bottom hem line, and signature metal hardware rivet details.",
    details: ["98% Cotton, 2% Elastane", "340 GSM Midweight Rib", "Regular crop length", "Hardware rivet detailing"],
    stock: 5,
    spec: { fabric: "98% Cotton, 2% Elastane", gsm: "340 GSM", fit: "Regular crop length", finish: "Hardware rivet detailing" }
  },
  {
    name: "RAKSHAK GREY UNISEX BOXY VEST",
    price: "₹2,799",
    raw_price: 2799,
    category: "vests",
    src: "https://genrage.com/cdn/shop/files/rakshak-grey-unisex-boxy-vest-genrage-1.png?v=1779977387&width=1000",
    description: "Multi-panel box-cut baggy sweatpants. Feature deep zippered cargo pockets, adjustable drawstrings at cuff hem, and heavy structural panels for architectural shape.",
    details: ["100% Organic Cotton Terry", "390 GSM Structure", "Ultra-baggy shape", "Zippered cargo pockets"],
    stock: 4,
    spec: { fabric: "Organic Cotton Terry", gsm: "390 GSM", fit: "Ultra-baggy silhouette", finish: "Multi-panel layout" }
  },
  {
    name: "BLACK MAHORAGA UNISEX OVERSIZED TSHIRT",
    price: "₹2,899",
    raw_price: 2899,
    category: "t-shirts",
    src: "https://genrage.com/cdn/shop/files/mahoraga-black-tshirt-genrage-2.png?v=1780669117&width=1080",
    description: "Fluid-draping straight baggy pants. Equipped with heavy elastic waistband, inner drawstrings, and minimal branding. Extremely versatile for loungewear or outdoor exploration.",
    details: ["75% Cotton, 25% Polyester", "360 GSM Melange Fleece", "Straight wide leg drape", "Invisible zip side pockets"],
    stock: 7,
    spec: { fabric: "75% Cotton, 25% Polyester", gsm: "360 GSM", fit: "Straight wide leg drape", finish: "Invisible zipper pockets" }
  },
  {
    name: "CRUEL GREY BAGGY PANTS",
    price: "₹2,899",
    raw_price: 2899,
    category: "pants",
    src: "https://genrage.com/cdn/shop/files/strix-dark-grey-baggy-pants-genrage-1.png?v=1780669007&width=1080",
    description: "Concrete grey heavy-washed baggy pants. Designed with dual rear pockets, heavy-duty belt loops, and customized industrial print.",
    details: ["100% Organic Cotton Fleece", "380 GSM Cement wash", "Extreme oversized fit", "Belt loop structures"],
    stock: 3,
    spec: { fabric: "Organic Cotton Fleece", gsm: "380 GSM", fit: "Extreme oversized fit", finish: "Cement wash dye" }
  },
  {
    name: "BAGGY JEANS",
    price: "₹1,499",
    raw_price: 1499,
    category: "pants",
    src: "https://genrage.com/cdn/shop/files/smoke-grey-washed-baggy-bootcut-jeans-genrage-1.png?v=1780118813&width=3712",
    description: "Heavy-fleece baggy shorts featuring raw edge bottom hem, thick dynamic drawstring cords, and deep mesh pocket linings.",
    details: ["100% French Terry Cotton", "340 GSM Comfort Build", "Relaxed boxy cut", "Raw cut bottom hem"],
    stock: 11,
    spec: { fabric: "French Terry Cotton", gsm: "340 GSM", fit: "Relaxed boxy cut shorts", finish: "Raw edge hem" }
  },
  {
    name: "GENRAGE BLACK BALLOON PANTS",
    price: "₹1,399",
    raw_price: 1399,
    category: "pants",
    src: "https://genrage.com/cdn/shop/files/genrage-black-balloon-pants-genrage-1.png?v=1780668338&width=1000",
    description: "Minimalist athletic sweatshorts with subtle side branding print. Ideal for layering over thermal skins or wearing solo.",
    details: ["90% Cotton, 10% Poly blend", "320 GSM Active Terry", "Classic mid-thigh length", "Screen printed design details"],
    stock: 14,
    spec: { fabric: "90% Cotton, 10% Polyester", gsm: "320 GSM", fit: "Mid-thigh athletic profile", finish: "Side branding print" }
  },
  {
    name: "LEATHER DUFFLE BAG",
    price: "₹1,699",
    raw_price: 1699,
    category: "bags",
    src: "https://genrage.com/cdn/shop/files/leather-duffle-bag-genrage-1.png?v=1779977510&width=1000",
    description: "Heavy-wash black denim-like sweat jorts. Offer the style of denim shorts with the extreme comfort of loopback terry fabric.",
    details: ["100% Combed Cotton Terry", "360 GSM Knit Denim", "Ultra relaxed knee-length fit", "Faux fly front seam detail"],
    stock: 5,
    spec: { fabric: "Combed Cotton Terry", gsm: "360 GSM", fit: "Knee-length relaxed fit", finish: "Knit denim dye wash" }
  },
  {
    name: "LEATHER BACKPACK",
    price: "₹1,249",
    raw_price: 1249,
    category: "bags",
    src: "https://genrage.com/cdn/shop/files/leather-bagpack-genrage-1.png?v=1779977794&width=1000",
    description: "Raw-cut racerback vest with an asymmetric back panel detail. Heavy drop texture cotton, highly breathable and durable.",
    details: ["100% Fine Ribbed Cotton", "300 GSM Heavy Rib", "Asymmetric panel lines", "Frayed bottom hem styling"],
    stock: 8,
    spec: { fabric: "Fine Ribbed Cotton", gsm: "300 GSM", fit: "Asymmetric racerback fit", finish: "Frayed bottom hem" }
  },
  {
    name: "GENRAGE PENDANT CHAIN",
    price: "₹1,299",
    raw_price: 1299,
    category: "chains",
    src: "https://genrage.com/cdn/shop/files/genrage-pendant-chain-genrage.png?v=1779977608&width=1000",
    description: "Utility shorts with modular straps and mesh overlay detail. Perfect for tactical technical wear styles.",
    details: ["100% Ripstop Nylon/Cotton blend", "280 GSM Tech shell", "Modular strap lines", "D-ring hardware attachments"],
    stock: 4,
    spec: { fabric: "Ripstop Nylon/Cotton blend", gsm: "280 GSM", fit: "Modular tactical utility", finish: "D-ring adjustments" }
  },
  {
    name: "SWORD CHARM PENDANT CHAIN",
    price: "₹2,999",
    raw_price: 2999,
    category: "chains",
    src: "https://genrage.com/cdn/shop/files/sword-charm-pendant-genrage.png?v=1779978098&width=1000",
    description: "Heavy canvas straight fit baggy track pants with distressed double knee details and contrast sewing lines.",
    details: ["100% Heavy Cotton Canvas", "400 GSM Rough Build", "Wide straight leg profile", "Contrast double stitch seams"],
    stock: 2,
    spec: { fabric: "Heavy Cotton Canvas", gsm: "400 GSM", fit: "Wide straight leg profile", finish: "Contrast double stitching" }
  }
];

async function seed() {
  console.log("Deleting old products...");
  const { error: delError } = await supabase.from('products').delete().neq('id', -1);
  if (delError) {
    console.error("Error deleting:", delError);
  }
  
  console.log("Inserting 18 products...");
  const { data, error } = await supabase.from('products').insert(allProducts);
  
  if (error) {
    console.error("Error inserting products:", error);
  } else {
    console.log("Products successfully inserted!");
  }
}

seed();
