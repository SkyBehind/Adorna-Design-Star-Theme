import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import Gallery from './components/Gallery';
import About from './components/About';
import LippieAndLather from './components/LippieAndLather';
import WhereToFind from './components/WhereToFind';

interface CarouselSection {
  id: 'jewelry' | 'lippie' | 'about' | 'wheretofind';
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gradient: string;
  textColor: string;
  component: React.ComponentType;
  previewImages: string[];
}

function App() {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [activeContentSection, setActiveContentSection] = useState<'jewelry' | 'lippie' | 'about' | 'wheretofind' | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  // Remove preview index state - we'll show all images in a scrollable container

  const carouselSections: CarouselSection[] = [
    {
      id: 'jewelry',
      title: 'Wearable Sculptures',
      subtitle: 'Handcrafted Jewelry Collection',
      description: 'Each piece emerges from the intersection of medical precision and artistic intuition—delicate sculptures that carry the healing energy of skilled hands.',
      image: '/images/IMG_3090.jpeg',
      gradient: 'from-slate-900/60 via-slate-800/40 to-transparent',
      textColor: 'text-white',
      component: Gallery,
      previewImages: [
        '/images/compressed/bead_black_brown_orange_white_earrings.jpg',
        '/images/compressed/bead_blue_silver_earrings.jpg',
        '/images/compressed/circle_gold_earrings.jpg',
        '/images/compressed/bead_black_purple_earrings.jpg',
        '/images/compressed/silver_earrings.jpg',
        '/images/compressed/unique_earrings_earrings.jpg'
      ]
    },
    {
      id: 'lippie',
      title: 'Lippie & Lather',
      subtitle: 'Botanical Skincare Artistry',
      description: 'Hand-poured with the same healing intention that flows through decades of caring for others—where botanical wisdom meets artisanal craft.',
      image: '/images/IMG_9294.jpeg',
      gradient: 'from-emerald-900/60 via-teal-800/40 to-transparent',
      textColor: 'text-white',
      component: LippieAndLather,
      previewImages: [
        '/images/compressed/blue_pink_floral_soap.jpeg',
        '/images/compressed/multicolor_artisan_soap_collection.jpeg',
        '/images/compressed/soap_lipbalm_gift_collection.jpeg',
        '/images/compressed/basket_lipbalm_soap_tins_starfish.jpeg',
        '/images/compressed/blue_white_handcrafted_soap.jpeg',
        '/images/compressed/green_soap_purple_dish.jpeg',
        '/images/compressed/open_soap_boxes_and_lipbalm_basket_with_shaped_soaps.jpeg',
        '/images/compressed/stacked_soap_boxes_lippie_lather.jpeg',
        '/images/compressed/pink_blue_decorative_soap.jpeg'
      ]
    },
    {
      id: 'about',
      title: 'The Artist',
      subtitle: 'Gina • Healer & Creator',
      description: 'Three decades of healing work transformed into artistic design—where the precision of healthcare meets the flow of creative expression.',
      image: '/images/Artist-backdrop.jpg',
      gradient: 'from-indigo-950/70 via-purple-900/50 to-transparent',
      textColor: 'text-white',
      component: About,
      previewImages: []
    },
    {
      id: 'wheretofind',
      title: 'Where to Find',
      subtitle: 'Markets • Retail • Appointments',
      description: 'Visit us at farmers markets, discover retail partners, or schedule a personal consultation. Each interaction is an opportunity to connect with the artistry and intention behind every piece.',
      image: '/images/Artist-backdrop.jpg', // Reuse same image for now
      gradient: 'from-cyan-900/60 via-teal-800/40 to-transparent',
      textColor: 'text-white',
      component: WhereToFind,
      previewImages: []
    }
  ];

  // Navigation functions (commented out as they're not currently used)
  // const nextSection = () => {
  //   if (isTransitioning) return;
  //   setIsTransitioning(true);
  //   setTimeout(() => {
  //     setCurrentSection((prev) => (prev + 1) % carouselSections.length);
  //     setIsTransitioning(false);
  //   }, 300);
  // };

  // const prevSection = () => {
  //   if (isTransitioning) return;
  //   setIsTransitioning(true);
  //   setTimeout(() => {
  //     setCurrentSection((prev) => (prev - 1 + carouselSections.length) % carouselSections.length);
  //     setIsTransitioning(false);
  //   }, 300);
  // };

  const goToSection = (index: number) => {
    if (isTransitioning || index === currentSection) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSection(index);
      setIsTransitioning(false);
    }, 300);
  };

  const enterSection = (sectionId: 'jewelry' | 'lippie' | 'about' | 'wheretofind') => {
    setActiveContentSection(sectionId);
    setShowContent(true);
  };

  const exitToCarousel = () => {
    setShowContent(false);
    setActiveContentSection(null);
  };

  // Get beautiful gradient colors for each section using blue, pink, purple shades
  const getWarmBackdrop = (sectionId: string) => {
    switch (sectionId) {
      case 'jewelry':
        return 'bg-gradient-to-br from-purple-600/50 to-pink-600/50'; // Purple-pink gradient for jewelry
      case 'lippie':
        return 'bg-gradient-to-br from-blue-500/50 to-purple-500/50'; // Blue-purple gradient for natural products
      case 'about':
        return 'bg-gradient-to-br from-indigo-600/70 to-purple-700/70'; // Dark contrasted indigo-purple gradient for artist
      case 'wheretofind':
        return 'bg-gradient-to-br from-cyan-400/70 to-teal-400/70'; // Beautiful vibrant cyan-teal gradient for location
      default:
        return 'bg-gradient-to-br from-purple-600/50 to-pink-600/50';
    }
  };

  // Preload critical images for better mobile performance
  useEffect(() => {
    const preloadImages = () => {
      const criticalImages = [
        ...carouselSections.map(section => section.image),
        ...carouselSections.flatMap(section => section.previewImages.slice(0, 3)), // Only preload first 3 preview images
        '/images/adorna_design_logo.svg'
      ];

      let loadedCount = 0;
      const totalImages = criticalImages.length;

      criticalImages.forEach((src) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.src = src;
      });

      // Fallback timeout to ensure app loads even if some images fail
      setTimeout(() => {
        setImagesLoaded(true);
      }, 5000);
    };

    preloadImages();
  }, []);

  // Auto-advance carousel - DISABLED
  // useEffect(() => {
  //   if (showContent) return;
  //   
  //   const interval = setInterval(() => {
  //     if (!isTransitioning) {
  //       nextSection();
  //     }
  //   }, 6000);

  //   return () => clearInterval(interval);
  // }, [isTransitioning, showContent]);

  // No auto-rotation effects needed

  // Prevent browser back navigation when in content view
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (showContent) {
        event.preventDefault();
        exitToCarousel();
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    if (showContent) {
      window.history.pushState(null, '', window.location.pathname);
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [showContent]);

  // Cycle through preview images every 4 seconds - DISABLED
  // useEffect(() => {
  //   if (showContent) return;
  //   
  //   const interval = setInterval(() => {
  //     setCurrentPreviewIndex(prev => prev + 1);
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, [showContent]);

  // No need for complex preview logic - just show all images in scrollable container

  // Show loading screen on mobile while images load
  if (!imagesLoaded) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto">
            <img 
              src="/images/adorna_design_logo.svg" 
              alt="Adorna Design" 
              className="w-full h-full opacity-80 brightness-0 invert animate-pulse"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Adorna Design</h1>
            <p className="text-white/70 text-sm sm:text-base">Loading beautiful handcrafted art...</p>
          </div>
          <div className="w-16 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 to-rose-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (showContent && activeContentSection) {
    const ContentComponent = carouselSections.find(s => s.id === activeContentSection)?.component;
    return (
      <div className="min-h-screen w-full">
        {/* Elegant Back Navigation */}
        <div className="fixed top-4 left-4 sm:top-8 sm:left-8 z-50">
          <button
            onClick={exitToCarousel}
            className="group flex items-center space-x-2 sm:space-x-3 bg-white/90 backdrop-blur-xl border border-slate-200/50 rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
            <span className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
              Portfolio
            </span>
          </button>
        </div>

        {/* Top Logo for Content Pages */}
        <div className="pt-8 pb-4 text-center">
          <img 
            src="/images/adorna_design_logo.svg" 
            alt="Adorna Design" 
            className="w-32 h-32 sm:w-40 sm:h-40 mx-auto opacity-80"
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {ContentComponent && <ContentComponent />}
        </div>

        {/* Artist Footer */}
        <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-12 sm:mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <img 
                  src="/images/adorna_design_logo.svg" 
                  alt="Adorna Design" 
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-rose-300 bg-clip-text text-transparent">
                    Adorna Design
                  </h3>
                  <p className="text-sm text-rose-200">Gina • Artisan</p>
                </div>
              </div>
              <p className="text-white mb-6 max-w-md mx-auto">
                Creating art that bridges the worlds of healing and beauty, 
                one handcrafted piece at a time.
              </p>
              <div className="space-y-2">
                <p className="text-xs text-rose-200">
                  © 2025 Adorna Design. All artistic works are original and handcrafted by Gina.
                </p>
                <p className="text-xs text-rose-200">
                  Photography by Danielle Osfalg - Thank you for capturing the beauty of these handcrafted pieces.
                </p>
                <p className="text-xs text-rose-300">
                  Website crafted with ❤️ by{' '}
                  <a 
                    href="https://magicunicorn.tech" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-rose-200 hover:text-white transition-colors"
                  >
                    Magic Unicorn Unconventional Technology & Stuff Inc
                  </a>
                  {' '}using{' '}
                  <a 
                    href="https://unicorncommander.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-rose-200 hover:text-white transition-colors"
                  >
                    Unicorn Commander UC-1
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  const currentSlide = carouselSections[currentSection];

  return (
    <div className="min-h-screen w-full bg-black"> {/* Mobile-first: remove h-screen and overflow-hidden */}
      {/* Background Section - Mobile First */}
      <div className="relative min-h-screen flex flex-col">
        {/* Starfield Background for all sections */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
            {/* Pure white starfield for all pages */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`main-star-${i}`}
                className="absolute rounded-full bg-white shadow-white shadow-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${4 + Math.random() * 4}px`,
                  height: `${4 + Math.random() * 4}px`,
                  opacity: 1, // Pure white on desktop
                  animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
                  animationDelay: `${Math.random() * 2}s`,
                  filter: 'brightness(1.4) drop-shadow(0 0 3px white)',
                }}
              />
            ))}
            
            {[...Array(25)].map((_, i) => (
              <div
                key={`main-medium-star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  opacity: 0.95, // Nearly pure white
                  animation: `twinkle ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
                  animationDelay: `${Math.random() * 3}s`,
                  filter: 'brightness(1.3) drop-shadow(0 0 2px white)',
                }}
              />
            ))}
            
            {[...Array(40)].map((_, i) => (
              <div
                key={`main-small-star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  opacity: 0.85, // Bright white
                  animation: `twinkle ${4 + Math.random() * 2}s ease-in-out infinite alternate`,
                  animationDelay: `${Math.random() * 4}s`,
                  filter: 'brightness(1.2)',
                }}
              />
            ))}
            
            {/* Brighter nebula clouds with section-specific colors */}
            <div className="absolute inset-0 opacity-40">
              {currentSlide.id === 'jewelry' && (
                <>
                  <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl" style={{ left: '10%', top: '20%' }} />
                  <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl" style={{ right: '15%', top: '60%' }} />
                </>
              )}
              {currentSlide.id === 'lippie' && (
                <>
                  <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl" style={{ left: '15%', top: '25%' }} />
                  <div className="absolute w-80 h-80 bg-gradient-to-r from-green-300/20 to-emerald-400/20 rounded-full blur-3xl" style={{ right: '10%', top: '55%' }} />
                </>
              )}
              {currentSlide.id === 'wheretofind' && (
                <>
                  <div className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-teal-400/30 rounded-full blur-3xl" style={{ left: '20%', top: '30%' }} />
                  <div className="absolute w-80 h-80 bg-gradient-to-r from-teal-400/30 to-emerald-400/30 rounded-full blur-3xl" style={{ right: '15%', top: '50%' }} />
                </>
              )}
              {currentSlide.id === 'about' && (
                <>
                  <div className="absolute w-96 h-96 bg-gradient-to-r from-indigo-500/40 to-purple-600/40 rounded-full blur-3xl" style={{ left: '15%', top: '25%' }} />
                  <div className="absolute w-80 h-80 bg-gradient-to-r from-purple-600/40 to-blue-700/40 rounded-full blur-3xl" style={{ right: '10%', top: '55%' }} />
                </>
              )}
            </div>
        </div>
        {/* Lighter overlay for better starfield visibility */}
        <div className="absolute inset-0 bg-black/30 lg:bg-black/15 transition-opacity duration-1000" />
        <div className={`absolute inset-0 bg-gradient-to-b ${currentSlide.gradient} transition-opacity duration-1000`} />

        {/* Header with Logo - Mobile Safe */}
        <header className="relative z-10 pt-6 pb-4 px-4 mobile-safe-area">
          <div className="text-center">
            <div className={`inline-block ${getWarmBackdrop(currentSlide.id)} backdrop-blur-sm rounded-3xl p-4 border border-white/20`}>
              <img 
                src="/images/adorna_design_logo.svg" 
                alt="Adorna Design" 
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mx-auto opacity-95 drop-shadow-lg brightness-0 invert"
              />
            </div>
          </div>
        </header>

        {/* Desktop Navigation - Horizontal */}
        <div className="hidden lg:block relative z-10 px-4 mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center space-x-4">
              {carouselSections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    if (section.id === 'about' || section.id === 'wheretofind') {
                      enterSection(section.id);
                    } else {
                      goToSection(index);
                    }
                  }}
                  className={`group transition-all duration-500 px-6 py-4 rounded-2xl border-2 backdrop-blur-sm ${
                    index === currentSection 
                      ? `${getWarmBackdrop(section.id)} border-white/70` 
                      : `${getWarmBackdrop(section.id)}/60 border-white/30 hover:${getWarmBackdrop(section.id)} hover:border-white/50`
                  }`}
                >
                  <div className="text-center">
                    <p className="text-white font-bold text-base text-shadow-strong mb-1">{section.title}</p>
                    <p className="text-white/80 text-sm">{section.subtitle}</p>
                  </div>
                  <div className={`mx-auto mt-3 w-2 h-2 rounded-full transition-all duration-500 ${
                    index === currentSection 
                      ? 'bg-white scale-150' 
                      : 'bg-white/50 group-hover:bg-white/80'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* Main Content - Mobile First Layout */}
        <main className="relative z-10 flex-1 pb-24 px-4 sm:px-6 lg:px-8 mobile-safe-area">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 lg:gap-12 min-h-[60vh] justify-center">
              {/* Preview Images Grid - Mobile Optimized (moved to left side) */}
              <div className="lg:col-span-2 space-y-6 lg:order-1">
                {currentSlide.previewImages.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-white font-bold text-base sm:text-lg text-shadow-strong">Gallery Preview</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {/* Show first 5 images on mobile for better layout */}
                      {currentSlide.previewImages.slice(0, 5).map((image, index) => (
                        <div 
                          key={`${currentSlide.id}-${index}`}
                          className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white/30"
                        >
                          <img 
                            src={image} 
                            alt={`${currentSlide.title} preview ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading={index < 3 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </div>
                      ))}
                      {/* See More Button - Large Touch Target */}
                      <button
                        onClick={() => enterSection(currentSlide.id)}
                        className={`aspect-square rounded-xl ${getWarmBackdrop(currentSlide.id)} backdrop-blur-sm border-2 border-white/70 border-dashed flex flex-col items-center justify-center transition-all duration-300 hover:${getWarmBackdrop(currentSlide.id)}/80 hover:border-white active:scale-95 min-h-[100px] sm:min-h-[120px]`}
                      >
                        <div className="text-white text-center p-2">
                          <div className="text-xl sm:text-2xl mb-1 font-bold">+</div>
                          <div className="text-xs sm:text-sm font-bold leading-tight">
                            {currentSlide.id === 'jewelry' ? 'See All' : 
                             currentSlide.id === 'lippie' ? 'See All' : 
                             currentSlide.id === 'wheretofind' ? 'Find Us' :
                             'Learn More'}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Main Action Button - Mobile Optimized - Only for About and Where to Find */}
                {(currentSlide.id === 'about' || currentSlide.id === 'wheretofind') && (
                  <div className="pt-4">
                    <button
                      onClick={() => enterSection(currentSlide.id)}
                      className={`w-full group relative overflow-hidden ${getWarmBackdrop(currentSlide.id)} backdrop-blur-xl border-2 border-white/60 rounded-2xl px-6 py-4 sm:py-5 text-white font-bold transition-all duration-300 hover:${getWarmBackdrop(currentSlide.id)}/80 hover:border-white active:scale-95 text-base sm:text-lg min-h-[60px] shadow-xl`}
                    >
                      <span className="relative z-10 text-shadow-strong">
                        {currentSlide.id === 'about' ? 'Meet the Artist' : 'Find Adorna Design'}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Content Section - Mobile Optimized (moved to right side) */}
              <div className="lg:col-span-3 space-y-6 text-center lg:text-right lg:order-2">
                {/* Title Section with Better Contrast */}
                <div className="space-y-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-shadow-strong leading-tight">
                    {currentSlide.title}
                  </h1>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 text-shadow-strong font-medium">
                    {currentSlide.subtitle}
                  </h2>
                </div>
                
                {/* Description with Strong Background */}
                <div className={`${getWarmBackdrop(currentSlide.id)} backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20`}>
                  <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                    {currentSlide.description}
                  </p>
                </div>
                
                {/* Enhanced Lippie & Lather Information - Condensed Layout */}
                {currentSlide.id === 'lippie' && (
                  <div className="space-y-2">
                    {/* Lip Balm Flavors & Soap Fragrances - Combined Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      <div className={`${getWarmBackdrop(currentSlide.id)} backdrop-blur-sm rounded-lg p-3 border border-white/30`}>
                        <h3 className="text-white font-bold text-xs sm:text-sm mb-2 flex items-center">
                          <span className="text-lg mr-2">🍯</span>
                          <span>Lip Balm Flavors</span>
                        </h3>
                        <div className="grid grid-cols-2 gap-1 text-white text-xs">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-red-300">🍎</span>
                            <span>Apple</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-purple-300">🍇</span>
                            <span>Grape</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-pink-300">🍓</span>
                            <span>Strawberry</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-green-300">🌿</span>
                            <span>Mint</span>
                          </div>
                        </div>
                      </div>

                      <div className={`${getWarmBackdrop(currentSlide.id)} backdrop-blur-sm rounded-lg p-3 border border-white/30`}>
                        <h3 className="text-white font-bold text-xs sm:text-sm mb-2 flex items-center">
                          <span className="text-lg mr-2">🌸</span>
                          <span>Soap Fragrances</span>
                        </h3>
                        <div className="grid grid-cols-2 gap-1 text-white text-xs">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-rose-300">🌹</span>
                            <span>Rose</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-white">🌼</span>
                            <span>Jasmine</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-purple-300">💜</span>
                            <span>Lavender</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-green-300">🍃</span>
                            <span>White Tea</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-blue-200">🌊</span>
                            <span>Linen</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botanical Additives - Condensed Grid */}
                    <div className={`${getWarmBackdrop(currentSlide.id)} backdrop-blur-sm rounded-lg p-3 border border-white/30`}>
                      <h3 className="text-white font-bold text-xs sm:text-sm mb-2 flex items-center">
                        <span className="text-lg mr-2">🌿</span>
                        <span>Botanical Additives</span>
                      </h3>
                      <div className="grid grid-cols-4 gap-1 text-white text-xs">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-amber-300">🌾</span>
                          <span>Oatmeal</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-green-300">🌿</span>
                          <span>Eucalyptus</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-blue-200">🧂</span>
                          <span>Sea Salt</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-yellow-300">🌼</span>
                          <span>Chamomile</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-green-400">🌱</span>
                          <span>CBD</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-lime-300">🌾</span>
                          <span>Lemongrass</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-rose-300">🌹</span>
                          <span>Roses</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-purple-300">💜</span>
                          <span>Lavender</span>
                        </div>
                      </div>
                    </div>

                    {/* Base Ingredients - Combined Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      <div className={`${getWarmBackdrop(currentSlide.id)} backdrop-blur-sm rounded-lg p-3 border border-white/30`}>
                        <h3 className="text-white font-bold text-xs sm:text-sm mb-2 flex items-center">
                          <span className="text-lg mr-2">🧼</span>
                          <span>Soap Base</span>
                        </h3>
                        <p className="text-white text-xs leading-relaxed">
                          Goat's Milk • Coconut Oil • Cosmetic Tint • Fragrances
                        </p>
                      </div>

                      <div className={`${getWarmBackdrop(currentSlide.id)} backdrop-blur-sm rounded-lg p-3 border border-white/30`}>
                        <h3 className="text-white font-bold text-xs sm:text-sm mb-2 flex items-center">
                          <span className="text-lg mr-2">💋</span>
                          <span>Lip Balm Base</span>
                        </h3>
                        <p className="text-white text-xs leading-relaxed">
                          Beeswax • Coconut Oil • Shea Butter • Flavoring
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>


            </div>
          </div>
        </main>

        {/* Mobile Navigation - Fixed Bottom with Safe Area */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 mobile-safe-area">
          <div className={`${getWarmBackdrop(currentSlide.id)}/95 backdrop-blur-xl border-t-2 border-white/30 shadow-2xl`}>
            <div className="grid grid-cols-3 gap-1 p-3">
              {carouselSections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    if (section.id === 'about' || section.id === 'wheretofind') {
                      enterSection(section.id);
                    } else {
                      goToSection(index);
                    }
                  }}
                  className={`p-4 rounded-2xl text-center transition-all duration-300 min-h-[72px] flex flex-col justify-center border-2 ${
                    index === currentSection 
                      ? 'bg-white text-black shadow-xl border-white' 
                      : `${getWarmBackdrop(section.id)}/70 text-white hover:${getWarmBackdrop(section.id)}/90 active:scale-95 border-white/40`
                  }`}
                >
                  <div>
                    <p className="font-bold text-sm leading-tight">{section.title}</p>
                    <p className="text-xs opacity-75 mt-1">Tap to explore</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Artist Footer for Main Carousel */}
        <footer className="relative z-10 bg-white/10 backdrop-blur-md border-t border-white/20 mt-12 sm:mt-24 mb-20 lg:mb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <img 
                  src="/images/adorna_design_logo.svg" 
                  alt="Adorna Design" 
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-rose-300 bg-clip-text text-transparent">
                    Adorna Design
                  </h3>
                  <p className="text-sm text-rose-200">Gina • Artisan</p>
                </div>
              </div>
              <p className="text-white mb-6 max-w-md mx-auto">
                Creating art that bridges the worlds of healing and beauty, 
                one handcrafted piece at a time.
              </p>
              <div className="space-y-2">
                <p className="text-xs text-rose-200">
                  © 2025 Adorna Design. All artistic works are original and handcrafted by Gina.
                </p>
                <p className="text-xs text-rose-200">
                  Photography by Danielle Osfalg - Thank you for capturing the beauty of these handcrafted pieces.
                </p>
                <p className="text-xs text-rose-300">
                  Website crafted with ❤️ by{' '}
                  <a 
                    href="https://magicunicorn.tech" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-rose-200 hover:text-white transition-colors"
                  >
                    Magic Unicorn Unconventional Technology & Stuff Inc
                  </a>
                  {' '}using{' '}
                  <a 
                    href="https://unicorncommander.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-rose-200 hover:text-white transition-colors"
                  >
                    Unicorn Commander UC-1
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
