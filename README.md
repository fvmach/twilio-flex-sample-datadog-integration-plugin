# Datadog Integration Sample Plugin for Twilio Flex

This repository contains a sample Twilio Flex plugin that integrates Datadog RUM (Real User Monitoring) into the Flex UI. The plugin captures user interactions, network requests, session replay data, and custom actions for enhanced observability and debugging.

## Features
- Integrates Datadog RUM for real-time monitoring of user sessions.
- Captures HTTP requests and user interactions within the Flex UI.
- Adds custom RUM actions for WebSocket events and session idle timeouts.
- Supports session replay for detailed troubleshooting.

## Installation

### Prerequisites
1. **Twilio Flex**:
   - Ensure you have an active Twilio Flex account.
   - Flex Plugins CLI installed. ([Setup Guide](https://www.twilio.com/docs/flex/developer/plugins/cli))

2. **Datadog Account**:
   - A Datadog account with RUM enabled.
   - An application ID and client token for your RUM application. ([Datadog Setup Guide](https://docs.datadoghq.com/real_user_monitoring/browser/))

### Steps
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your Datadog credentials:
   - Open `DatadogApplication.js` and update the following fields:
     ```javascript
     applicationId: '<YOUR_APPLICATION_ID>',
     clientToken: '<YOUR_CLIENT_TOKEN>',
     site: 'datadoghq.com', // Change if you're using a different Datadog region
     env: 'prod',
     service: 'twilio-flex-monitoring',
     ```

4. Build the plugin:
   ```bash
   npm run build
   ```

5. Deploy the plugin to Twilio Flex:
   ```bash
   twilio flex:plugins:deploy
   ```

6. Enable the plugin in your Flex Admin Console.

## Usage

### Initialization
The plugin initializes Datadog RUM when loaded into the Flex environment. It uses the following settings:
- Tracks user interactions (`trackUserInteractions: true`)
- Captures HTTP requests (`trackResources: true`)
- Records long tasks (`trackLongTasks: true`)

### Custom Actions
The plugin listens for specific Flex actions and logs them to Datadog:
- `afterAcceptTask`: Logs task acceptance events.
- Session idle timeout: Logs a custom action when the session is idle for a predefined period.

You can extend this functionality by adding more custom actions in the `init` method of the `DatadogIntegrationPlugin` class.

### Adding Custom Logs
To add your own custom logs:
1. Use the `datadogRum.addAction` API.
2. Example:
   ```javascript
   datadogRum.addAction('Custom Action', { key: 'value' });
   ```

### WebSocket Event Tracking
If your Flex app uses WebSockets, track events like this:
```javascript
const socket = new WebSocket("ws://example.com/socket");

socket.onopen = () => {
  datadogRum.addAction("WebSocket Opened", { url: "ws://example.com/socket" });
};

socket.onmessage = (event) => {
  datadogRum.addAction("WebSocket Message Received", { message: event.data });
};

socket.onclose = () => {
  datadogRum.addAction("WebSocket Closed");
};
```

## Development

### Running Locally
1. Start a local development server:
   ```bash
   twilio flex:plugins:start
   ```
2. Access the local Flex instance at `http://localhost:3000`.

### Testing
- Verify that user interactions, network requests, and custom actions appear in your Datadog RUM dashboard.
- Check the session replay feature for accuracy.

### Debugging
- Use browser DevTools to inspect Datadog RUM requests and ensure proper initialization.

## References

### Twilio Flex Developer Tools
- **Debugging Flex UI**: [Developer Guide to Troubleshooting the Flex UI](https://www.twilio.com/docs/flex/developer/ui/troubleshoot-the-flex-ui)
- **Flex Plugins CLI**: [Getting Started with Plugins](https://www.twilio.com/docs/flex/developer/plugins/cli)
- **Flex Actions Framework**: [Customizing Flex Actions](https://www.twilio.com/docs/flex/actions-framework)
- **Flex UI Documentation**: [Building Flex UI](https://www.twilio.com/docs/flex/developer/ui)
- **Flex Admin Console**: [Managing Plugins in the Admin Console](https://www.twilio.com/docs/flex/admin-guide)

### Datadog Documentation
- **Browser RUM Setup**: [Datadog RUM Setup](https://docs.datadoghq.com/real_user_monitoring/browser/)
- **Custom RUM Actions**: [Adding Custom User Actions](https://docs.datadoghq.com/real_user_monitoring/browser/actions/)
- **Session Replay**: [Enabling Session Replay](https://docs.datadoghq.com/real_user_monitoring/session_replay/)

This repository is intended for developers looking to integrate Datadog RUM into their Twilio Flex instance for better observability and debugging.
