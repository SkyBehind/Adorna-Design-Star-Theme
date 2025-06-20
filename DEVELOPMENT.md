# 🛠️ Development Guide

## Project Overview

Adorna Design is a modern React portfolio website built with performance and user experience in mind. This guide covers development workflows, architecture decisions, and maintenance procedures.

## Architecture

### Frontend Stack
- **React 18** - Component-based UI library
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library

### Key Components

#### App.tsx (Main Carousel)
- Manages the front page carousel state
- Handles section transitions and navigation
- Controls preview image cycling
- Responsive design with mobile-specific optimizations

#### Gallery.tsx (Jewelry Collection)
- Loads earring data from CSV files
- Implements pagination (12 items per page)
- Category filtering system
- Lazy loading for performance

#### LippieAndLather.tsx (Skincare Products)
- Product filtering by type and search
- Pagination (8 items per page)
- JSON-based product data

#### About.tsx (Artist Biography)
- Static content component
- Artist profile and philosophy
- Clean, readable layout

### Data Management

#### Jewelry Data
- **CSV Format**: `public/data/earring_attributes.csv`
- **Descriptions**: `public/data/earring_descriptions.txt`
- **Categories**: Automatically assigned based on materials and themes

#### Product Categories
```javascript
// Auto-categorization logic in loadEarrings.js
- Dice: Gaming/dice themes
- Beaded Collection: Beads or pearls
- Silver Series: Silver wire earrings
- Signature Collection: Brass/copper (default)
- Natural Elements: Wood, leather, shells
- Ocean Whispers: Blue/green colors, ocean themes
```

#### Skincare Data
- **JSON Format**: `public/data/soap_products.json`
- **Fallback**: Hardcoded products if JSON fails to load

## Performance Optimizations

### Image Loading
- **Lazy Loading**: `loading="lazy"` on all gallery images
- **Photography Credits**: Overlay attribution to Danielle Osfalg
- **Responsive Images**: Optimized for different screen sizes

### Pagination
- **Gallery**: 12 items initially, "Load More" functionality
- **Lippie & Lather**: 8 items initially
- **State Management**: Tracks current page and total items

### Loading States
- **Skeleton Loading**: Animated placeholders during data fetch
- **Conditional Rendering**: Hide content during loading
- **Error Handling**: Graceful fallbacks for missing data

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:6464
```

### Code Quality
```bash
# Type checking
npm run build  # Runs TypeScript compiler

# Linting
npm run lint

# Preview production build
npm run preview
```

### Docker Development
```bash
# Build and run container
./deploy.sh

# View logs
docker compose logs -f

# Stop container
docker compose down
```

## Configuration Files

### vite.config.ts
- Server configuration for Docker compatibility
- CORS settings for external domains
- Host binding to 0.0.0.0
- Allowed hosts configuration

### tailwind.config.js
- Custom color palette
- Component-specific utilities
- Responsive breakpoints

### docker-compose.yaml
- Development environment configuration
- Port mapping (default 6464)
- Environment variables

## Adding New Content

### New Jewelry Pieces
1. Add images to `public/images/`
2. Update `public/data/earring_attributes.csv`:
   ```csv
   Filename,Material,Color Palette,Shape / Structure,Theme or Motif,Artisan Style,Size,Occasion,Closure Type
   new_earring.jpg,"Silver, Wire","Silver, Blue",Round,Abstract,Minimalist,Medium,Everyday Wear,Hook
   ```
3. Add description to `public/data/earring_descriptions.txt`:
   ```
   new_earring.jpg: Beautiful handcrafted silver earrings with blue accents.
   ```

### New Skincare Products
1. Add images to `public/images/`
2. Update `public/data/soap_products.json`:
   ```json
   {
     "id": "new-product",
     "name": "Product Name",
     "type": "soap",
     "scent": "Lavender",
     "ingredients": ["Olive Oil", "Lavender"],
     "benefits": "Moisturizing and calming",
     "description": "Hand-poured with organic ingredients",
     "image": "/images/new-product.jpg",
     "collection": "Botanical Bliss"
   }
   ```

## Mobile Optimizations

### Logo Display
- **Conditional Inversion**: White logo on jewelry section mobile view
- **Dynamic Styling**: Based on current carousel section

### Navigation
- **Mobile Menu**: Grid layout with better contrast
- **Touch-Friendly**: Larger tap targets
- **Readable Text**: Improved contrast ratios

### Responsive Images
- **Aspect Ratios**: Consistent 4:5 ratio for gallery items
- **Hover Effects**: Disabled on touch devices
- **Loading States**: Optimized for slower connections

## Deployment

### Docker Configuration
- **Development Mode**: Runs Vite dev server
- **Host Binding**: 0.0.0.0 for external access
- **Port Configuration**: Configurable via environment variables

### Deploy Script Features
- **Interactive Port Selection**: Default 6464, customizable
- **Port Availability Check**: Prevents conflicts
- **Container Management**: Automatic cleanup and restart
- **Health Checks**: Verifies successful deployment

## Troubleshooting

### Common Issues

**Build Failures**
- Check for TypeScript errors: `npm run build`
- Verify all imports are correct
- Ensure image paths exist

**Docker Issues**
- Port conflicts: Use `./deploy.sh` to select different port
- Container won't start: Check logs with `docker compose logs -f`
- Build failures: Clear cache with `docker system prune -f`

**Performance Issues**
- Large images: Optimize image files before adding
- Slow loading: Check network tab in browser dev tools
- Memory usage: Monitor component re-renders

### Debug Commands
```bash
# Check container status
docker ps

# View application logs
docker compose logs -f adorna-design

# Check port usage
lsof -i :6464

# Restart container
docker compose restart

# Rebuild without cache
docker compose build --no-cache
```

## Code Style Guidelines

### Component Structure
- Use functional components with hooks
- TypeScript interfaces for props
- Consistent naming conventions
- Single responsibility principle

### CSS Classes
- Tailwind utility classes preferred
- Responsive design with mobile-first approach
- Consistent spacing and typography
- Semantic class names where needed

### File Organization
- Components in logical folders
- Shared utilities in `/src/utils/`
- Type definitions with interfaces
- Clear import/export patterns

## Future Enhancements

### Potential Features
- Image compression during build
- SEO meta tags and structured data
- Analytics integration
- Contact form functionality
- Blog/news section
- Enhanced image galleries with zoom

### Performance Improvements
- WebP image format support
- Service worker for offline capability
- CDN integration for images
- Progressive image loading

### Accessibility
- Alt text for all images
- Keyboard navigation
- Screen reader compatibility
- High contrast mode support

---

*This development guide ensures maintainable, scalable code that honors the artistic vision while providing excellent user experience.*