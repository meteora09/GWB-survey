(function() {
    'use strict';
    const AMPLITUDE_API_KEY = '94882b869e10cc7647ec3a4fff72715f'; // Your Amplitude Project
    const options = {
        amplitudeBundleUrl: `https://cdn.amplitude.com/script/${AMPLITUDE_API_KEY}.js`,
        engagementScriptUrl: `https://cdn.amplitude.com/script/${AMPLITUDE_API_KEY}.engagement.js`,
        projectAPIKey: AMPLITUDE_API_KEY,
        amplitudeConfig: {
            fetchRemoteConfig: true,
            defaultTracking: {
                pageViews: true,
                sessions: true,
                fileDownloads: false,
                formInteractions: false,
                clicks: true,
                scrolls: false,
            },
        }
    };
    function importExternal(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.async = true;
            script.onload = () => resolve(window.amplitude);
            script.onerror = reject;
            var a = document.getElementsByTagName("script")[0];
            if (a) {
                a.parentNode.insertBefore(script, a);
            }
        });
    }
    Promise.all([
        importExternal(options.amplitudeBundleUrl),
        importExternal(options.engagementScriptUrl),
    ]).then(() => {
        console.log('Amplitude unified script and engagement script loaded');
        window.amplitude.add(window.sessionReplay.plugin());
        console.log('Amplitude session replay added');
        window.amplitude.add(window.engagement.plugin());
        console.log('Amplitude engagement plugin added');
        window.amplitude.init(options.projectAPIKey, options.amplitudeConfig);
        console.log('Amplitude initialized with autocapture options');
    });
})();