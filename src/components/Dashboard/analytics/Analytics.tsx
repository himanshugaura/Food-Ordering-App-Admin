import { useEffect, useState } from "react"
import StatsCard from "./Stats"
import { useAppDispatch } from "@/store/hook";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { Stats } from "@/types/type";
import { getMonthlyStats } from "@/api/order";
import { ChevronDown, Calendar } from "lucide-react";

const Analytics = () => {
  const dispatch = useAppDispatch();
  const stats = useSelector((state: RootState) => state.analytics.stats);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    setSelectedMonth(currentMonth);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getMonthlyStats(selectedMonth + 1)); 
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } 
    }
    fetchData();
  }, [dispatch, selectedMonth]);

  return (
    <div className="py-15">
      {/* Integrated Heading with Dropdown */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4">
          <Calendar className="w-8 h-8 text-amber-400" />
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">
              Analytics
            </h1>
            <span className="text-slate-400 text-3xl">•</span>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-transparent hover:bg-slate-800/30 rounded-lg px-3 py-2 transition-all duration-200 group"
              >
                <span className="text-3xl font-bold text-amber-400">
                  {months[selectedMonth]}
                </span>
                <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-xl border border-slate-600 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="max-h-80 overflow-y-auto">
                    {months.map((month, index) => (
                      <button
                        key={month}
                        onClick={() => {
                          setSelectedMonth(index);
                          setIsOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors duration-150 ${
                          selectedMonth === index 
                            ? 'bg-blue-500/20 text-blue-400 border-r-2 border-blue-400' 
                            : 'text-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{month}</span>
                          {selectedMonth === index && (
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <StatsCard stats={stats as Stats} />
    </div>
  )
}

export default Analytics