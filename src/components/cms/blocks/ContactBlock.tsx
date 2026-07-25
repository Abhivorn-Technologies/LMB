"use client";

import React, { useRef, useState } from 'react';
import { Phone, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ContactForm } from "@/components/sections/ContactForm";

export function ContactBlock({ content }: { content: any }) {
  let { title = "Speak with our", highlightTitle = "advisory team.", subtitle = "Submit an inquiry below and our expert team will respond promptly during business hours.", contactsTitle = "Key Contacts", contacts = [] } = content || {};
  if (contactsTitle === "Key Contactss") contactsTitle = "Key Contacts";

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const isScrollable = el.scrollHeight > el.clientHeight;
      if (!isScrollable) return;

      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      // Prevent the page from scrolling if we are scrolling within the container bounds
      if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += e.deltaY;
      } else {
        // Optional: If you want to NEVER scroll the page even when reaching the end of the list, 
        // uncomment the following two lines. 
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    
    // Prevent dragging if clicking on the scrollbar
    const rect = scrollRef.current.getBoundingClientRect();
    if (e.clientX >= rect.right - 16 || e.clientY >= rect.bottom - 16) {
      return;
    }

    setIsDragging(true);
    setStartY(e.pageY - scrollRef.current.offsetTop);
    setScrollTop(scrollRef.current.scrollTop);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const y = e.pageY - scrollRef.current.offsetTop;
    const walkY = (y - startY) * 1.5;
    scrollRef.current.scrollTop = scrollTop - walkY;
  };

  return (
    <div className="bg-slate-50 selection:bg-[#115E59] selection:text-white pb-12 w-full">
      <div className="pt-20">
        <ScrollReveal direction="up">
          <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 text-center">
            <h1 className="text-[40px] leading-[1.1] md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-4 md:mb-6">
              <TextReveal delay={0.2}>{title}</TextReveal>{" "}
              <span className="text-[#115E59] font-serif italic block md:inline"><TextReveal delay={0.3}>{highlightTitle}</TextReveal></span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-[1.6]">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <section>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-5 relative z-10">
            <div className="lg:col-span-2">
              <ScrollReveal direction="left" className="h-full">
                <div 
                  ref={scrollRef}
                  tabIndex={0}
                  role="region"
                  aria-labelledby="contacts-title"
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  className={`rounded-[2.5rem] bg-[#115E59] p-6 md:p-12 shadow-2xl h-[450px] lg:h-[700px] relative overflow-y-auto overflow-x-hidden custom-scrollbar overscroll-contain group block focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#115E59] ${isDragging ? 'cursor-grabbing select-none' : 'cursor-auto'}`}
                >
                  <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10 blur-[60px] pointer-events-none" aria-hidden="true" />
                  
                  <h2 id="contacts-title" className="text-3xl font-bold text-white mb-6 relative z-10 tracking-wide block">
                    {contactsTitle}
                  </h2>

                  <div className="relative block">
                    <ul className="space-y-8 relative z-10 pb-12" role="list">
                    {contacts.map((contact: any, idx: number) => {
                      if (!contact.name && !contact.phone && !contact.email) return null;
                      
                      return (
                      <li key={idx} className="group/contact border-b border-white/10 pb-6 last:border-0 last:pb-0">
                        {contact.name && (
                          <h3 className="text-lg font-bold text-white group-hover/contact:text-slate-200 transition-colors">
                            {contact.name}
                          </h3>
                        )}
                        {contact.title && (
                          <p className="text-sm font-medium text-white/70 mb-4 mt-1">
                            {contact.title}
                          </p>
                        )}
                        
                        <div className="space-y-3">
                          {contact.phone && (
                            <a 
                              href={`tel:${contact.phone.replace(/\s+/g, '')}`} 
                              aria-label={`Call ${contact.name || 'contact'} at ${contact.phone}`}
                              className={`flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md p-1 -ml-1 ${isDragging ? 'pointer-events-none' : ''}`}
                            >
                              <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover/contact:bg-white/20 transition-colors" aria-hidden="true">
                                <Phone className="h-4 w-4 text-white" />
                              </div>
                              <span className="break-all">{contact.phone}</span>
                            </a>
                          )}
                          {contact.email && (
                            <a 
                              href={`mailto:${contact.email}`} 
                              aria-label={`Email ${contact.name || 'contact'} at ${contact.email}`}
                              className={`flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md p-1 -ml-1 ${isDragging ? 'pointer-events-none' : ''}`}
                            >
                              <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover/contact:bg-white/20 transition-colors" aria-hidden="true">
                                <Mail className="h-4 w-4 text-white" />
                              </div>
                              <span className="break-all">{contact.email}</span>
                            </a>
                          )}
                        </div>
                      </li>
                    )})}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-3">
              <ScrollReveal direction="right" delay={0.1} className="h-full">
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
