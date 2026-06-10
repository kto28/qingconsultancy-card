"use client";

import {
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageCircle,
  Share2,
  Download,
  Navigation,
  Map,
  ExternalLink,
  Building2,
  User,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const CONTACT = {
  name: "清心 Patti",
  title: "顧問 Consultant",
  company: "清心顧問 QING CONSULTANCY CO.",
  phone: "+852 9123 4567",
  email: "patti@qingconsultancy.com",
  website: "https://qingconsultancy.opchub.cloud",
  address: "香港九龍觀塘成業街",
  whatsapp: "85291234567",
  wechat: "qingpatti",
  linkedin: "https://www.linkedin.com/",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
};

function generateVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${CONTACT.name}
ORG:${CONTACT.company}
TITLE:${CONTACT.title}
TEL;TYPE=CELL:${CONTACT.phone}
EMAIL:${CONTACT.email}
URL:${CONTACT.website}
ADR;TYPE=WORK:;;${CONTACT.address}
END:VCARD`;
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${CONTACT.name}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}

async function shareCard() {
  if (navigator.share) {
    await navigator.share({
      title: `${CONTACT.name} - ${CONTACT.company}`,
      text: `Contact ${CONTACT.name} from ${CONTACT.company}`,
      url: window.location.href,
    });
  } else {
    await navigator.clipboard.writeText(window.location.href);
    alert("連結已複製到剪貼板！Link copied!");
  }
}

function MapModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  const addr = encodeURIComponent(CONTACT.address);
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md p-6 space-y-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-center text-slate-800">
          選擇地圖服務 Choose a Map
        </h3>
        <p className="text-sm text-center text-slate-500 pb-2">
          {CONTACT.address}
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${addr}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full p-3.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition text-blue-700 font-medium"
        >
          <Map className="w-5 h-5" />
          Google Maps
          <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
        </a>
        <a
          href={`https://maps.apple.com/?q=${addr}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition text-slate-700 font-medium"
        >
          <Navigation className="w-5 h-5" />
          Apple Maps
          <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
        </a>
        <a
          href={`https://waze.com/ul?q=${addr}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full p-3.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 transition text-cyan-700 font-medium"
        >
          <MapPin className="w-5 h-5" />
          Waze
          <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
        </a>
        <button
          onClick={onClose}
          className="w-full mt-2 p-3 rounded-xl text-slate-500 hover:bg-slate-100 transition font-medium"
        >
          取消 Cancel
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <>
      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} />

      <div className="min-h-screen flex flex-col items-center pb-8">
        {/* Hero Header */}
        <div className="w-full bg-gradient-to-br from-[#1a365d] via-[#1e3a5f] to-[#2c5282] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZWMjBoNnYxNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
          <div className="relative max-w-md mx-auto px-6 pt-12 pb-20 text-center">
            {/* Avatar */}
            <div className="animate-fade-in-up opacity-0 mb-5">
              <div className="w-28 h-28 mx-auto rounded-full bg-white/10 backdrop-blur border-4 border-white/30 flex items-center justify-center shadow-xl">
                <User className="w-14 h-14 text-white/80" />
              </div>
            </div>
            {/* Name & Title */}
            <div className="animate-fade-in-up opacity-0 animate-delay-100">
              <h1 className="text-2xl font-bold text-white tracking-wide">
                {CONTACT.name}
              </h1>
              <p className="text-blue-200 mt-1 text-sm font-light">
                {CONTACT.title}
              </p>
            </div>
            {/* Company */}
            <div className="animate-fade-in-up opacity-0 animate-delay-200 mt-3 inline-flex items-center gap-1.5 bg-white/10 backdrop-blur rounded-full px-4 py-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs text-blue-100 font-medium">
                {CONTACT.company}
              </span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-md mx-auto px-4 -mt-10 relative z-10">
          {/* Quick Action Buttons */}
          <div className="animate-fade-in-up opacity-0 animate-delay-200 bg-white rounded-2xl shadow-lg border border-slate-100 p-5 mb-4">
            <div className="grid grid-cols-4 gap-3">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-blue-50 transition group"
              >
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-[11px] text-slate-600 font-medium">
                  致電
                </span>
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-green-50 transition group"
              >
                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-[11px] text-slate-600 font-medium">
                  WhatsApp
                </span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-red-50 transition group"
              >
                <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition">
                  <Mail className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-[11px] text-slate-600 font-medium">
                  電郵
                </span>
              </a>
              <a
                href={CONTACT.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-purple-50 transition group"
              >
                <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-[11px] text-slate-600 font-medium">
                  網站
                </span>
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="animate-fade-in-up opacity-0 animate-delay-300 bg-white rounded-2xl shadow-lg border border-slate-100 p-5 mb-4 space-y-1">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              聯絡資料 Contact Info
            </h2>

            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition"
            >
              <Phone className="w-4.5 h-4.5 text-blue-500 shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {CONTACT.phone}
                </p>
                <p className="text-[11px] text-slate-400">電話 Phone</p>
              </div>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition"
            >
              <Mail className="w-4.5 h-4.5 text-red-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {CONTACT.email}
                </p>
                <p className="text-[11px] text-slate-400">電郵 Email</p>
              </div>
            </a>

            <button
              onClick={() => setMapOpen(true)}
              className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition w-full text-left"
            >
              <MapPin className="w-4.5 h-4.5 text-orange-500 shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {CONTACT.address}
                </p>
                <p className="text-[11px] text-slate-400">地址 Address</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-300 ml-auto" />
            </button>
          </div>

          {/* Social Media */}
          <div className="animate-fade-in-up opacity-0 animate-delay-400 bg-white rounded-2xl shadow-lg border border-slate-100 p-5 mb-4">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              社交媒體 Social Media
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-green-50 transition"
              >
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-[11px] text-slate-600">WhatsApp</span>
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-blue-50 transition"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <span className="text-[11px] text-slate-600">Facebook</span>
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-pink-50 transition"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
                <span className="text-[11px] text-slate-600">Instagram</span>
              </a>
            </div>
          </div>

          {/* WeChat */}
          <div className="animate-fade-in-up opacity-0 animate-delay-400 bg-white rounded-2xl shadow-lg border border-slate-100 p-5 mb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05a6.127 6.127 0 01-.253-1.736c0-3.74 3.568-6.768 7.962-6.768.326 0 .64.03.95.07C17.08 4.812 13.282 2.188 8.691 2.188zm-2.65 4.138c.56 0 1.016.457 1.016 1.016a1.02 1.02 0 01-1.016 1.016 1.02 1.02 0 01-1.016-1.016c0-.56.457-1.016 1.016-1.016zm5.318 0c.56 0 1.016.457 1.016 1.016a1.02 1.02 0 01-1.016 1.016 1.02 1.02 0 01-1.016-1.016c0-.56.457-1.016 1.016-1.016zM16.211 10c-3.868 0-7.002 2.691-7.002 6.002S12.343 22 16.211 22c.821 0 1.603-.13 2.326-.357a.673.673 0 01.556.08l1.478.865a.26.26 0 00.131.041.23.23 0 00.226-.228c0-.056-.022-.112-.037-.166l-.303-1.151a.465.465 0 01.166-.516C22.196 19.36 23.21 17.79 23.21 16c0-3.31-3.134-6-7.002-6zm-2.282 3.385c.434 0 .787.354.787.787s-.353.787-.787.787a.789.789 0 01-.787-.787c0-.434.353-.787.787-.787zm4.564 0c.434 0 .787.354.787.787s-.353.787-.787.787a.789.789 0 01-.787-.787c0-.434.353-.787.787-.787z"/></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  微信 WeChat
                </p>
                <p className="text-[11px] text-slate-400">
                  ID: {CONTACT.wechat}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="animate-fade-in-up opacity-0 animate-delay-500 space-y-3 mt-2">
            <button
              onClick={generateVCard}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gradient-to-r from-[#1a365d] to-[#2c5282] text-white font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98] text-sm"
            >
              <Download className="w-4.5 h-4.5" />
              儲存聯絡人 Save Contact
            </button>
            <button
              onClick={shareCard}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-white text-slate-700 font-semibold shadow border border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.98] text-sm"
            >
              <Share2 className="w-4.5 h-4.5" />
              分享名片 Share Card
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-[11px] text-slate-300">
              Powered by QING CONSULTANCY
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
