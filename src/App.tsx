import './App.css';
import { ConversationProvider } from './context/ConversationContext';
import ChatContainer from './components/ChatContainer';

function App() {
  return (
    <ConversationProvider>
      <ChatContainer />
    </ConversationProvider>
  );
}

export default App;
