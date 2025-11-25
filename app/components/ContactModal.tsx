"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [_scriptLoaded, setScriptLoaded] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (isOpen) {
      // Empêcher le scroll du body quand le modal est ouvert
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col" style={{ height: "calc(100vh - 2rem)" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-light flex-shrink-0">
            <h2 className="text-xl sm:text-2xl font-bold text-dark">
              {t.contactForm}
            </h2>
            <button
              onClick={onClose}
              className="text-dark hover:text-coral transition-colors p-1 rounded-lg hover:bg-light"
              aria-label={t.close}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-0 overflow-hidden">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/iBKAC3ROjWjoYuzfzOW5"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "0",
              }}
              id="inline-iBKAC3ROjWjoYuzfzOW5"
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name={language === 'fr' ? "Formulaire contact Français" : "Contact Form"}
              data-height="610"
              data-layout-iframe-id="inline-iBKAC3ROjWjoYuzfzOW5"
              data-form-id="iBKAC3ROjWjoYuzfzOW5"
              title={language === 'fr' ? "Formulaire contact Français" : "Contact Form"}
            />
          </div>
        </div>
      </div>

      {/* Script pour le formulaire */}
      {isOpen && (
        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          onLoad={() => setScriptLoaded(true)}
          strategy="lazyOnload"
        />
      )}
    </>
  );
}

