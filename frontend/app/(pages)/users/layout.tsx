import React from "react";
import FooterComponent from "./show/[id]/custom-footer";
import "../../globals.css";

import { manRope } from "@/utilities/font";
import Navbar from "@/app/ui/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${manRope.className} max-w-[150rem] mx-auto px-6`}>
        <Navbar />
        <div>
          {children}
          <FooterComponent />
        </div>
      </body>
    </html>
  );
}
