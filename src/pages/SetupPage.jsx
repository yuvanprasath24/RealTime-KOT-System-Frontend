import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Building2, LoaderCircle } from "lucide-react";
import { Dashboard } from "./Dashboard";
import axios from "axios";

export function SetupPage() {
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!restaurantName.trim() || !restaurantAddress.trim()) return;

        setLoading(true);
        try {
            // Send the request using the initial token inside the headers
            const response = await axios.post('http://localhost:8080/api/restaurant/setup',
                {
                    restaurantName: restaurantName,
                    restaurantAddress: restaurantAddress

                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('APP_TOKEN')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );


            // Extract the FRESH token with the new restaurantId from your ApiResponse wrapper
            const freshToken = response.data.data.token;

            if (freshToken) {
                // OVERWRITE the old token with the fully credentialed multi-tenant token
                localStorage.setItem('APP_TOKEN', freshToken);
                // Onboarding complete! Safe to enter the dashboard environment
                navigate('/dashboard');
            }
        } catch (err) {
            console.error("Failed to complete business registration onboarding:", err);
            alert("Error setting up restaurant. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gray-100">
            <div className="pointer-events-none select-none blur-[1px]">
                <Dashboard />
            </div>

            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute inset-0 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-lg rounded-lg border-4 border-black bg-gray-200 p-6 shadow-2xl sm:p-8">
                    <div className="mb-8 flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-black text-white">
                            <Building2 size={26} />
                        </div>
                        <div>
                            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">Dashboard setup</p>
                            <h2 className="text-3xl font-bold text-black">Create your restaurant workspace</h2>
                            <p className="mt-2 text-sm font-medium text-gray-600">
                                Add your restaurant name to unlock the dashboard environment.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-sm font-bold uppercase text-gray-800">Restaurant Name</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g., Thalappakatti Biryani"
                                value={restaurantName}
                                onChange={(e) => setRestaurantName(e.target.value)}
                                className="mt-2 w-full rounded-lg border-2 border-black bg-white px-4 py-3 text-base font-semibold text-black placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-black/10"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold uppercase text-gray-800">Restaurant Address</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g., 123 Main Street, City"
                                value={restaurantAddress}
                                onChange={(e) => setRestaurantAddress(e.target.value)}
                                className="mt-2 w-full rounded-lg border-2 border-black bg-white px-4 py-3 text-base font-semibold text-black placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-black/10"
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !restaurantName.trim()}
                            className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-bold uppercase text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle size={18} className="animate-spin" />
                                    Initializing Workspace
                                </>
                            ) : (
                                <>
                                    Create Workspace & Launch
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
