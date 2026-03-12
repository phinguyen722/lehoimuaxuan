import React, { useEffect, useState } from 'react';
import { Heart, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, animate } from 'motion/react';

interface HeroProps {
  totalAmount: string;
  onOpenDonation: () => void;
}

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return Math.round(latest).toLocaleString('vi-VN');
  });

  useEffect(() => {
    const controls = animate(count, value, { 
      duration: 2,
      ease: "easeOut"
    });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function Hero({ totalAmount, onOpenDonation }: HeroProps) {
  // Parse totalAmount string (e.g., "241.300.000") to number
  const numericAmount = parseInt(totalAmount.replace(/\./g, ''), 10) || 0;

  return (
    <section className="w-full flex flex-col lg:grid lg:grid-cols-2 gap-8 items-stretch">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="order-1 lg:col-start-1 lg:row-start-1 lg:row-span-2 relative group flex flex-col h-full"
      >
        <div className="mb-4 flex items-center gap-2 shrink-0">
          <div className="w-1 h-4 bg-red-500 rounded-full"></div>
          <p className="text-sm font-bold text-slate-500 tracking-wider">Hiện trạng thực tế</p>
        </div>
        <div className="relative flex-1 min-h-[300px]">
          <div className="absolute -inset-4 bg-red-500/10 rounded-[2rem] blur-2xl group-hover:bg-red-500/20 transition-all duration-500"></div>
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://hoangmaistarschool.edu.vn/storage/anh-cau-1.png" 
              alt="Hiện trạng ngầm Pác Bó" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="order-2 lg:col-start-2 lg:row-start-1 flex flex-col h-full"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            Dự án thiện nguyện 2026
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] mb-6">
            Cầu Ngôi Sao Hoàng Mai <span className="text-red-600">(Ngầm Pác Bó)</span>
          </h1>

          <div className="flex items-center gap-2 text-slate-500 mb-6">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="font-semibold text-sm">Thôn Pác Làng, Xã Điềm He, Tỉnh Lạng Sơn</span>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8 max-w-lg">
            Cây cầu bắc qua sông Kỳ Cùng chiều dài 60m, rộng 4m hỗ trợ 6.634 nhân khẩu sinh sống hai bên bờ sông
          </p>
        </div>
      </motion.div>

      <div className="contents lg:flex lg:flex-row lg:items-center lg:gap-6 lg:col-start-2 lg:row-start-2 lg:mt-auto">
        <div className="order-3 lg:order-none bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-3xl shadow-xl shadow-red-500/5 border border-slate-100 flex flex-col items-center justify-center w-fit mx-auto lg:mx-0 mb-6 lg:mb-0">
          <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">Quyên góp tại đây</p>
          <img 
            src="https://hoangmaistarschool.edu.vn/storage/qr-tu-thien.svg" 
            alt="QR Quyên góp" 
            className="w-full max-w-[220px] h-auto object-contain rounded-lg"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="order-5 lg:order-none flex flex-col gap-4 w-full sm:w-auto flex-1 mt-6 lg:mt-0">
          <button 
            onClick={onOpenDonation}
            className="px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95 w-full"
          >
            Quyên góp ngay
          </button>
          <a 
            href="https://docs.google.com/spreadsheets/d/1wDy-YESyzyN36OqaapXAjBa7_7yO-0IAU8mknow2yX0/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-red-600 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all active:scale-95 text-center w-full"
          >
            Xem báo cáo
          </a>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="order-4 lg:order-none lg:col-span-2 lg:row-start-3 bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-xl shadow-red-500/5 border border-slate-100 relative overflow-hidden w-full flex flex-col items-center justify-center"
      >
        <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
        <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-4 text-center">Tổng số tiền quyên góp</p>
        <div className="flex items-baseline justify-center gap-2 sm:gap-4">
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] font-black text-red-600 tabular-nums leading-none whitespace-nowrap tracking-tight">
            <AnimatedNumber value={numericAmount} />
          </span>
          <span className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900 whitespace-nowrap">VND</span>
        </div>
      </motion.div>
    </section>
  );
}
