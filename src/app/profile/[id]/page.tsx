export default async function UserProfile({ params }: any) {
    const { id } = await params;
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-linear-to-br from-gray-900 to-gray-800">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full">
                <h1 className="text-4xl font-bold mb-6 text-center text-indigo-400">Profile Page</h1>
                <div className="border-b-2 border-indigo-600 pb-4 mb-4">
                    <p className="text-lg text-gray-300 text-center">User name:</p>
                    <p className="font-bold text-2xl text-blue-400 text-center mt-2">{id}</p>
                </div>
                <div className="text-center text-gray-400 text-sm">
                    <p>Welcome back! This is your profile page.</p>
                </div>
            </div>
        </div>
    );
}