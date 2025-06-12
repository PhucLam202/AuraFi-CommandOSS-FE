export async function fetchRooms() {
    const response = await fetch('http://localhost:5000/v1/room/', {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    console.log('Response:', response);
    if (!response.ok) throw new Error('Failed to fetch rooms');
    const data = await response.json();
    console.log('Data:', data);
    return data;
  }
  
  export async function createRoom(name: string) {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    if (!response.ok) throw new Error('Failed to create room');
    return response.json();
  }
  
  export async function updateRoom(roomId: string, name: string) {
    const response = await fetch(`/api/chat/${roomId}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    if (!response.ok) throw new Error('Failed to update room');
    return response.json();
  }         