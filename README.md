# Cursor MCP Figma Plugin

This Figma plugin connects to the Cursor MCP server to automatically detect and share Figma components, frames, and other elements with Cursor agents.

## Features

- Real-time component detection
- Automatic updates when components change
- Manual scanning of the current page
- Seamless integration with Cursor MCP server

## Public MCP Server

You can use the public MCP server at:

https://mcp-server-g9fg.onrender.com

## Setup

1. Install the plugin in Figma:
   - Open Figma
   - Go to Plugins > Development > Import plugin from manifest
   - Select the `manifest.json` file from this project

2. Configure the MCP server:
   - The plugin UI now lets you set the MCP server URL directly. Enter your server URL in the input field and click "Set Server URL".
   - By default, it uses the public Render MCP server.

3. Run the plugin:
   - In Figma, right-click and select Plugins > Development > Cursor MCP Connector
   - The plugin UI will appear with connection status

## Usage

- Click **Scan Current Page** to send all components/frames on the current page to the MCP server.
- You can change the MCP server URL at any time using the input field and button in the plugin UI.

## Troubleshooting

- If you see an error like `Could not reach MCP server...`, check:
  - The MCP server URL is correct and accessible from your network.
  - The MCP server allows CORS requests from Figma (the provided server does).
  - The server is running and not overloaded.

## Deploying Your Own MCP Server

- You can deploy your own MCP server using the included `mcp-server.js` and `package.json` files.
- Render.com is recommended for easy Node.js hosting.
- Make sure to update the MCP server URL in the plugin UI to point to your deployed server.

## Development

To modify the plugin:

1. Edit the files:
   - `code.js`: Main plugin logic
   - `ui.html`: Plugin interface
   - `manifest.json`: Plugin configuration

2. Test changes:
   - Reload the plugin in Figma
   - Check the browser console for any errors

## Requirements

- Figma desktop app or Figma web
- Running MCP server instance (or use the public one above)
- Network access to the MCP server

## Troubleshooting

If the plugin isn't connecting:
1. Verify the MCP server is running (if self-hosted)
2. Check the MCP server URL in `code.js`
3. Ensure network access is allowed
4. Check the browser console for error messages 