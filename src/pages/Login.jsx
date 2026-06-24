import { useState } from 'react';
import { Smartphone, Monitor, Zap, BarChart3 } from 'lucide-react';
import './Login.css';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    window.location.href = "http://localhost:8080/oauth2/authorization/google";

    console.log('Google Sign-In initiated');
  };

  const features = [
    {
      id: 1,
      title: 'Contactless QR Menu',
      description: 'Digital menus at your fingertips',
      icon: Smartphone,
    },
    {
      id: 2,
      title: 'Mobile-to-Kitchen Sync',
      description: 'Instant order routing',
      icon: Zap,
    },
    {
      id: 3,
      title: 'Sales & Analytics Dashboard',
      description: 'Track revenue growth daily',
      icon: BarChart3,
    },
    {
      id: 4,
      title: 'Real-time Digital KOT',
      description: 'Kitchen orders in real-time',
      icon: Monitor,
    },
    {
      id: 5,
      title: 'Real-time Digital KOT',
      description: 'Kitchen orders in real-time',
      icon: Monitor,
    },
    {
      id: 6,
      title: 'Sales & Analytics Dashboard',
      description: 'Track revenue growth daily',
      icon: BarChart3,
    },
    {
      id: 7,
      title: 'Contactless QR Menu',
      description: 'Digital menus at your fingertips',
      icon: Smartphone,
    },
    {
      id: 8,
      title: 'Mobile-to-Kitchen Sync',
      description: 'Instant order routing',
      icon: Zap,
    }
  ];

  return (
    <div className="login-page">
      {/* Background Masonry Grid */}
      <div className="login-background" aria-hidden="true">
        <div className="login-background-gradient" />

        {/* Masonry Grid Container */}
        <div className="login-feature-grid">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="login-feature-card"
              >
                <div className="login-feature-icon">
                  <IconComponent className="login-feature-icon-svg" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="login-feature-title">{feature.title}</h3>
                  <p className="login-feature-description">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Central Login Card */}
      <div className="login-shell">
        <div className="login-card-wrap">
          <div className="login-card">
            {/* Header Section */}
            <div className="login-card-header">
              <h1 className="login-title">
                Jump back into your kitchen!
              </h1>
              <p className="login-subtitle">
                Welcome back, Chef
              </p>
            </div>

            {/* Profile Section */}
            <div className="login-card-body">
              
              {/* User Profile Avatar */}
              {/* <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl font-semibold">RC</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-900 text-base truncate">
                    Restaurant Chef
                  </h2>
                  <p className="text-gray-600 text-sm truncate">
                    chef@restaurant.com
                  </p>
                </div>
              </div> */}

              {/* Continue Button */}
              {/* <button
                onClick={() => {
                  console.log('Continue clicked');
                }}
                className="w-full py-3 px-4 bg-[#FC8019] hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>Continue</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button> */}

              {/* Divider */}
              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div> */}

              {/* Google Sign-In Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="login-google-button"
              >
                <svg className="login-google-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Footer Section */}
            <div className="login-card-footer">
              <p className="login-terms">
                By continuing, you agree to our{' '}
                <a href="#" className="login-link">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="login-link">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const RestaurantLogin = Login;

export default Login;
