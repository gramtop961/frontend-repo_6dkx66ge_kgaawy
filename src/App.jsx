import { useState } from 'react';
import Navbar from './components/Navbar';
import RecipientsUploader from './components/RecipientsUploader';
import MessageEditor from './components/MessageEditor';
import PreviewPane from './components/PreviewPane';
import SenderPanel from './components/SenderPanel';

function App() {
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState('Hai {name}, kami punya penawaran spesial untukmu!');

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecipientsUploader recipients={recipients} setRecipients={setRecipients} />
          <MessageEditor message={message} setMessage={setMessage} />
          <PreviewPane message={message} recipients={recipients} />
        </div>
        <div className="lg:col-span-1">
          <SenderPanel recipients={recipients} message={message} />
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        Pastikan nomor menggunakan format internasional, contoh: 62812xxxxxxx
      </footer>
    </div>
  );
}

export default App;
