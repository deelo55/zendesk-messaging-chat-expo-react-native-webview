import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ZendeskWebview from "./ZendeskWebview";

export default function App() {
  const zendesk_classic_chat_key = "YOUR_CLASSIC_CHAT_KEY";
  const zendesk_messaging_key = "YOUR_MESSAGING_KEY";

  const isClassicChat = false;

  const zendesk_key = isClassicChat ? zendesk_classic_chat_key : zendesk_messaging_key;


  return (
    <SafeAreaView style={{height: "100%"}}>
      <ZendeskWebview zendesk_key={zendesk_key} isClassicChat={isClassicChat} />
    </SafeAreaView>
  );
}

