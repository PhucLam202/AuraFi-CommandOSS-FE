import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  MessageSquare, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Search,
  Calendar
} from 'lucide-react';
import { ChatRoom, ChatSidebarProps } from '@/types/room';
import { ChatRoomItem } from '@/components/ui/chatRoomItem';


// API functions
const chatRoomApi = {
  async getRooms(): Promise<ChatRoom[]> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await fetch('http://localhost:5000/v1/room/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch rooms');
      }
      
      const data = await response.json();
      console.log('Rooms data:', data);
      return data.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },

  async createRoom(name: string): Promise<ChatRoom> {
    const response = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!response.ok) throw new Error('Failed to create room');
    return response.json();
  },

  async updateRoom(id: string, name: string): Promise<ChatRoom> {
    const response = await fetch(`/api/rooms/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!response.ok) throw new Error('Failed to update room');
    return response.json();
  },

  async deleteRoom(id: string): Promise<void> {
    const response = await fetch(`/api/rooms/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete room');
  }
};


// Component chính C  hatSidebar
const ChatSidebar: React.FC<ChatSidebarProps> = ({
  currentRoomId,
  onRoomSelect,
  onNewRoom,
  className = ""
}) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  // Load danh sách phòng chat
  const loadRooms = async () => {
    try {
      setIsLoading(true);
      const fetchedRooms = await chatRoomApi.getRooms();
      setRooms(fetchedRooms);
    } catch (error) {
      console.error('Error loading rooms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  // Tạo phòng mới
  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;

    try {
      const newRoom = await chatRoomApi.createRoom(newRoomName.trim());
      setRooms(prev => [newRoom, ...prev]);
      setNewRoomName('');
      setIsCreateDialogOpen(false);
      onRoomSelect(newRoom._id);
      onNewRoom();
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  // Cập nhật tên phòng
  const handleEditRoom = async (id: string, newName: string) => {
    try {
      const updatedRoom = await chatRoomApi.updateRoom(id, newName);
      setRooms(prev => 
        prev.map(room => 
          room._id === id ? updatedRoom : room
        )
      );
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  // Xóa phòng
  const handleDeleteRoom = async (id: string) => {
    try {
      await chatRoomApi.deleteRoom(id);
      setRooms(prev => prev.filter(room => room._id !== id));
      
      // Nếu đang ở phòng bị xóa, chuyển về phòng khac
      if (currentRoomId === id && rooms.length > 1) {
          const remainingRooms = rooms.filter(room => room._id !== id);
        if (remainingRooms.length > 0) {
          onRoomSelect(remainingRooms[0]._id);
        }
      }
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };
  
  // Lọc phòng theo từ khóa tìm kiếm
  const filteredRooms = rooms.filter(room =>
    room.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex flex-col h-full bg-white/80 border-r border-gray-200 rounded-2xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-lg">Cuộc trò chuyện</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo cuộc trò chuyện mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Nhập tên cuộc trò chuyện..."
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateRoom()}
                />
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button onClick={handleCreateRoom} disabled={!newRoomName.trim()}>
                    Tạo
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm cuộc trò chuyện..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">Đang tải...</p>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'Không tìm thấy cuộc trò chuyện' : 'Chưa có cuộc trò chuyện'}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredRooms.map((room) => (
                <ChatRoomItem
                  key={room._id}
                  room={{
                    ...room,
                    _id: room._id,
                    title: room.title,
                  }}
                  isActive={currentRoomId === room._id}
                  onClick={() => onRoomSelect(room._id)}
                  onEdit={handleEditRoom}
                  onDelete={handleDeleteRoom}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Cuộc trò chuyện mới
        </Button>
      </div>
    </div>
  );
};

export default ChatSidebar;