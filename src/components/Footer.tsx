import React from 'react';
import { Heart, Phone, Mail, MapPin, Award, Share2, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900/90 backdrop-blur-md text-white pt-6 pb-4">
      <div className="w-full px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://hoangmaistarschool.edu.vn/storage/chu.png" 
                alt="Lễ Hội Mùa Xuân 2026" 
                className="h-20 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Lễ hội mùa xuân 2026 không chỉ là một sự kiện văn hóa mà còn là sợi dây kết nối, hun đúc tinh thần dân tộc và lan tỏa giá trị nhân văn cao đẹp
            </p>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 uppercase">Liên hệ</h4>
            <div className="space-y-4 text-slate-400 text-sm">
              <p className="font-semibold text-white">Trường Tiểu học, THCS và THPT Ngôi Sao Hoàng Mai</p>
              <p className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                Lô TH và PT, Khu đô thị Kim Văn - Kim Lũ, phường Định Công, Hà Nội.
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                Hotline: 1900-888-689
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                Email: tuyensinh@hoangmaistarschool.edu.vn
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Theo dõi chúng tôi</h4>
            <div className="flex gap-4">
              {[Award, Share2, Globe].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-center text-slate-500 text-xs">
          <p>© 2026 Lễ Hội Mùa Xuân. All rights reserved. Mọi đóng góp của bạn đều trân quý.</p>
        </div>
      </div>
    </footer>
  );
}
