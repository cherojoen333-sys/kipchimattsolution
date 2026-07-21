import { Wine, ShieldAlert } from 'lucide-react';

interface AgeGateModalProps {
  isOpen: boolean;
  onConfirm: (isAdult: boolean) => void;
}

export default function AgeGateModal({ isOpen, onConfirm }: AgeGateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs animate-fade-in select-none">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto p-6 text-center animate-scale-up border border-gray-150">
        
        <div className="w-16 h-16 rounded-full bg-plum/5 text-plum flex items-center justify-center mx-auto mb-4 border border-plum/15">
          <Wine className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-black text-gray-800">Age Verification Required</h3>
        <p className="text-gray-500 text-xs mt-2 leading-relaxed max-w-[280px] mx-auto">
          In compliance with Kenyan regulatory acts, you must be <strong>18 years or older</strong> to view and purchase liquor & spirits.
        </p>

        <div className="flex gap-3 justify-center mt-6">
          <button 
            onClick={() => onConfirm(false)}
            className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-bold text-xs py-3 rounded-lg cursor-pointer transition-colors"
          >
            I am Under 18
          </button>
          
          <button 
            onClick={() => onConfirm(true)}
            className="flex-1 bg-plum hover:bg-plum-dark text-white font-bold text-xs py-3 rounded-lg cursor-pointer transition-colors shadow-sm"
          >
            I am 18 or Older
          </button>
        </div>

        <div className="mt-4 flex items-center gap-1.5 justify-center text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Active Age Control Policy</span>
        </div>
      </div>
    </div>
  );
}
