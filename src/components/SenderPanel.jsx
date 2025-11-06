import { useMemo, useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

function renderTemplate(tpl, data) {
  return tpl
    .replaceAll('{name}', data.name || '')
    .replaceAll('{phone}', data.phone || '');
}

export default function SenderPanel({ recipients, message }) {
  const [sending, setSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);

  const canSend = useMemo(() => recipients.length > 0 && message.trim().length > 0, [recipients, message]);

  const openWhatsAppFor = (phone, text) => {
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    setSentCount(0);

    // Note: For real auto-sending you'd need official WhatsApp Business API on backend.
    for (let i = 0; i < recipients.length; i++) {
      const r = recipients[i];
      const text = renderTemplate(message, r);
      openWhatsAppFor(r.phone, text);
      setSentCount((c) => c + 1);
      // Small delay to avoid opening too many tabs at once
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, 300));
    }

    setSending(false);
  };

  return (
    <section className="bg-white rounded-xl border shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">Kirim</h2>
        <p className="text-xs text-gray-500">{recipients.length} penerima</p>
      </div>

      <button
        disabled={!canSend || sending}
        onClick={handleSend}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Mengirim... ({sentCount}/{recipients.length})
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Kirim via WhatsApp
          </>
        )}
      </button>
      <p className="mt-3 text-xs text-gray-500">
        Ini akan membuka tab WhatsApp untuk setiap nomor. Untuk pengiriman otomatis dan laporan, gunakan integrasi API resmi.
      </p>
    </section>
  );
}
