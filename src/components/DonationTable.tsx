import React, { useEffect, useState } from 'react';
import { Search, FileSpreadsheet, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

interface Donation {
  date: string;
  class: string;
  department: string;
  id: string;
  name: string;
  amount: string;
  method: string;
}

interface DonationTableProps {
  donations: Donation[];
  loading: boolean;
  error: string | null;
}

export default function DonationTable({ donations, loading, error }: DonationTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredDonations = donations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDonations = filteredDonations.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <section className="w-full">
      <div className="mb-6 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[2px] w-12 bg-red-500"></div>
            <span className="text-red-500 font-bold text-xs uppercase tracking-wider">Dữ liệu công khai</span>
          </div>
          <h2 className="text-2xl 2xl:text-3xl font-extrabold text-slate-900 leading-tight">Danh Sách Ủng Hộ Chi Tiết</h2>
        </div>
        
        <div className="flex items-center gap-2 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm tên, nội dung..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 w-full"
            />
          </div>
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors whitespace-nowrap">
            <FileSpreadsheet className="w-4 h-4 text-green-600" />
            <span className="hidden sm:inline">Xuất Excel</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 text-red-700">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="font-bold mb-1">Lỗi truy cập dữ liệu</p>
            <p className="text-sm">{error}</p>
            <div className="mt-4 p-4 bg-white rounded-xl border border-red-200 text-slate-600 text-xs">
              <p className="font-bold mb-2 text-slate-900">Hướng dẫn khắc phục:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Mở file Google Sheet của bạn.</li>
                <li>Nhấn nút <strong>Chia sẻ (Share)</strong> ở góc trên bên phải.</li>
                <li>Trong mục "Quyền truy cập chung", chọn <strong>Bất kỳ ai có liên kết (Anyone with the link)</strong>.</li>
                <li>Đảm bảo quyền là <strong>Người xem (Viewer)</strong>.</li>
                <li>Tải lại trang này.</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-red-500" />
            <p className="text-sm font-medium">Đang tải dữ liệu từ Google Sheet...</p>
          </div>
        ) : filteredDonations.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse block sm:table min-w-[600px] xl:min-w-0">
                <thead className="hidden sm:table-header-group">
                  <tr className="bg-white/30 border-b border-slate-100">
                    <th className="px-4 sm:px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ngày tháng</th>
                    <th className="px-4 sm:px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tên Lớp/ Tổ</th>
                    <th className="px-4 sm:px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Khối / Bộ phận</th>
                    <th className="px-4 sm:px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Họ và tên</th>
                    <th className="px-4 sm:px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Số tiền VNĐ</th>
                  </tr>
                </thead>
                <tbody className="block sm:table-row-group">
                  {currentDonations.map((donation, idx) => (
                    <tr key={idx} className="block sm:table-row hover:bg-slate-50/50 transition-colors bg-white sm:bg-transparent mb-4 sm:mb-0 p-4 sm:p-0 rounded-xl sm:rounded-none shadow-sm sm:shadow-none border border-slate-100 sm:border-b sm:border-slate-50">
                      <td className="flex justify-between items-center sm:table-cell px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-600 border-b sm:border-none border-slate-50">
                        <span className="sm:hidden font-bold text-slate-500 text-[10px] uppercase tracking-wider">Ngày tháng</span>
                        <span className="text-right sm:text-left">{donation.date}</span>
                      </td>
                      <td className="flex justify-between items-center sm:table-cell px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-600 border-b sm:border-none border-slate-50">
                        <span className="sm:hidden font-bold text-slate-500 text-[10px] uppercase tracking-wider">Tên Lớp/ Tổ</span>
                        <span className="text-right sm:text-left">{donation.class}</span>
                      </td>
                      <td className="flex justify-between items-center sm:table-cell px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-600 border-b sm:border-none border-slate-50">
                        <span className="sm:hidden font-bold text-slate-500 text-[10px] uppercase tracking-wider">Khối / Bộ phận</span>
                        <span className="text-right sm:text-left">{donation.department}</span>
                      </td>
                      <td className="flex justify-between items-center sm:table-cell px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-slate-900 border-b sm:border-none border-slate-50">
                        <span className="sm:hidden font-bold text-slate-500 text-[10px] uppercase tracking-wider">Họ và tên</span>
                        <span className="text-right sm:text-left">{donation.name}</span>
                      </td>
                      <td className="flex justify-between items-center sm:table-cell px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-bold text-red-600 sm:text-right">
                        <span className="sm:hidden font-bold text-slate-500 text-[10px] uppercase tracking-wider">Số tiền VNĐ</span>
                        <span className="text-right">{donation.amount}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-white/30 flex items-center justify-between border-t border-slate-100 mt-auto">
              <span className="text-xs text-slate-500">
                Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredDonations.length)} trong {filteredDonations.length} lượt đóng góp
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded hover:bg-slate-200 text-slate-400 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded text-xs font-bold transition-colors ${
                          currentPage === pageNum 
                            ? 'bg-red-600 text-white' 
                            : 'hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded hover:bg-slate-200 text-slate-400 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
            <p className="text-sm font-medium">Không tìm thấy dữ liệu phù hợp.</p>
          </div>
        )}
      </div>
    </section>
  );
}
