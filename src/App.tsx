import React, { useEffect, useRef, useState } from 'react';
import { Phone, MapPin, Clock, Mail, Smartphone, AlertCircle, RefreshCw } from 'lucide-react';

function App() {
  const [widgetStatus, setWidgetStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleIframeLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setWidgetStatus('loaded');
  };

  const handleIframeError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setWidgetStatus('error');
  };

  const retryLoading = () => {
    setWidgetStatus('loading');
    // Set timeout for iframe loading (10 seconds)
    timeoutRef.current = setTimeout(() => {
      setWidgetStatus('error');
    }, 10000);
  };

  useEffect(() => {
    // Set initial timeout
    timeoutRef.current = setTimeout(() => {
      setWidgetStatus('error');
    }, 10000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Fix 4 You Cellular</h1>
                <p className="text-sm text-blue-600 font-medium">Professional Device Repair</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#track" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Track Repair
             
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Device Repair
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Enter your repair ticket number below to get real-time updates on your device repair status. 
            Our expert technicians are working hard to get your device back to you quickly.
          </p>
        </div>
      </section>

      {/* Tracking Widget Section */}
      <section id="track" className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Repair Status Tracker</h3>
              <p className="text-blue-100">Enter your tracking information to view repair progress</p>
            </div>
            
            {/* Widget Container */}
            <div className="p-6">
              <div className="min-h-[600px] w-full bg-gray-50 rounded-lg border border-gray-200 relative overflow-hidden">
                {widgetStatus === 'loading' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading repair tracking system...</p>
                    </div>
                  </div>
                )}
                
                {widgetStatus === 'error' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                    <div className="text-center max-w-md">
                      <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Error</h3>
                      <p className="text-gray-600 mb-6">
                        Unable to load the repair tracking system. Please try again.
                      </p>
                      <button
                        onClick={retryLoading}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry Loading
                      </button>
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 font-medium mb-2">Alternative Options:</p>
                        <div className="space-y-2 text-sm text-blue-700">
                          <p>• Call us directly at <a href="tel:+1234567890" className="font-medium underline">(123) 456-7890</a></p>
                          <p>• Email us at <a href="mailto:support@fix4youcellular.com" className="font-medium underline">support@fix4youcellular.com</a></p>
                          <p>• Visit our store location in Fraser, MI</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* RepairDesk widget iframe */}
                <iframe
                  src="/widget.html"
                  className="w-full h-full min-h-[600px] border-0"
                  title="Repair Tracking System"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  style={{ minHeight: '600px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Turnaround</h3>
              <p className="text-gray-600">Most repairs completed within 24-48 hours with quality guaranteed.</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Technicians</h3>
              <p className="text-gray-600">Certified professionals with years of experience in device repair.</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">All Devices</h3>
              <p className="text-gray-600">We repair phones, tablets, laptops, and other electronic devices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-xl text-gray-600">Get in touch with our friendly support team</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-2">Monday - Saturday</p>
              <a href="tel:+1234567890" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                (123) 456-7890
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-2">24/7 Support</p>
              <a href="mailto:support@fix4youcellular.com" className="text-blue-600 font-medium hover:text-blue-700 transition-colors break-all">
                support@fix4youcellular.com
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm mb-2">Fraser Location</p>
              <p className="text-blue-600 font-medium">
                123 Main Street<br />
                Fraser, MI 48026
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Store Hours</h3>
              <div className="text-gray-600 text-sm space-y-1">
                <p>Mon-Fri: 9AM-7PM</p>
                <p>Saturday: 10AM-6PM</p>
                <p className="text-red-600 font-medium">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Fix 4 You Cellular</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Professional device repair services with quality guarantee and quick turnaround times.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• Screen Replacement</li>
                <li>• Battery Replacement</li>
                <li>• Water Damage Repair</li>
                <li>• Charging Port Repair</li>
                <li>• Software Issues</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#track" className="text-gray-400 hover:text-white transition-colors">
                    Track Your Repair
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                    Call for Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Fix 4 You Cellular. All rights reserved. | Professional Device Repair Services
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;