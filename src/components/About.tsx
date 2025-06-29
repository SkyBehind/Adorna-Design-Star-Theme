import { Heart, Palette, Leaf, Target, Sparkles, Quote, Scissors, Gem, Flower2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

export default function About() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Space Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
        {/* Scroll-based starfield */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white opacity-95 shadow-white shadow-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 4}px`,
              height: `${4 + Math.random() * 4}px`,
              transform: `translateY(${scrollY * (0.2 + i * 0.02)}px)`,
              filter: 'brightness(1.2)',
            }}
          />
        ))}
        
        {[...Array(25)].map((_, i) => (
          <div
            key={`medium-star-${i}`}
            className="absolute rounded-full bg-white opacity-85"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              transform: `translateY(${scrollY * (0.1 + i * 0.01)}px)`,
              filter: 'brightness(1.1)',
            }}
          />
        ))}
        
        {[...Array(40)].map((_, i) => (
          <div
            key={`small-star-${i}`}
            className="absolute rounded-full bg-white opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              transform: `translateY(${scrollY * (0.05 + i * 0.005)}px)`,
            }}
          />
        ))}
        
        {/* Nebula clouds */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            style={{
              left: '10%',
              top: '20%',
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          />
          <div 
            className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl"
            style={{
              right: '15%',
              top: '60%',
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          />
          <div 
            className="absolute w-64 h-64 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
            style={{
              left: '60%',
              top: '10%',
              transform: `translateY(${scrollY * 0.08}px)`,
            }}
          />
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Artist Portrait Section */}
      <div className="text-center mb-24 relative">        
        <div className="relative inline-block mb-12">
          {/* Enhanced portrait with multiple rings */}
          <div className="relative">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full mx-auto mb-8 overflow-hidden shadow-2xl border-8 border-white/80 backdrop-blur-sm relative z-10">
              <img 
                src="/images/Gina3.jpeg" 
                alt="Gina Stransky" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Multiple decorative rings */}
            <div className="absolute inset-0 w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full border-2 border-rose-300/60 animate-spin-slow"></div>
            <div className="absolute inset-2 w-44 h-44 md:w-52 md:h-52 mx-auto rounded-full border border-amber-300/60 animate-spin-reverse-slow"></div>
          </div>
        </div>
        
        <div className="relative">
          <h2 className="text-6xl md:text-7xl font-light mb-4 tracking-tight bg-gradient-to-r from-white via-rose-300 to-amber-300 bg-clip-text text-transparent">
            Meet the Artist
          </h2>
          
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-rose-400"></div>
            <Gem className="w-6 h-6 text-rose-400" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
          
          <p className="text-2xl text-rose-200 italic mb-10 font-light">
            "Gina Stransky • Lifelong Creator • Adorna Design"
          </p>

          {/* Enhanced intro with quote styling */}
          <div className="max-w-4xl mx-auto relative">
            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-rose-300/60 transform rotate-180" />
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 relative">
              <p className="text-xl text-white leading-relaxed italic">
                Gina Stransky is a lifelong maker with a passion for creating pieces that feel personal, 
                purposeful, and rooted in care. With a steady hand and a love for detail, she designs 
                jewelry, natural soaps, and lip balms that blend beauty with intention.
              </p>
            </div>
            <Quote className="absolute -bottom-4 -right-4 w-12 h-12 text-amber-300/60" />
          </div>
        </div>
      </div>

      {/* Artist Story - Enhanced with visual elements */}
      <div className="mb-24 relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-white/20 shadow-lg">
            <Palette className="w-5 h-5 text-rose-300" />
            <span className="text-sm font-medium text-white">Her Creative Journey</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Story Panel 1 */}
          <Card className="bg-white/10 backdrop-blur-md border-rose-300/30 hover:border-rose-300/60 transition-all duration-300 hover:shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-400/20 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
            <CardContent className="p-8 relative">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Scissors className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white text-center">Precision & Patience</h3>
              </div>
              <p className="text-rose-100 leading-relaxed text-center">
                Her work is shaped by years of experience in environments that demanded precision, 
                patience, and quiet strength—qualities now woven into everything she makes.
              </p>
            </CardContent>
          </Card>

          {/* Story Panel 2 */}
          <Card className="bg-white/10 backdrop-blur-md border-emerald-300/30 hover:border-emerald-300/60 transition-all duration-300 hover:shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
            <CardContent className="p-8 relative">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Flower2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white text-center">Natural Materials</h3>
              </div>
              <p className="text-emerald-100 leading-relaxed text-center">
                From hand-formed metal and leather earrings to nourishing soaps and soothing balms crafted 
                with real botanicals, each item reflects a deep respect for natural materials and honest craftsmanship.
              </p>
            </CardContent>
          </Card>

          {/* Story Panel 3 */}
          <Card className="bg-white/10 backdrop-blur-md border-amber-300/30 hover:border-amber-300/60 transition-all duration-300 hover:shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
            <CardContent className="p-8 relative">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white text-center">Made with Love</h3>
              </div>
              <p className="text-amber-100 leading-relaxed text-center">
                Under the name Adorna Design, Gina brings together texture, color, and comfort to 
                celebrate individuality and connection.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Central Statement */}
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-xl text-white leading-relaxed italic font-light">
              "Whether it's a pair of earrings that catches the light just right, a gentle bar of soap, 
              or a balm that calms the senses, her creations are meant to be used, worn, and loved."
            </p>
            <div className="mt-6">
              <p className="text-lg text-rose-200 font-medium">
                Each piece tells a quiet story—of resilience, creativity, and the simple joy of things made by hand.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Design Philosophy - Enhanced */}
      <div className="relative mb-20">        
        <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
          <div className="text-center mb-16">
            {/* Enhanced header */}
            <div className="relative mb-8">
              <div className="relative inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20 shadow-lg">
                <Sparkles className="w-6 h-6 text-rose-400" />
                <span className="text-lg font-semibold text-white">Design Philosophy</span>
                <Gem className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-white via-rose-300 to-amber-300 bg-clip-text text-transparent">
              The Adorna Design Approach
            </h3>
            
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
              <Gem className="w-5 h-5 text-rose-400" />
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </div>
            
            <p className="text-xl text-rose-200 max-w-3xl mx-auto leading-relaxed">
              Creating pieces that feel personal, purposeful, and rooted in care
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Philosophy Card 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-rose-300/30 group-hover:shadow-2xl transition-all duration-300 text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full animate-pulse"></div>
                </div>
                <h4 className="font-bold text-white mb-4 text-xl">Personal & Purposeful</h4>
                <p className="text-rose-100 leading-relaxed">
                  Every piece is created with intention and care, designed to feel personal 
                  and meaningful to the person who wears or uses it.
                </p>
              </div>
            </div>
            
            {/* Philosophy Card 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-3xl transform -rotate-2 group-hover:-rotate-4 transition-transform duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-emerald-300/30 group-hover:shadow-2xl transition-all duration-300 text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Leaf className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-emerald-300 to-green-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
                <h4 className="font-bold text-white mb-4 text-xl">Natural Materials</h4>
                <p className="text-emerald-100 leading-relaxed">
                  A deep respect for natural materials and honest craftsmanship, honoring 
                  the inherent beauty found in organic forms and botanicals.
                </p>
              </div>
            </div>
            
            {/* Philosophy Card 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-3xl transform rotate-2 group-hover:rotate-4 transition-transform duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-amber-300/30 group-hover:shadow-2xl transition-all duration-300 text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                <h4 className="font-bold text-white mb-4 text-xl">Made to be Loved</h4>
                <p className="text-amber-100 leading-relaxed">
                  Created with quiet strength and attention to detail, each piece is meant 
                  to be used, worn, and cherished as part of daily life.
                </p>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
}
