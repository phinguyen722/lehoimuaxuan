import React from 'react';
import { Heart } from 'lucide-react';

interface HeaderProps {
  onOpenDonation: () => void;
}

export default function Header({ onOpenDonation }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="w-full px-4 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://hoangmaistarschool.edu.vn/storage/chu.png" 
            alt="Lễ Hội Mùa Xuân 2026" 
            className="h-16 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <nav className="flex items-center gap-8">
          <button 
            onClick={onOpenDonation}
            className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
          >
            Quyên góp ngay
          </button>
        </nav>
      </div>
    </header>
  );
}
