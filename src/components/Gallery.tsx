import { useState, useEffect } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loadEarrings } from '../utils/loadEarrings';

interface Artwork {
  filename: string;
  title: string;
  medium: string;
  materials: string;
  dimensions: string;
  artistStatement: string;
  image: string;
  collection: string;
  year: string;
}

export default function Gallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [displayedArtworks, setDisplayedArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to organize artworks into collections (commented out as not currently used)
  // const getCollectionFromMaterial = (material: string): string => {
  //   if (!material) return 'Signature Collection';
  //   
  //   material = material.toLowerCase();
  //   if (material.includes('bead') || material.includes('pearl')) return 'Beaded Collection';
  //   if (material.includes('silver') && (material.includes('wire') || material.includes('metal'))) return 'Silver Series';
  //   if (material.includes('copper') || material.includes('brass')) return 'Signature Collection';
  //   if (material.includes('wood') || material.includes('leather') || material.includes('shell') || material.includes('seashell')) return 'Natural Elements';
  //   
  //   return 'Signature Collection';
  // };

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        console.log("Gallery: Fetching artworks...");
        setLoading(true);
        const data = await loadEarrings();
        console.log("Gallery: Received data:", data ? data.length : 0, "items");
        
        if (!data || data.length === 0) {
          throw new Error("No artwork data returned");
        }
        
        // Data is already in the correct format
        setArtworks(data);
        setFilteredArtworks(data);
        setError(null);
      } catch (error) {
        console.error('Gallery: Error loading artworks:', error);
        setError(error instanceof Error ? error.message : "Unknown error loading artwork");
        
        // Fallback to placeholder data
        const placeholderData: Artwork[] = [
          {
            filename: 'rose_gold_cascade',
            title: 'Cascade of Light',
            medium: 'Wearable Sculpture',
            materials: 'Sterling Silver, Rose Gold, Light',
            dimensions: '2.5" × 0.8"',
            artistStatement: 'An exploration of how precious metals can capture and reflect the ephemeral quality of falling light. Each drop represents a moment suspended in time.',
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=600&fit=crop',
            collection: 'Luminous Series',
            year: '2024'
          },
          // Add more placeholder items as needed
        ];
        
        setArtworks(placeholderData);
        setFilteredArtworks(placeholderData);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    // Filter artworks based on search term and selected collection
    let filtered = [...artworks];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(artwork => 
        artwork.title.toLowerCase().includes(search) || 
        artwork.materials.toLowerCase().includes(search) ||
        artwork.artistStatement.toLowerCase().includes(search)
      );
    }

    if (selectedCollection !== 'all') {
      filtered = filtered.filter(artwork => 
        artwork.collection === selectedCollection
      );
    }

    setFilteredArtworks(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [searchTerm, selectedCollection, artworks]);

  // Update displayed artworks based on pagination
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    setDisplayedArtworks(filteredArtworks.slice(startIndex, endIndex));
  }, [filteredArtworks, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const hasMoreItems = currentPage < totalPages;

  const loadMore = () => {
    if (hasMoreItems) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Get unique collections for the filter
  const collections = ['all', ...new Set(artworks.map(artwork => artwork.collection))];

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
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Gallery of Works</h2>
          <p className="text-rose-200">
            Explore our collection of handcrafted wearable art pieces
          </p>
        </div>

        {/* Debug Info */}
        {error && (
          <div className="bg-red-50 text-red-800 p-2 rounded text-sm mb-4">
            Error: {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-auto min-w-[150px] max-w-full text-sm"
            />
          </div>
          
          <div className="flex overflow-x-auto no-scrollbar space-x-2 pb-1">
            {collections.map((collection) => (
              <Button
                key={collection}
                variant={selectedCollection === collection ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCollection(collection)}
                className="whitespace-nowrap text-xs sm:text-sm"
              >
                {collection === 'all' ? 'All Collections' : collection}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <>
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Loading our beautiful pieces...</p>
          </div>
          
          {/* Loading Skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                <div className="aspect-[4/5] bg-slate-200"></div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Gallery Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedArtworks.map((artwork) => (
          <Card key={artwork.filename} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src={artwork.image}
                alt={artwork.title}
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">{artwork.title}</p>
                  <p className="text-white/80 text-xs">{artwork.collection}</p>
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
      {!loading && displayedArtworks.length > 0 && hasMoreItems && (
        <div className="text-center mb-12">
          <Button
            onClick={loadMore}
            variant="outline"
            size="lg"
            className="font-medium px-8 py-3"
          >
            Load More ({filteredArtworks.length - displayedArtworks.length} remaining)
          </Button>
        </div>
      )}

      {/* Pagination Info */}
      {!loading && displayedArtworks.length > 0 && (
        <div className="text-center mb-8">
          <p className="text-sm text-slate-600">
            Showing {displayedArtworks.length} of {filteredArtworks.length} pieces
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredArtworks.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-medium text-slate-800 mb-3">No artworks found</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Try adjusting your search terms or explore different collections to discover more pieces.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCollection('all');
            }}
            className="font-medium"
          >
            View All Artworks
          </Button>
        </div>
      )}

      {/* Collection Note */}
      <div className="mt-20 text-center">
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <Sparkles className="w-8 h-8 text-rose-400 mx-auto mb-4" />
          <p className="text-sm text-white leading-relaxed italic">
            "Each piece in this collection represents a dialogue between my hands and the materials, 
            a conversation that happens in the quiet moments between healing others and creating beauty. 
            These are not just accessories—they are wearable meditations on the intersection of art and life."
          </p>
          <p className="text-xs text-rose-200 mt-4 font-medium">— Gina</p>
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