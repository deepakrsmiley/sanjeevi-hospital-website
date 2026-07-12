import { useRef, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;               // base64 data URL (or old-style external URL) currently stored
  onChange: (dataUrl: string) => void;
  maxSizeMB?: number;          // guard so we don't blow past MongoDB's 16MB doc limit
}

/**
 * File picker that reads the chosen image and converts it to a base64
 * data URL, which is what gets sent to the API and stored directly in
 * MongoDB (no external file storage/host needed).
 */
export default function ImageUploadField({ label, value, onChange, maxSizeMB = 3 }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (file: File | undefined) => {
    setError("");
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Image is too large. Please choose one under ${maxSizeMB}MB.`);
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
      setLoading(false);
    };
    reader.onerror = () => {
      setError("Couldn't read that file. Try again.");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shrink-0 flex items-center justify-center">
          {loading ? (
            <Loader2 size={18} className="animate-spin text-[#6A1B9A]" />
          ) : value ? (
            <img src={value} alt={label} className="w-full h-full object-cover" />
          ) : (
            <ImagePlus size={20} className="text-gray-300" />
          )}
        </div>

        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-[#6A1B9A]/30 text-[#6A1B9A] hover:bg-[#6A1B9A]/5 transition-colors"
            >
              {value ? "Change Photo" : "Upload Photo"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => { onChange(""); if (inputRef.current) inputRef.current.value = ""; }}
                className="text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors flex items-center gap-1"
              >
                <X size={12} /> Remove
              </button>
            )}
          </div>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
}
