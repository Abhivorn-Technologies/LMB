"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextReveal } from "@/components/motion/TextReveal";
import Link from "next/link";
import { 
  Shield, FileText, CheckCircle2, Clipboard, Handshake, 
  LineChart, Coins, Scale, Bell, Building2, Car, Home, 
  Activity, Cloud, ArrowRight, ChevronDown, Check,
  Clock, Stethoscope, Briefcase, Network, Anchor, Zap,
  ChevronLeft, ChevronRight
} from "lucide-react";

// --- Animations ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function ClaimServicesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current && carouselRef.current.children.length > 0) {
      const firstCard = carouselRef.current.children[0] as HTMLElement;
      const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : 424;
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[100vw] bg-[#FFFFFF] font-sans selection:bg-[#19C8D6] selection:text-white text-[#17233A] overflow-hidden overflow-x-hidden">
      
      {/* 
        ==================================================
        HERO SECTION
        ==================================================
      */}
      <section className="relative min-h-[calc(100vh-140px)] flex items-center overflow-hidden bg-[#F8FBFC] py-16 lg:py-24">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-[#19C8D6]/10 to-transparent blur-[120px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#0E6D73]/5 to-transparent blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            {/* Left: Text Content */}
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E7EEF2] shadow-sm mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-[#19C8D6] animate-pulse" />
                <span className="text-xs font-bold tracking-wider text-[#17233A] uppercase">LMB Claim Services</span>
              </motion.div>
              
              <motion.h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#17233A] leading-[1.15] tracking-tight mb-6">
                <TextReveal delay={0.2}>Claims Support That Works for You</TextReveal> <br className="hidden lg:block" />
                <span className="text-[#19C8D6]"><TextReveal delay={0.3}>When It Matters Most</TextReveal></span>
              </motion.h1>
              
              <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="text-lg text-[#58667E] leading-relaxed mb-10 max-w-xl">
                When a claim occurs, every decision matters. Our specialists guide you from incident reporting to settlement support—reducing delays and achieving fair outcomes with confidence.
              </motion.p>
              
              <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="px-10 py-5 bg-[#17233A] text-white rounded-full font-bold text-lg hover:bg-[#0E6D73] transition-all duration-300 shadow-[0_10px_30px_rgba(23,35,58,0.2)] hover:shadow-[0_10px_40px_rgba(14,109,115,0.4)] flex items-center gap-3 group"
                >
                  Contact Claims Team
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Right: Premium 3D Visual */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-[85%] mx-auto aspect-square flex items-center justify-center group cursor-pointer perspective-[1000px]"
            >
              {/* Decorative floating elements behind image */}
              <motion.div animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] right-[-5%] w-20 h-20 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-500">
                <Shield className="w-8 h-8 text-[#0E6D73]" />
              </motion.div>
              <motion.div animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[20%] left-[-5%] w-16 h-16 bg-white/40 backdrop-blur-xl rounded-full border border-white/60 shadow-xl flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-500">
                <CheckCircle2 className="w-6 h-6 text-[#19C8D6]" />
              </motion.div>

              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/50 bg-gradient-to-br from-[#F8FBFC] to-white p-2 shadow-[0_30px_60px_rgba(14,109,115,0.15)] group-hover:shadow-[0_40px_80px_rgba(25,200,214,0.3)] group-hover:-translate-y-2 group-hover:rotate-x-[5deg] group-hover:rotate-y-[-5deg] transition-all duration-700 ease-out transform-style-3d">
                <img 
                  src="/images/claims_hero_premium.png" 
                  alt="Premium Claims Management Shield" 
                  className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#19C8D6]/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 
        ==================================================
        TRUST BAR - PREMIUM MARQUEE
        ==================================================
      */}
      <div className="w-full bg-[#17233A] border-y border-[#17233A] py-5 relative z-20 overflow-hidden shadow-xl">
        <div className="flex w-[200%]">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="flex flex-nowrap whitespace-nowrap gap-16 px-8 text-sm font-bold text-white uppercase tracking-widest"
          >
            {[
              "End-to-End Claims Assistance",
              "Dedicated Claims Specialists",
              "Faster Resolution Guidance",
              "Transparent Communication",
              "Client Advocacy Throughout the Process",
              "End-to-End Claims Assistance",
              "Dedicated Claims Specialists",
              "Faster Resolution Guidance",
              "Transparent Communication",
              "Client Advocacy Throughout the Process"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#19C8D6]" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 
        ==================================================
        SECTION 1: Why Professional Claims Support Matters
        ==================================================
      */}
      <section className="py-24 md:py-32 bg-[#FFFFFF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Illustration */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative w-full aspect-[4/3] rounded-[2.5rem] p-4 flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#F8FBFC] border border-[#E7EEF2] rounded-[2.5rem] -z-10" />
              <img 
                src="/images/claims_why_professional.png" 
                alt="Professional Claims Experts" 
                className="w-full h-full object-cover rounded-3xl shadow-[0_20px_40px_rgba(14,109,115,0.15)]"
              />
            </motion.div>

            {/* Right: Content */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-[#17233A] mb-6 tracking-tight">
                Why Professional Claims Support Matters
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-[#58667E] leading-relaxed mb-6">
                Insurance claims can involve documentation, policy interpretation, communication with insurers, and strict timelines. Without expert guidance, the process may become time-consuming and stressful.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-[#58667E] leading-relaxed mb-10">
                Our claims specialists help simplify every stage by providing practical advice, coordinating with insurers, reviewing documentation, and supporting clients until the claim reaches a fair resolution.
              </motion.p>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6">
                {[
                  { title: "Claim Review", icon: FileText },
                  { title: "Documentation", icon: Clipboard },
                  { title: "Settlement Support", icon: Coins },
                  { title: "Communication", icon: Handshake }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 bg-[#F8FBFC] p-4 rounded-2xl border border-[#E7EEF2] hover:border-[#19C8D6]/30 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                      <feature.icon className="w-6 h-6 text-[#0E6D73]" />
                    </div>
                    <span className="font-bold text-[#17233A]">{feature.title}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 2: Our Claim Services
        ==================================================
      */}
      <section className="py-24 md:py-32 bg-[#F8FBFC] border-y border-[#E7EEF2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#17233A] mb-6 tracking-tight">Our Claim Services</h2>
            <p className="text-lg text-[#58667E] leading-relaxed">
              Comprehensive claims advocacy ensuring fairness, accuracy, and speed at every step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Claim Registration Assistance", icon: FileText, desc: "Guide clients through accurate claim notification and ensure all required information is submitted correctly from the beginning." },
              { title: "Claims Documentation Review", icon: Clipboard, desc: "Review supporting documents, reports, invoices, and evidence before submission to improve claim quality." },
              { title: "Insurer Coordination", icon: Handshake, desc: "Act as the communication bridge between clients and insurers to help streamline claim processing." },
              { title: "Claim Progress Monitoring", icon: LineChart, desc: "Track claim status proactively and provide timely updates throughout every stage." },
              { title: "Settlement Guidance", icon: Coins, desc: "Review settlement offers, explain policy terms, and help clients understand available options." },
              { title: "Dispute Resolution Support", icon: Scale, desc: "Assist in resolving claim-related concerns through structured communication and policy interpretation." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } } }}
                className="group bg-white rounded-3xl p-8 border border-[#E7EEF2] hover:border-[#19C8D6]/50 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(25,200,214,0.1)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#19C8D6]/0 to-[#19C8D6]/0 group-hover:from-[#19C8D6]/5 group-hover:to-transparent transition-colors duration-500" />
                
                <div className="w-16 h-16 rounded-2xl bg-[#F8FBFC] border border-[#E7EEF2] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:border-[#19C8D6]/30 transition-all duration-300 relative z-10">
                  <service.icon className="w-8 h-8 text-[#0E6D73] group-hover:text-[#19C8D6] transition-colors" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-[#17233A] mb-4 relative z-10">{service.title}</h3>
                <p className="text-[#58667E] leading-relaxed mb-6 relative z-10">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 3: Claims We Support (Carousel)
        ==================================================
      */}
      <section className="py-24 md:py-32 bg-[#FFFFFF] relative overflow-hidden">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 relative mb-12">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#17233A] tracking-tight mb-4">Claims We Support</h2>
            <p className="text-lg text-[#58667E] max-w-2xl">Expert claims advocacy across a full spectrum of insurance lines.</p>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
          <div className="flex items-center gap-4 lg:gap-8">
            <button 
              onClick={() => scrollCarousel('left')}
              disabled={!canScrollLeft}
              className="shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full border border-[#E7EEF2] flex items-center justify-center text-[#17233A] hover:bg-[#19C8D6] hover:text-white hover:border-[#19C8D6] transition-all duration-300 shadow-[0_10px_20px_rgba(23,35,58,0.1)] hidden md:flex disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:bg-gray-100 disabled:hover:text-gray-400 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} />
            </button>

            <div 
              ref={carouselRef}
              onScroll={checkScroll}
              className="flex-1 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 hide-scroll-bar scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[
              { title: "Property Claims", icon: Home, desc: "Fire, flood, and damage recovery", points: ["Comprehensive coverage for fire and lightning damage.", "Expert assessment for flood, water, and storm damages.", "Accurate valuation for burglary and theft incidents.", "Thorough analysis to minimize business interruption losses."] },
              { title: "Motor Claims", icon: Car, desc: "Commercial and personal fleet incidents", points: ["Rapid assistance for commercial fleet accident damages.", "Dedicated support for third-party liability claims.", "Streamlined processing for vehicle theft and total loss.", "Efficient management of windshield and glass repairs."] },
              { title: "Health Insurance Claims", icon: Activity, desc: "Medical expense reimbursements", points: ["Seamless coordination for cashless hospitalizations.", "Expedited processing for medical reimbursement claims.", "Coverage assurance for pre and post-hospitalization costs.", "Specialized support for critical illness treatments."] },
              { title: "Life Insurance Claims", icon: Stethoscope, desc: "Death and disability benefits", points: ["Compassionate support for death benefit processing.", "Accurate evaluation for permanent disability claims.", "Swift processing of critical illness cover payouts.", "Reliable assistance with maturity and terminal illness claims."] },
              { title: "Commercial Claims", icon: Building2, desc: "Business interruption & operations", points: ["Strategic claim filing for severe business interruptions.", "Detailed assessment of machinery and equipment breakdowns.", "Valuation of stock, inventory, and warehouse losses.", "Specialized handling of transit and logistics damages."] },
              { title: "Engineering Claims", icon: Zap, desc: "Machinery breakdown & project risks", points: ["Expert handling of Contractor's All Risk policies.", "Comprehensive evaluation of Erection All Risk incidents.", "Detailed assessments for plant and machinery failures.", "Specialized recovery for electronic equipment damages."] },
              { title: "Marine Claims", icon: Anchor, desc: "Cargo transit and hull damage", points: ["Extensive support for inland and overseas transit losses.", "Specialized handling of severe maritime hull damages.", "Expert negotiation for complex freight liability claims.", "Professional assistance in General Average declarations."] },
              { title: "Liability Claims", icon: Scale, desc: "Public, product, and D&O liability", points: ["Thorough defense and support for public liability incidents.", "Expert handling of product defect and recall claims.", "Dedicated advocacy for Directors & Officers disputes.", "Comprehensive management of professional indemnity claims."] },
              { title: "Cyber Insurance Claims", icon: Network, desc: "Data breaches and ransomware", points: ["Rapid response coordination for ransomware attacks.", "Comprehensive support during major data breach incidents.", "Business interruption calculations following cyber events.", "Assistance with third-party privacy and liability claims."] }
            ].map((type, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-3xl border border-[#E7EEF2] hover:border-[#19C8D6]/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(25,200,214,0.15)] flex flex-col items-center text-center relative overflow-hidden cursor-pointer min-h-[320px]"
              >
                {/* Default State */}
                <div className="p-8 w-full h-full flex flex-col items-center justify-center relative z-10 group-hover:-translate-y-8 group-hover:opacity-0 transition-all duration-500 ease-in-out">
                  <div className="w-16 h-16 rounded-full bg-[#F8FBFC] border border-[#E7EEF2] group-hover:bg-[#19C8D6] group-hover:border-[#19C8D6] flex items-center justify-center mb-6 transition-all duration-500 shadow-sm group-hover:scale-110">
                    <type.icon className="w-8 h-8 text-[#58667E] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-extrabold text-xl text-[#17233A] mb-4 group-hover:text-[#0E6D73] transition-colors">{type.title}</h3>
                  <p className="text-[#58667E] font-medium leading-relaxed">{type.desc}</p>
                </div>
                
                {/* Hover Reveal State */}
                <div className="absolute inset-0 bg-[#F8FBFC] p-8 flex flex-col justify-center translate-y-[100%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out z-20">
                  <h3 className="font-extrabold text-2xl text-[#0E6D73] mb-6 text-center border-b border-[#E7EEF2] pb-4">{type.title}</h3>
                  <ul className="text-left space-y-4">
                    {type.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[15px] text-[#17233A] font-semibold leading-snug">
                        <CheckCircle2 className="w-5 h-5 text-[#19C8D6] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#19C8D6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
              </motion.div>
            ))}
            </div>

            <button 
              onClick={() => scrollCarousel('right')}
              disabled={!canScrollRight}
              className="shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full border border-[#E7EEF2] flex items-center justify-center text-[#17233A] hover:bg-[#19C8D6] hover:text-white hover:border-[#19C8D6] transition-all duration-300 shadow-[0_10px_20px_rgba(23,35,58,0.1)] hidden md:flex disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:bg-gray-100 disabled:hover:text-gray-400 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Mobile Arrows */}
          <div className="flex items-center justify-center gap-6 mt-4 md:hidden">
            <button disabled={!canScrollLeft} onClick={() => scrollCarousel('left')} className="w-14 h-14 rounded-full border border-[#E7EEF2] flex items-center justify-center text-[#17233A] shadow-sm disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200"><ChevronLeft size={24} /></button>
            <button disabled={!canScrollRight} onClick={() => scrollCarousel('right')} className="w-14 h-14 rounded-full border border-[#E7EEF2] flex items-center justify-center text-[#17233A] shadow-sm disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200"><ChevronRight size={24} /></button>
          </div>
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 4: Our Claims Process
        ==================================================
      */}
      <section className="py-24 md:py-32 bg-[#F8FBFC] border-y border-[#E7EEF2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#17233A] mb-6 tracking-tight">Our Claims Process</h2>
            <p className="text-lg text-[#58667E] leading-relaxed">
              A streamlined, transparent pathway from incident to settlement.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#19C8D6]/20 via-[#0E6D73]/20 to-transparent -translate-x-1/2 rounded-full" />
            
            <div className="space-y-12 md:space-y-24">
              {[
                { step: "01", title: "Incident Reporting", desc: "Report the incident promptly and capture all relevant details to initiate the process immediately.", icon: Bell },
                { step: "02", title: "Document Collection", desc: "Gather policy documents, supporting evidence, photographs, invoices, and required records.", icon: Clipboard },
                { step: "03", title: "Claim Submission", desc: "Submit complete documentation to the insurer with accuracy and full compliance.", icon: FileText },
                { step: "04", title: "Assessment & Coordination", desc: "Work closely with insurers, surveyors, and stakeholders during the evaluation process.", icon: Handshake },
                { step: "05", title: "Settlement & Closure", desc: "Support the client until the claim is resolved and fair settlement is successfully completed.", icon: Shield }
              ].map((process, i) => (
                <motion.div 
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                  variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.1 } } }}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''} relative`}
                >
                  <div className={`flex-1 w-full md:text-${i % 2 === 0 ? 'right' : 'left'} pl-20 md:pl-0`}>
                    <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#19C8D6]/10 text-[#0E6D73] font-bold text-sm mb-4 ${i % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      STEP {process.step}
                    </div>
                    <h3 className="text-2xl font-bold text-[#17233A] mb-4">{process.title}</h3>
                    <p className="text-[#58667E] leading-relaxed text-lg">{process.desc}</p>
                  </div>
                  
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-[4px] border-[#F8FBFC] rounded-full shadow-[0_10px_30px_rgba(14,109,115,0.2)] flex items-center justify-center z-10 group hover:scale-110 transition-transform duration-500 cursor-pointer">
                    <process.icon className="w-7 h-7 text-[#0E6D73] group-hover:text-[#19C8D6] transition-colors" />
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 5: Why Choose LMB for Claims Support
        ==================================================
      */}
      <section className="py-24 md:py-32 bg-[#FFFFFF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Corporate Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotateY: 15 }} whileInView={{ opacity: 1, scale: 1, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full aspect-[4/3] rounded-[2.5rem] p-3 flex items-center justify-center overflow-hidden group perspective-[1000px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#19C8D6]/20 to-[#0E6D73]/10 border border-[#E7EEF2] rounded-[2.5rem] -z-10 group-hover:scale-105 transition-transform duration-700" />
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(14,109,115,0.15)] group-hover:shadow-[0_30px_60px_rgba(25,200,214,0.3)] transition-shadow duration-700 border border-white/50">
                <img 
                  src="/images/claims_why_choose_corporate.png" 
                  alt="LMB Corporate Claims Team" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-[#17233A]/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
              </div>
            </motion.div>

            {/* Right: Premium Checklist */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-[#17233A] mb-10 tracking-tight">
                Why Choose LMB for Claims Support
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Dedicated Claims Experts",
                  "Personalized Support",
                  "Transparent Communication",
                  "Policy Interpretation Assistance",
                  "Settlement Guidance",
                  "Industry Experience",
                  "Efficient Coordination",
                  "Long-Term Client Partnership"
                ].map((item, i) => (
                  <motion.div 
                    key={i} variants={fadeUp}
                    className="flex items-center gap-4 bg-[#F8FBFC] border border-[#E7EEF2] rounded-2xl p-4 hover:bg-white hover:shadow-[0_10px_20px_rgba(25,200,214,0.1)] hover:border-[#19C8D6]/30 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#19C8D6]/10 flex items-center justify-center shrink-0 group-hover:bg-[#19C8D6] transition-colors">
                      <Check className="w-4 h-4 text-[#0E6D73] group-hover:text-white transition-colors" strokeWidth={3} />
                    </div>
                    <span className="font-bold text-[#17233A] text-sm group-hover:text-[#0E6D73] transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 6: Frequently Asked Questions
        ==================================================
      */}
      <section className="py-24 md:py-32 bg-[#F8FBFC] border-y border-[#E7EEF2]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#17233A] mb-6 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-lg text-[#58667E]">Clear answers to help you navigate the claims process.</p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "How do I start an insurance claim?", a: "You can start a claim by reporting the incident to our dedicated claims team immediately. We will guide you on the necessary first steps, documentation required, and initiate the formal notification to the insurer." },
              { q: "What documents are required?", a: "Required documents vary by claim type, but generally include a completed claim form, photographs of the damage/incident, policy documents, relevant invoices, police reports (if applicable), and any other supporting evidence." },
              { q: "How long does claim processing usually take?", a: "Processing times depend on the complexity of the claim, the responsiveness of third parties, and the specific insurer. Simple claims may be resolved in weeks, while complex commercial or liability claims can take several months." },
              { q: "Will LMB communicate with the insurer on my behalf?", a: "Yes. As your broker, we act as the communication bridge between you and the insurer, advocating for your interests and ensuring all correspondence is handled professionally and promptly." },
              { q: "Can you help with disputed claims?", a: "Absolutely. If a claim is disputed or rejected, our specialists will review the insurer's rationale against your policy wording and assist in structuring a formal response or appeal to seek a fair resolution." },
              { q: "Do you assist commercial insurance claims?", a: "Yes, we handle the full spectrum of commercial claims including property damage, business interruption, professional indemnity, directors and officers (D&O) liability, and complex engineering claims." }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } } }}
                className="bg-white border border-[#E7EEF2] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-lg text-[#17233A] pr-8">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${activeFaq === i ? 'bg-[#19C8D6] text-white' : 'bg-[#F8FBFC] text-[#0E6D73]'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-[#58667E] leading-relaxed border-t border-[#E7EEF2] mt-2 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ==================================================
        FINAL CTA - 100% EDGE-TO-EDGE
        ==================================================
      */}
      <section className="relative py-24 overflow-hidden bg-[#F8FBFC]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#19C8D6]/5 via-[#19C8D6]/0 to-transparent translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            className="relative bg-white rounded-[3rem] p-10 md:p-16 overflow-hidden flex flex-col items-center border border-[#E7EEF2] shadow-[0_20px_60px_rgba(23,35,58,0.05)]"
          >
            {/* Background patterns */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFC] to-white pointer-events-none" />
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#19C8D6]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#0E6D73]/5 rounded-full blur-3xl pointer-events-none" />
            
            <motion.div 
              animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
              className="relative z-10 w-20 h-20 bg-white rounded-2xl flex items-center justify-center border border-[#19C8D6]/20 mb-8 mx-auto shadow-sm"
            >
              <Shield className="w-10 h-10 text-[#19C8D6]" />
            </motion.div>
            
            <h2 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#17233A] mb-6 tracking-tight">
              Transform Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E6D73] to-[#19C8D6]">Claims Experience</span>
            </h2>
            <p className="relative z-10 text-xl text-[#58667E] leading-relaxed mb-10 max-w-2xl font-medium">
              Don't navigate the complex claims process alone. Our elite specialists ensure maximum recovery, zero delays, and complete peace of mind.
            </p>
            
            <Link 
              href="/contact" 
              className="relative z-10 inline-flex px-12 py-5 bg-[#17233A] hover:bg-[#0E6D73] text-white rounded-full font-bold text-xl transition-all duration-300 shadow-[0_15px_30px_rgba(23,35,58,0.2)] hover:shadow-[0_20px_40px_rgba(14,109,115,0.3)] items-center gap-4 hover:-translate-y-1 overflow-hidden group"
            >
              <span className="relative z-10">Contact Claims Team</span>
              <motion.div 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center relative z-10 group-hover:bg-white/20 transition-colors"
              >
                <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={20} strokeWidth={3} />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>
          </motion.div>
        </div>
      </section>


    </div>
  );
}
