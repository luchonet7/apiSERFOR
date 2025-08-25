"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-3">
      <div className="relative hidden lg:block lg:col-span-1">
        <div className="absolute top-10 left-10 z-10">
          <Image
            src="/logo-minagri.png"
            alt="Logo"
            width={100}
            height={30}
            className="h-12 w-auto"
          />
        </div>
        <img
          src="/rio-amazonas.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 lg:col-span-2 bg-lime-100 dark:bg-lime-950">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            {/* children */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
