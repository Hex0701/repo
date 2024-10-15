// Define 3D object vertices (scaled to create a larger cube)
const cubeVertices = [
    // Front face
    [-20, -20, 20],
    [20, -20, 20],
    [20, 20, 20],
    [-20, 20, 20],
    // Back face
    [-20, -20, -20],
    [20, -20, -20],
    [20, 20, -20],
    [-20, 20, -20]
  ];
  
  // Define 3D object edges (connecting vertices)
  const cubeEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Front face edges
    [4, 5], [5, 6], [6, 7], [7, 4], // Back face edges
    [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
  ];
  
  // Initialize canvas
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  // Define camera position
  let cameraX = 0;
  let cameraY = 0;
  let cameraZ = -5;
  
  // Function to project 3D coordinates to 2D
  function projectVertex(vertex) {
    const fov = Math.PI / 3; // Field of view
    const aspectRatio = canvas.width / canvas.height;
    const near = 0.1;
    const far = 1000;
    const projectionFactor = Math.tan(fov / 2) * near;
  
    const x = vertex[0] - cameraX;
    const y = vertex[1] - cameraY;
    const z = vertex[2] - cameraZ;
  
    const projectedX = x / -z * projectionFactor * aspectRatio + canvas.width / 2;
    const projectedY = y / -z * projectionFactor + canvas.height / 2;
  
    return [projectedX, projectedY];
  }
  
  // Function to render the 3D scene
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    cubeEdges.forEach(edge => {
      const startVertex = cubeVertices[edge[0]];
      const endVertex = cubeVertices[edge[1]];
  
      const [startX, startY] = projectVertex(startVertex);
      const [endX, endY] = projectVertex(endVertex);
  
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    });
  
    requestAnimationFrame(render);
  }
  
  // Event listener for keyboard arrow keys
  document.addEventListener('keydown', event => {
    switch (event.key) {
      case 'ArrowUp':
        cameraY += 0.1;
        break;
      case 'ArrowDown':
        cameraY -= 0.1;
        break;
      case 'ArrowLeft':
        cameraX -= 0.1;
        break;
      case 'ArrowRight':
        cameraX += 0.1;
        break;
    }
  });
  
  // Start rendering the scene
  render();
  