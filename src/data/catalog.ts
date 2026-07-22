import { Product, StoreSettings, CategoryMeta } from '../types';

export const categoryMeta: CategoryMeta[] = [
  { key: 'all', label: 'All Products', icon: 'LayoutGrid' },
  { key: 'food cupboard', label: 'Food Cupboard', icon: 'Boxes' },
  { key: 'fresh food', label: 'Fresh Food', icon: 'Carrot' },
  { key: 'beverages', label: 'Beverages', icon: 'Coffee' },
  { key: 'baby & kids', label: 'Baby & Kids', icon: 'Baby' },
  { key: 'electronics', label: 'Electricals & Batteries', icon: 'Plug' },
  { key: 'cleaning', label: 'Cleaning & Home Care', icon: 'Sparkles' },
  { key: 'beauty', label: 'Beauty & Personal Care', icon: 'Sparkles' },
  { key: 'liquor', label: 'Liquor & Cellar', icon: 'Wine', gated: true },
  { key: 'stationery', label: 'Stationery & School', icon: 'Pencil' },
  { key: 'pet', label: 'Pet Supplies', icon: 'PawPrint' },
  { key: 'hardware', label: 'Hardware & DIY', icon: 'Wrench' },
  { key: 'furniture', label: 'Home Decor & Linen', icon: 'Armchair' },
  { key: 'health', label: 'Health & Wellness', icon: 'HeartPulse' },
  { key: 'apparel', label: 'Everyday Wear & Basics', icon: 'Shirt' },
  { key: 'sports', label: 'Fitness & Travel Essentials', icon: 'Trophy' },
  { key: 'books', label: 'Books, Planners & Diaries', icon: 'BookOpen' }
];

export const defaultSettings: StoreSettings = {
  storeName: 'Kipchimatt Supermarket',
  storePhone: '+254 111 184 200',
  storeEmail: 'hello@kipchimatt.co.ke',
  freeDeliveryThreshold: 2000,
  deliveryFee: 99,
  lowStockThreshold: 15,
  seasonalThemeEnabled: true
};

