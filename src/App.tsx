/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DonationTable from './components/DonationTable';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode } from 'lucide-react';

interface Donation {
  date: string;
  class: string;
  department: string;
  id: string;
  name: string;
  amount: string;
  method: string;
}

const SHEET_ID = '1wDy-YESyzyN36OqaapXAjBa7_7yO-0IAU8mknow2yX0';
const GID = '233678653';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

export default function App() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [totalAmount, setTotalAmount] = useState('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListQrOpen, setIsListQrOpen] = useState(true);

  const fetchData = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const response = await fetch(`${CSV_URL}&t=${Date.now()}`); // Add timestamp to bypass cache
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('File Google Sheet đang ở chế độ riêng tư. Vui lòng chia sẻ ở chế độ "Bất kỳ ai có liên kết đều có thể xem".');
        }
        throw new Error('Không thể tải dữ liệu từ Google Sheet.');
      }

      const csvText = await response.text();
      const rows = csvText.split('\n').map(line => {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
          } else {
            current += char;
          }
        }
        result.push(current);
        return result;
      });

      // Extract Total Amount from Row 2 (Index 1), Column J (Index 9)
      if (rows.length > 1 && rows[1][9]) {
        setTotalAmount(rows[1][9].trim());
      }

      // Parse Donations starting from Row 4 (Index 3)
      const parsedDonations: Donation[] = rows.slice(3)
        .filter(row => row.length >= 10 && row[0]?.trim() !== '')
        .map(row => ({
          date: row[0]?.trim() || '',
          class: row[5]?.trim() || '',
          department: row[6]?.trim() || '',
          id: '', 
          name: row[8]?.trim() || '',
          amount: row[9]?.trim() || '0',
          method: 'CK',
        }));

      // Sort by date descending (newest first)
      const sortedDonations = [...parsedDonations].sort((a, b) => {
        const parseDate = (dateStr: string) => {
          const [datePart, timePart] = dateStr.split(' ');
          const [day, month, year] = datePart.split('/').map(Number);
          const [hour, minute, second] = timePart ? timePart.split(':').map(Number) : [0, 0, 0];
          return new Date(year, month - 1, day, hour, minute, second).getTime();
        };
        return parseDate(b.date) - parseDate(a.date);
      });

      setDonations(sortedDonations);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      if (isInitial) setError(err.message);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);
    
    // Set up polling every 30 seconds for real-time updates
    const intervalId = setInterval(() => {
      fetchData(false);
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen">
      <Header onOpenDonation={() => setIsModalOpen(true)} />
      <main className="w-full px-4 lg:px-8 py-8 grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2">
          <Hero 
            totalAmount={totalAmount} 
            onOpenDonation={() => setIsModalOpen(true)} 
          />
        </div>
        <div className="xl:col-span-1">
          <DonationTable 
            donations={donations} 
            loading={loading} 
            error={error} 
          />
        </div>
      </main>
      <Footer />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[2.5rem] shadow-2xl max-w-6xl w-full overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100/80 backdrop-blur-sm text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="p-6 md:p-10">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Hướng dẫn quyên góp</h3>
                  <p className="text-slate-500 text-base">Quét mã QR hoặc thực hiện chuyển khoản theo thông tin dưới đây</p>
                </div>
                
                <div className="relative rounded-3xl overflow-hidden border-4 border-slate-100 shadow-xl bg-slate-50">
                  <img 
                    src="https://hoangmaistarschool.edu.vn/storage/qr.png" 
                    alt="Mã QR Quyên góp" 
                    className="w-full h-auto block"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-100">
                  <p className="text-sm text-red-600 font-bold text-center leading-relaxed">
                    Mọi đóng góp của quý vị đều được công khai minh bạch trên hệ thống. <br />
                    Trân trọng cảm ơn tấm lòng vàng của quý vị!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isListQrOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 left-4 z-40 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200 flex flex-col items-center"
          >
            <button 
              onClick={() => setIsListQrOpen(false)}
              className="absolute -top-3 -right-3 bg-white border border-slate-200 text-slate-500 hover:text-red-600 rounded-full p-1.5 shadow-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <QrCode className="w-4 h-4 text-red-600" />
              <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest text-center max-w-[140px]">
                Chi tiết danh sách ủng hộ
              </p>
            </div>
            <img 
              src="https://hoangmaistarschool.edu.vn/storage/qr-ver2.png" 
              alt="QR Sao kê" 
              className="w-24 h-24 object-contain rounded-xl border border-slate-100 bg-white p-1"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
