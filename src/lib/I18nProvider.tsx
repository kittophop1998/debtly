// src/lib/I18nProvider.tsx
"use client";

import { ReactNode, useEffect } from "react";
import i18n from "./i18n";

export default function I18nProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        console.log("i18n initialized (client-side)", i18n.language);
    }, []);

    return <>{children}</>;
}
