import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MessageSquare,
  MoreHorizontal,
  Edit2,
  Trash2,
  Search,
  Calendar,
} from "lucide-react";
import { ChatRoom, ChatSidebarProps } from "@/types/room";
import { ChatRoomItem } from "@/components/ui/chatRoomItem";
import { fetchRooms } from "@/lib/chatAPI";

// API functions
const chatRoomApi = {
  async getRooms(): Promise<ChatRoom[]> {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }

      const response = await fetch("http://localhost:5000/v1/room/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch rooms");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  },

  async createRoom(title: string): Promise<ChatRoom> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    const response = await fetch("http://localhost:5000/v1/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) throw new Error("Failed to create room");
    const result = await response.json();
    return result.data;
  },

  async updateRoom(id: string, title: string): Promise<ChatRoom> {
    const token = localStorage.getItem("authToken");
    console.log("Updating room with id:", id, "and title:", title);
    
    if (!token) {
      throw new Error("No auth token found");
    }
    
    if (!id) {
      throw new Error("Room ID is required");
    }

    try {
      const response = await fetch(`http://localhost:5000/v1/room/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", errorData);
        throw new Error(errorData.message || `Failed to update room: ${response.status}`);
      }

      const result = await response.json();
      console.log("Update response:", result);
      
      // Trả về data từ response, không phải toàn bộ response
      return result.data || result;
    } catch (error) {
      console.error("Error in updateRoom:", error);
      throw error;
    }
  },

  async deleteRoom(id: string): Promise<void> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    const response = await fetch(`http://localhost:5000/v1/room/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to delete room");
  },
};

// Component chính ChatSidebar
const ChatSidebar: React.FC<ChatSidebarProps> = ({
  currentRoomId,
  onRoomSelect,
  onNewRoom,
  className = "",
}) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");

  // Load danh sách phòng chat
  const loadRooms = async () => {
    try {
      setIsLoading(true);
      const data = await fetchRooms();
      setRooms(data.data || []);
    } catch (error) {
      console.error("Error loading rooms:", error);
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
      setRooms((prev) => [newRoom, ...prev]);
      setNewRoomName("");
      setIsCreateDialogOpen(false);
      onRoomSelect(newRoom._id);
      onNewRoom();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  // Cập nhật tên phòng
  const handleEditRoom = async (roomId: string, newTitle: string) => {
    console.log("handleEditRoom called with:", { roomId, newTitle });
    console.log("Type of roomId:", typeof roomId, "Value:", roomId);
    
    if (!roomId || roomId === 'undefined') {
      console.error("No room ID provided or ID is undefined");
      return;
    }

    try {
      const updatedRoom = await chatRoomApi.updateRoom(roomId, newTitle);
      console.log("Room updated successfully:", updatedRoom);
      
      await loadRooms();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  // Xóa phòng
  const handleDeleteRoom = async (id: string) => {
    try {
      await chatRoomApi.deleteRoom(id);
      setRooms((prev) => prev.filter((room) => room._id !== id));

      // Nếu đang ở phòng bị xóa, chuyển về phòng khac
      if (currentRoomId === id && rooms.length > 1) {
        const remainingRooms = rooms.filter((room) => room._id !== id);
        if (remainingRooms.length > 0) {
          onRoomSelect(remainingRooms[0]._id);
        }
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const filteredRooms = rooms.filter((room) =>
    room.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`flex flex-col h-full bg-white/80 border-r border-gray-200 rounded-2xl shadow-lg ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-lg">Conversations</h2>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Conversation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Enter conversation name..."
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateRoom()}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateRoom}
                    disabled={!newRoomName.trim()}
                  >
                    Create
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
            placeholder="Search conversations..."
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
              <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "No conversations found"
                  : "No conversations yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredRooms.map((room) => {
                console.log("Rendering room:", room._id, room.title);
                console.log("Room object:", room);
                
                // Đảm bảo room có _id
                if (!room._id) {
                  console.error("Room missing _id:", room);
                  return null;
                }
                
                return (
                  <ChatRoomItem
                    key={room._id}
                    room={{
                      ...room,
                      _id: room._id,
                      title: room.title,
                      
                    }}
                    isActive={currentRoomId === room._id}
                    onClick={() => {
                      console.log("Selected Room ID:", room._id);
                      onRoomSelect(room._id);
                    }}
                    onEdit={(id, newTitle) => {
                      console.log("Edit called with roomId:", id, "newTitle:", newTitle);
                      handleEditRoom(id, newTitle);
                    }}  
                    onDelete={(id) => {
                      console.log("Delete called with roomId:", id);
                      handleDeleteRoom(id);
                    }}
                  />
                );
              })}
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
          New Conversation
        </Button>
      </div>
    </div>
  );
};

export default ChatSidebar;