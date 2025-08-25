import { X, MapPin, Clock, Trophy, Info, History } from 'lucide-react';

const CircuitModal = ({ circuit, onClose }) => {
  if (!circuit) return null;

  // Modal dışına tıklandığında kapat
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 transition-opacity duration-300 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative dark:bg-zinc-900 bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-zoom-in"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 p-2 rounded-full dark:bg-zinc-800 bg-gray-200 hover:dark:bg-zinc-700 hover:bg-gray-300 transition-colors z-10"
          aria-label="Kapat"
        >
          <X size={20} />
        </button>
        <div className="w-full h-48 sm:h-60 bg-cover bg-center rounded-t-2xl" style={{backgroundImage: `url(${circuit.image})`}}></div>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-gray-100 text-gray-800 mb-1">{circuit.name} {circuit.flag}</h2>
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-6 text-sm">
            <MapPin size={14} className="mr-2" />
            <span>{circuit.location}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="dark:bg-zinc-800/50 bg-gray-100 p-4 rounded-xl">
                <h3 className="font-bold text-base mb-2 dark:text-gray-200 text-gray-700">Pist Bilgileri</h3>
                <ul className="space-y-1 text-sm dark:text-gray-300 text-gray-600">
                  <li><strong>Son Kazanan:</strong> {circuit.lastWinner}</li>
                  <li><strong>Pist Uzunluğu:</strong> {circuit.length}</li>
                  <li><strong>Tur Sayısı:</strong> {circuit.laps}</li>
                </ul>
            </div>
             <div className="dark:bg-zinc-800/50 bg-gray-100 p-4 rounded-xl">
                <h3 className="font-bold text-base mb-2 dark:text-gray-200 text-gray-700">Rekorlar</h3>
                <ul className="space-y-1 text-sm dark:text-gray-300 text-gray-600">
                  <li><Trophy size={14} className="inline mr-2 text-yellow-500" /> {circuit.fastestLap}</li>
                </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 flex items-center dark:text-gray-200 text-gray-700"><Info size={18} className="mr-2"/>Pist Özeti</h3>
              <p className="dark:text-gray-300 text-gray-600 text-sm leading-relaxed">{circuit.summary}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 flex items-center dark:text-gray-200 text-gray-700"><History size={18} className="mr-2"/>Tarihçe</h3>
              <p className="dark:text-gray-300 text-gray-600 text-sm leading-relaxed">{circuit.history}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitModal;