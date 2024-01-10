const socket = io();
let ownSocketId;
let isScreenSharing = false;
let peer;

// Connect to the server
socket.on('connect', () => {
  console.log('Connected to server');
  ownSocketId = socket.id;
});

// Handle when a new user joins
socket.on('existing-users', (existingUsers) => {
  console.log('Existing users:', existingUsers);
  // TODO: Display existing users (e.g., create video elements for each user)
  displayExistingUsers(existingUsers);
});

// Handle when a user disconnects
socket.on('user-disconnected', (userId) => {
  console.log('User disconnected:', userId);
  // TODO: Remove the video element associated with the disconnected user
  removeVideoElement(userId);
});

// Handle screen share request
socket.on('screen-share-request', (requesterId) => {
  // TODO: Display a prompt to the user for screen sharing approval
  const approve = confirm(`${requesterId} wants to share the screen. Approve?`);

  // Notify the server about the approval or rejection
  if (approve) {
    socket.emit('screen-share-approved', requesterId);
  } else {
    socket.emit('screen-share-rejected', requesterId);
  }
});

// Helper function to display existing users
function displayExistingUsers(existingUsers) {
  const videoContainer = document.getElementById('video-container');
  existingUsers.forEach((userId) => {
    // TODO: Create video elements for each existing user
    createVideoElement(userId, videoContainer);
  });
}

// Helper function to create a video element for a user
function createVideoElement(userId, container) {
  const video = document.createElement('video');
  video.id = `user-${userId}`;
  video.autoplay = true;
  container.appendChild(video);
}

// Helper function to remove the video element for a disconnected user
function removeVideoElement(userId) {
  const video = document.getElementById(`user-${userId}`);
  if (video) {
    video.remove();
  }
}

// Handle screen share approval
socket.on('screen-share-approved', (approverId) => {
  // Start screen sharing using WebRTC
  startScreenSharing(approverId);
  console.log(`${approverId} approved screen share`);
});

// Handle screen share rejection
socket.on('screen-share-rejected', (rejecterId) => {
  // Notify the user about screen share rejection
  console.log(`${rejecterId} rejected screen share`);
});

// Function to start screen sharing
function startScreenSharing(approverId) {
  // Use simple-peer to initiate a WebRTC connection for screen sharing
  peer = new SimplePeer({ initiator: true, trickle: false });

  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true      
      })
    .then((stream) => {
      // Handle the screen stream (e.g., display it in a video element)
      const video = document.createElement('video');
      video.srcObject = stream;
      video.muted = true; // Mute the local video to prevent feedback
      document.body.appendChild(video);

      // Connect the peer and handle WebRTC events
      peer.addStream(stream);

      peer.on('signal', (data) => {
        // Send the signaling data to the approver
        socket.emit('screen-share-signal', { signal: data, to: approverId });
      });

      peer.on('stream', (remoteStream) => {
        // Handle the incoming screen stream (e.g., display it in a video element)
        const remoteVideo = document.createElement('video');
        remoteVideo.srcObject = remoteStream;
        document.body.appendChild(remoteVideo);
      });
    })
    .catch((error) => {
      console.error('Error starting screen sharing:', error);
    });
}

// Function to stop screen sharing
function stopScreenShare() {
  // Close the peer connection and stop screen sharing
  if (peer) {
    peer.destroy();
    isScreenSharing = false;
  }
}

// Handle incoming signaling data for screen sharing
socket.on('screen-share-signal', (data) => {
  // Pass the signaling data to the simple-peer instance
  peer.signal(data.signal);
});

// Function to start screen sharing
function startScreenShare() {
  // Notify the server to request screen share for the current user
  const targetUserId = prompt('Enter the target user ID for screen sharing:');
  if (targetUserId) {
    socket.emit('request-screen-share', targetUserId);
  }
}
