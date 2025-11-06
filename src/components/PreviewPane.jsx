import { useMemo } from 'react';
import { Eye } from 'lucide-react';

function renderTemplate(tpl, data) {
  return tpl
    .replaceAll('{name}', data.name || '')
    .replaceAll('{phone}', data.phone || '');
}

export default function PreviewPane({ message, recipients }) {
  const sample = useMemo(() => recipients[0] || { name: 'Budi', phone: '628123456789' }, [recipients]);
  const preview = useMemo(() => renderTemplate(message, sample), [message, sample]);

  return (
    <section className="bg-white rounded-xl border shadow-sm p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="h-5 w-5 text-green-600" />
        <h2 className="font-semibold text-gray-900">Pratinjau</h2>
      </div>

      <div className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-800 whitespace-pre-wrap min-h-[120px]">
        {preview || 'Pesan pratinjau akan muncul di sini.'}
      </div>
      <p className="mt-2 text-xs text-gray-500">Contoh menggunakan baris pertama penerima.</p>
    </section>
  );
}
