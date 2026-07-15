export function showLogoutModal({}) {
    const executeLogout = () => {
        localStorage.removeItem('APP_TOKEN');
        sessionStorage.clear();
        window.location.href = 'http://localhost:8080/logout';
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
                <h3 className="text-lg font-bold text-slate-100">Confirm Sign Out</h3>
                <p className="text-slate-400 text-sm mt-2">
                    Are you sure you want to sign out of the dashboard? You will need to log back in to manage orders.
                </p>

                <div className="flex gap-3 mt-6 justify-end">
                    {/* Cancel Button (No) */}
                    <button
                        onClick={() => setShowLogoutModal(false)}
                        className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-850 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>

                    {/* Confirm Button (Yes) */}
                    <button
                        onClick={executeLogout}
                        className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}