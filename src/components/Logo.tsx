export const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative flex items-center justify-center w-10 h-10">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
      
      {/* The Shield/Vault Shape */}
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full text-blue-500 drop-shadow-lg"
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" className="text-white" strokeWidth="2.5" />
      </svg>
    </div>
    
    <span className="text-2xl font-black tracking-tighter text-white">
      VAULT<span className="text-blue-500">-X</span>
    </span>
  </div>
);