export const defaultProducts: Product[] = [
  // FOOD CUPBOARD
  { 
    id: 1, 
    name: 'Dola Premium Maize Flour 2kg', 
    brand: 'Dola', 
    category: 'food cupboard', 
    price: 189, 
    originalPrice: 230, 
    stock: 150, 
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    description: 'Dola Premium Maize Flour is finely milled from selected white corn under strict quality checks. It is ideal for cooking soft, fluffy and extremely nutritious Ugali—Kenya\'s national favorite staple. Packed with essential iron, zinc, and vitamins.',
    rating: 4.9,
    ratingCount: 142,
    specifications: {
      'Net Weight': '2 Kilograms (2kg)',
      'Grain Type': 'Premium White Maize',
      'Fortification': 'Iron, Zinc, Vitamin A, B1, B2, B3, B6, B12',
      'Origin': 'Milled in Eldoret, Kenya',
      'Shelf Life': '6 Months'
    },
    reviews: [
      { id: 'r1', userName: 'Mercy Achieng', rating: 5, comment: 'The softest Ugali I have ever cooked! Dola is my forever brand.', date: '2026-06-25T14:30:00.000Z' },
      { id: 'r2', userName: 'Kipkorir J.', rating: 5, comment: 'Clean, beautiful packaging, and super fast delivery from Kipchimatt.', date: '2026-06-28T09:15:00.000Z' }
    ]
  },
  { 
    id: 2, 
    name: 'Jogoo Maize Meal 2kg', 
    brand: 'Jogoo', 
    category: 'food cupboard', 
    price: 175, 
    originalPrice: 210, 
    stock: 120, 
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    description: 'Jogoo Maize Meal has been Kenya\'s trusted choice for generations. It offers excellent texture and traditional flavor for a heavy, satisfying Ugali meal. Fortified for healthy, active families.',
    rating: 4.7,
    ratingCount: 98,
    specifications: {
      'Net Weight': '2 Kilograms (2kg)',
      'Grain Type': 'Sifted Maize',
      'Manufacturer': 'Ungu Group Ltd',
      'Origin': 'Nairobi, Kenya',
      'Fortified': 'Yes'
    },
    reviews: [
      { id: 'r3', userName: 'Peter Kamau', rating: 5, comment: 'Jogoo is class. Heavy and traditional ugali.', date: '2026-06-15T18:45:00.000Z' }
    ]
  },
  { 
    id: 3, 
    name: 'Sunrice Basmati Rice 1kg', 
    brand: 'Sunrice', 
    category: 'food cupboard', 
    price: 289, 
    originalPrice: 350, 
    stock: 80, 
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    description: 'Sunrice Pure Basmati Rice features extra-long, slender grains that elongate to twice their size when cooked. Characterized by an exquisite aroma and non-sticky texture, it is perfect for Biryani, Pilau, and plain rice delicacies.',
    rating: 4.8,
    ratingCount: 76,
    specifications: {
      'Net Weight': '1 Kilogram',
      'Rice Type': 'Pure Basmati Rice',
      'Grain Length': 'Exceeds 8.2 mm',
      'Aroma': 'Rich Natural Pandan Aroma',
      'Origin': 'Imported from Punjab Plains'
    },
    reviews: [
      { id: 'r4', userName: 'Fatuma Hassan', rating: 5, comment: 'Perfect aroma. Excellent length for making luxury pilau!', date: '2026-06-20T11:20:00.000Z' }
    ]
  },
  { 
    id: 4, 
    name: 'Nescafe Classic Instant Coffee 100g', 
    brand: 'Nescafe', 
    category: 'food cupboard', 
    price: 349, 
    originalPrice: 420, 
    stock: 60, 
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    description: 'Start your Kenyan mornings with the bold, rich aroma of Nescafe Classic. Made from 100% pure Robusta and Arabica coffee beans, carefully roasted to release dark, premium coffee notes.',
    rating: 4.6,
    ratingCount: 110,
    specifications: {
      'Net Weight': '100g Glass Jar',
      'Coffee Type': '100% Soluble Coffee Granules',
      'Roast Level': 'Medium-Dark Roast',
      'Manufacturer': 'Nestle SA',
      'Servings': 'Approx 50 cups'
    }
  },
  { 
    id: 5, 
    name: 'Royco Mchuzi Mix Beef 500g', 
    brand: 'Royco', 
    category: 'food cupboard', 
    price: 129, 
    originalPrice: 165, 
    stock: 200, 
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400&h=400&fit=crop',
    description: 'Royco Mchuzi Mix Beef is an all-in-one culinary helper containing natural spices like garlic, coriander, turmeric, and cumin. It thickens your stews, darkens the gravy, and adds an irresistible meaty aroma and flavor.',
    rating: 4.8,
    ratingCount: 190,
    specifications: {
      'Net Weight': '500 Grams Tub',
      'Flavor Profile': 'Classic Beef Stew',
      'Ingredients': 'Salt, Cornstarch, Coriander, Metanil Yellow, Turmeric, Cumin',
      'Origin': 'Unilever Kenya Ltd'
    }
  },
  { 
    id: 6, 
    name: 'Kingsmill Fresh White Bread 400g', 
    brand: 'Kingsmill', 
    category: 'food cupboard', 
    price: 65, 
    originalPrice: 80, 
    stock: 90, 
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    description: 'Baked fresh daily at dawn and delivered immediately to Kipchimatt aisles. Kingsmill Toasting Bread is incredibly soft, with perfectly sliced square margins ready for buttering or making breakfast sandwiches.',
    rating: 4.5,
    ratingCount: 44,
    specifications: {
      'Weight': '400g Sliced',
      'Type': 'White Toasting Bread',
      'Allergy Warning': 'Contains Wheat Gluten',
      'Daily Freshness': 'Baked daily at 3:00 AM'
    }
  },
  { 
    id: 7, 
    name: 'Indomie Instant Chicken Noodles 5-pack', 
    brand: 'Indomie', 
    category: 'food cupboard', 
    price: 149, 
    originalPrice: 195, 
    stock: 250, 
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=400&fit=crop',
    description: 'The ultimate quick-fix snack loved by students and kids alike. Indomie Chicken Noodles are savory, flavorful, and incredibly easy to cook. Contains aromatic seasoning oil and chili powder.',
    rating: 4.8,
    ratingCount: 310,
    specifications: {
      'Pack Size': '5 Packs x 70g each',
      'Flavor': 'Signature Chicken Stew',
      'Cook Time': '3 Minutes'
    }
  },
  { 
    id: 8, 
    name: 'Blue Band Margarine Medium 250g', 
    brand: 'Blue Band', 
    category: 'food cupboard', 
    price: 95, 
    originalPrice: 120, 
    stock: 110, 
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop',
    description: 'Blue Band Fat Spread is enriched with 7 essential vitamins (A, B1, B2, B6, B12, D, E) and Omega 3 & 6. It spreads perfectly on hot fresh bread, melts wonderfully over Ugali or rice, and enhances baking.',
    rating: 4.9,
    ratingCount: 165,
    specifications: {
      'Weight': '250 Grams Tub',
      'Nutritional Values': 'Omega 3, Omega 6, 7 Vitamins',
      'Storage': 'Store in cool place, refrigerator optional'
    }
  },
  { 
    id: 9, 
    name: 'Kimbo Premium Cooking Fat 500g', 
    brand: 'Kimbo', 
    category: 'food cupboard', 
    price: 179, 
    originalPrice: 220, 
    stock: 75, 
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
    description: 'Kimbo has been the standard of frying fat in Kenya since 1954. Made from pure vegetable oil, it is perfect for deep-frying soft, golden Mandazi, Chapati, and crispy chips without flavor transfers.',
    rating: 4.7,
    ratingCount: 63
  },
  { 
    id: 10, 
    name: 'Ketepa Premium Tea Bags 100pc', 
    brand: 'Ketepa', 
    category: 'food cupboard', 
    price: 159, 
    originalPrice: 199, 
    stock: 130, 
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&h=400&fit=crop',
    description: 'Handpicked from the lush green hills of Kericho, Kenya. Ketepa Tea Bags contain high-quality CTC black tea dust. Releases a rich, deep amber color and robust, soothing taste in seconds.',
    rating: 4.9,
    ratingCount: 140,
    specifications: {
      'Count': '100 Tagless Tea Bags',
      'Tea Type': 'Pure CTC Black Tea dust',
      'Origin': 'Kericho Highlands, Kenya',
      'Manufacturer': 'Kenya Tea Packers Ltd'
    }
  },
  {
    id: 151,
    name: 'Kipchimatt Choice Chocolate Chip Cookies 250g',
    brand: 'Kipchimatt Choice',
    category: 'food cupboard',
    price: 145,
    originalPrice: 185,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop',
    description: 'Freshly baked and incredibly crunchy. Kipchimatt Choice Chocolate Chip Cookies are packed with premium, melted dark chocolate chips in every bite. Made with pure butter and real cane sugar for the ultimate teatime snack.',
    rating: 4.9,
    ratingCount: 158,
    specifications: {
      'Net Weight': '250 Grams',
      'Flavor': 'Double Chocolate Chip',
      'Allergens': 'Contains Wheat, Milk, Soy, Eggs',
      'Type': 'Crispy Baked Cookies',
      'Shelf Life': '4 Months'
    },
    reviews: [
      { id: 'rc1', userName: 'Faith Cherotich', rating: 5, comment: 'These are the best chocolate chip cookies ever! So rich in chocolate chips.', date: '2026-07-02T10:30:00.000Z' }
    ]
  },
  {
    id: 152,
    name: 'Nuvita Sweet Digestive Biscuits 400g',
    brand: 'Nuvita',
    category: 'food cupboard',
    price: 180,
    originalPrice: 220,
    stock: 95,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=400&fit=crop',
    description: 'Nuvita Digestive Biscuits are high-fiber wheat biscuits that support good digestion. Crisp, lightly sweetened, and absolutely perfect for pairing with your morning cup of Ketepa tea.',
    rating: 4.7,
    ratingCount: 88,
    specifications: {
      'Net Weight': '400 Grams',
      'Type': 'Digestive Whole Wheat Biscuits',
      'Fiber Content': 'High Fiber',
      'Manufacturer': 'Mzuri Sweets Ltd',
      'Origin': 'Kenya'
    }
  },
  {
    id: 153,
    name: 'House of Manji Ginger Snaps 150g',
    brand: 'House of Manji',
    category: 'food cupboard',
    price: 95,
    originalPrice: 115,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1600431521340-491ecd880be2?w=400&h=400&fit=crop',
    description: 'The legendary ginger biscuit in Kenya! House of Manji Ginger Snaps offer a delightful fiery kick of real natural ginger, combined with a sweet golden crunch. A traditional favorite for decades.',
    rating: 4.8,
    ratingCount: 204,
    specifications: {
      'Net Weight': '150 Grams',
      'Flavor': 'Spicy Ginger & Molasses',
      'Manufacturer': 'House of Manji Ltd',
      'Texture': 'Firm & Extra Crunchy'
    }
  },
  {
    id: 154,
    name: 'Kipchimatt Luxury Fresh Butter Cookies 300g',
    brand: 'Kipchimatt Choice',
    category: 'food cupboard',
    price: 210,
    originalPrice: 260,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1558961309-dbdf71799f5a?w=400&h=400&fit=crop',
    description: 'Decadent, melt-in-your-mouth premium cookies baked with high-grade Danish butter. These luxury cookies have a delicate texture and rich aroma, packed in a beautiful re-sealable container to lock in freshness.',
    rating: 4.9,
    ratingCount: 74,
    specifications: {
      'Net Weight': '300 Grams',
      'Butter Content': '18% Real Butter',
      'Flavor': 'Sweet Cream Butter',
      'Type': 'Shortbread-style Luxury Cookie'
    }
  },

  // FRESH FOOD
  { 
    id: 11, 
    name: 'Fresh Cavendish Bananas Bunch (1kg)', 
    brand: 'Farm Fresh', 
    category: 'fresh food', 
    price: 89, 
    originalPrice: 120, 
    stock: 50, 
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
    description: 'Sweet, energy-packed ripe bananas sourced from local farmers in Meru and Kisii. Picked at optimal maturity and delivered fresh daily. Perfect for healthy breakfast smoothies, kid meals, or quick snacking.',
    rating: 4.6,
    ratingCount: 45,
    specifications: {
      'Weight': 'Approx 1 Kilogram',
      'Type': 'Cavendish Sweet Banana',
      'Ripeness': 'Ripe, Ready to eat'
    }
  },
  { 
    id: 12, 
    name: 'Juicy Organic Tomatoes 500g', 
    brand: 'Farm Fresh', 
    category: 'fresh food', 
    price: 75, 
    originalPrice: 110, 
    stock: 60, 
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop',
    description: 'Sun-ripened, firm tomatoes grown organically on open fields. Rich in Lycopene and packed with sweet-tart juice. Ideal for preparing flavorful Kenyan tomato bases (Kachumbari) or stews.',
    rating: 4.5,
    ratingCount: 38
  },
  { 
    id: 13, 
    name: 'Fresh Farm Spinach Bunch', 
    brand: 'Farm Fresh', 
    category: 'fresh food', 
    price: 45, 
    originalPrice: 65, 
    stock: 40, 
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
    description: 'Crisp green spinach leaves packed with iron and minerals. Harvested in the morning, washed in pure water, and tied in a generous bunch. A healthy side addition to Ugali and beef stew.',
    rating: 4.7,
    ratingCount: 29
  },
  { 
    id: 14, 
    name: 'Red Onions Large 1kg', 
    brand: 'Farm Fresh', 
    category: 'fresh food', 
    price: 69, 
    originalPrice: 95, 
    stock: 70, 
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop',
    description: 'Strong, flavorful red onions sourced from irrigation farms in Kajiado. Firm texture, purple-red outer skin, and a spicy kick. Excellent shelf life when stored in a ventilated pantry.',
    rating: 4.4,
    ratingCount: 55
  },
  { 
    id: 15, 
    name: 'Brookside Fresh Milk 500ml Pack', 
    brand: 'Brookside', 
    category: 'fresh food', 
    price: 55, 
    originalPrice: 70, 
    stock: 100, 
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
    description: 'Brookside pasteurized whole milk is smooth, creamy, and sourced from dairy farmers across Rift Valley. Perfect for hot tea, cereal, or drinking cold. Kept under cold chain storage.',
    rating: 4.9,
    ratingCount: 220
  },
  { 
    id: 16, 
    name: 'Fresh Kenchic Eggs Tray (30pcs)', 
    brand: 'Kenchic', 
    category: 'fresh food', 
    price: 450, 
    originalPrice: 550, 
    stock: 30, 
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
    description: 'Freshly laid, farm-grade eggs with sturdy brown shells and rich golden yolks. Sorted and packed securely into a sturdy 30-egg pulp tray. High in protein and excellent for baking or breakfast fries.',
    rating: 4.8,
    ratingCount: 105,
    specifications: {
      'Quantity': '30 Eggs Tray',
      'Shell Color': 'Natural Brown',
      'Type': 'Layer Eggs',
      'Grade': 'A Large'
    }
  },
  { 
    id: 17, 
    name: 'Kenchic Fresh Whole Chicken 1.2kg', 
    brand: 'Kenchic', 
    category: 'fresh food', 
    price: 599, 
    originalPrice: 750, 
    stock: 25, 
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=400&fit=crop',
    description: 'The national standard for fresh poultry. Kenchic whole chicken is premium grade, tender, pre-plucked, and fully cleaned. Ready for roasting, boiling (Kienyeji style) or currying.',
    rating: 4.9,
    ratingCount: 88
  },
  { 
    id: 18, 
    name: 'Beef Steak Prime Boneless 500g', 
    brand: 'Prime Cuts', 
    category: 'fresh food', 
    price: 450, 
    originalPrice: 580, 
    stock: 20, 
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1fc1959?w=400&h=400&fit=crop',
    description: 'Finely trimmed, lean boneless beef steak sliced from premium local steers. Hand-cut by our master butchers at Kipchimatt. Rich, tender, and ideal for stir-fries, stews, or barbeque skewers.',
    rating: 4.7,
    ratingCount: 47,
    specifications: {
      'Weight': '500g Net',
      'Type': 'Beef Steak',
      'Bone': 'Boneless',
      'Halaal Certified': 'Yes'
    }
  },

  // BEVERAGES
  { 
    id: 21, 
    name: 'Coca-Cola Original Taste 2L', 
    brand: 'Coca-Cola', 
    category: 'beverages', 
    price: 165, 
    originalPrice: 210, 
    stock: 100, 
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop',
    description: 'The world\'s favorite sparkling soft drink. Coca-Cola Original Taste delivers a crisp, refreshing, bubbly flavor that is best enjoyed ice-cold. Perfect for gatherings, parties, and family dinners.',
    rating: 4.8,
    ratingCount: 150
  },
  { 
    id: 24, 
    name: 'Minute Maid Mango Fruit Juice 1L', 
    brand: 'Minute Maid', 
    category: 'beverages', 
    price: 110, 
    originalPrice: 145, 
    stock: 70, 
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop',
    description: 'Packed with the lush, tropical sweetness of real mangoes. Minute Maid Mango is smooth, satisfying, and fortified with Vitamin C. Contains real fruit pulp for a thicker, natural texture.',
    rating: 4.6,
    ratingCount: 82
  },
  { 
    id: 25, 
    name: 'Red Bull Energy Drink 250ml Can', 
    brand: 'Red Bull', 
    category: 'beverages', 
    price: 220, 
    originalPrice: 280, 
    stock: 60, 
    image: 'https://images.unsplash.com/photo-1570527140771-020891229bb4?w=400&h=400&fit=crop',
    description: 'Red Bull Energy Drink is a functional beverage that vitalizes body and mind. Contains high-quality caffeine, taurine, B-group vitamins, and real sugars. Perfect for long drives, intense study, or peak workouts.',
    rating: 4.7,
    ratingCount: 94
  },
  {
    id: 26,
    name: 'Keringet Natural Mineral Water 1.5L',
    brand: 'Keringet',
    category: 'beverages',
    price: 85,
    originalPrice: 110,
    stock: 180,
    image: 'https://images.unsplash.com/photo-1550574358-85940adc4120?w=400&h=400&fit=crop',
    description: 'Pure, crisp natural mineral water bottled at the source in the Kenyan highlands. High in beneficial minerals and perfect for hydration throughout the day.',
    rating: 4.9,
    ratingCount: 124
  },
  {
    id: 27,
    name: 'Del Monte Passion Fruit Juice 1L',
    brand: 'Del Monte',
    category: 'beverages',
    price: 220,
    originalPrice: 260,
    stock: 95,
    image: 'https://images.unsplash.com/photo-1546173159-31980b358f68?w=400&h=400&fit=crop',
    description: 'Deliciously tangy and refreshing premium passion fruit juice. Packed with real juice, Vitamin C, and natural fruit flavor, perfect for family breakfasts.',
    rating: 4.8,
    ratingCount: 75
  },

  // BABY & KIDS
  { 
    id: 31, 
    name: 'Pampers Baby Dry Diapers Size 4 (52pcs)', 
    brand: 'Pampers', 
    category: 'baby & kids', 
    price: 1299, 
    originalPrice: 1599, 
    stock: 45, 
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    description: 'Pampers Baby Dry diapers feature 3 extra absorbency channels that distribute wetness evenly for up to 12 hours of dry comfort. Features stretchy side cuffs and a breathable backsheet to prevent baby rashes.',
    rating: 4.9,
    ratingCount: 160,
    specifications: {
      'Size': 'Size 4 (Maxi)',
      'Baby Weight': '9 - 14 kg',
      'Quantity': '52 Disposable Diapers',
      'Absorbency Duration': 'Up to 12 Hours'
    }
  },
  { 
    id: 34, 
    name: 'Cerelac Wheat & Milk Baby Cereal 400g', 
    brand: 'Nestle', 
    category: 'baby & kids', 
    price: 399, 
    originalPrice: 499, 
    stock: 50, 
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
    description: 'Nestle Cerelac Wheat & Milk is a highly nutritious, easily digestible instant baby porridge. Infused with Iron, Zinc, Vitamin C, and Calcium. Crafted to support physical growth and cognitive brain development in growing toddlers.',
    rating: 4.8,
    ratingCount: 112,
    specifications: {
      'Net Weight': '400 Grams',
      'Age Bracket': '6 Months to 24 Months',
      'Allergen Info': 'Contains Milk, Wheat Gluten',
      'Nutrients': 'Iron + Zinc + Calcium'
    }
  },
  {
    id: 35,
    name: "Johnson's Gentle Baby Powder 200g",
    brand: "Johnson's",
    category: 'baby & kids',
    price: 295,
    originalPrice: 350,
    stock: 65,
    image: 'https://images.unsplash.com/photo-1626248801379-51a070825f90?w=400&h=400&fit=crop',
    description: 'Johnson\'s Baby Powder gently absorbs excess moisture to keep baby\'s skin comfortable, dry, and feeling soft all day. Specially designed with a classic clean scent.',
    rating: 4.7,
    ratingCount: 55
  },
  {
    id: 36,
    name: 'Huggies Pure Baby Wipes (56-pack)',
    brand: 'Huggies',
    category: 'baby & kids',
    price: 180,
    originalPrice: 240,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=400&h=400&fit=crop',
    description: 'Formulated with 99% pure water and completely fragrance-free, Huggies Pure Wipes are safe and gentle for newborn baby skin. Prevents redness and rashes.',
    rating: 4.8,
    ratingCount: 89
  },

  // ELECTRONICS (HOUSEHOLD UTILITY ELECTRICALS)
  { 
    id: 39, 
    name: 'Philips E27 LED Cool White Lightbulb 12W', 
    brand: 'Philips', 
    category: 'electronics', 
    price: 150, 
    originalPrice: 200, 
    stock: 140, 
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop',
    description: 'Energy-saving LED bulb with a standard E27 screw base, providing bright cool white light. Lasts up to 15,000 hours, making it an essential household replacement staple.',
    rating: 4.8,
    ratingCount: 92,
    specifications: {
      'Cap Base': 'E27 Screw',
      'Wattage': '12 Watts',
      'Lifespan': '15,000 Hours',
      'Luminous Flux': '1050 Lumens',
      'Color Temp': '6500K Cool White'
    }
  },
  { 
    id: 40, 
    name: 'Mika Fast-Boil Electric Kettle 1.8L', 
    brand: 'Mika', 
    category: 'electronics', 
    price: 1899, 
    originalPrice: 2499, 
    stock: 25, 
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=400&fit=crop',
    description: 'Boil water in under 2 minutes. The Mika Stainless Steel Kettle features double-wall insulation, automatic safety shutoff, and a cool-touch exterior handle. Perfect for making Kericho tea or quick cooking prep.',
    rating: 4.6,
    ratingCount: 52
  },
  { 
    id: 41, 
    name: 'Mika Premium Non-Stick Dry Iron 1000W', 
    brand: 'Mika', 
    category: 'electronics', 
    price: 1450, 
    originalPrice: 1950, 
    stock: 45, 
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400&h=400&fit=crop',
    description: 'A lightweight, durable dry iron box featuring a high-quality non-stick soleplate and adjustable thermostatic temperature dials. Keeps everyday work and school clothes perfectly pressed.',
    rating: 4.7,
    ratingCount: 38,
    specifications: {
      'Type': 'Dry Iron Box',
      'Power': '1000 Watts',
      'Soleplate': 'Non-stick Coated',
      'Safety Indicator': 'Thermal Overheat Protection',
      'Warranty': '1 Year'
    }
  },
  { 
    id: 43, 
    name: 'Duracell Coppertop AA Batteries (4-Pack)', 
    brand: 'Duracell', 
    category: 'electronics', 
    price: 250, 
    originalPrice: 320, 
    stock: 160, 
    image: 'https://images.unsplash.com/photo-1532443025530-979f4f46bc0b?w=400&h=400&fit=crop',
    description: 'Long-lasting, leak-proof AA alkaline batteries designed for everyday home devices. Ideal for television remotes, wall clocks, children\'s toys, and torches.',
    rating: 4.9,
    ratingCount: 175,
    specifications: {
      'Battery Type': 'AA Alkaline',
      'Voltage': '1.5V',
      'Pack Size': '4 Batteries',
      'Storage Life': 'Up to 10 Years'
    }
  },
  {
    id: 44,
    name: 'Premium 4-Way Extension Socket with Surge Protector',
    brand: 'Premium',
    category: 'electronics',
    price: 850,
    originalPrice: 1100,
    stock: 55,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop',
    description: 'Heavy-duty 4-way extension power strip with shuttered universal outlets, individual neon switches, and built-in surge/spike overload protectors.',
    rating: 4.8,
    ratingCount: 61,
    specifications: {
      'Outlets': '4 Universal sockets',
      'Cable Length': '1.5 Meters',
      'Safety': 'Surge Defense & Overload Breaker',
      'Power Rating': '2500 Watts Max'
    }
  },

  // CLEANING
  { 
    id: 47, 
    name: 'Omo Active Auto Washing Powder 1kg', 
    brand: 'Omo', 
    category: 'cleaning', 
    price: 249, 
    originalPrice: 320, 
    stock: 100, 
    image: 'https://images.unsplash.com/photo-1583947581924-860b3c3a9e3b?w=400&h=400&fit=crop',
    description: 'Omo Active Auto penetrates deep into fabric fibers to dissolve and lift tough oil and dirt stains instantly. Safe for use in automatic washing machines, leaving clothes brightly clean and freshly scented.',
    rating: 4.9,
    ratingCount: 185
  },

  // BEAUTY
  { 
    id: 53, 
    name: 'Nivea Rich Nourishing Body Lotion 400ml', 
    brand: 'Nivea', 
    category: 'beauty', 
    price: 449, 
    originalPrice: 580, 
    stock: 65, 
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    description: 'Keep your skin deeply hydrated for 48 hours. Formulated with Nivea Deep Moisture Serum, Natural Almond Oil, and Vitamin E to soothe dry skin and restore essential smoothness.',
    rating: 4.8,
    ratingCount: 120
  },

  // LIQUOR
  { 
    id: 59, 
    name: 'Johnnie Walker Black Label Whisky 750ml', 
    brand: 'Johnnie Walker', 
    category: 'liquor', 
    price: 3499, 
    originalPrice: 4299, 
    stock: 25, 
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop',
    description: 'An iconic, award-winning blend of Scotland\'s finest single malt and grain whiskies, aged for at least 12 years. Features deep layers of dark fruits, rich vanilla, and a signature smoky finish. Strictly for ages 18+.',
    rating: 4.9,
    ratingCount: 88,
    specifications: {
      'Volume': '750ml Glass Bottle',
      'Alcohol by Vol': '40% ABV',
      'Country': 'Scotland',
      'Type': 'Blended Scotch Whisky',
      'Ageing': '12 Years Old Minimum'
    }
  },

  // HARDWARE, STATIONERY, FURNITURE, HEALTH, APPAREL, SPORTS, BOOKS
  { 
    id: 63, 
    name: 'BIC Cristal Ballpoint Pens 10pcs Pack', 
    brand: 'BIC', 
    category: 'stationery', 
    price: 89, 
    originalPrice: 120, 
    stock: 200, 
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=400&fit=crop',
    description: 'The world\'s most popular writing pen. BIC Cristal features a durable tungsten carbide ballpoint, delivering exceptionally smooth ink flows for long school essays or office notes. Contains 10 pens.',
    rating: 4.6,
    ratingCount: 140
  },
  {
    id: 91,
    name: 'Kasuku Exercise Book A5 Single Line (120 Pages)',
    brand: 'Kasuku',
    category: 'stationery',
    price: 55,
    originalPrice: 75,
    stock: 350,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop',
    description: 'Kenya\'s most popular student exercise book. Features high-quality white paper, clean printed margins, and a sturdy protective cover sheet. Perfect for primary and secondary schooling.',
    rating: 4.9,
    ratingCount: 215
  },
  {
    id: 92,
    name: 'Helix Oxford Mathematical Instruments Set',
    brand: 'Helix Oxford',
    category: 'stationery',
    price: 450,
    originalPrice: 599,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1452860606245-08befc1ff44d?w=400&h=400&fit=crop',
    description: 'The legendary metal tin containing essential mathematical tools: premium compass, divider, 15cm transparent ruler, protractor, set squares, pencil, eraser, and sharpener.',
    rating: 4.8,
    ratingCount: 94
  },
  { 
    id: 64, 
    name: 'Pedigree Beef & Vegetable Dry Dog Food 2kg', 
    brand: 'Pedigree', 
    category: 'pet', 
    price: 499, 
    originalPrice: 650, 
    stock: 40, 
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop',
    description: 'Ensure your beloved pet stays healthy, active and strong. Pedigree Adult Dog Food is formulated with beef flavor and wholesome grains, boosting your pet\'s digestion, coat glow, and immune system.',
    rating: 4.8,
    ratingCount: 54
  },
  {
    id: 93,
    name: 'Whiskas Chicken Dry Cat Food 1.2kg',
    brand: 'Whiskas',
    category: 'pet',
    price: 620,
    originalPrice: 780,
    stock: 85,
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&h=400&fit=crop',
    description: 'Crunchy dry kibbles filled with essential nutrients, taurine, and proteins to support your feline\'s eyesight, coat shininess, and urinary tract health.',
    rating: 4.9,
    ratingCount: 68
  },
  {
    id: 94,
    name: 'Super Clumping Lavender Scented Cat Litter 5kg',
    brand: 'Happy Pets',
    category: 'pet',
    price: 850,
    originalPrice: 1100,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
    description: 'All-natural bentonite clay cat litter featuring instant clumping, superior odor block, low dust tracking, and a pleasant calming lavender scent.',
    rating: 4.7,
    ratingCount: 39
  },
  { 
    id: 66, 
    name: 'Royal Velvet Cotton Bath Towel Large', 
    brand: 'Royal Comfort', 
    category: 'furniture', 
    price: 850, 
    originalPrice: 1100, 
    stock: 75, 
    image: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=400&h=400&fit=crop',
    description: 'Thick, highly absorbent bath towel woven from 100% carded cotton yarns. Gentle on the skin, fade-resistant, and easily machine-washable.',
    rating: 4.7,
    ratingCount: 45
  },
  {
    id: 95,
    name: 'Kenpoly Heavy Duty Plastic Basin 15L',
    brand: 'Kenpoly',
    category: 'furniture',
    price: 250,
    originalPrice: 350,
    stock: 140,
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=400&fit=crop',
    description: 'The classic Kenpoly utility basin found in every Kenyan home. Moulded from high-grade virgin plastic, featuring dual grip handles. Perfect for laundry, cleaning, or storage.',
    rating: 4.9,
    ratingCount: 182
  },
  {
    id: 96,
    name: 'Super Foam Orthopedic Bed Pillow',
    brand: 'Super Foam',
    category: 'furniture',
    price: 1200,
    originalPrice: 1600,
    stock: 55,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop',
    description: 'Filled with premium memory foam to provide optimal neck support and relieve sleeping pressure. Breathable cotton casing keeps you cool and comfortable.',
    rating: 4.8,
    ratingCount: 72
  },
  {
    id: 101,
    name: 'Tri-Circle Brass Padlock 40mm',
    brand: 'Tri-Circle',
    category: 'hardware',
    price: 220,
    originalPrice: 290,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=400&h=400&fit=crop',
    description: 'Heavy-duty security padlock made from pure solid brass. Features a hardened steel shackle and a double locking mechanism to secure cabinets, gates, and padboxes.',
    rating: 4.8,
    ratingCount: 88,
    specifications: {
      'Size': '40 Millimeters (40mm)',
      'Material': 'Solid Brass Body',
      'Shackle': 'Hardened Steel Shackle',
      'Keys Included': '3 Brass Keys'
    }
  },
  {
    id: 102,
    name: 'Amcos Super Glue 3g (3-Pack)',
    brand: 'Amcos',
    category: 'hardware',
    price: 95,
    originalPrice: 135,
    stock: 250,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=400&fit=crop',
    description: 'Instant cyanoacrylate adhesive bond that repairs plastic, ceramic, wood, rubber, and glass in seconds. A must-have toolbox helper in every household.',
    rating: 4.7,
    ratingCount: 165
  },
  {
    id: 103,
    name: 'PVC Electrical Insulating Tape Black (5-Roll Pack)',
    brand: 'Anchor',
    category: 'hardware',
    price: 180,
    originalPrice: 250,
    stock: 110,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=400&fit=crop',
    description: 'Flexible, self-extinguishing PVC tape for insulating electrical splices, wire bundling, and minor cable repairs. Safe up to 600V.',
    rating: 4.6,
    ratingCount: 52
  },
  {
    id: 104,
    name: 'Professional Claw Hammer with Steel Handle 16oz',
    brand: 'TufTools',
    category: 'hardware',
    price: 750,
    originalPrice: 980,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=400&fit=crop',
    description: 'Heavy-duty forged carbon steel hammer with a curved claw for nail extraction and an anti-vibration rubberized grip. Perfect for home DIY repairs.',
    rating: 4.8,
    ratingCount: 41
  },
  {
    id: 71,
    name: 'Deep Heat Rub Pain Relieving Cream 100g',
    brand: 'Deep Heat',
    category: 'health',
    price: 650,
    originalPrice: 800,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop',
    description: 'Deep Heat Rub is a fast-acting pain-relieving cream that generates soothing warmth to relax sore muscles, ease joint stiffness, and relieve minor sports injuries. Perfect for pre-workout warming and post-activity recovery.',
    rating: 4.8,
    ratingCount: 88
  },
  {
    id: 72,
    name: 'Seven Seas Cod Liver Oil Capsules 100pc',
    brand: 'Seven Seas',
    category: 'health',
    price: 1200,
    originalPrice: 1500,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=400&fit=crop',
    description: 'Enriched with natural Omega-3 fish oil and essential Vitamin D to support joint health, maintain a strong immune system, and promote healthy skin, bones, and teeth. Formulated for everyday wellness.',
    rating: 4.9,
    ratingCount: 110
  },
  {
    id: 105,
    name: 'Dettol Antiseptic Liquid Disinfectant 250ml',
    brand: 'Dettol',
    category: 'health',
    price: 380,
    originalPrice: 480,
    stock: 115,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    description: 'Enriched with standard antiseptic formulation to sanitize skin, clean minor wounds, disinfect baby laundry, and clean household surfaces thoroughly.',
    rating: 4.9,
    ratingCount: 142
  },
  {
    id: 106,
    name: 'Panadol Extra Pain Relief Tablets 20pc',
    brand: 'Panadol',
    category: 'health',
    price: 195,
    originalPrice: 260,
    stock: 220,
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop',
    description: 'Tough on pain, gentle on stomach. Contains paracetamol and caffeine to provide fast and effective relief from headache, toothache, joint pain, and cold symptoms.',
    rating: 4.8,
    ratingCount: 184
  },
  {
    id: 75,
    name: 'Classic Crewneck Cotton White T-Shirt',
    brand: 'Cotton Comfort',
    category: 'apparel',
    price: 599,
    originalPrice: 799,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&h=400&fit=crop',
    description: 'Crafted from 100% premium combed cotton, this classic crewneck t-shirt is ultra-soft, highly breathable, and holds its shape perfectly. Ideal for everyday casual styling or layered warmth.',
    rating: 4.7,
    ratingCount: 42
  },
  {
    id: 107,
    name: 'Premium Cotton Crew Socks (5-pack)',
    brand: 'Cotton Comfort',
    category: 'apparel',
    price: 350,
    originalPrice: 480,
    stock: 90,
    image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=400&h=400&fit=crop',
    description: 'Soft, breathable combed-cotton socks with ribbed elastic cuffs and reinforced heel support. Perfect for everyday wear, exercise, or school uniforms.',
    rating: 4.8,
    ratingCount: 65
  },
  {
    id: 108,
    name: 'Comfort Cushioned Bathroom Slippers',
    brand: 'Comfort Walk',
    category: 'apparel',
    price: 299,
    originalPrice: 399,
    stock: 110,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop',
    description: 'Lightweight EVA slide sandals featuring non-slip ribbed outsoles and a cushioned ergonomic footbed. Ideal for wet bathroom floors or casual indoor wear.',
    rating: 4.7,
    ratingCount: 52
  },
  {
    id: 81,
    name: 'Premium Non-Slip Yoga Mat with Carry Strap',
    brand: 'FitLife',
    category: 'sports',
    price: 1450,
    originalPrice: 1990,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    description: 'A thick, dual-textured yoga mat providing superb traction, joint cushioning, and durability. Ideal for yoga, Pilates, home workouts, and stretching. Includes a free elastic carry strap.',
    rating: 4.8,
    ratingCount: 55
  },
  {
    id: 109,
    name: 'Windproof Double-Layer Compact Umbrella',
    brand: 'RainStop',
    category: 'sports',
    price: 650,
    originalPrice: 850,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=400&h=400&fit=crop',
    description: 'An essential outdoor lifestyle staple. Features 8 reinforced fiberglass ribs, automatic open/close button, and double-canopy design to withstand heavy rain and wind.',
    rating: 4.8,
    ratingCount: 112
  },
  {
    id: 110,
    name: 'Stainless Steel Vacuum Insulated Water Bottle 750ml',
    brand: 'Aero',
    category: 'sports',
    price: 950,
    originalPrice: 1250,
    stock: 65,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    description: 'Double-walled flask that keeps drinks hot for up to 12 hours or cold for 24 hours. Made from food-grade stainless steel with a leak-proof cap.',
    rating: 4.9,
    ratingCount: 87
  },
  {
    id: 86,
    name: 'Atomic Habits by James Clear (Paperback)',
    brand: 'Penguin Books',
    category: 'books',
    price: 950,
    originalPrice: 1200,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    description: 'The revolutionary guide to building positive habits and breaking bad ones. James Clear provides practical, actionable strategies backed by biology, psychology, and neuroscience to reshape your daily routines.',
    rating: 4.9,
    ratingCount: 220
  },
  {
    id: 111,
    name: 'Executive A5 Daily Planner & Journal (Hardcover)',
    brand: 'Executive',
    category: 'books',
    price: 450,
    originalPrice: 600,
    stock: 140,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop',
    description: 'Elegant leatherette hardcover planner with 200 ruled pages, ribbon marker, and elastic closure band. Ideal for scheduling, goal tracking, and note-taking.',
    rating: 4.8,
    ratingCount: 65
  },
  {
    id: 112,
    name: 'Kenyan Traditional Cookery & Recipe Guide',
    brand: 'Heritage Books',
    category: 'books',
    price: 650,
    originalPrice: 800,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=400&h=400&fit=crop',
    description: 'An inspiring collection of traditional and modern Kenyan recipes—from soft chapatis, tasty pilau, traditional mukimo, to sweet mandazi. Simple step-by-step guides.',
    rating: 4.8,
    ratingCount: 37
  }
];

export function formatMoney(num: number): string {
  return 'Ksh ' + Math.round(num).toLocaleString('en-KE');
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function calcDiscount(price: number, original: number): number {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
}

let counter = 0;
export function uid(): string {
  counter = (counter + 1) % 10000;
  const timestamp = Date.now().toString(36).toUpperCase();
  const counterPart = counter.toString(36).toUpperCase().padStart(3, '0');
  const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase().padEnd(3, 'X');
  return `${timestamp}${counterPart}${randomPart}`;
}
