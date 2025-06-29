import { useState, useEffect } from 'react';
import { Heart, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  type: 'soap' | 'lip-balm';
  scent: string;
  ingredients: string[];
  benefits: string;
  description: string;
  image: string;
  collection: string;
}

export default function LippieAndLather() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadSoapProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/soap_products.json');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error loading soap products:', error);
        setError('Failed to load products. Using placeholder data.');
        setLoading(false);
        
        // Fallback to placeholder data
        setProducts([
          {
            id: 'lavender-dreams-soap',
            name: 'Lavender Dreams',
            type: 'soap',
            scent: 'Lavender & Chamomile',
            ingredients: ['Olive Oil', 'Coconut Oil', 'Lavender Essential Oil', 'Chamomile', 'Shea Butter'],
            benefits: 'Calming and moisturizing, perfect for sensitive skin',
            description: 'Hand-poured with organic lavender from local farms, this gentle soap brings the tranquility of a summer garden to your daily routine.',
            image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=600&fit=crop',
            collection: 'Botanical Bliss'
          },
          {
            id: 'citrus-burst-soap',
            name: 'Citrus Burst',
            type: 'soap',
            scent: 'Orange & Lemongrass',
            ingredients: ['Coconut Oil', 'Palm Oil', 'Orange Essential Oil', 'Lemongrass', 'Vitamin E'],
            benefits: 'Energizing and cleansing, great for morning routines',
            description: 'Bright and invigorating, this soap awakens the senses with fresh citrus oils and natural exfoliating properties.',
            image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=600&fit=crop',
            collection: 'Energizing Essentials'
          }
        ]);
      }
    };
    
    loadSoapProducts();
  }, []);

  // Filter products based on search and type
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.scent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = selectedType === 'all' || product.type === selectedType;
      return matchesSearch && matchesType;
    });
    
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [products, searchTerm, selectedType]);

  // Update displayed products based on pagination
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const hasMoreItems = currentPage < totalPages;

  const loadMore = () => {
    if (hasMoreItems) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Starfield Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 -z-10">
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
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
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
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <img 
              src="/images/lippie_and_lather_logo.svg" 
              alt="Lippie & Lather" 
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <h2 className="text-3xl font-bold text-white">Lippie & Lather</h2>
          </div>
          <p className="text-emerald-200">
            Handcrafted soaps and lip balms made with all-natural ingredients
          </p>
        </div>

        {loading && (
          <div className="text-teal-600">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
            Loading products...
          </div>
        )}
        
        {error && (
          <div className="text-orange-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-auto min-w-[200px]"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={selectedType === 'all' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType('all')}
              className="text-xs font-medium"
            >
              All Products
            </Button>
            <Button
              variant={selectedType === 'soap' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType('soap')}
              className="text-xs font-medium"
            >
              Soaps
            </Button>
            <Button
              variant={selectedType === 'lip-balm' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType('lip-balm')}
              className="text-xs font-medium"
            >
              Lip Balms
            </Button>
          </div>
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
              <div className="aspect-[4/5] bg-slate-200"></div>
            </div>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">{product.name}</p>
                  <p className="text-white/80 text-xs">{product.scent}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <p className="text-white/60 text-xs">Photo: Danielle Osfalg</p>
                </div>
              </div>
            </div>
            </Card>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!loading && displayedProducts.length > 0 && hasMoreItems && (
        <div className="text-center mb-12">
          <Button
            onClick={loadMore}
            variant="outline"
            size="lg"
            className="font-medium px-8 py-3"
          >
            Load More ({filteredProducts.length - displayedProducts.length} remaining)
          </Button>
        </div>
      )}

      {/* Pagination Info */}
      {!loading && displayedProducts.length > 0 && (
        <div className="text-center mb-8">
          <p className="text-sm text-slate-600">
            Showing {displayedProducts.length} of {filteredProducts.length} products
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-teal-600" />
          </div>
          <h3 className="text-xl font-medium text-slate-800 mb-3">No products found</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Try adjusting your search terms or browse all products to discover our botanical skincare collection.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedType('all');
            }}
            className="font-medium"
          >
            View All Products
          </Button>
        </div>
      )}

      {/* Lippie & Lather Philosophy */}
      <div className="mt-20">
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-light text-white mb-6">The Lippie & Lather Philosophy</h3>
            <p className="text-white leading-relaxed mb-6">
              "Just as I've spent decades caring for others' bodies in the ICU, these products are created 
              with the same intention of healing and nurturing. Every ingredient is chosen for its beneficial 
              properties, every scent designed to uplift the spirit."
            </p>
            <p className="text-sm text-emerald-200 italic">
              Each bar of soap and tube of lip balm is hand-poured in small batches, ensuring quality 
              and freshness while maintaining the personal touch that makes Lippie & Lather special.
            </p>
            <p className="text-xs text-emerald-300 mt-4 font-medium">— Gina</p>
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
