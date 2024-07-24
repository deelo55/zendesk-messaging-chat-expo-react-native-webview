import React, { Component, useState } from "react";
import { WebView } from "react-native-webview";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native";
export default function ZendeskWebview({ zendesk_key, isClassicChat }) {
  const [loading, setLoading] = useState(true);

  const onMessage = (payload) => {
    if (payload.nativeEvent.data === "zendesk_open") {
        console.log("Zendesk Opened");
        setLoading(false);
    }
  };



  return (
    <>
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}

      <WebView
        useWebKit
        style={{ flex: 1, height: "100%" }}
        hideKeyboardAccessoryView
        source={{
          html: isClassicChat ? zendeskClassicChat() : zendeskMessaging(),
          baseUrl: "http://localhost",
        }}
        showsVerticalScrollIndicator={false}
        webviewDebuggingEnabled={true}
        onMessage={onMessage}
        originWhitelist={["*"]}
      />
    </>
  );

  function zendeskClassicChat() {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Chat</title>
                <!-- Start of Zendesk Widget script -->
                <script id="ze-snippet"
                    src="https://static.zdassets.com/ekr/snippet.js?key=${zendesk_key}"> </script>
                <!-- End of Zendesk Widget script -->
            </head>
            <body>
                <script type="text/javascript">
                    document.addEventListener('DOMContentLoaded', function() {
                        zE('webWidget:on', 'open', function() {
                        window.ReactNativeWebView.postMessage("zendesk_open");
                        });

                            zE('webWidget', 'open');
                    });
                </script>
            </body>
            </html>`;
  }

  function zendeskMessaging() {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Chat</title>
                <!-- Start of Zendesk Widget script -->
                <script id="ze-snippet"
                    src="https://static.zdassets.com/ekr/snippet.js?key=${zendesk_key}"> </script>
                <!-- End of Zendesk Widget script -->
            </head>
            <body>
            <script type="text/javascript">

          document.addEventListener('DOMContentLoaded', function() {

               zE("messenger:on", "open", function () {
                    window.ReactNativeWebView.postMessage("zendesk_open");
                    })
                    zE('messenger', 'open');
                });

      

            </script>
            </body>
            </html>`;
  }
}
