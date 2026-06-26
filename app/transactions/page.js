'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans, getAllSubscriptions } from '../Reducer/PlanSlice';
import { Search, Filter, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

export default function TransactionsPage() {
  const dispatch = useDispatch();
  const { plans, allSubscriptions, loading } = useSelector((state) => state?.plan);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const itemsPerPage = 7;

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getAllSubscriptions());
  }, [dispatch]);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  // Filter and search logic
  const filteredSubscriptions = (allSubscriptions || []).filter(sub => {
    const planName = plans?.data?.find(p => p.id === sub.planId)?.name?.toLowerCase() || '';
    const searchLower = searchQuery.toLowerCase();
    
    const matchesSearch = 
      planName.includes(searchLower) || 
      (sub.razorpaySubscriptionId || '').toLowerCase().includes(searchLower) ||
      (sub.razorpayPaymentId || '').toLowerCase().includes(searchLower);
    
    const matchesFilter = filterStatus === 'all' || sub.status?.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Sorting logic
  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (sortConfig.key === 'amount') {
      const amountA = a.amount || 0;
      const amountB = b.amount || 0;
      return sortConfig.direction === 'asc' ? amountA - amountB : amountB - amountA;
    }
    
    if (sortConfig.key === 'startDate' || sortConfig.key === 'endDate') {
      const dateA = a[sortConfig.key] ? new Date(a[sortConfig.key]).getTime() : 0;
      const dateB = b[sortConfig.key] ? new Date(b[sortConfig.key]).getTime() : 0;
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedSubscriptions.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedSubscriptions.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      key = null; // Clear sorting on 3rd click
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] rounded-[20px] p-4 md:p-8 overflow-y-auto" style={{ background: 'var(--bg-card)' }}>
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Transaction History</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            View and manage your billing history and past subscriptions.
          </p>
        </div>
        
        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search ID or Plan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8624f0] focus:border-transparent transition-colors text-sm"
              style={{ borderColor: 'var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
            />
          </div>
          
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={16} className="text-gray-400" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto pl-10 pr-8 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#8624f0] focus:border-transparent transition-colors text-sm cursor-pointer"
              style={{ borderColor: 'var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
              <option value="created">Created</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-[20px] border flex flex-col" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-main)' }}>
        {loading && (!allSubscriptions || allSubscriptions.length === 0) ? (
          <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>
            Loading transactions...
          </div>
        ) : allSubscriptions && allSubscriptions.length > 0 ? (
          <>
            <div className="overflow-x-auto p-4">
              <table className="w-full border-collapse border" style={{ borderColor: 'var(--border-color)' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
                    <th className="py-4 px-4 text-center border font-semibold whitespace-nowrap" style={{ borderColor: 'var(--border-color)' }}>Plan Name</th>
                    <th className="py-4 px-4 text-center border font-semibold whitespace-nowrap cursor-pointer hover:bg-gray-50/10 transition-colors" style={{ borderColor: 'var(--border-color)' }} onClick={() => handleSort('amount')}>
                      <div className="flex items-center justify-center gap-2">
                        Amount
                        <ArrowUpDown size={14} className={sortConfig.key === 'amount' ? 'text-[#8624f0]' : 'text-gray-400'} />
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center border font-semibold whitespace-nowrap" style={{ borderColor: 'var(--border-color)' }}>Status</th>
                    <th className="py-4 px-4 text-center border font-semibold whitespace-nowrap cursor-pointer hover:bg-gray-50/10 transition-colors" style={{ borderColor: 'var(--border-color)' }} onClick={() => handleSort('startDate')}>
                      <div className="flex items-center justify-center gap-2">
                        Start Date
                        <ArrowUpDown size={14} className={sortConfig.key === 'startDate' ? 'text-[#8624f0]' : 'text-gray-400'} />
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center border font-semibold whitespace-nowrap cursor-pointer hover:bg-gray-50/10 transition-colors" style={{ borderColor: 'var(--border-color)' }} onClick={() => handleSort('endDate')}>
                      <div className="flex items-center justify-center gap-2">
                        Expiry Date
                        <ArrowUpDown size={14} className={sortConfig.key === 'endDate' ? 'text-[#8624f0]' : 'text-gray-400'} />
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center border font-semibold whitespace-nowrap" style={{ borderColor: 'var(--border-color)' }}>Subscription ID</th>
                    <th className="py-4 px-4 text-center border font-semibold whitespace-nowrap" style={{ borderColor: 'var(--border-color)' }}>Payment ID</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/5 transition-colors">
                        <td className="py-4 px-4 text-center border align-middle font-medium whitespace-nowrap" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                          {plans?.data?.find(p => p.id === sub.planId)?.name || `Plan #${sub.planId}`}
                        </td>
                        <td className="py-4 px-4 text-center border align-middle font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap" style={{ borderColor: 'var(--border-color)' }}>
                          ${(sub.amount / 100).toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-center border align-middle whitespace-nowrap" style={{ borderColor: 'var(--border-color)' }}>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            sub.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200' : 
                            sub.status === 'cancelled' ? 'bg-red-100 text-red-700 border border-red-200' : 
                            'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}>
                            {sub.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center border align-middle text-sm whitespace-nowrap" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                          {sub.startDate ? new Date(sub.startDate).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : '-'}
                        </td>
                        <td className="py-4 px-4 text-center border align-middle text-sm whitespace-nowrap" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                          {sub.endDate ? new Date(sub.endDate).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : '-'}
                        </td>
                        <td className="py-4 px-4 text-center border align-middle text-sm font-mono text-gray-500 whitespace-nowrap" style={{ borderColor: 'var(--border-color)' }}>
                          {sub.razorpaySubscriptionId || '-'}
                        </td>
                        <td className="py-4 px-4 text-center border align-middle text-sm font-mono text-gray-500 whitespace-nowrap" style={{ borderColor: 'var(--border-color)' }}>
                          {sub.razorpayPaymentId || '-'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                        No transactions found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredSubscriptions.length >= 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Showing <span className="font-semibold text-gray-800 dark:text-gray-200">{startIndex + 1}</span> to <span className="font-semibold text-gray-800 dark:text-gray-200">{Math.min(startIndex + itemsPerPage, filteredSubscriptions.length)}</span> of <span className="font-semibold text-gray-800 dark:text-gray-200">{filteredSubscriptions.length}</span> entries
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="cursor-pointer p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                          currentPage === page 
                            ? 'bg-[#8624f0] text-white' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        style={currentPage !== page ? { color: 'var(--text-primary)' } : {}}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>No transactions yet</p>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>When you subscribe to a plan, it will show up here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
