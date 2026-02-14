import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50">

      {/* HERO */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center px-6 relative z-10">

          {/* LEFT */}
          <div className="text-center lg:text-left">
            
            {/* Brand */}
            <div className="mb-6">
              <span className="text-gray-500 font-light tracking-wide text-sm">
                spott<span className="text-purple-400">*</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[0.95] tracking-tight">
              Find what’s
              <br />
              happening around
              <br />
              <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                you.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-xl">
              Discover concerts, tech meetups, workshops, college fests, and
              more. Or create your own event and bring people together.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/explore">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-indigo-600 via-pink-500 to-orange-400 text-white shadow-md"
                >
                  Explore Events
                </Button>
              </Link>

              <Link href="/create-event">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base"
                >
                  Host an Event
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative">
            <Image
              src="/3d-react.png"
              alt="Spott event preview"
              width={700}
              height={700}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Discover events</h3>
            <p className="text-sm text-gray-500">
              Find events happening near you based on your interests and
              location.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Host & manage</h3>
            <p className="text-sm text-gray-500">
              Create events, manage attendees, and track registrations easily.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Smart discovery</h3>
            <p className="text-sm text-gray-500">
              AI-powered suggestions help you find the right events faster.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
