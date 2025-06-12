import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatTime } from "@/helper/time";
import { MessageSquare } from "lucide-react";
import { Edit2, Trash2 } from "lucide-react";
import { ChatRoom } from "@/types/room";

export const ChatRoomItem: React.FC<{
    room: ChatRoom;
    isActive: boolean;
    onClick: () => void;
    onEdit: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
  }> = ({ room, isActive, onClick, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(room.title);
  
    const handleEdit = () => {
      if (editName.trim() && editName !== room.title) {
        onEdit(room._id, editName.trim());
      }
      setIsEditing(false);
    };
  
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleEdit();
      } else if (e.key === 'Escape') {
        setEditName(room.title);
        setIsEditing(false);
      }
    };
  
    return (
      <div
        className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors
          ${isActive 
            ? 'shadow-lg'
            : 'hover:bg-blue-50'
          }`}
        onClick={onClick}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <MessageSquare className="h-5 w-5 text-blue-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleEdit}
                onKeyDown={handleKeyDown}
                className="h-7 text-sm"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <p className="text-base font-semibold truncate text-gray-800">{room.title}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {formatTime(room.updatedAt)}
                  </span>
                  {room.messageCount && (
                    <span className="text-xs text-gray-500">
                      • {room.messageCount} tin nhắn
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
  
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Đổi tên
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(room._id)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };