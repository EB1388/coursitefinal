"use client";

import { useEffect } from "react";
import { itemPath } from "@/lib/themes";
import type { CourItem } from "@/lib/items";

export function LegacyItemRedirect({ item }: { item: CourItem }) {
  const target = itemPath(item);

  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-6 text-center text-white/50">
      <p>
        Redirecting…{" "}
        <a href={target} className="text-[#8db4ff] underline">
          Continue to {item.name}
        </a>
      </p>
    </div>
  );
}
