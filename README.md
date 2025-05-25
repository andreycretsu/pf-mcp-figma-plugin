# Cursor MCP Figma Plugin

This Figma plugin connects to the Cursor MCP server to automatically detect and share Figma components, frames, and other elements with Cursor agents.

## Features

- Real-time component detection
- Automatic updates when components change
- Manual scanning of the current page
- Seamless integration with Cursor MCP server

## Setup

1. Install the plugin in Figma:
   - Open Figma
   - Go to Plugins > Development > Import plugin from manifest
   - Select the `manifest.json` file from this project

2. Configure the MCP server:
   - Update the `MCP_SERVER_URL` in `code.js` to point to your MCP server
   - Make sure your MCP server is running and accessible

3. Run the plugin:
   - In Figma, right-click and select Plugins > Development > Cursor MCP Connector
   - The plugin UI will appear with connection status

## Usage

1. The plugin automatically detects:
   - Selected components
   - New components
   - Modified components
   - Component hierarchy

2. Manual scanning:
   - Click the "Scan Current Page" button to scan all components on the current page
   - The status will update to show the scanning progress

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
- Running MCP server instance
- Network access to the MCP server

## Troubleshooting

If the plugin isn't connecting:
1. Verify the MCP server is running
2. Check the MCP server URL in `code.js`
3. Ensure network access is allowed
4. Check the browser console for error messages 