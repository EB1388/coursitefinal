"use client";

import { QRCodeSVG } from "qrcode.react";
import { apps } from "@/lib/apps";
import { products } from "@/lib/products";

const items = [...apps, ...products];

export function PressQrGrid() {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const url = `https://cour.software/go/${item.slug}`;
        return (
          <div key={item.slug} className="card-premium flex flex-col items-center p-6">
            <QRCodeSVG value={url} size={120} bgColor="transparent" fgColor="#f4f4f5" />
            <p className="font-display mt-4 font-medium">{item.name}</p>
            <a
              href={url}
              className="mt-1 break-all text-center text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)]"
            >
              {url.replace("https://", "")}
            </a>
          </div>
        );
      })}
    </div>
  );
}
