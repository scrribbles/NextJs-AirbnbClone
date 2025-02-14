import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found | Airbnb",
  description: "Page not found",
};

const NotFound = () => {
  const navigationLinks = [
    { text: "Return Home", href: "/" },
    { text: "Search Properties", href: "/search" },
    { text: "Help Center", href: "/help" },
    { text: "Travel Guide", href: "/travel" },
    { text: "Start Hosting", href: "/host" },
    { text: "Safety Guidelines", href: "/safety" },
  ];

  return (
    <div className="min-h-screen w-4/5 mx-auto flex  items-center justify-center bg-white py-5">
      <div className="w-full h-fit flex">
        <div className="max-w-2xl text-left w-full space-y-6 lg:w-1/2">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-700 mb-4">
            Oops!
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
            We can&apos;t seem to find the page you&apos;re looking for.
          </h2>
          <p className="text-gray-500 mb-6 font-semibold text-sm">
            Error code: 404
          </p>

          <nav className="flex flex-col text-sm gap-2 max-w-xl">
            <span className="text-gray-600">
              Here are some helpful links instead:
            </span>
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-teal-600 w-full"
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
        <div className="relative max-w-full min-h-full max-h-full mx-auto p-10 lg:w-1/2">
          <Image
            src="/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif"
            alt="404"
            width={150}
            height={140}
            className="object-contain h-full w-fit mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
