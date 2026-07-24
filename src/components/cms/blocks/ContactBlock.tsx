import React from 'react';
import { Phone, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ContactForm } from "@/components/sections/ContactForm";

export function ContactBlock({ content }: { content: any }) {
  const { title = "Speak with our", highlightTitle = "advisory team.", subtitle = "Submit an inquiry below and our expert team will respond promptly during business hours.", contactsTitle = "Key Contacts", contacts = [] } = content || {};

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
                <div className="rounded-[2.5rem] bg-[#115E59] p-6 md:p-12 shadow-2xl h-[450px] lg:h-[700px] flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10 blur-[60px] pointer-events-none" />
                  
                  <h2 className="text-3xl font-bold text-white mb-6 relative z-10 tracking-wide shrink-0">
                    {contactsTitle}
                  </h2>

                  <div className="relative flex-1 overflow-hidden min-h-0">
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#115E59] to-transparent z-20 pointer-events-none lg:hidden" />
                    <div className="h-full overflow-y-auto overscroll-contain pr-4 pb-12 custom-scrollbar space-y-8 relative z-10">
                    {contacts.map((contact: any, idx: number) => {
                      if (!contact.name && !contact.phone && !contact.email) return null;
                      
                      return (
                      <div key={idx} className="group/contact border-b border-white/10 pb-6 last:border-0 last:pb-0">
                        {contact.name && (
                          <p className="text-lg font-bold text-white group-hover/contact:text-slate-200 transition-colors">
                            {contact.name}
                          </p>
                        )}
                        {contact.title && (
                          <p className="text-sm font-medium text-white/70 mb-4 mt-1">
                            {contact.title}
                          </p>
                        )}
                        
                        <div className="space-y-3">
                          {contact.phone && (
                            <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                              <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover/contact:bg-white/20 transition-colors">
                                <Phone className="h-4 w-4 text-white" />
                              </div>
                              <span className="break-all">{contact.phone}</span>
                            </a>
                          )}
                          {contact.email && (
                            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                              <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover/contact:bg-white/20 transition-colors">
                                <Mail className="h-4 w-4 text-white" />
                              </div>
                              <span className="break-all">{contact.email}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )})}
                    </div>
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
