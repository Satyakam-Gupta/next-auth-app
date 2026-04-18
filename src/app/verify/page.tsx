'use client';

export default function VerifyPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">An Email Has Been Sent</h1>
        <p className="text-lg font-semibold text-gray-700 mb-4">Verify Your Account</p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-gray-600 text-sm">
            Please click the verification link sent to your email address to verify your account.
          </p>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            If you don't see the email, please check your spam folder.
          </p>
          <p className="text-xs text-gray-400">
            It may take a few minutes for the verification email to arrive.
          </p>
        </div>
      </div>
    </div>
  );
}
