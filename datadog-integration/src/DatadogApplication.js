import { datadogRum } from '@datadog/browser-rum';

export default class DatadogApplication {
    initializeDatadog() {
        datadogRum.init({
            applicationId: 'cceff6c9-cf9e-406a-8502-d2cfc45734ec',
            clientToken: 'pub619794708b9cfa513373a12835fa0566',
            site: 'datadoghq.com',
            service: 'twilio-flex-monitoring',
            env: 'prod',
            sessionSampleRate: 100,
            sessionReplaySampleRate: 100,
            trackUserInteractions: true,
            trackResources: true,
            trackLongTasks: true,
            defaultPrivacyLevel: 'mask-user-input',
        });

        // Start session replay recording
        datadogRum.startSessionReplayRecording();
    }

    addAction(actionName, context) {
        datadogRum.addAction(actionName, context);
    }
}
