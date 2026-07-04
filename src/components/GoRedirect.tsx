"use client";

import { useEffect } from "react";

export function GoRedirect({ url }: { url: string }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-6 text-center text-white/50">
      <p>
        Redirecting…{" "}
        <a href={url} className="text-[#8db4ff] underline">
          Click here
        </a>{" "}
        if nothing happens.
      </p>
    </div>
  );
}
