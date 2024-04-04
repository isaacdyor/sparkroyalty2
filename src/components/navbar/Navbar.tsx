"use client";
import { useActiveContext } from "@/utils/activeContext";
import { getRoutes } from "@/utils/getRoutes";
import { ActiveType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../../public/logo.png";
import { Search } from "./search";
import { Menu, X } from "lucide-react";

export type NavbarProps = {
  children: React.ReactNode;
};

export function Navbar({ children }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { active } = useActiveContext();

  const routes = getRoutes({ active });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex h-16 items-center justify-between border-b border-b-border px-6 lg:px-14">
      <div className="flex items-center">
        <Link href={"/"} className="shrink-0">
          <div className="flex items-start gap-2">
            <Image
              src={logo}
              width={125.2}
              height={91.6}
              className="h-9 w-7"
              alt="Picture of the author"
            />

            <h1 className="text-2xl font-bold text-accent-foreground">
              Spark Royalty
            </h1>
          </div>
        </Link>
        <div className="hidden w-full justify-end gap-1 bg-background px-4 sm:flex">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className={`inline-flex h-10 w-full items-center px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-accent-foreground sm:w-auto`}
            >
              {route.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-6">
        {active === ActiveType.INVESTOR && (
          <div className="hidden md:block md:w-64 lg:w-96">
            <Search />
          </div>
        )}

        {children}
      </div>

      {menuOpen && (
        <MobileMenu toggleMenu={toggleMenu} routes={routes}>
          {children}
        </MobileMenu>
      )}

      <button onClick={toggleMenu} className="sm:hidden">
        {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
      </button>
    </div>
  );
}

type MobileMenuProps = {
  toggleMenu: () => void;
  routes: { href: string; title: string }[];
  children: React.ReactNode;
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  toggleMenu,
  routes,
  children,
}) => {
  return (
    <div className="absolute right-0 top-16 z-50 flex h-[calc(100vh-64px)] w-full flex-col">
      <div className="flex  w-full grow flex-col gap-1 bg-background px-4 pb-2 sm:hidden">
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.href}
            onClick={toggleMenu}
            className={`inline-flex h-10 w-full items-center text-sm text-muted-foreground transition-colors hover:text-accent-foreground sm:w-auto`}
          >
            {route.title}
          </Link>
        ))}
        {children}
      </div>
      <div className="h-screen w-full bg-background/60 sm:hidden" />
    </div>
  );
};
