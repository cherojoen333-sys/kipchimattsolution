import { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, ShoppingBag, Carrot, Tags, 
  Truck, ShieldCheck, RefreshCw, Headset, Leaf, Star, Sparkles 
} from 'lucide-react';

interface HeroProps {
  onExploreCategory: (cat: string) => void;
  onScrollToDeals: () => void;
  onScrollToBrands: () => void;
}

export default function Hero({ onExploreCategory, onScrollToDeals, onScrollToBrands }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Fresh Farm Produce & Butchery',
      category: 'fresh food',
      desc: '100% organic leafy greens, juicy local tomatoes, premium tender beef steaks, and fresh Kenchic poultry delivered daily.',
      btnText: 'Shop Fresh Food',
      action: () => onExploreCategory('fresh food'),
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
    },
    {
      id: 2,
      title: 'Premium Electronics & Appliances',
      category: 'electronics',
      desc: 'Upgrade your home with Samsung microwaves, Ramtons smart blenders, Mika fast-boil kettles, and high-performance smartphones.',
      btnText: 'Explore Electronics',
      action: () => onExploreCategory('electronics'),
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80',
    },
    {
      id: 3,
      title: 'Health, Wellness & Pharmacy',
      category: 'health',
      desc: 'Keep your family strong with premium vitamins, Seven Seas cod liver oil, deep heat rubs, and general health-wellness products.',
      btnText: 'Shop Health & Wellness',
      action: () => onExploreCategory('health'),
      image: 'https://images.unsplash.com/photo-1511688868353-3a3668881515?w=1200&q=80',
    },
    {
      id: 4,
      title: 'Modern Apparel & Wardrobe',
      category: 'apparel',
      desc: 'Discover ultra-soft cotton white tees, heavy-knit unisex hoodies, and cozy apparel crafted for ultimate everyday comfort.',
      btnText: 'Browse Apparel & Fashion',
      action: () => onExploreCategory('apparel'),
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80',
    },
    {
      id: 5,
      title: 'Sports, Fitness & Outdoors',
      category: 'sports',
      desc: 'Achieve your wellness goals with non-slip dual-textured yoga mats, smart fitness trackers, and professional sports gear.',
      btnText: 'Explore Sports & Fitness',
      action: () => onExploreCategory('sports'),
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80',
    },
    {
      id: 6,
      title: 'Books, Fiction & Business Media',
      category: 'books',
      desc: "Immerse yourself in James Clear's Atomic Habits, Yuval Harari's Sapiens, and other global bestsellers packed with wisdom.",
      btnText: 'Browse Books & Media',
      action: () => onExploreCategory('books'),
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80',
    },
    {
      id: 7,
      title: 'Pantry Staples & Food Cupboard',
      category: 'food cupboard',
      desc: 'Stock up on Dola maize flour, Sunrice pure Basmati rice, Nescafe classic granules, and your absolute favorite cooking fats.',
      btnText: 'Fill Your Cupboard',
      action: () => onExploreCategory('food cupboard'),
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&q=80',
    },
    {
      id: 8,
      title: 'Exquisite Liquors & Spirits',
      category: 'liquor',
      desc: 'Browse award-winning Scotch whiskies, Johnnie Walker Black Label, fine vintage wines, and craft beers. Delivered strictly for 18+.',
      btnText: 'Visit Liquor Cellar',
      action: () => onExploreCategory('liquor'),
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=80',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carousel */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[280px] sm:h-[320px] md:h-[380px]">
          <div 
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div 
                key={slide.id}
                className="min-w-full h-full flex items-center justify-between p-8 sm:p-12 text-white relative select-none bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.4) 100%), url(${slide.image})` }}
              >
                <div className="z-10 max-w-xl">
                  <span className="bg-plum text-white px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-3 inline-block">
                    Featured Department
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4.5xl font-black tracking-tight mb-3 text-white drop-shadow-sm">
                    {slide.title}
                  </h1>
                  <p className="text-gray-100 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-medium max-w-lg drop-shadow-sm">
                    {slide.desc}
                  </p>
                  <button 
                    onClick={slide.action}
                    className="flex items-center gap-2 bg-plum text-white hover:bg-plum-light font-black text-xs sm:text-sm py-3 px-7 rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{slide.btnText}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors z-20"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors z-20"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${currentSlide === idx ? 'bg-plum w-6' : 'bg-white/45 w-2'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Promo Grid (Horizontal swipeable on small screens to save space) */}
        <div className="flex md:grid overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-3 md:grid-cols-3 mt-3 sm:mt-4 scrollbar-none snap-x -mx-4 px-4 md:mx-0 md:px-0">
          <div className="min-w-[78vw] sm:min-w-[260px] md:min-w-0 flex-1 snap-start bg-gradient-to-br from-plum-fade to-plum-fade/30 border border-plum/25 rounded-xl p-3.5 sm:p-5 relative overflow-hidden flex flex-col justify-between shadow-sm group select-none">
            <div className="z-10">
              <span className="text-[9px] sm:text-[10px] font-extrabold text-plum tracking-wider uppercase mb-0.5 sm:mb-1 block">Mega Savings</span>
              <h3 className="font-extrabold text-gray-800 text-sm sm:text-base mb-0.5 sm:mb-1">Today's Hot Deals</h3>
              <p className="text-gray-500 text-[11px] sm:text-xs mb-2 sm:mb-4 line-clamp-2">Save up to 40% off on premium food pantry and home items.</p>
            </div>
            <button 
              onClick={onScrollToDeals}
              className="w-fit bg-plum hover:bg-plum/80 text-white text-[10px] sm:text-[11px] font-extrabold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg cursor-pointer transition-colors shadow-sm"
            >
              Shop Now
            </button>
            <Tags className="w-14 h-14 sm:w-20 sm:h-20 text-plum/10 absolute -right-3 -bottom-3 sm:-right-4 sm:-bottom-4 -rotate-12 group-hover:scale-110 transition-transform pointer-events-none" />
          </div>

          <div className="min-w-[78vw] sm:min-w-[260px] md:min-w-0 flex-1 snap-start bg-gradient-to-br from-plum-fade to-plum-fade/30 border border-plum/25 rounded-xl p-3.5 sm:p-5 relative overflow-hidden flex flex-col justify-between shadow-sm group select-none">
            <div className="z-10">
              <span className="text-[9px] sm:text-[10px] font-extrabold text-plum tracking-wider uppercase mb-0.5 sm:mb-1 block">100% Organic</span>
              <h3 className="font-extrabold text-gray-800 text-sm sm:text-base mb-0.5 sm:mb-1">Fresh from the Farm</h3>
              <p className="text-gray-500 text-[11px] sm:text-xs mb-2 sm:mb-4 line-clamp-2">Fresh handpicked vegetables, fruits, butchery cuts & dairy delivered daily.</p>
            </div>
            <button 
              onClick={() => onExploreCategory('fresh food')}
              className="w-fit bg-plum hover:bg-plum/80 text-white text-[10px] sm:text-[11px] font-extrabold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg cursor-pointer transition-colors shadow-sm"
            >
              Explore Fresh Food
            </button>
            <Leaf className="w-14 h-14 sm:w-20 sm:h-20 text-plum/10 absolute -right-3 -bottom-3 sm:-right-4 sm:-bottom-4 -rotate-12 group-hover:scale-110 transition-transform pointer-events-none" />
          </div>

          <div className="min-w-[78vw] sm:min-w-[260px] md:min-w-0 flex-1 snap-start bg-gradient-to-br from-plum-fade to-plum-fade/30 border border-plum/25 rounded-xl p-3.5 sm:p-5 relative overflow-hidden flex flex-col justify-between shadow-sm group select-none">
            <div className="z-10">
              <span className="text-[9px] sm:text-[10px] font-extrabold text-plum tracking-wider uppercase mb-0.5 sm:mb-1 block">Best Brands</span>
              <h3 className="font-extrabold text-gray-800 text-sm sm:text-base mb-0.5 sm:mb-1">Explore by Brand</h3>
              <p className="text-gray-500 text-[11px] sm:text-xs mb-2 sm:mb-4 line-clamp-2">Choose from your absolute favorite domestic and global brands.</p>
            </div>
            <button 
              onClick={onScrollToBrands}
              className="w-fit bg-plum hover:bg-plum/80 text-white text-[10px] sm:text-[11px] font-extrabold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg cursor-pointer transition-colors shadow-sm"
            >
              Discover Brands
            </button>
            <Star className="w-14 h-14 sm:w-20 sm:h-20 text-plum/10 absolute -right-3 -bottom-3 sm:-right-4 sm:-bottom-4 -rotate-12 group-hover:scale-110 transition-transform pointer-events-none" />
          </div>
        </div>

        {/* Features Bar (2x2 grid on small screens, 4-col grid on md+) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5 mt-3 sm:mt-6">
          <div className="bg-white border border-gray-150 rounded-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 shadow-sm hover:border-plum/20 hover:shadow transition-all">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-plum-fade text-plum flex items-center justify-center flex-shrink-0">
              <Truck className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-gray-800 text-[11px] sm:text-xs md:text-sm truncate">90-Min Delivery</h4>
              <p className="text-gray-500 text-[9px] sm:text-[10px] md:text-xs mt-0.5 truncate">Prompt delivery</p>
            </div>
          </div>

          <div className="bg-white border border-gray-150 rounded-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 shadow-sm hover:border-plum/20 hover:shadow transition-all">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-plum-fade text-plum flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-gray-800 text-[11px] sm:text-xs md:text-sm truncate">Secure Payments</h4>
              <p className="text-gray-500 text-[9px] sm:text-[10px] md:text-xs mt-0.5 truncate">M-Pesa & Cards</p>
            </div>
          </div>

          <div className="bg-white border border-gray-150 rounded-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 shadow-sm hover:border-plum/20 hover:shadow transition-all">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-plum-fade text-plum flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-gray-800 text-[11px] sm:text-xs md:text-sm truncate">Easy Returns</h4>
              <p className="text-gray-500 text-[9px] sm:text-[10px] md:text-xs mt-0.5 truncate">7-day policy</p>
            </div>
          </div>

          <div className="bg-white border border-gray-150 rounded-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 shadow-sm hover:border-plum/20 hover:shadow transition-all">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-plum-fade text-plum flex items-center justify-center flex-shrink-0">
              <Headset className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-gray-800 text-[11px] sm:text-xs md:text-sm truncate">24/7 Care Support</h4>
              <p className="text-gray-500 text-[9px] sm:text-[10px] md:text-xs mt-0.5 truncate">Standby support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
