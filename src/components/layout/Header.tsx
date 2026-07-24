"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { siteConfig } from "@/lib/content/company";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import ShinyText from "@/components/ui/ShinyText";

const iconMap: Record<string, any> = { Shield: Icons.Shield, PiggyBank: Icons.PiggyBank, Coins: Icons.Coins, Users: Icons.Users, FileText: Icons.FileText };

const HeaderMegaMenu = React.memo(({ link, isActive, setMobileOpen, footerNav }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const serviceData = (footerNav?.services || []).find((s: any) => s.label.toLowerCase() === link.name.toLowerCase()) as any;
  const [activeChild, setActiveChild] = useState<any>(serviceData?.children?.[0]);

  return (
    <div 
      className="relative lg:static lg:py-6 lg:-my-6"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`group font-semibold whitespace-nowrap flex items-center px-1 max-lg:px-6 max-lg:py-4 max-lg:w-full max-lg:text-left max-lg:mb-2 max-lg:text-[15px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] lg:px-1 xl:px-1 relative py-1 ${
          isActive 
            ? 'max-lg:bg-slate-50 max-lg:text-[#0f172a] max-lg:rounded-xl text-[#0f172a]' 
            : 'text-[#64748b] hover:text-[#0f172a] max-lg:hover:bg-slate-50 max-lg:rounded-xl transition-colors'
        }`}
        onClick={(e) => {
          e.preventDefault();
          if (window.innerWidth < 1024) {
            setIsOpen(!isOpen);
          } else {
            setMobileOpen(false);
          }
        }}
      >
        {link.name}
        <Icons.ChevronDown size={14} className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        {isActive ? (
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ffb800] max-lg:hidden" />
        ) : (
          <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#ffb800] transition-all duration-300 group-hover:w-full group-hover:left-0 max-lg:hidden" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && serviceData?.children && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[650px] z-[60] max-lg:static max-lg:w-full max-lg:translate-x-0 max-lg:mt-0 max-lg:pt-0"
          >
            <div className="flex max-lg:hidden bg-white overflow-hidden rounded-2xl shadow-xl border border-slate-200">
              
              {/* Column 1: Categories (The Tabs) */}
              <ul className="w-[45%] p-2 border-r border-slate-100 flex flex-col bg-slate-50/50">
                {serviceData.children.map((child: any) => {
                  const Icon = child.icon ? (Icons as any)[child.icon] || iconMap[child.icon] : Icons.ShieldCheck;
                  const isSelected = activeChild?.label === child.label;
                  return (
                  <li key={child.label}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveChild(child);
                      }}
                      onMouseEnter={() => setActiveChild(child)}
                      className={`w-full text-left flex items-center justify-between gap-3 text-[0.9rem] font-medium transition-all duration-200 py-2.5 px-3 mb-0.5 rounded-xl ${
                        isSelected 
                          ? "bg-white shadow-sm text-[#ffb800]" 
                          : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {Icon && <Icon size={18} className={isSelected ? "text-[#ffb800]" : "text-slate-400"} strokeWidth={1.5} />}
                        {child.label}
                      </div>
                      <Icons.ChevronRight size={16} className={isSelected ? "text-[#ffb800]" : "text-slate-300 opacity-0 group-hover:opacity-100"} />
                    </button>
                  </li>
                  );
                })}
              </ul>

              {/* Column 2: Links (Sub-items) */}
              <div className="w-[55%] p-6 flex flex-col bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChild?.label}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-[0.85rem] text-slate-400 font-medium tracking-wide flex items-center gap-2">
                        {activeChild?.label} 
                      </h4>
                    </div>
                    
                    <div className="flex flex-col gap-3.5">
                      {activeChild?.children ? (
                        activeChild.children.map((subChild: any) => (
                          <div key={subChild.label} className="group w-fit">
                            <Link href={subChild.href} onClick={() => { setIsOpen(false); setMobileOpen(false); }} className="flex items-center gap-1.5 text-slate-700 hover:text-[#ffb800] text-[0.9rem] font-medium transition-colors relative pb-0.5">
                              {subChild.label}
                              <Icons.ArrowUpRight size={14} className="text-slate-300 group-hover:text-[#ffb800] transition-colors" />
                              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ffb800] transition-all duration-300 group-hover:w-full" />
                            </Link>
                          </div>
                        ))
                      ) : (
                        <div className="group w-fit">
                          <Link href={activeChild?.href || "#"} onClick={() => { setIsOpen(false); setMobileOpen(false); }} className="flex items-center gap-1.5 text-slate-700 hover:text-[#ffb800] text-[0.9rem] font-medium transition-colors relative pb-0.5">
                            Explore {activeChild?.label}
                            <Icons.ArrowUpRight size={14} className="text-slate-300 group-hover:text-[#ffb800] transition-colors" />
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ffb800] transition-all duration-300 group-hover:w-full" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Layout (Accordion) */}
            <div className="flex flex-col lg:hidden w-full px-2 py-1">
              {serviceData.children.map((child: any) => {
                const Icon = child.icon ? (Icons as any)[child.icon] || iconMap[child.icon] : Icons.ShieldCheck;
                const isSelected = activeChild?.label === child.label;
                return (
                  <div key={child.label} className="w-full flex flex-col">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveChild(isSelected ? null : child);
                      }}
                      className={`w-full text-left flex items-center justify-between gap-3 text-[15px] font-medium transition-all duration-200 py-3.5 px-4 mb-1 rounded-xl ${
                        isSelected ? "bg-slate-50 text-[#ffb800]" : "text-slate-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon size={20} className={isSelected ? "text-[#ffb800]" : "text-slate-400"} />}
                        {child.label}
                      </div>
                      <Icons.ChevronDown size={18} className={`transition-transform duration-200 ${isSelected ? "text-[#ffb800] rotate-180" : "text-slate-300"}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-3 pl-12 pr-4 pb-4 pt-1">
                            {child.children ? (
                              child.children.map((subChild: any) => (
                                <Link 
                                  key={subChild.label} 
                                  href={subChild.href} 
                                  onClick={() => setMobileOpen(false)} 
                                  className="text-slate-500 hover:text-[#ffb800] text-[14px] font-medium py-1"
                                >
                                  {subChild.label}
                                </Link>
                              ))
                            ) : (
                              <Link 
                                href={child.href || "#"} 
                                onClick={() => setMobileOpen(false)} 
                                className="text-slate-500 hover:text-[#ffb800] text-[14px] font-medium py-1"
                              >
                                Explore {child.label}
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
HeaderMegaMenu.displayName = "HeaderMegaMenu";

const HeaderSimpleDropdown = React.memo(({ link, options, isActive, setMobileOpen }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`group font-semibold whitespace-nowrap flex items-center px-1 max-lg:px-6 max-lg:py-4 max-lg:w-full max-lg:text-left max-lg:mb-2 max-lg:text-[15px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] lg:px-1 xl:px-1 relative py-1 ${
          isActive 
            ? 'max-lg:bg-slate-50 max-lg:text-[#0f172a] max-lg:rounded-xl text-[#0f172a]' 
            : 'text-[#64748b] hover:text-[#0f172a] max-lg:hover:bg-slate-50 max-lg:rounded-xl transition-colors'
        }`}
        onClick={() => {
          if (window.innerWidth < 1024) {
            setIsOpen(!isOpen);
          }
        }}
      >
        {link.name}
        <Icons.ChevronDown size={14} className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        {isActive ? (
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ffb800] max-lg:hidden" />
        ) : (
          <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#ffb800] transition-all duration-300 group-hover:w-full group-hover:left-0 max-lg:hidden" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[240px] z-[60] max-lg:static max-lg:w-full max-lg:translate-x-0 max-lg:pt-0"
          >
            <div className="flex flex-col bg-white text-slate-800 rounded-xl border border-slate-200 overflow-hidden shadow-2xl max-lg:shadow-none max-lg:border-none max-lg:bg-transparent max-lg:pl-8 py-1">
              {options.map((opt: any) => (
                <Link
                  key={opt.path}
                  href={opt.path}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-1.5 text-[0.85rem] font-medium hover:bg-slate-50 hover:text-[#F57C00] transition-colors max-lg:text-[0.9rem] max-lg:py-2"
                >
                  {opt.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
HeaderSimpleDropdown.displayName = "HeaderSimpleDropdown";

export function Header({ footerNav, mainNav }: { footerNav?: any, mainNav?: any }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // Update hash on load and when it changes
    setCurrentHash(window.location.hash);
    
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]); // Re-run when pathname changes to grab new hash

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Memoize handlers to prevent re-rendering
  const handleCloseMobile = React.useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Use CMS mainNav or fallback, memoized to prevent recalculation on scroll
  const navLinks = React.useMemo(() => {
    return mainNav || [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
      { name: "Life insurance", path: "/services/life-insurance" },
      { name: "General insurance", path: "/services/general-insurance" },
      { name: "Risk Management", path: "/services/risk-management" },
      { name: "Claims Consultancy", path: "/services/claims" },
      { name: "Reinsurance", path: "/reinsurance" },
      { name: "Clients", path: "/clients" },
      { name: "Contact Us", path: "/contact" },
    ];
  }, [mainNav]);

  if (pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return null;
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-[40] transition-all duration-300 ${scrolled ? 'shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white/95 backdrop-blur-md' : 'shadow-sm bg-white'}`}>
      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleCloseMobile}
      />

      <div className="mx-auto max-w-[1920px] w-full relative z-[40] flex justify-between items-center py-2 lg:py-3 px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="flex items-center h-10 md:h-12 w-[180px] md:w-[260px] lg:w-[160px] xl:w-[220px] 2xl:w-[260px] relative shrink-0 ml-0">
            <Image 
              src={siteConfig.logo} 
              alt={siteConfig.name} 
              fill
              unoptimized
              sizes="(max-width: 768px) 180px, 260px"
              className="object-contain object-left scale-[2] md:scale-[2.8] origin-left drop-shadow-sm pointer-events-none" 
              priority 
            />
          </Link>
        </div>

        <div data-lenis-prevent="true" className={`relative z-10 flex justify-end lg:justify-end flex-1 gap-1.5 lg:gap-2 xl:gap-3 2xl:gap-5 items-center max-lg:fixed max-lg:top-0 max-lg:z-[50] max-lg:bg-white max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:p-8 max-lg:pt-6 max-lg:h-[100dvh] max-lg:pb-28 max-lg:w-[85%] max-lg:sm:w-[360px] max-lg:shadow-[-20px_0_60px_rgba(0,0,0,0.2)] max-lg:transition-transform max-lg:duration-500 max-lg:ease-in-out max-lg:overflow-y-auto max-lg:overflow-x-hidden [&::-webkit-scrollbar]:hidden ${mobileOpen ? 'max-lg:right-0 max-lg:translate-x-0' : 'max-lg:-right-full max-lg:translate-x-full'}`}>
          
          {/* Mobile Sidebar Header */}
          <div className="lg:hidden flex items-center justify-between w-full mb-4 pb-4 border-b border-slate-100">
            <div className="relative h-10 w-[180px] -ml-2">
              <Image src={siteConfig.logo} alt={siteConfig.name} fill priority unoptimized sizes="150px" className="object-contain object-left scale-[2] origin-left pointer-events-none" />
            </div>
            <button className="text-slate-400 hover:text-slate-700 p-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors" onClick={handleCloseMobile}>
              <Icons.X size={20} />
            </button>
          </div>

          {navLinks.map((link: any) => {
            // Map mainNav label/path to standard name/path if they used label/href in CMS
            const linkName = link.name || link.label;
            const linkPath = link.path || link.href;
            
            let isActive = false;
            const isHashLink = linkPath.includes('#');
            
            if (isHashLink) {
              isActive = (pathname + currentHash) === linkPath;
            } else {
              if (linkPath === "/") {
                isActive = pathname === "/" && !currentHash;
              } else {
                isActive = pathname === linkPath || (linkPath !== "/" && pathname.startsWith(linkPath));
              }
            }


            if (linkName === "General insurance" || linkName === "Life insurance") {
              return <HeaderMegaMenu key={linkPath} link={{...link, name: linkName, path: linkPath}} isActive={isActive} setMobileOpen={setMobileOpen} footerNav={footerNav} />;
            }

            if (linkName === "Claims Consultancy") {
              const options = [
                { name: "Claim Services", path: "/services/claims" },
                { name: "Consulting Services", path: "/services/consulting" }
              ];
              return <HeaderSimpleDropdown key={linkName} link={{...link, name: linkName, path: linkPath}} options={options} isActive={isActive} setMobileOpen={setMobileOpen} />;
            }
            
            return (
              <Link
                key={linkPath}
                href={linkPath}
                className={`group font-semibold whitespace-nowrap px-1 max-lg:px-6 max-lg:py-4 max-lg:w-full max-lg:text-left max-lg:mb-2 max-lg:text-[15px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] lg:px-1 xl:px-1 relative py-1 ${
                  isActive 
                    ? 'max-lg:bg-slate-50 max-lg:text-[#0f172a] max-lg:rounded-xl text-[#0f172a]' 
                    : 'text-[#64748b] hover:text-[#0f172a] max-lg:hover:bg-slate-50 max-lg:rounded-xl transition-colors'
                }`}
                onClick={handleCloseMobile}
              >
                {linkName}
                {isActive ? (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ffb800] max-lg:hidden" />
                ) : (
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#ffb800] transition-all duration-300 group-hover:w-full group-hover:left-0 max-lg:hidden" />
                )}
              </Link>
            );
          })}

        </div>

        <div className="flex items-center justify-end gap-2 xl:gap-4 shrink-0">

          <button className="lg:hidden text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setMobileOpen(true)}>
            <Icons.Menu size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
}
