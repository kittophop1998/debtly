// I18nProvider.tsx
"use client";

import i18n from "@/lib/i18n";
import { ReactNode, useEffect } from "react";

export default function I18nProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        console.log("i18n initialized (client-side)", i18n.language);
    }, []);

    return <>{children}</>;
}