import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

export function OAuth2RedirectHandler() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const needsSetup = searchParams.get('setup') === 'true';

        if (token) {
            // Save the initial (restaurant-less) token so the setup API can use it
            localStorage.setItem('APP_TOKEN', token);
            
            if (needsSetup) {
                // Route them directly to your onboarding setup page
                navigate('/setup');
            } else {
                // Old user with active restaurant profile goes straight to main screen
                navigate('/dashboard');
            }
        } else {
            navigate('/login?error=auth_fail');
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
            <p className="text-slate-500 animate-pulse">Securing workspace session...</p>
        </div>
    );
}