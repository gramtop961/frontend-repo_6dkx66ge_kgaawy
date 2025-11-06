import { MessageSquare, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-green-500 flex items-center justify-center shadow-inner">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">WhatsApp Blast</h1>
            <p className="text-xs text-gray-500">Kirim pesan massal dengan personalisasi</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
          <Settings className="h-4 w-4" />
          Pengaturan
        </button>
      </div>
    </header>
  );
}
