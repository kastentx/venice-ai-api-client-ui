import './App.css';
import { ConversationProvider } from './context/ConversationContext';
import ChatContainer from './components/ChatContainer';
import Layout from './components/Layout';

function App() {
  return (
    <ConversationProvider>
      <Layout>
        <ChatContainer />
      </Layout>
    </ConversationProvider>
  );
}

export default App;
