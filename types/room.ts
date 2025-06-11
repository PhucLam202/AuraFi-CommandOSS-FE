export interface ChatRoom {
    _id: string;
    title: string;
    lastMessage?: string;
    updatedAt: string;
    createdAt: string;
    messageCount?: number;
  }
  
  export interface ChatSidebarProps {
    currentRoomId?: string;
    onRoomSelect: (roomId: string) => void;
    onNewRoom: () => void;
    className?: string;
  }
  