import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Phone, ExternalLink, Navigation, Mail, User, MessageSquare, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MarketSchedule {
  id: string;
  name: string;
  location: string;
  address: string;
  schedule: string;
  nextDate: string;
  time: string;
  description: string;
  website?: string;
  phone?: string;
  status: 'upcoming' | 'regular' | 'seasonal';
}

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  website?: string;
  description: string;
  displayType: string;
  hours: string;
}

export default function WhereToFind() {
  // Removed activeTab state since we only show appointment content now
  const [scrollY, setScrollY] = useState(0);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    serviceType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample market schedule data - would come from data source
  const marketSchedule: MarketSchedule[] = [
    {
      id: 'downtown-farmers',
      name: 'Downtown Farmers Market',
      location: 'Main Street Plaza',
      address: '123 Main Street, Downtown',
      schedule: 'Every Saturday',
      nextDate: 'January 18, 2025',
      time: '8:00 AM - 2:00 PM',
      description: 'Our flagship market location with the largest selection of jewelry, Lippie & Lather products, and seasonal crafts.',
      website: 'https://downtownfarmersmarket.com',
      phone: '(555) 123-4567',
      status: 'upcoming'
    },
    {
      id: 'riverside-market',
      name: 'Riverside Artisan Market',
      location: 'Riverside Park',
      address: '456 River Road, Riverside',
      schedule: 'First Sunday of each month',
      nextDate: 'February 2, 2025',
      time: '10:00 AM - 4:00 PM',
      description: 'A curated artisan market featuring handmade goods, perfect for discovering unique pieces and custom commissions.',
      website: 'https://riversideartisans.org',
      status: 'regular'
    },
    {
      id: 'spring-festival',
      name: 'Spring Garden Festival',
      location: 'Community Gardens',
      address: '789 Garden Lane, Greenville',
      schedule: 'Annual Spring Event',
      nextDate: 'April 15-16, 2025',
      time: '9:00 AM - 5:00 PM',
      description: 'Special appearance at the annual garden festival, featuring plant collections and garden-inspired jewelry.',
      status: 'seasonal'
    },
    {
      id: 'holiday-bazaar',
      name: 'Holiday Artisan Bazaar',
      location: 'Community Center',
      address: '321 Center Street, Midtown',
      schedule: 'November - December',
      nextDate: 'November 2025',
      time: '10:00 AM - 6:00 PM',
      description: 'Holiday shopping destination with gift sets, custom orders, and limited edition seasonal pieces.',
      status: 'seasonal'
    }
  ];

  // Sample store locations - would come from data source
  const storeLocations: StoreLocation[] = [
    {
      id: 'healing-hands-spa',
      name: 'Healing Hands Spa & Wellness',
      address: '555 Wellness Way, Spa District',
      phone: '(555) 987-6543',
      website: 'https://healinghandsspa.com',
      description: 'Permanent display of Lippie & Lather products and select jewelry pieces in the spa retail area.',
      displayType: 'Lippie & Lather + Select Jewelry',
      hours: 'Mon-Sat 9AM-7PM, Sun 11AM-5PM'
    },
    {
      id: 'artisan-collective',
      name: 'The Artisan Collective',
      address: '888 Creative Commons, Arts District',
      phone: '(555) 456-7890',
      website: 'https://artisancollective.com',
      description: 'Rotating display of jewelry collections and seasonal craft pieces in this cooperative gallery space.',
      displayType: 'Jewelry + Rotating Crafts',
      hours: 'Tue-Sun 10AM-6PM, Closed Mondays'
    },
    {
      id: 'garden-center',
      name: 'Bloom & Grow Garden Center',
      address: '999 Plant Paradise Road, Garden District',
      phone: '(555) 234-5678',
      description: 'Therapeutic plant collections and garden-inspired jewelry available in the gift shop.',
      displayType: 'Plants + Garden Jewelry',
      hours: 'Daily 8AM-6PM'
    }
  ];

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light text-white mb-6">Where to Find Adorna Design</h2>
        <p className="text-lg text-rose-200 max-w-3xl mx-auto leading-relaxed">
          Connect with Gina and discover her latest creations at farmers markets, artisan shows, 
          and select retail partners. Each location offers a unique opportunity to experience 
          the full range of Adorna Design's handcrafted artistry.
        </p>
      </div>


      {/* Schedule Appointment - Always Visible */}
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-light text-white mb-4">Schedule an Appointment</h3>
          <p className="text-rose-200 mb-6">
            Visit the Studio with Gina to browse the collection and explore options for custom orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 text-white">
              <Phone className="w-4 h-4" />
              <a href="tel:843-408-3362" className="hover:text-rose-200 transition-colors">843-408-3362</a>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Mail className="w-4 h-4" />
              <a href="mailto:gina@adornadesign.art" className="hover:text-rose-200 transition-colors">gina@adornadesign.art</a>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitting(true);
              // Simulate form submission - in real implementation, this would send an email
              setTimeout(() => {
                setIsSubmitting(false);
                setSubmitStatus('success');
                // Reset form
                setAppointmentForm({
                  name: '',
                  email: '',
                  phone: '',
                  preferredDate: '',
                  preferredTime: '',
                  serviceType: '',
                  message: ''
                });
                setTimeout(() => setSubmitStatus('idle'), 3000);
              }, 1000);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={appointmentForm.name}
                    onChange={(e) => setAppointmentForm({...appointmentForm, name: e.target.value})}
                    className="w-full bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-md px-3 py-2"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    value={appointmentForm.email}
                    onChange={(e) => setAppointmentForm({...appointmentForm, email: e.target.value})}
                    className="w-full bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-md px-3 py-2"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                    className="w-full bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-md px-3 py-2"
                    placeholder="(843) 555-0123"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={appointmentForm.preferredDate}
                    onChange={(e) => setAppointmentForm({...appointmentForm, preferredDate: e.target.value})}
                    className="w-full bg-white/10 border border-white/30 text-white rounded-md px-3 py-2"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Preferred Time
                  </label>
                  <select
                    value={appointmentForm.preferredTime}
                    onChange={(e) => setAppointmentForm({...appointmentForm, preferredTime: e.target.value})}
                    className="w-full bg-white/10 border border-white/30 text-white rounded-md px-3 py-2"
                  >
                    <option value="" className="text-black">Select time</option>
                    <option value="morning" className="text-black">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon" className="text-black">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening" className="text-black">Evening (5 PM - 7 PM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Service Type
                  </label>
                  <select
                    value={appointmentForm.serviceType}
                    onChange={(e) => setAppointmentForm({...appointmentForm, serviceType: e.target.value})}
                    className="w-full bg-white/10 border border-white/30 text-white rounded-md px-3 py-2"
                  >
                    <option value="" className="text-black">Select service</option>
                    <option value="custom-jewelry" className="text-black">Custom Jewelry Commission</option>
                    <option value="private-showing" className="text-black">Private Jewelry Showing</option>
                    <option value="plant-consultation" className="text-black">Therapeutic Plant Consultation</option>
                    <option value="custom-furniture" className="text-black">Custom Furniture Design</option>
                    <option value="stained-glass" className="text-black">Stained Glass Project</option>
                    <option value="garden-design" className="text-black">Garden Design Consultation</option>
                    <option value="other" className="text-black">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Message
                </label>
                <textarea
                  value={appointmentForm.message}
                  onChange={(e) => setAppointmentForm({...appointmentForm, message: e.target.value})}
                  className="w-full bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-md px-3 py-2 h-24 resize-none"
                  placeholder="Tell Gina about your project or what you'd like to discuss..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-4 text-emerald-200">
                  Thank you! Your appointment request has been sent. Gina will contact you within 24 hours.
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting || !appointmentForm.name || !appointmentForm.email}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Appointment Request</span>
                  </div>
                )}
              </Button>
              
              <p className="text-xs text-rose-200 text-center">
                * This form will send an email to Gina. She typically responds within 24 hours.
              </p>
            </form>
          </div>
          
          {/* Farmers Market Calendar */}
          <div className="mt-12 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h4 className="text-xl font-light text-white mb-6 text-center">Upcoming Farmers Markets & Events</h4>
            <div className="text-center space-y-4">
              <div className="bg-amber-500/20 border border-amber-400/30 rounded-lg p-4">
                <Calendar className="w-8 h-8 text-amber-300 mx-auto mb-2" />
                <h5 className="font-medium text-white mb-2">Market Schedule</h5>
                <p className="text-amber-200 text-sm">
                  Market dates and locations are currently being finalized for the 2025 season.
                </p>
                <p className="text-amber-200 text-sm mt-2">
                  <strong>TBD - Coming Soon!</strong>
                </p>
              </div>
              <p className="text-rose-200 text-sm">
                Check back soon or schedule an appointment above to be notified of upcoming market appearances.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Markets & Events Content - keeping for future use */}
      {false && (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-light text-white mb-4">Upcoming Markets & Events</h3>
            <p className="text-rose-200">
              Visit Gina at these upcoming markets to see the latest collections and meet the artist behind the work.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {marketSchedule.map((market) => (
              <Card key={market.id} className="overflow-hidden bg-white/90 backdrop-blur-sm border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        {market.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-slate-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{market.location}</span>
                      </div>
                      <p className="text-xs text-slate-500">{market.address}</p>
                    </div>
                    <Badge 
                      variant={market.status === 'upcoming' ? 'default' : 'outline'}
                      className={
                        market.status === 'upcoming' ? 'bg-emerald-100 text-emerald-700' :
                        market.status === 'seasonal' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }
                    >
                      {market.status === 'upcoming' ? 'Next Up' : 
                       market.status === 'seasonal' ? 'Seasonal' : 'Regular'}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">
                          Schedule
                        </p>
                        <p className="text-sm text-slate-700 font-medium">{market.schedule}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">
                          Hours
                        </p>
                        <p className="text-sm text-slate-700 font-medium">{market.time}</p>
                      </div>
                    </div>

                    {market.nextDate && (
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">
                          Next Date
                        </p>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-emerald-600" />
                          <p className="text-sm text-emerald-700 font-semibold">{market.nextDate}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-2">
                        What to Expect
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {market.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {market.website && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={market.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Website
                          </a>
                        </Button>
                      )}
                      {market.phone && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`tel:${market.phone}`}>
                            <Phone className="w-3 h-3 mr-1" />
                            {market.phone}
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://maps.google.com/?q=${encodeURIComponent(market.address)}`} target="_blank" rel="noopener noreferrer">
                          <Navigation className="w-3 h-3 mr-1" />
                          Directions
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Hidden Retail Partners Content - keeping for future use */}
      {false && (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-light text-white mb-4">Retail Partners</h3>
            <p className="text-rose-200">
              Find Adorna Design products at these carefully selected retail partners who share our commitment to quality and artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {storeLocations.map((store) => (
              <Card key={store.id} className="overflow-hidden bg-white/90 backdrop-blur-sm border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      {store.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2 text-slate-600">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{store.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{store.hours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">
                        Available Products
                      </p>
                      <Badge variant="outline" className="border-slate-300 text-slate-600 text-xs">
                        {store.displayType}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-2">
                        About This Location
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {store.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {store.website && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={store.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Website
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <a href={`tel:${store.phone}`}>
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`} target="_blank" rel="noopener noreferrer">
                          <Navigation className="w-3 h-3 mr-1" />
                          Directions
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Hidden Appointment Content - keeping for future use */}
      {false && (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-light text-white mb-4">Schedule an Appointment</h3>
            <p className="text-rose-200 mb-6">
              Book a consultation with Gina to discuss custom commissions, private showings, or therapeutic plant consultations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-white">
                <Phone className="w-4 h-4" />
                <a href="tel:843-408-3362" className="hover:text-rose-200 transition-colors">843-408-3362</a>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Mail className="w-4 h-4" />
                <a href="mailto:gina@adornadesign.art" className="hover:text-rose-200 transition-colors">gina@adornadesign.art</a>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitting(true);
                // Simulate form submission - in real implementation, this would send an email
                setTimeout(() => {
                  setIsSubmitting(false);
                  setSubmitStatus('success');
                  // Reset form
                  setAppointmentForm({
                    name: '',
                    email: '',
                    phone: '',
                    preferredDate: '',
                    preferredTime: '',
                    serviceType: '',
                    message: ''
                  });
                  setTimeout(() => setSubmitStatus('idle'), 3000);
                }, 1000);
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={appointmentForm.name}
                      onChange={(e) => setAppointmentForm({...appointmentForm, name: e.target.value})}
                      className="w-full bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-md px-3 py-2"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      value={appointmentForm.email}
                      onChange={(e) => setAppointmentForm({...appointmentForm, email: e.target.value})}
                      className="w-full bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-md px-3 py-2"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={appointmentForm.phone}
                      onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                      className="w-full bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-md px-3 py-2"
                      placeholder="(843) 555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={appointmentForm.preferredDate}
                      onChange={(e) => setAppointmentForm({...appointmentForm, preferredDate: e.target.value})}
                      className="w-full bg-white/10 border border-white/30 text-white rounded-md px-3 py-2"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Preferred Time
                    </label>
                    <select
                      value={appointmentForm.preferredTime}
                      onChange={(e) => setAppointmentForm({...appointmentForm, preferredTime: e.target.value})}
                      className="w-full bg-white/10 border border-white/30 text-white rounded-md px-3 py-2"
                    >
                      <option value="" className="text-black">Select time</option>
                      <option value="morning" className="text-black">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon" className="text-black">Afternoon (12 PM - 5 PM)</option>
                      <option value="evening" className="text-black">Evening (5 PM - 7 PM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Service Type
                    </label>
                    <select
                      value={appointmentForm.serviceType}
                      onChange={(e) => setAppointmentForm({...appointmentForm, serviceType: e.target.value})}
                      className="w-full bg-white/10 border border-white/30 text-white rounded-md px-3 py-2"
                    >
                      <option value="" className="text-black">Select service</option>
                      <option value="custom-jewelry" className="text-black">Custom Jewelry Commission</option>
                      <option value="private-showing" className="text-black">Private Jewelry Showing</option>
                      <option value="plant-consultation" className="text-black">Therapeutic Plant Consultation</option>
                      <option value="custom-furniture" className="text-black">Custom Furniture Design</option>
                      <option value="stained-glass" className="text-black">Stained Glass Project</option>
                      <option value="garden-design" className="text-black">Garden Design Consultation</option>
                      <option value="other" className="text-black">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message
                  </label>
                  <textarea
                    value={appointmentForm.message}
                    onChange={(e) => setAppointmentForm({...appointmentForm, message: e.target.value})}
                    className="w-full bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-md px-3 py-2 h-24 resize-none"
                    placeholder="Tell Gina about your project or what you'd like to discuss..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-4 text-emerald-200">
                    Thank you! Your appointment request has been sent. Gina will contact you within 24 hours.
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting || !appointmentForm.name || !appointmentForm.email}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Send Appointment Request</span>
                    </div>
                  )}
                </Button>
                
                <p className="text-xs text-rose-200 text-center">
                  * This form will send an email to Gina. She typically responds within 24 hours.
                </p>
              </form>
            </div>
            
            {/* Farmers Market Calendar */}
            <div className="mt-12 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h4 className="text-xl font-light text-white mb-6 text-center">Upcoming Farmers Markets & Events</h4>
              <div className="text-center space-y-4">
                <div className="bg-amber-500/20 border border-amber-400/30 rounded-lg p-4">
                  <Calendar className="w-8 h-8 text-amber-300 mx-auto mb-2" />
                  <h5 className="font-medium text-white mb-2">Market Schedule</h5>
                  <p className="text-amber-200 text-sm">
                    Market dates and locations are currently being finalized for the 2025 season.
                  </p>
                  <p className="text-amber-200 text-sm mt-2">
                    <strong>TBD - Coming Soon!</strong>
                  </p>
                </div>
                <p className="text-rose-200 text-sm">
                  Check back soon or schedule an appointment above to be notified of upcoming market appearances.
                </p>
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
