// MCP Server connection configuration
let MCP_SERVER_URL = 'https://mcp-server-g9fg.onrender.com'; // Default, can be changed from UI

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
    let message = error.message;
    if (message.includes('Failed to fetch')) {
      message = `Could not reach MCP server at ${MCP_SERVER_URL}. Check your network or CORS settings.`;
    }
    figma.ui.postMessage({ status: 'error', message });
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
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'scan-document') {
    const components = scanCurrentPage();
    await sendToMCP({ type: 'scan', components });
  } else if (msg.type === 'set-server-url') {
    MCP_SERVER_URL = msg.url;
    figma.ui.postMessage({ status: 'server-url-set', url: MCP_SERVER_URL });
  }
}; 