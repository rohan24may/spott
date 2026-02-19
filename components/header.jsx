"use client";

import React, { useState } from "react";
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

  const { isLoading } = useStoreUser();
  const { showOnboarding, handleOnboardingComplete, handleOnboardingSkip } =
    useOnboarding();

  const { has } = useAuth(); 
  const hasPro = has?.({ plan: "pro" });

  return (
    <>
      <nav className="sticky top-0 bg-white/80 backdrop-blur-xl z-20 border-b">
        {/* Gradient top glow */}
        
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-pink-500/10 to-orange-400/10 blur-2xl pointer-events-none" />

<div className="relative bg-white/80 backdrop-blur-xl border-b">
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
    
    {/* LEFT SIDE */}
    <Link href="/" className="flex items-center flex-shrink-0">
      <Image
        src="/logo-light.png"
        alt="Spott"
        width={200}
        height={80}
        className="h-18 w-auto object-contain"
        priority
      />
    </Link>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-6">
      {/* explore pricing signin etc */}
    </div>
              {hasPro && (
                <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 gap-1 text-white">
                  <Crown className="w-3 h-3" />
                  Pro
                </Badge>
              )}
        

            {/* SEARCH - desktop */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <SearchLocationBar />
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-2">

              {/* Explore */}
              <Button variant="ghost" size="sm" asChild className="font-medium">
                <Link href="/explore">Explore</Link>
              </Button>

              {/* Pricing / Upgrade */}
              {!hasPro && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUpgradeModal(true)}
                  className="hidden sm:inline-flex"
                >
                  Pricing
                </Button>
              )}

              <Authenticated>
                {/* CREATE EVENT CTA */}
                <Button
                  size="sm"
                  asChild
                  className="flex gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-pink-500 to-orange-400 text-white shadow-md hover:opacity-90"
                >
                  <Link href="/create-event">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Create</span>
                  </Link>
                </Button>

                {/* USER MENU */}
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-9 h-9 ring-2 ring-indigo-500/30 hover:ring-indigo-500 transition",
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
                    className="rounded-full bg-gradient-to-r from-indigo-600 via-pink-500 to-orange-400 text-white shadow"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </Unauthenticated>
            </div>
          </div>

          {/* MOBILE SEARCH */}
          <div className="md:hidden border-t px-4 py-3 bg-white/70 backdrop-blur">
            <SearchLocationBar />
          </div>

          {isLoading && (
            <div className="absolute bottom-0 left-0 w-full">
              <BarLoader width={"100%"} color="#7c3aed" />
            </div>
          )}
        </div>
      </nav>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleOnboardingSkip}
        onComplete={handleOnboardingComplete}
      />

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        trigger="header"
      />
    </>
  );
}
