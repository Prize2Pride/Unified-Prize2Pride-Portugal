import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TutorWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Check if user has already seen the welcome modal
    const seen = localStorage.getItem("tutorWelcomeSeen");
    if (!seen) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasSeenWelcome(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("tutorWelcomeSeen", "true");
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  if (!isOpen) return null;

  // Arabic translation of the welcome message
  const arabicWelcome = `مرحبا، اسمي رواد الفاضل، وأنا معلمك الشخصي للغة البرتغالية. أهلا وسهلا بك في منصة تعلم اللغة البرتغالية الأكثر اكتمالا وابتكارا في العالم. هنا، ستتعلم من المستوى الأساسي إلى الإتقان الكامل للغة البرتغالية. مع الدروس المنظمة والتمارين التفاعلية والذكاء الاصطناعي المتقدم، سيكون تقدمك سريعا وفعالا. أنا متاح 24 ساعة في اليوم، 7 أيام في الأسبوع، للإجابة على أي سؤال حول اللغة البرتغالية. يمكنك التعلم عن القواعد والمفردات والنطق والثقافة البرتغالية والمزيد. تم تطوير كل درس بعناية لضمان إتقانك لكل جانب من جوانب اللغة. دعنا نستكشف معا جمال وثراء اللغة البرتغالية. بغض النظر عن هدفك - المحادثة أو الأعمال أو السفر أو الشغف النقي - أنا هنا لمساعدتك. إذن، هل أنت مستعد لبدء رحلتك نحو إتقان اللغة البرتغالية؟ انقر على "ابدأ" للبدء.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 transition-colors"
          aria-label="Close welcome modal"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Tutor photo */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src="/manus-storage/905e02dc-bdd4-4fb5-95dd-0718b89bb024_d3b5a8d2.jfif"
              alt="رواد الفاضل"
              className="h-32 w-32 rounded-full object-cover border-4 border-green-600 shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white text-lg">
              🎓
            </div>
          </div>
        </div>

        {/* Tutor name */}
        <h2 className="text-center text-2xl font-serif font-bold text-gray-900 mb-2">
          رواد الفاضل
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Your Personal Portuguese Tutor
        </p>

        {/* Audio player */}
        <div className="mb-6 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg p-4">
          <audio
            ref={audioRef}
            controls
            autoPlay
            className="w-full"
            controlsList="nodownload"
          >
            <source src="/manus-storage/welcome-audio_6e30d094.wav" type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <p className="text-xs text-gray-600 mt-2 text-center">
            🔊 Welcome message in Portuguese
          </p>
        </div>

        {/* Arabic text */}
        <div className="mb-6 bg-blue-50 rounded-lg p-4 max-h-48 overflow-y-auto">
          <p className="text-sm text-gray-800 leading-relaxed text-right font-arabic">
            {arabicWelcome}
          </p>
        </div>

        {/* Action button */}
        <Button
          onClick={handleClose}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Begin Learning →
        </Button>

        {/* Footer note */}
        <p className="text-xs text-gray-500 text-center mt-4">
          You can close this welcome message anytime by clicking the X button
        </p>
      </div>
    </div>
  );
}
