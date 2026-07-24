"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Home, Heart, Shield, FileText, Target, Users, Loader2, AlertCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/ui/SplitText";
import ShinyText from "@/components/ui/ShinyText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Full name is required").max(50, "Name is too long").regex(/^[A-Za-z\s_]+$/, "Name can only contain alphabets, spaces, and underscores"),
  clientType: z.string().default("Individual"),
  company: z.string().regex(/^[A-Za-z\s_]*$/, "Organisation can only contain alphabets, spaces, and underscores").max(100, "Company name is too long").optional(),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Must be 10 digits and start with 6, 7, 8, or 9"),
  subject: z.string().min(2, "Subject is required"),
});

const inquiryOptions = [
  "General Insurance",
  "Reinsurance",
  "Life Insurance",
  "Risk Management",
  "Consulting",
  "Other",
];

type ContactFormData = z.infer<typeof contactSchema>;

export function Hero({ 
  content,
  isEditMode,
  isActive,
  onContentChange
}: { 
  content?: any;
  isEditMode?: boolean;
  isActive?: boolean;
  onContentChange?: (content: any) => void;
}) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [wordIndex, setWordIndex] = useState(0);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  // Use CMS data or fallback to defaults if content is missing
  const words = content?.subtitleWords || ["tomorrow.", "today.", "future.", "business.", "legacy."];

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      clientType: "Individual",
    }
  });

  const clientType = watch("clientType");

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "efbbb5cd-70f5-4980-b5d5-5c1ad4ca09a9",
          subject: `Home Page Inquiry from ${data.name}`,
          from_name: "LMB Website Portal",
          "Visitor Name": data.name,
          "Client Type": data.clientType,
          "Phone Number": `+91 ${data.phone}`,
          "Company Name": data.clientType === "Organization" ? (data.company || "Not provided") : "N/A",
          "Inquiry Type": data.subject,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const tabs = [
    { name: "General Insurance", icon: Home, href: "#general-insurance" },
    { name: "Life Insurance", icon: Heart, href: "#general-insurance" },
    { name: "Reinsurance", icon: Shield, href: "/reinsurance" },
    { name: "Claim Services", icon: FileText, href: "/services/claims" },
    { name: "Risk Management", icon: Target, href: "/services/risk-management" },
    { name: "Consulting", icon: Users, href: "/services/consulting" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-24 pb-32 md:pt-28 lg:pt-36 lg:pb-40">
      {/* Background Subtle glow */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-bl from-[#ffb800]/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between lg:items-start items-center gap-12 lg:gap-8 lg:pt-6">
          
          {/* Left Column */}
          <div className="w-full lg:w-[55%] flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div className="flex flex-col mb-5">
                {isEditMode ? (
                  <h1 
                    className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-[#0f172a] leading-[1.15] tracking-tight pb-2 outline-none border-b border-dashed border-transparent hover:border-[#0ea5e9] cursor-text"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => onContentChange?.({ ...content, title: e.currentTarget.textContent })}
                  >
                    {content?.title || "Insurance advisory"}
                  </h1>
                ) : (
                  <SplitText 
                    text={content?.title || "Insurance advisory"}
                    className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-[#0f172a] leading-[1.15] tracking-tight pb-2"
                    delay={50}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    textAlign="left"
                  />
                )}
                <div className="flex flex-wrap items-baseline gap-x-3">
                  {isEditMode ? (
                    <span 
                      className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-[#0f172a] leading-[1.15] tracking-tight outline-none border-b border-dashed border-transparent hover:border-[#0ea5e9] cursor-text"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => onContentChange?.({ ...content, titleHighlight: e.currentTarget.textContent })}
                    >
                      {content?.titleHighlight || "built on"}
                    </span>
                  ) : (
                    <SplitText 
                      text={content?.titleHighlight || "built on"}
                      className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-[#0f172a] leading-[1.15] tracking-tight"
                      delay={50}
                      animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
                      animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                      textAlign="left"
                    />
                  )}
                  <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", damping: 15, delay: 0.8 }} className="relative inline-block text-[#0f172a] whitespace-nowrap text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.15] tracking-tight">
                    <span
                      contentEditable={isEditMode}
                      suppressContentEditableWarning
                      className={isEditMode ? "outline-none border-b border-dashed border-transparent hover:border-[#ffb800] cursor-text" : ""}
                      onBlur={(e) => onContentChange?.({ ...content, trustWord: e.currentTarget.textContent })}
                    >
                      {content?.trustWord || "trust"}
                    </span>
                    <span className="text-[#ffb800]">.</span>
                    <motion.svg 
                      className="absolute -bottom-1 left-0 w-full h-[10px] overflow-visible" 
                      viewBox="0 0 100 10" 
                      preserveAspectRatio="none"
                    >
                      <motion.path 
                        d="M 0 5 Q 50 10 100 2" 
                        stroke="#ffb800" 
                        strokeWidth="6" 
                        strokeLinecap="round" 
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
                      />
                    </motion.svg>
                  </motion.span>
                </div>
              </div>
              
              <div className="flex items-center text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#334155] mb-8 h-[48px] overflow-hidden">
                <span
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  className={isEditMode ? "outline-none border-b border-dashed border-transparent hover:border-[#334155] cursor-text" : ""}
                  onBlur={(e) => onContentChange?.({ ...content, subtitleStart: e.currentTarget.textContent })}
                >
                  {content?.subtitleStart || "Securing your "}
                </span>
                <div className="relative inline-block h-[48px] w-[200px]">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={words[wordIndex]}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
                      className="absolute left-0 top-0 text-[#0ea5e9] flex items-center h-[48px]"
                    >
                      {words[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              <p className="text-base md:text-lg text-[#64748b] font-medium leading-relaxed max-w-[550px] mb-8">
                {content?.description ? (
                   // If CMS text contains highlighting syntax or we just render it plain
                   <span>{content.description}</span>
                ) : (
                  <>Insurance broking built on <ShinyText text="expertise, integrity, and client focus" color="#10b981" shineColor="#ffb800" className="font-bold" speed={4} /> — IRDAI CoR No. 116, since 2002.</>
                )}
              </p>
            </motion.div>

            {/* Service Tabs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <div className="flex flex-wrap gap-3 mb-10 max-w-[650px]">
                {tabs.map((tab, idx) => (
                  <Link href={tab.href} key={tab.name}>
                    <motion.div 
                      whileHover={{ y: -4, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.97 }}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border bg-white shadow-sm w-[105px] sm:w-[115px] h-[100px] transition-colors ${idx === 0 ? 'border-[#ffb800] shadow-md relative' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <tab.icon className={`w-6 h-6 mb-2.5 ${idx === 0 ? 'text-[#0ea5e9]' : 'text-[#38bdf8]'}`} strokeWidth={1.5} />
                      <span className={`text-[10px] sm:text-[11px] font-bold text-center leading-tight ${idx === 0 ? 'text-[#0f172a]' : 'text-[#334155]'}`}>
                        {tab.name}
                      </span>
                      {idx === 0 && (
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-[#ffb800] rotate-45" />
                      )}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Checkmarks */}
            <motion.ul 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
              }}
              className="space-y-3.5"
            >
              {(content?.checkmarks || [
                "Composite broker — one advisory relationship for every line",
                "Endorsements & new quotes handled with speed and efficiency",
                "Domestic & international insurer and reinsurer market access"
              ]).map((item: string, idx: number) => (
                <motion.li 
                  key={idx} 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                  }}
                  className="flex items-start text-[13px] sm:text-sm font-bold text-[#0f172a]"
                >
                  <div className="mt-0.5 mr-3 flex shrink-0 h-[18px] w-[18px] rounded-full bg-[#10b981] items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[45%] max-w-[460px] mx-auto lg:mx-0"
          >
            <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100 p-6 md:p-8 w-full relative flex flex-col">
              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center text-center w-full min-h-[400px]"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                      className="mx-auto h-24 w-24 bg-teal-50 rounded-full flex items-center justify-center mb-6 relative"
                    >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="absolute inset-0 bg-[#10b981]/10 rounded-full animate-ping" 
                      />
                      <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        <CheckCircle2 className="h-12 w-12 text-[#10b981] relative z-10" />
                      </motion.div>
                    </motion.div>
                    
                    <motion.h4 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-extrabold text-[#0f172a] mb-3"
                    >
                      Inquiry Sent!
                    </motion.h4>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-[#64748b] mb-10 text-[14px] leading-relaxed px-4"
                    >
                      Your request has been successfully sent to our team. <br/>
                      <strong className="text-[#0f172a]">We will call you back</strong> as soon as possible.
                    </motion.p>
                    
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      onClick={() => { setSubmitStatus("idle"); reset(); }}
                      className="w-full py-3.5 px-6 bg-slate-50 hover:bg-slate-100 text-[#0f172a] font-bold rounded-xl border border-slate-200 transition-colors"
                    >
                      Start a new inquiry
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col w-full h-full"
                  >
                    <h3 className="text-[22px] font-extrabold text-[#0f172a] mb-1">{content?.contactFormHeadline || "Get General Insurance Advisory"}</h3>
                    <p className="text-[13px] text-[#64748b] mb-5">{content?.contactFormSubheadline || "Share your details — our broking expert will call you back."}</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                      <div>
                        <label htmlFor="name" className="block text-[11px] font-bold tracking-wider text-[#64748b] uppercase mb-1.5">Your Name</label>
                        <input 
                          id="name" 
                          placeholder="e.g., John Doe"
                          maxLength={50}
                          {...register("name")}
                          onKeyPress={(e) => {
                            if (!/^[A-Za-z\s_]$/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[13px] text-[#334155] placeholder:text-[#94a3b8] focus:outline-none focus:ring-1 transition-all ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0ea5e9] focus:ring-[#0ea5e9]'}`} 
                        />
                        {errors.name && <p className="text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.name.message}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="clientType" className="block text-[11px] font-bold tracking-wider text-[#64748b] uppercase mb-1.5">Are you an</label>
                        <div className="relative">
                          <select 
                            id="clientType"
                            {...register("clientType")}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-[13px] text-[#334155] focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-all appearance-none cursor-pointer pr-10"
                          >
                            <option value="Individual">Individual</option>
                            <option value="Organization">Organization</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                        </div>
                      </div>

                      <AnimatePresence>
                        {clientType === "Organization" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="overflow-hidden"
                          >
                            <label htmlFor="company" className="block text-[11px] font-bold tracking-wider text-[#64748b] uppercase mb-1.5">Organisation Name</label>
                            <input 
                              id="company" 
                              placeholder="e.g., Acme Corp" 
                              maxLength={100}
                              {...register("company")}
                              onKeyPress={(e) => {
                                if (!/^[A-Za-z\s_]$/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[13px] text-[#334155] placeholder:text-[#94a3b8] focus:outline-none focus:ring-1 transition-all ${errors.company ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0ea5e9] focus:ring-[#0ea5e9]'}`} 
                            />
                            {errors.company && <p className="text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.company.message}</p>}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div>
                        <label htmlFor="subject" className="block text-[11px] font-bold tracking-wider text-[#64748b] uppercase mb-1.5">Inquiry Type</label>
                        <div className="relative">
                          <select 
                            id="subject"
                            defaultValue=""
                            onClick={() => setIsSelectOpen((prev) => !prev)}
                            onBlur={() => setIsSelectOpen(false)}
                            {...register("subject", {
                              onChange: (e) => {
                                setIsSelectOpen(false);
                                e.target.blur();
                              }
                            })}
                            className={`appearance-none w-full px-3.5 py-2.5 rounded-xl border bg-white text-[13px] text-[#334155] placeholder:text-[#94a3b8] focus:outline-none focus:ring-1 transition-all cursor-pointer pr-10 ${errors.subject ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0ea5e9] focus:ring-[#0ea5e9]'}`}
                          >
                            <option value="" disabled>Select inquiry type</option>
                            {inquiryOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none transition-transform duration-200 ${isSelectOpen ? "rotate-180" : ""}`} />
                        </div>
                        {errors.subject && <p className="text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.subject.message}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-[11px] font-bold tracking-wider text-[#64748b] uppercase mb-1.5">Mobile Number</label>
                        <div className="flex gap-2.5">
                          <div className="flex items-center justify-center w-[60px] rounded-xl border border-slate-200 bg-[#f8fafc] text-[#475569] text-[13px] font-bold shrink-0">
                            +91
                          </div>
                          <input 
                            id="phone" 
                            type="tel"
                            placeholder="10-digit mobile number" 
                            maxLength={10}
                            {...register("phone")}
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                                return;
                              }
                              if (e.currentTarget.selectionStart === 0 && !/^[6-9]$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[13px] text-[#334155] placeholder:text-[#94a3b8] focus:outline-none focus:ring-1 transition-all ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0ea5e9] focus:ring-[#0ea5e9]'}`} 
                          />
                        </div>
                        {errors.phone && <p className="text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.phone.message}</p>}
                      </div>

                      <div className="pt-1.5">
                        <motion.button 
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={submitStatus === "loading"} 
                          type="submit" 
                          className="w-full bg-[#ffb800] hover:bg-[#e6a600] text-[#0f172a] font-extrabold py-3 rounded-xl transition-colors shadow-[0_8px_20px_rgba(255,184,0,0.25)] flex justify-center items-center h-[46px] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative group"
                        >
                          <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" style={{ animation: "shimmer 2s infinite" }} />
                          {submitStatus === "loading" ? <Loader2 className="w-5 h-5 animate-spin relative z-10" /> : <span className="relative z-10">Request a Call Back</span>}
                        </motion.button>
                      </div>
                      
                      <AnimatePresence>
                        {submitStatus === "error" && (
                          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[13px] text-red-500 font-medium text-center m-0 mt-3">
                            Something went wrong. Please try again.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </form>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[12px] font-bold text-[#0284c7]">
                      <Link href="/services" className="hover:text-[#0369a1] flex items-center gap-1">All Services <span className="text-[9px]">▶</span></Link>
                      <Link href="/contact" className="hover:text-[#0369a1] flex items-center gap-1">Contact Us <span className="text-[9px]">▶</span></Link>
                    </div>
                    <p className="mt-4 text-[10px] leading-relaxed text-[#94a3b8]">
                      By submitting, you authorise LMB Insurance Brokers Pvt. Ltd. to contact you regarding your enquiry. Insurance is the subject matter of solicitation.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
