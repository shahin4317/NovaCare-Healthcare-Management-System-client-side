
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import logo from '@/image/logo.png'

import {
  ArrowChevronDown,
  Bars,
  Xmark,

  ArrowRightFromSquare,
} from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const router = useRouter();

  // ==========================================
  // Better Auth Session
  // ==========================================

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setIsUserMenuOpen(false);
      setIsOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ==========================================
  // User Initial
  // ==========================================

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <nav className="relative z-50 h-[70px] w-full border-b border-gray-200 bg-[#f8fbfc] lg:h-[76px]">
      <div className="mx-auto flex h-full w-full items-center">
       <Image src={logo} alt='logo' width={60} height={60} className="ml-4"></Image>

        <div className="flex h-full flex-1 items-center px-4 sm:px-6 lg:w-[175px] lg:flex-none lg:border-r lg:px-5">
          <div className="flex items-center gap-2">

            <span className="text-[23px] font-semibold tracking-tight text-[#064b78] sm:text-[25px]">
             Novacare 
            </span>
          </div>
        </div>

        {/* ==========================================
            Desktop Menu
        ========================================== */}

        <div className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-10">
          <Link
            href={'/'}
            className="flex items-center gap-1 text-[15px] font-medium text-[#064b78]"
          >
            Home
            <ArrowChevronDown className="h-3.5 w-3.5" />
          </Link>

          <Link
            href={'/find-doctor'}
            className="text-[15px] font-medium text-[#064b78]"
          >
            Find Doctor
          </Link>

          <Link
            href={'/about-us'}
            className="flex items-center gap-1 text-[15px] font-medium text-[#064b78]"
          >
            About US
            <ArrowChevronDown className="h-3.5 w-3.5" />
          </Link>

          <Link
            href={"/contact-us"}
            className="flex items-center gap-1 text-[15px] font-medium text-[#064b78]"
          >
            Contact Us
            <ArrowChevronDown className="h-3.5 w-3.5" />
          </Link>

          <Link
            href={'/dashboard'}
            className="text-[15px] font-medium text-[#064b78]"
          >
           Dashboard
          </Link>

        </div>

        {/* ==========================================
            Desktop User Avatar
        ========================================== */}

        <div className="relative hidden h-full items-center border-l border-gray-200 px-4 lg:flex">
          {!isPending && user && (
            <>
              {/* Avatar Button */}

              <button
                type="button"
                onClick={() =>
                  setIsUserMenuOpen((prev) => !prev)
                }
                className="flex items-center justify-center rounded-full outline-none transition hover:opacity-80 focus:ring-2 focus:ring-[#064b78]/20"
                aria-label="Open user menu"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-10 w-10 rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#064b78] text-sm font-semibold text-white">
                    {userInitial}
                  </div>
                )}
              </button>

              {/* ==========================================
                  Desktop User Dropdown
              ========================================== */}

              {isUserMenuOpen && (
                <div className="absolute right-3 top-[64px] w-[260px] overflow-hidden rounded-xl border border-gray-200 shadow-lg">
                  {/* User Info */}

                  <div className="border-b border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || "User"}
                          className="h-11 w-11 rounded-full border border-gray-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#064b78] text-sm font-semibold text-white">
                          {userInitial}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#064b78]">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Logout */}

                  <div className="p-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <ArrowRightFromSquare className="h-4 w-4" />

                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* If user is not logged in */}

          {!isPending && !user && (
            <button
              type="button"
              onClick={() => router.push("/signin")}
              className="rounded-md bg-[#064b78] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#053d61]"
            >
              Sign in
            </button>
          )}
        </div>

        {/* ==========================================
            Appointment - Desktop
        ========================================== */}

        <div className="hidden h-full items-center border-l border-gray-200 px-3 lg:flex">
          <button className="rounded-md bg-[#064b78] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#053d61] xl:px-7 xl:py-4">
            Appointment
          </button>
        </div>

        {/* ==========================================
            Mobile Menu Button
        ========================================== */}

        <div className="flex items-center gap-2 px-4 lg:hidden">
          {/* Mobile Avatar */}

          {!isPending && user && (
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setIsUserMenuOpen((prev) => !prev)
                }
                className="flex items-center justify-center rounded-full outline-none transition hover:opacity-80 focus:ring-2 focus:ring-[#064b78]/20"
                aria-label="Open user menu"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#064b78] text-sm font-semibold text-white">
                    {userInitial}
                  </div>
                )}
              </button>

              {/* Mobile User Dropdown */}

              {isUserMenuOpen && (
                <div className="absolute right-0 top-[48px] z-50 w-[250px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                  {/* User Info */}

                  <div className="border-b border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || "User"}
                          className="h-11 w-11 rounded-full border border-gray-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#064b78] text-sm font-semibold text-white">
                          {userInitial}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#064b78]">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Logout */}

                  <div className="p-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <ArrowRightFromSquare className="h-4 w-4" />

                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu */}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-[#064b78] transition hover:bg-[#eef5f8]"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <Xmark className="h-6 w-6" />
            ) : (
              <Bars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* ==========================================
          Mobile / Tablet Menu
      ========================================== */}

      {isOpen && (
        <div className="absolute left-0 top-[70px] w-full border-b border-gray-200 bg-[#f8fbfc] px-5 py-5 shadow-lg lg:hidden">
          <div className="flex flex-col gap-1">
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-md px-4 py-3 text-[15px] font-medium text-[#064b78] hover:bg-[#eef5f8]"
            >
              Home
              <ArrowChevronDown className="h-4 w-4" />
            </a>

            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-4 py-3 text-[15px] font-medium text-[#064b78] hover:bg-[#eef5f8]"
            >
              About
            </a>

            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-md px-4 py-3 text-[15px] font-medium text-[#064b78] hover:bg-[#eef5f8]"
            >
              Pages
              <ArrowChevronDown className="h-4 w-4" />
            </a>

            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-md px-4 py-3 text-[15px] font-medium text-[#064b78] hover:bg-[#eef5f8]"
            >
              Blog
              <ArrowChevronDown className="h-4 w-4" />
            </a>

            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-4 py-3 text-[15px] font-medium text-[#064b78] hover:bg-[#eef5f8]"
            >
              Contact
            </a>

            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-4 py-3 text-[15px] font-medium text-[#064b78] hover:bg-[#eef5f8]"
            >
              Pricing
            </a>

            {/* Mobile Appointment */}

            <button
              type="button"
              className="mt-4 w-full rounded-md bg-[#064b78] py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#053d61]"
            >
              Appointment
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

