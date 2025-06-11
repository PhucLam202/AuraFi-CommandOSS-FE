import React, { useState, useEffect } from 'react';
import { User, Calendar, Shield, Mail, Wallet, CreditCard, CheckCircle, XCircle, Loader2, X } from 'lucide-react';

// Add these interfaces at the top of the file
interface UserRole {
  type: string;
  startDate: string;
  endDate: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  suiAddress: string;
  authType: string;
  paymentPlan: {
    type: string;
  };
  role: UserRole;
  isActive: boolean;
  isDeleted: boolean;
  refreshTokens: string[];
  rooms: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Modal Component để tích hợp vào trang web
interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal = ({ isOpen, onClose }: UserProfileModalProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data from /me endpoint
  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/v1/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'suiaddress': localStorage.getItem('userWallet') || ''
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      const data = await response.json();
      setUserData(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper functions
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAddress = (address: string | null | undefined) => {
    if (!address) return 'N/A';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-purple-50 via-white to-yellow-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Thông tin người dùng</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              <span className="ml-2 text-gray-600">Đang tải thông tin...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">Lỗi: {error}</span>
              </div>
              <button
                onClick={fetchUserData}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Thử lại
              </button>
            </div>
          )}

          {userData && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-600" />
                  Thông tin cơ bản
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">ID</label>
                    <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg font-mono break-all">
                      {userData._id || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tên</label>
                    <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                      {userData.name || 'N/A'}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      {userData.email || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Wallet Information */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-blue-600" />
                  Thông tin ví
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Loại xác thực</label>
                    <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg capitalize">
                      {userData.authType || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Địa chỉ rút gọn</label>
                    <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg font-mono">
                      {userData.suiAddress ? formatAddress(userData.suiAddress) : 'N/A'}
                    </p>
                  </div>
                  {userData.suiAddress && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-600">Địa chỉ SUI đầy đủ</label>
                      <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg font-mono break-all">
                        {userData.suiAddress}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Trạng thái tài khoản
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Trạng thái hoạt động</label>
                    <div className={`flex items-center p-3 rounded-lg ${
                      userData.isActive ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}>
                      {userData.isActive ? (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      ) : (
                        <XCircle className="w-4 h-4 mr-2" />
                      )}
                      <span className="text-sm font-medium">
                        {userData.isActive ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Trạng thái xóa</label>
                    <div className={`flex items-center p-3 rounded-lg ${
                      !userData.isDeleted ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}>
                      {!userData.isDeleted ? (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      ) : (
                        <XCircle className="w-4 h-4 mr-2" />
                      )}
                      <span className="text-sm font-medium">
                        {userData.isDeleted ? 'Đã xóa' : 'Chưa xóa'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phiên bản</label>
                    <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                      {userData.__v !== undefined ? userData.__v : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment & Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userData.paymentPlan && (
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                      Gói thanh toán
                    </h3>
                    <div className="space-y-3">
                      {typeof userData.paymentPlan === 'object' ? (
                        Object.entries(userData.paymentPlan).map(([key, value]) => (
                          <div key={key}>
                            <label className="text-sm font-medium text-gray-600 capitalize">{key}</label>
                            <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                              {value?.toString() || 'N/A'}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                          {userData.paymentPlan || "Free"}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {userData.role && (
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                      Thông tin vai trò
                    </h3>
                    <div className="space-y-3">
                      {typeof userData.role === 'object' ? (
                        Object.entries(userData.role).map(([key, value]) => (
                          <div key={key}>
                            <label className="text-sm font-medium text-gray-600 capitalize">{key}</label>
                            {Array.isArray(value) ? (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {value.map((item, index) => (
                                  <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                                {value?.toString() || 'N/A'}
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                          {userData.role || 'UserUser'}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Timestamps */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                  Thời gian
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Ngày tạo</label>
                    <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                      {formatDate(userData.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Ngày cập nhật</label>
                    <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                      {formatDate(userData.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrays Info */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin bổ sung</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Refresh Tokens</label>
                    <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                      {userData.refreshTokens?.length === 0 ? 'Không có' : `${userData.refreshTokens?.length || 0} tokens`}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phòng</label>
                    <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                      {userData.rooms?.length === 0 ? 'Không có' : `${userData.rooms?.length || 0} phòng`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-6 rounded-b-2xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;