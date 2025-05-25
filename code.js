// MCP Server connection configuration
const MCP_SERVER_URL = 'http://localhost:3000'; // Update this with your MCP server URL

// Function to send component data to MCP server
async function sendToMCP(data) {
  try {
    console.log('Sending to MCP:', data); // Debug log
    const response = await fetch(`${MCP_SERVER_URL}/figma-components`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    figma.ui.postMessage({ status: 'success' });
    return await response.json();
  } catch (error) {
    console.error('Error sending data to MCP server:', error);
    figma.ui.postMessage({ status: 'error', message: error.message });
  }
}

// Function to extract component information
function extractComponentInfo(node) {
  return {
    id: node.id,
    name: node.name,
    type: node.type,
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height,
    children: node.children ? node.children.map(child => extractComponentInfo(child)) : []
  };
}

// Main plugin code
figma.showUI(__html__);

// Listen for selection changes
figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection;
  const components = selection.map(node => extractComponentInfo(node));
  
  if (components.length > 0) {
    sendToMCP({
      type: 'selection',
      components: components
    });
  }
});

// Listen for document changes
figma.on('documentchange', (event) => {
  const changedNodes = event.documentChanges.map(change => {
    if (change.type === 'CREATE' || change.type === 'PROPERTY_CHANGE') {
      return extractComponentInfo(change.node);
    }
    return null;
  }).filter(Boolean);

  if (changedNodes.length > 0) {
    sendToMCP({
      type: 'document_change',
      components: changedNodes
    });
  }
});

// Handle messages from the UI
figma.ui.onmessage = msg => {
  if (msg.type === 'scan-document') {
    const allNodes = figma.currentPage.findAll();
    const components = allNodes.map(node => extractComponentInfo(node));
    
    sendToMCP({
      type: 'full_scan',
      components: components
    });
  }
}; 