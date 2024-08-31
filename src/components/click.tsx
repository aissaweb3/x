import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function JumpScareButton({ children }: { children: any }) {
  const [isScary, setIsScary] = useState(false);

  const handleClick = () => {
    setIsScary(true);
    setTimeout(() => setIsScary(false), 500);
  };

  return (
    <div className="relative">
      <Button
        onClick={handleClick}
        className={`bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 ${
          isScary ? "scale-110" : ""
        }`}
      >
        {children}
      </Button>
      {isScary && (
        <div className="fixed inset-0 bg-[#00000000] z-50 flex items-center justify-center">
          <img
            src="/images/media/logo1.png?height=600&width=800"
            alt="Scary face"
            className="max-w-full max-h-full object-contain animate-pulse"
          />
        </div>
      )}
    </div>
  );
}
