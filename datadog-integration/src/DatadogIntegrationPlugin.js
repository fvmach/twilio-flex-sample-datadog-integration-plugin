import { FlexPlugin } from '@twilio/flex-plugin';
import DatadogApplication from './DatadogApplication';

const PLUGIN_NAME = 'DatadogIntegrationPlugin';

export default class DatadogIntegrationPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  init(flex, manager) {
    const options = { sortOrder: -1 };
    
    // Initialize Datadog
    const datadogApp = new DatadogApplication();
    datadogApp.initializeDatadog();

    // Example: Attach custom monitoring to Flex actions
    flex.Actions.addListener('afterAcceptTask', (payload) => {
      datadogApp.addAction('Task Accepted', { taskSid: payload.task.taskSid });
    });
  }
}
