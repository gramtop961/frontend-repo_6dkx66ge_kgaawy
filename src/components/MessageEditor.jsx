import { useMemo } from 'react';
import { Type, Info } from 'lucide-react';

export default function MessageEditor({ message, setMessage }) {
  const placeholders = useMemo(() => ['{name}', '{phone}'], []);

  return (
    <section className="bg-white rounded-xl border shadow-sm p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Type className="h-5 w-5 text-green-600" />
        <h2 className="font-semibold text-gray-900">Pesan</h2>
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Hai {name}, promo spesial untukmu!"
        rows={6}
        className="w-full resize-y rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="mt-2 text-xs text-gray-500 flex items-start gap-2">
        <Info className="h-4 w-4 mt-0.5" />
        <p>
          Gunakan placeholder untuk personalisasi: {placeholders.join(', ')}. Akan otomatis diganti dengan data penerima.
        </p>
      </div>
    </section>
  );
}
