import { useState, useEffect } from 'react';
import { Search, Sparkles, X, ZoomIn, Heart, ChevronLeft, ChevronRight, Palette, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [scrollY, setScrollY] = useState(0);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced color extraction from filenames, titles, and materials
  const extractColors = (artwork: Artwork): string[] => {
    const text = `${artwork.filename} ${artwork.title} ${artwork.materials}`.toLowerCase();
    const colors = [];
    
    // More comprehensive color detection
    if (text.includes('black')) colors.push('black');
    if (text.includes('white')) colors.push('white');
    if (text.includes('silver') || text.includes('metal')) colors.push('silver');
    if (text.includes('gold') || text.includes('brass')) colors.push('gold');
    if (text.includes('blue')) colors.push('blue');
    if (text.includes('red') || text.includes('rose')) colors.push('red');
    if (text.includes('green') || text.includes('emerald')) colors.push('green');
    if (text.includes('purple') || text.includes('violet')) colors.push('purple');
    if (text.includes('pink')) colors.push('pink');
    if (text.includes('brown') || text.includes('copper') || text.includes('leather') || text.includes('wood')) colors.push('brown');
    if (text.includes('orange')) colors.push('orange');
    if (text.includes('yellow')) colors.push('yellow');
    if (text.includes('bead') && !colors.length) colors.push('multicolor'); // Default for beaded items
    
    // If no colors detected, add 'natural' for items with natural materials
    if (colors.length === 0 && (text.includes('shell') || text.includes('stone') || text.includes('natural'))) {
      colors.push('natural');
    }
    
    return colors;
  };

  // Lightbox functions
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredArtworks.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredArtworks.length) % filteredArtworks.length);
  };

  const toggleFavorite = (filename: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(filename)) {
        newFavorites.delete(filename);
      } else {
        newFavorites.add(filename);
      }
      return newFavorites;
    });
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, filteredArtworks.length]);

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
    // Filter artworks based on search term, selected collection, and color
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

    if (selectedColor !== 'all') {
      filtered = filtered.filter(artwork => {
        const colors = extractColors(artwork);
        return colors.includes(selectedColor);
      });
    }

    setFilteredArtworks(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [searchTerm, selectedCollection, selectedColor, artworks]);

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

  // Get unique collections and colors for the filters
  const collections = ['all', ...new Set(artworks.map(artwork => artwork.collection))];
  const allColors = artworks.flatMap(artwork => extractColors(artwork));
  const uniqueColors = ['all', ...new Set(allColors)];
  
  // Enhanced color display mapping
  const colorDisplay: Record<string, { name: string; bgColor: string; textColor: string }> = {
    'all': { name: 'All Colors', bgColor: 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500', textColor: 'text-white' },
    'black': { name: 'Black', bgColor: 'bg-black', textColor: 'text-white' },
    'white': { name: 'White', bgColor: 'bg-white border border-gray-400', textColor: 'text-black' },
    'silver': { name: 'Silver', bgColor: 'bg-gray-400', textColor: 'text-white' },
    'gold': { name: 'Gold', bgColor: 'bg-yellow-500', textColor: 'text-yellow-900' },
    'blue': { name: 'Blue', bgColor: 'bg-blue-500', textColor: 'text-white' },
    'red': { name: 'Red', bgColor: 'bg-red-500', textColor: 'text-white' },
    'green': { name: 'Green', bgColor: 'bg-green-500', textColor: 'text-white' },
    'purple': { name: 'Purple', bgColor: 'bg-purple-500', textColor: 'text-white' },
    'pink': { name: 'Pink', bgColor: 'bg-pink-400', textColor: 'text-white' },
    'brown': { name: 'Brown', bgColor: 'bg-amber-700', textColor: 'text-white' },
    'orange': { name: 'Orange', bgColor: 'bg-orange-500', textColor: 'text-white' },
    'yellow': { name: 'Yellow', bgColor: 'bg-yellow-400', textColor: 'text-yellow-900' },
    'multicolor': { name: 'Multicolor', bgColor: 'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400', textColor: 'text-white' },
    'natural': { name: 'Natural', bgColor: 'bg-stone-500', textColor: 'text-white' },
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

        {/* Improved Filter System */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl">
          {/* Search and Clear */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white" />
              <Input
                placeholder="Search by name, materials, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-white/20 border-white/40 text-white placeholder-white/70 focus:border-white/60 focus:bg-white/25"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCollection('all');
                setSelectedColor('all');
              }}
              className="text-black bg-white/90 border-white hover:bg-white hover:text-black shrink-0 font-medium"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>

          {/* Filter Results Summary */}
          <div className="mb-4">
            <p className="text-sm text-white font-medium">
              Showing <span className="text-yellow-300">{filteredArtworks.length}</span> of {artworks.length} pieces
              {searchTerm && <span className="text-rose-300"> matching "{searchTerm}"</span>}
              {selectedCollection !== 'all' && <span className="text-blue-300"> in {selectedCollection}</span>}
              {selectedColor !== 'all' && <span className="text-green-300"> with {colorDisplay[selectedColor]?.name || selectedColor} colors</span>}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Collection Filter */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-white flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-300" />
                Collections
              </h4>
              <div className="flex flex-wrap gap-2">
                {collections.map((collection) => (
                  <Button
                    key={collection}
                    variant={selectedCollection === collection ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCollection(collection)}
                    className={`text-sm font-medium transition-all ${
                      selectedCollection === collection 
                        ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/30' 
                        : 'text-black bg-white/90 border-white hover:bg-white hover:text-black'
                    }`}
                  >
                    {collection === 'all' ? '✨ All Collections' : collection}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-white flex items-center">
                <Palette className="w-4 h-4 mr-2 text-pink-300" />
                Colors
              </h4>
              <div className="flex flex-wrap gap-2">
                {uniqueColors.map((color) => {
                  const displayInfo = colorDisplay[color] || { name: color, bgColor: 'bg-gray-400', textColor: 'text-white' };
                  return (
                    <Button
                      key={color}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                      className={`text-sm font-medium flex items-center gap-2 transition-all ${
                        selectedColor === color 
                          ? 'ring-2 ring-pink-400 border-pink-400 bg-pink-600 text-white shadow-lg shadow-pink-500/20' 
                          : 'text-black bg-white/90 border-white hover:bg-white hover:text-black'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${displayInfo.bgColor} border-2 border-white/40 shadow-sm`}></div>
                      <span>{displayInfo.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
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
          {displayedArtworks.map((artwork, index) => (
          <Card key={artwork.filename} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/10 border-white/20 backdrop-blur-sm">
            <div className="aspect-[4/5] relative overflow-hidden cursor-pointer group">
              <img
                src={artwork.image}
                alt={artwork.title}
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                onClick={() => openLightbox(index)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-bold">{artwork.title}</p>
                  <p className="text-white/90 text-xs">{artwork.collection}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {extractColors(artwork).map((color) => (
                      <Badge key={color} className={`text-xs px-2 py-0.5 ${colorDisplay[color]?.bgColor || 'bg-gray-400'} ${colorDisplay[color]?.textColor || 'text-white'}`}>
                        {colorDisplay[color]?.name || color}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <p className="text-white/70 text-xs">Photo: Danielle Osfalg</p>
                </div>
                <div className="absolute top-4 left-4 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(artwork.filename);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      favorites.has(artwork.filename) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(artwork.filename) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => openLightbox(index)}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
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

      {/* Lightbox Modal */}
      {lightboxOpen && filteredArtworks.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            {filteredArtworks.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Image and Details */}
            <div className="flex flex-col lg:flex-row items-center gap-8 max-w-full max-h-full">
              {/* Main Image */}
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={filteredArtworks[lightboxIndex]?.image}
                  alt={filteredArtworks[lightboxIndex]?.title}
                  className="max-w-full max-h-[70vh] lg:max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Artwork Details */}
              <div className="flex-shrink-0 max-w-md lg:max-w-sm p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {filteredArtworks[lightboxIndex]?.title}
                      </h3>
                      <p className="text-rose-200 text-sm mb-1">
                        {filteredArtworks[lightboxIndex]?.collection}
                      </p>
                      <p className="text-white/60 text-xs">
                        {filteredArtworks[lightboxIndex]?.year}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(filteredArtworks[lightboxIndex]?.filename)}
                      className={`p-2 rounded-full transition-colors ${
                        favorites.has(filteredArtworks[lightboxIndex]?.filename) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.has(filteredArtworks[lightboxIndex]?.filename) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">Materials</h4>
                      <p className="text-white/80 text-sm">
                        {filteredArtworks[lightboxIndex]?.materials}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">Dimensions</h4>
                      <p className="text-white/80 text-sm">
                        {filteredArtworks[lightboxIndex]?.dimensions}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Colors</h4>
                      <div className="flex flex-wrap gap-1">
                        {extractColors(filteredArtworks[lightboxIndex]).map((color) => (
                          <Badge key={color} className={`text-xs px-2 py-1 ${colorDisplay[color]?.bgColor || 'bg-gray-400'} ${colorDisplay[color]?.textColor || 'text-white'}`}>
                            {colorDisplay[color]?.name || color}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Artist Statement</h4>
                      <p className="text-white/80 text-sm leading-relaxed italic">
                        "{filteredArtworks[lightboxIndex]?.artistStatement}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <div className="flex flex-col space-y-2">
                      <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">
                        <Heart className="w-4 h-4 mr-2" />
                        Request Custom Piece
                      </Button>
                      <p className="text-xs text-white/60 text-center">
                        Photo by Danielle Osfalg
                      </p>
                    </div>
                  </div>

                  {/* Image Counter */}
                  {filteredArtworks.length > 1 && (
                    <div className="text-center">
                      <p className="text-xs text-white/60">
                        {lightboxIndex + 1} of {filteredArtworks.length}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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