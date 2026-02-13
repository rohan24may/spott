"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Building, Crown, Plus, Ticket } from "lucide-react";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/use-store-user";
import { useOnboarding } from "@/hooks/use-onboarding";
import OnboardingModal from "./onboarding-modal";
import SearchLocationBar from "./search-location-bar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UpgradeModal from "./upgrade-modal";
import { Badge } from "./ui/badge";

export default function Header() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isLoading } = useStoreUser();
  const { showOnboarding, handleOnboardingComplete, handleOnboardingSkip } =
    useOnboarding();

  const { has } = useAuth();
  const hasPro = has?.({ plan: "pro" });

  // detect scroll for shrink + shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-20 backdrop-blur-xl transition-all duration-300
        ${
          scrolled
            ? "bg-zinc-950/80 border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] py-2"
            : "bg-zinc-950/60 border-b border-white/10 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/spott.png"
              alt="Spott logo"
              width={500}
              height={500}
              className={`transition-all duration-300 ${
                scrolled ? "h-9" : "h-11"
              } w-auto`}
              priority
            />

            {hasPro && (
              <Badge className="bg-linear-to-r from-pink-500 to-orange-500 gap-1 text-white ml-3">
                <Crown className="w-3 h-3" />
                Pro
              </Badge>
            )}
          </Link>

          {/* Search & Location - Desktop */}
          <div className="hidden md:flex flex-1 justify-center">
            <SearchLocationBar />
          </div>

          {/* Right Side */}
          <div className="flex items-center">
            
            {!hasPro && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUpgradeModal(true)}
                className="hover:bg-white/10 transition"
              >
                Pricing
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mr-2 hover:bg-white/10 transition"
            >
              <Link href="/explore">Explore</Link>
            </Button>

            <Authenticated>
              <Button
                size="sm"
                asChild
                className="flex gap-2 mr-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.03] transition"
              >
                <Link href="/create-event">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Event</span>
                </Link>
              </Button>

              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 ring-2 ring-white/10 hover:ring-white/30 transition",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Tickets"
                    labelIcon={<Ticket size={16} />}
                    href="/my-tickets"
                  />
                  <UserButton.Link
                    label="My Events"
                    labelIcon={<Building size={16} />}
                    href="/my-events"
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </Authenticated>

            <Unauthenticated>
              <SignInButton mode="modal">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.03] transition"
                >
                  Sign In
                </Button>
              </SignInButton>
            </Unauthenticated>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden border-t border-white/10 px-3 py-3 bg-zinc-950/70 backdrop-blur-lg">
          <SearchLocationBar />
        </div>

        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width={"100%"} color="#a855f7" />
          </div>
        )}
      </nav>

      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleOnboardingSkip}
        onComplete={handleOnboardingComplete}
      />

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        trigger="header"
      />
    </>
  );
}
