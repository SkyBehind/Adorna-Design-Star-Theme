import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Gallery from './components/Gallery';
import About from './components/About';
import LippieAndLather from './components/LippieAndLather';

interface CarouselSection {
  id: 'jewelry' | 'lippie' | 'about';
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
  const [activeContentSection, setActiveContentSection] = useState<'jewelry' | 'lippie' | 'about' | null>(null);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

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
        '/images/silver_spiral_blue_stone_earrings.jpg',
        '/images/gold_pink_white_earrings.jpg',
        '/images/dragonfly_black_silver_earrings.jpg',
        '/images/brown_leather_white_bead_earrings.jpg',
        '/images/circle_gold_earrings.jpg',
        '/images/silver_copper_teardrop_earrings.jpg',
        '/images/purple_silver_earrings.jpg',
        '/images/seashell_pink_white_earrings.jpg',
        '/images/unique_earrings_earrings.jpg',
        '/images/wooden_bead_metal_earrings.jpg',
        '/images/copper_round_earrings.jpg',
        '/images/red_silver_white_earrings.jpg',
        '/images/all-earrings-4square-board.jpg',
        '/images/earring-single-square-wood-leath-dice.jpg',
        '/images/earrings-2square-shells-leather.jpg',
        '/images/earrings-single-square-cards.jpg'
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
        '/images/blue_pink_floral_soap.jpeg',
        '/images/multicolor_artisan_soap_collection.jpeg',
        '/images/pink_blue_heart_soap.jpeg',
        '/images/soap_lipbalm_gift_collection.jpeg',
        '/images/green_soap_purple_dish.jpeg',
        '/images/blue_white_handcrafted_soap.jpeg',
        '/images/basket_lipbalm_soap_tins_starfish.jpeg',
        '/images/open_soap_boxes_and_lipbalm_basket_with_shaped_soaps.jpeg',
        '/images/stacked_soap_boxes_lippie_lather.jpeg'
      ]
    },
    {
      id: 'about',
      title: 'The Artist',
      subtitle: 'Gina • Healer & Creator',
      description: 'Three decades of healing work transformed into artistic design—where the precision of healthcare meets the flow of creative expression.',
      image: '/images/Artist-backdrop.jpg',
      gradient: 'from-rose-900/60 via-pink-800/40 to-transparent',
      textColor: 'text-white',
      component: About,
      previewImages: []
    }
  ];

  const nextSection = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSection((prev) => (prev + 1) % carouselSections.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevSection = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSection((prev) => (prev - 1 + carouselSections.length) % carouselSections.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToSection = (index: number) => {
    if (isTransitioning || index === currentSection) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSection(index);
      setIsTransitioning(false);
    }, 300);
  };

  const enterSection = (sectionId: 'jewelry' | 'lippie' | 'about') => {
    setActiveContentSection(sectionId);
    setShowContent(true);
  };

  const exitToCarousel = () => {
    setShowContent(false);
    setActiveContentSection(null);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (showContent) return;
    
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSection();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isTransitioning, showContent]);

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

  // Cycle through preview images every 4 seconds
  useEffect(() => {
    if (showContent) return;
    
    const interval = setInterval(() => {
      setCurrentPreviewIndex(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [showContent]);

  // Function to get current preview images (showing 6 at a time, cycling through all)
  const getCurrentPreviewImages = (section: CarouselSection) => {
    const allImages = section.previewImages;
    const startIndex = (currentPreviewIndex * 2) % allImages.length;
    const selectedImages = [];
    
    for (let i = 0; i < 6; i++) {
      selectedImages.push(allImages[(startIndex + i) % allImages.length]);
    }
    
    return selectedImages;
  };

  if (showContent && activeContentSection) {
    const ContentComponent = carouselSections.find(s => s.id === activeContentSection)?.component;
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-rose-50">
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
        <div className="px-4 sm:px-0">
          {ContentComponent && <ContentComponent />}
        </div>

        {/* Artist Footer */}
        <footer className="bg-slate-50/80 backdrop-blur-sm border-t border-slate-200 mt-12 sm:mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <img 
                  src="/images/adorna_design_logo.svg" 
                  alt="Adorna Design" 
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-slate-700 to-rose-600 bg-clip-text text-transparent">
                    Adorna Design
                  </h3>
                  <p className="text-sm text-slate-600">Gina • Artisan</p>
                </div>
              </div>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Creating art that bridges the worlds of healing and beauty, 
                one handcrafted piece at a time.
              </p>
              <div className="space-y-2">
                <p className="text-xs text-slate-500">
                  © 2025 Adorna Design. All artistic works are original and handcrafted by Gina.
                </p>
                <p className="text-xs text-slate-500">
                  Photography by Danielle Osfalg - Thank you for capturing the beauty of these handcrafted pieces.
                </p>
                <p className="text-xs text-slate-400">
                  Website crafted with ❤️ by{' '}
                  <a 
                    href="https://magicunicorn.tech" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    Magic Unicorn Unconventional Technology & Stuff Inc
                  </a>
                  {' '}using{' '}
                  <a 
                    href="https://unicorncommander.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-700 transition-colors"
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
    <div className="relative min-h-screen h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <div 
          className={`absolute inset-0 bg-cover transition-all duration-1000 ${isTransitioning ? 'scale-110 blur-sm' : 'scale-100'}`}
          style={{ 
            backgroundImage: `url(${currentSlide.image})`,
            backgroundPosition: currentSlide.id === 'about' ? 'center 25%' : 'center'
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.gradient} transition-opacity duration-1000`} />
      </div>

      {/* Top Center Logo - Moved down to avoid covering images */}
      <div className="absolute top-8 sm:top-12 md:top-16 left-1/2 transform -translate-x-1/2 z-30">
        <div className="text-center">
          <img 
            src="/images/adorna_design_logo.svg" 
            alt="Adorna Design" 
            className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto opacity-90 hover:opacity-100 transition-opacity ${
              currentSlide.id === 'jewelry' ? 'sm:filter-none filter invert' : ''
            }`}
          />
        </div>
      </div>


      {/* Main Content - Positioned to avoid logo overlap */}
      <div className="relative z-20 h-full flex items-end pb-48 sm:pb-52 lg:pb-20 pt-24 sm:pt-32 md:pt-40 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isTransitioning ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
              <div className="space-y-6">
                
                <div className="space-y-4">
                  <h2 className={`text-xl sm:text-2xl md:text-3xl font-medium ${currentSlide.textColor} leading-tight tracking-wide`}>
                    {currentSlide.title}
                  </h2>
                </div>
                
                <p className={`text-base sm:text-lg ${currentSlide.textColor}/70 leading-relaxed max-w-2xl`}>
                  {currentSlide.description}
                </p>
              </div>

              {/* Preview Images Carousel */}
              {currentSlide.previewImages.length > 0 && (
                <div className="pt-4">
                  <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                    {getCurrentPreviewImages(currentSlide).map((image, index) => (
                      <div 
                        key={`${currentPreviewIndex}-${index}`}
                        className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <img 
                          src={image} 
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enter Button - Hidden on Mobile */}
              <div className="pt-4 hidden lg:block">
                <button
                  onClick={() => enterSection(currentSlide.id)}
                  className="group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/30 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-white font-medium transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:shadow-2xl text-sm sm:text-base"
                >
                  <span className="relative z-10">{currentSlide.id === 'about' ? 'About Gina' : 'See Portfolio'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              </div>
            </div>

            {/* Navigation dots only */}
            <div className="hidden lg:flex justify-end">
              <div className="space-y-4">
                {carouselSections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => enterSection(section.id)}
                    className={`group flex items-center space-x-3 transition-all duration-500 ${
                      index === currentSection 
                        ? 'opacity-100' 
                        : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <div className="text-right">
                      <p className="text-white font-medium text-sm">{section.title}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-500 ${
                      index === currentSection 
                        ? 'bg-white scale-125' 
                        : 'bg-transparent group-hover:bg-white/50'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        {/* Desktop Navigation - Dots Only */}
        <div className="hidden lg:flex items-center space-x-3 sm:space-x-6">
          {/* Progress Dots */}
          <div className="flex space-x-2 sm:space-x-3">
            {carouselSections.map((section, index) => (
              <button
                key={index}
                onClick={() => goToSection(index)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === currentSection 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Navigation - Dots with Arrows */}
        <div className="flex lg:hidden items-center space-x-3 sm:space-x-6">
          {/* Progress Dots with Navigation Arrows */}
          <div className="flex space-x-2 sm:space-x-3 items-center">
            {carouselSections.map((section, index) => (
              <button
                key={index}
                onClick={() => index === 0 ? prevSection() : index === carouselSections.length - 1 ? nextSection() : goToSection(index)}
                disabled={isTransitioning}
                className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-500 flex items-center justify-center shadow-lg ${
                  index === currentSection 
                    ? 'bg-white' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              >
                {/* Left Arrow for first dot */}
                {index === 0 && (
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800" />
                )}
                {/* Right Arrow for last dot */}
                {index === carouselSections.length - 1 && (
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800" />
                )}
                {/* Center dot for middle */}
                {index !== 0 && index !== carouselSections.length - 1 && (
                  <div className={`w-3 h-3 rounded-full ${
                    index === currentSection ? 'bg-slate-800' : 'bg-slate-600'
                  }`} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* Mobile Navigation */}
      <div className="lg:hidden absolute bottom-20 sm:bottom-24 left-4 right-4 sm:left-8 sm:right-8 z-30">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-3 sm:p-4 shadow-2xl">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {carouselSections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => enterSection(section.id)}
                className={`p-2 sm:p-3 rounded-xl text-center transition-all duration-300 ${
                  index === currentSection 
                    ? 'bg-white text-slate-900 shadow-lg' 
                    : 'bg-slate-800/50 text-white hover:bg-slate-700/70 hover:shadow-md'
                }`}
              >
                <div>
                  <p className="font-medium text-xs leading-tight">{section.title}</p>
                  <p className="text-xs opacity-75 mt-1">tap</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
