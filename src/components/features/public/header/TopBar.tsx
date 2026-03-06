import { MapPin, Clock, Mail } from "lucide-react";

export function TopBar() {
  return (
    <div style={{ backgroundColor: "#0D2B6E" }}>
      <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-1.5 text-blue-200 text-[11px]">
            <MapPin size={12} />
            Số 135/9, khu phố Tân Phú 2, Phường Tân Đông Hiệp, TP.HCM
          </span>
          <div className="hidden md:block w-px h-3 bg-blue-700" />
          <span className="flex items-center gap-1.5 text-blue-200 text-[11px]">
            <Clock size={12} />
            T2–T7: 8:00 – 17:30
          </span>
        </div>
        <a
          href="mailto:huucong2510@gmail.com"
          className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors text-[11px]"
        >
          <Mail size={12} />
          huucong2510@gmail.com
        </a>
      </div>
    </div>
  );
}

