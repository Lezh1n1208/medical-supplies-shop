"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: Readonly<MobileMenuProps>) {
  if (!isOpen) return null;

  return (
    <div
      className="md:hidden fixed inset-x-0 z-40 bg-white border-t border-gray-200 shadow-lg"
      style={{
        top: "var(--top-header-height)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium text-[14px]"
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
        <div className="pt-3 border-t border-gray-200">
          <a
            href="tel:0983498177"
            className="flex items-center gap-2 px-4 py-2 text-blue-700 font-semibold"
          >
            <Phone size={16} />
            <span>Hotline: 0983 498 177</span>
          </a>
        </div>
      </div>
    </div>
  );
}
