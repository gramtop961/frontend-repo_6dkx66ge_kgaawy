import { useRef } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';

export default function RecipientsUploader({ recipients, setRecipients }) {
  const inputRef = useRef(null);

  const parseCSV = (text) => {
    const lines = text.split(/\r?\n/).filter(Boolean);
    const data = [];
    for (const line of lines) {
      const [phone, name, ...rest] = line.split(',').map((s) => s.trim());
      if (!phone) continue;
      data.push({ phone, name: name || '', extra: rest.join(',') });
    }
    return data;
  };

  const onFile = async (file) => {
    const text = await file.text();
    const rows = parseCSV(text);
    setRecipients(rows);
  };

  return (
    <section className="bg-white rounded-xl border shadow-sm p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileSpreadsheet className="h-5 w-5 text-green-600" />
        <h2 className="font-semibold text-gray-900">Daftar Penerima</h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          <Upload className="h-4 w-4" />
          Unggah CSV
        </button>
        <input
          ref={inputRef}
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
        />
        <p className="text-sm text-gray-500">Format: phone,name,field1,field2,...</p>
      </div>

      {recipients.length > 0 && (
        <div className="mt-4 overflow-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-3 py-2 text-left">Phone</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Extra</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((r, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-3 py-2 font-mono">{r.phone}</td>
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="px-3 py-2 text-gray-500">{r.extra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
