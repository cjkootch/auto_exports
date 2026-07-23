"use client";

import { useEffect } from "react";

export const UTM_STORAGE_KEY = "vae_utm";

/**
 * Captures utm_* query params on first landing and persists them for the
 * session so spec requests can attribute to the right outbound campaign
 * (lane1 = Gulf/Caucasus, lane2 = Caribbean).
 */
export default function UtmCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      params.forEach((value, key) => {
        if (key.toLowerCase().startsWith("utm_")) utm[key] = value;
      });
      if (Object.keys(utm).length > 0) {
        sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
      }
    } catch {
      // sessionStorage unavailable (private mode etc.) — attribution is best-effort
    }
  }, []);

  return null;
}
