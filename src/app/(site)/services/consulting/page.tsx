"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextReveal } from "@/components/motion/TextReveal";
import Link from "next/link";
import { 
  Shield, FileText, TrendingUp, Target, LineChart, 
  Building2, Handshake, Clipboard, CheckCircle2, 
  Search, Lock, Briefcase, Users, FileSignature, 
  BarChart, ArrowRight, ChevronDown, Check
} from "lucide-react";

// --- Custom Colors based on guidelines ---
// Teal: #0E6D73
// Cyan: #19C8D6
// Navy Text: #17233A
// Secondary Text: #58667E
// Bg: #F8FBFC
// Border: #E7EEF2
// Soft Glow: rgba(25,200,214,.18)

// --- Shared Animations ---
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

export default function ConsultingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const industriesData = [
    { name: "Manufacturing", icon: Building2, points: ["Mitigate global supply chain disruptions", "Comprehensive product liability protection", "Coverage for critical equipment breakdown"] },
    { name: "Healthcare", icon: CheckCircle2, points: ["Advanced medical malpractice coverage", "Strict HIPAA regulatory compliance", "Protection against cyber & data breaches"] },
    { name: "Construction", icon: Briefcase, points: ["Complete project & casualty covers", "Comprehensive workers compensation plans", "Reliable surety bonds for contractors"] },
    { name: "Retail", icon: Target, points: ["Full retail inventory protection", "Customer slip & fall liability", "E-commerce & digital fraud risks"] },
    { name: "Education", icon: Users, points: ["Ensuring complete institution safety", "Student & faculty liability covers", "Extensive campus property coverage"] },
    { name: "Hospitality", icon: Handshake, points: ["Comprehensive hotel guest liability", "Liquor liability for restaurants", "High-value property damage protection"] },
    { name: "IT & Technology", icon: LineChart, points: ["Advanced cyber insurance policies", "Technology Errors & Omissions", "Intellectual property theft protection"] },
    { name: "Logistics", icon: BarChart, points: ["Global transit & cargo protection", "Commercial fleet management coverage", "Extensive warehouse liability policies"] },
    { name: "Financial Services", icon: TrendingUp, points: ["Directors & Officers (D&O) coverage", "Corporate crime & fraud policies", "Fiduciary liability for executives"] },
    { name: "Real Estate", icon: Building2, points: ["Large commercial property portfolios", "Environmental & pollution risks", "Comprehensive tenant liability policies"] },
    { name: "Professional Services", icon: Briefcase, points: ["Professional indemnity & malpractice", "Business interruption financial recovery", "Broad general liability covers"] }
  ];

  useEffect(() => {
    if (isCarouselHovered) return;
    
    const timer = setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % industriesData.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isCarouselHovered]);

  return (
    <div className="min-h-screen w-full max-w-[100vw] bg-[#FFFFFF] font-sans selection:bg-[#19C8D6] selection:text-white text-[#17233A] overflow-hidden overflow-x-hidden">
      
      {/* 
        ==================================================
        HERO SECTION
        ==================================================
      */}
      <section className="relative min-h-[calc(100vh-160px)] flex items-center overflow-hidden bg-[#F8FBFC] py-12">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-[#19C8D6]/10 to-transparent blur-[120px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#0E6D73]/5 to-transparent blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E7EEF2] shadow-sm mb-8">
                <span className="flex h-2 w-2 rounded-full bg-[#19C8D6] animate-pulse"></span>
                <span className="text-xs font-bold tracking-wider text-[#17233A] uppercase">LMB Insurance Brokers</span>
              </motion.div>
              
              <motion.h1 className="text-4xl lg:text-6xl font-extrabold text-[#17233A] leading-[1.15] tracking-tight mb-6">
                <TextReveal delay={0.2}>Insurance Consulting</TextReveal><br className="hidden lg:block" />
                <TextReveal delay={0.3}>That Protects Every</TextReveal><br className="hidden lg:block" />
                <span className="text-[#19C8D6]"><TextReveal delay={0.4}>Business Decision</TextReveal></span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg text-[#58667E] leading-relaxed mb-10 max-w-xl">
                We evaluate your operations, identify coverage gaps, and build insurance strategies tailored perfectly to your organization's goals.
              </motion.p>
              
              <motion.div variants={fadeUp}>
                <Link href="/contact" className="inline-flex items-center justify-center bg-[#0E6D73] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#115E59] hover:shadow-lg transition-all duration-300">
                  Book a Consultation
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Data Visualization */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full hidden lg:flex items-center justify-center"
            >
              <motion.img 
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                src="/images/premium-hero.png" 
                alt="Premium Consulting" 
                className="w-full max-w-[400px] object-contain drop-shadow-[0_20px_50px_rgba(25,200,214,0.15)] rounded-full mix-blend-multiply"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 
        ==================================================
        TRUST BAR - PREMIUM MARQUEE
        ==================================================
      */}
      <div className="w-full bg-[#17233A] border-y border-[#17233A] py-6 relative z-20 overflow-hidden shadow-xl">
        <div className="flex w-[200%]">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="flex flex-nowrap whitespace-nowrap gap-16 px-8 text-sm font-bold text-white uppercase tracking-widest"
          >
            {[
              "Independent Insurance Advisors",
              "Tailored Risk Strategies",
              "Claims Advocacy",
              "Corporate & Personal Insurance",
              "Long-Term Risk Partnership",
              "Independent Insurance Advisors",
              "Tailored Risk Strategies",
              "Claims Advocacy",
              "Corporate & Personal Insurance",
              "Long-Term Risk Partnership"
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
        SECTION 1: Why Consulting Matters
        ==================================================
      */}
      <section className="py-24 md:py-32 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Illustration */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="relative w-full aspect-square md:aspect-[4/3] rounded-[2.5rem] bg-[#F8FBFC] border border-[#E7EEF2] overflow-hidden flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#19C8D6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 grid grid-cols-2 gap-6 p-8">
                {[
                  { icon: Search, label: "Risk Analysis", color: "text-[#0E6D73]" },
                  { icon: Target, label: "Business Strategy", color: "text-[#19C8D6]" },
                  { icon: Shield, label: "Financial Protection", color: "text-[#17233A]" },
                  { icon: Clipboard, label: "Compliance", color: "text-[#58667E]" }
                ].map((item, i) => (
                  <div key={i} className="w-32 h-32 bg-white rounded-2xl shadow-sm border border-[#E7EEF2] flex flex-col items-center justify-center gap-3 transform hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                    <item.icon className={`w-10 h-10 ${item.color}`} strokeWidth={1.5} />
                    <span className="text-xs font-bold text-[#17233A] text-center px-2">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-[#17233A] mb-8 leading-tight tracking-tight">
                Why Insurance Consulting <span className="text-[#0E6D73]">Matters</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-[#58667E] leading-relaxed mb-6">
                Choosing insurance without expert guidance often results in unnecessary costs, overlapping policies, or critical protection gaps.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-[#58667E] leading-relaxed">
                Our consulting process evaluates your business risks, financial objectives, legal obligations, and future growth plans before recommending insurance solutions. This ensures every recommendation delivers measurable value instead of unnecessary coverage.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* 
        ==================================================
        SECTION 2: Our Consulting Services
        ==================================================
      */}
      <section className="py-24 md:py-32 bg-[#F8FBFC] border-y border-[#E7EEF2]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#17233A] mb-6 tracking-tight">
              Our Consulting Services
            </h2>
            <p className="text-lg text-[#58667E] leading-relaxed">
              Specialized advisory designed to protect your assets and empower your growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Risk Assessment",
                desc: "Identify operational, financial, legal, and industry-specific risks through structured evaluations designed to strengthen protection strategies.",
                icon: Search
              },
              {
                title: "Insurance Program Review",
                desc: "Analyze existing insurance policies to identify overlaps, exclusions, underinsurance, and opportunities for cost optimization.",
                icon: FileText
              },
              {
                title: "Coverage Gap Analysis",
                desc: "Discover hidden exposures before they become costly claims by comparing current protection against actual business risks.",
                icon: Search // Replacing broken shield with search to maintain premium lucide feel
              },
              {
                title: "Policy Advisory",
                desc: "Receive independent recommendations on selecting, negotiating, and structuring insurance policies aligned with your objectives.",
                icon: Clipboard
              },
              {
                title: "Claims Consulting",
                desc: "Expert support throughout the claims lifecycle, helping improve documentation, communication, and settlement outcomes.",
                icon: Handshake
              },
              {
                title: "Risk Management Strategy",
                desc: "Develop long-term insurance roadmaps that evolve with business growth, regulatory requirements, and emerging risks.",
                icon: Target
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } } }}
                className="group bg-white rounded-3xl p-8 border border-[#E7EEF2] hover:border-[#19C8D6]/30 shadow-sm hover:shadow-[0_20px_40px_rgba(25,200,214,0.08)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Hover ambient glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#19C8D6]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-14 h-14 rounded-2xl bg-[#F8FBFC] border border-[#E7EEF2] flex items-center justify-center mb-6 group-hover:bg-[#0E6D73] transition-colors duration-500">
                  <service.icon className="w-7 h-7 text-[#0E6D73] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-[#17233A] mb-4">{service.title}</h3>
                <p className="text-[#58667E] text-sm leading-relaxed font-light mb-8">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 3: Industries We Serve
        ==================================================
      */}
      <section className="py-24 md:py-32 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="flex flex-col items-center justify-center text-center mb-16 gap-5"
          >
            <div className="inline-block bg-[#19C8D6]/10 px-4 py-1.5 rounded-full mb-2 border border-[#19C8D6]/20">
              <span className="text-sm font-bold tracking-widest text-[#0E6D73] uppercase">Sector Specialization</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#17233A] tracking-tight">Industries We Serve</h2>
            <p className="text-lg md:text-xl text-[#58667E] max-w-2xl font-medium leading-relaxed">
              We deliver highly specialized risk management and insurance consulting strategies, meticulously engineered to protect your sector's unique complexities.
            </p>
            <Link 
              href="/industries" 
              className="mt-4 px-8 py-3.5 bg-white border border-[#E7EEF2] rounded-full text-[#17233A] font-bold hover:bg-[#17233A] hover:text-white hover:border-[#17233A] flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              Explore All Industries <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div 
            className="relative w-full h-[450px] flex items-center justify-center mt-10 perspective-[1200px]"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
            onTouchStart={() => setIsCarouselHovered(true)}
            onTouchEnd={() => setIsCarouselHovered(false)}
          >
            <AnimatePresence>
              {industriesData.map((industry, i) => {
                let offset = i - activeIndustry;
                if (offset < -Math.floor(industriesData.length / 2)) offset += industriesData.length;
                if (offset > Math.floor(industriesData.length / 2)) offset -= industriesData.length;

                if (Math.abs(offset) > 2) return null;

                const isCenter = offset === 0;
                const zIndex = 10 - Math.abs(offset);
                const scale = 1 - Math.abs(offset) * 0.2; 
                const xPos = offset * 260; 
                const opacity = 1 - Math.abs(offset) * 0.4; 
                const rotateY = offset * -20; 

                return (
                  <motion.div
                    key={i}
                    animate={{
                      x: xPos,
                      scale: scale,
                      opacity: opacity,
                      rotateY: rotateY,
                      zIndex: zIndex
                    }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.25 }}
                    onClick={() => setActiveIndustry(i)}
                    className={`absolute w-[340px] rounded-3xl border shadow-2xl flex flex-col p-8 cursor-pointer transition-colors duration-500 ${
                      isCenter 
                        ? "border-[#19C8D6]/30 bg-gradient-to-br from-[#17233A] to-[#0E6D73] h-[360px]" 
                        : "border-[#E7EEF2] bg-white h-[320px] hover:border-[#19C8D6]/50"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
                        isCenter ? "bg-white/10 backdrop-blur-md" : "bg-[#F8FBFC]"
                      }`}>
                        <industry.icon className={`w-8 h-8 ${isCenter ? "text-[#19C8D6]" : "text-[#58667E]"}`} strokeWidth={1.5} />
                      </div>
                      <h3 className={`font-bold text-2xl ${isCenter ? "text-white" : "text-[#17233A]"}`}>{industry.name}</h3>
                    </div>

                    <ul className="text-sm font-medium text-left space-y-3 flex-grow flex flex-col justify-center px-2">
                      {industry.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className={`mr-3 font-bold mt-0.5 ${isCenter ? "text-[#19C8D6]" : "text-[#0E6D73]"}`}>•</span>
                          <span className={`leading-relaxed ${isCenter ? "text-white/90" : "text-[#58667E]"}`}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {!isCenter && (
                      <div className="absolute inset-0 bg-white/40 rounded-3xl pointer-events-none backdrop-blur-[1px]" />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center items-center mt-6 gap-3">
            {industriesData.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveIndustry(i)}
                className={`transition-all duration-300 rounded-full ${i === activeIndustry ? "w-8 h-2 bg-[#19C8D6]" : "w-2 h-2 bg-[#E7EEF2] hover:bg-[#19C8D6]/50"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 4: Our Consulting Process
        ==================================================
      */}
      <section className="py-24 md:py-32 bg-[#F8FBFC] border-y border-[#E7EEF2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#17233A] mb-6 tracking-tight">
              Our Consulting Process
            </h2>
            <p className="text-lg text-[#58667E] leading-relaxed">
              A structured approach to transforming complex risks into clear strategic advantages.
            </p>
          </motion.div>

          {/* Vertical Alternating Timeline */}
          <div className="relative max-w-4xl mx-auto mt-12 md:mt-20">
            {/* Center Vertical Line */}
            <motion.div 
              initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-10 md:left-1/2 top-0 w-1 bg-gradient-to-b from-[#0E6D73] to-[#19C8D6] -translate-x-1/2 rounded-full z-0 hidden md:block" 
            />

            <div className="flex flex-col gap-12 relative z-10">
              {[
                { step: "01", title: "Discovery Meeting", desc: "Understand your organization, objectives, operations, and challenges." },
                { step: "02", title: "Risk Evaluation", desc: "Analyze existing policies, exposures, compliance requirements, and future risks." },
                { step: "03", title: "Strategic Recommendations", desc: "Present customized insurance strategies supported by practical insights." },
                { step: "04", title: "Implementation", desc: "Coordinate with insurers and ensure policies align with agreed objectives." },
                { step: "05", title: "Continuous Review", desc: "Regularly monitor changing business risks and recommend improvements over time." }
              ].map((phase, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full group ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block flex-1" />

                  {/* Center Node */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-white border-[6px] border-[#F8FBFC] shadow-[0_0_20px_rgba(25,200,214,0.15)] flex items-center justify-center relative z-20 group-hover:scale-110 group-hover:border-[#E7EEF2] transition-all duration-300">
                    <div className="absolute inset-0 rounded-full border border-[#19C8D6]/30" />
                    <span className="font-extrabold text-[#0E6D73] text-2xl">{phase.step}</span>
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 w-full bg-white p-6 md:p-8 rounded-3xl border border-[#E7EEF2] shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:border-[#19C8D6]/50 text-center ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <h4 className="font-bold text-[#17233A] text-xl mb-3">{phase.title}</h4>
                    <p className="text-[#58667E] text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 5: Why Choose LMB
        ==================================================
      */}
      <section className="py-24 md:py-32 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Illustration */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative w-full aspect-[4/3] rounded-[2.5rem] p-4 flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#F8FBFC] border border-[#E7EEF2] rounded-[2.5rem] -z-10" />
              <img 
                src="/images/why-choose-lmb.png" 
                alt="Corporate Consulting Team" 
                className="w-full h-full object-cover rounded-3xl shadow-[0_20px_40px_rgba(14,109,115,0.15)]"
              />
            </motion.div>

            {/* Right: Premium Checklist */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-[#17233A] mb-10 tracking-tight">
                Why Choose <span className="text-[#0E6D73]">LMB Insurance Brokers</span>
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Independent Advice", icon: Target },
                  { title: "Transparent Guidance", icon: Search },
                  { title: "Industry Expertise", icon: Briefcase },
                  { title: "Tailored Solutions", icon: FileSignature },
                  { title: "Claims Advocacy", icon: Shield },
                  { title: "Regulatory Focus", icon: Clipboard },
                  { title: "Long-Term Partners", icon: Handshake },
                  { title: "Responsive Team", icon: Users }
                ].map((feature, i) => (
                  <motion.div 
                    key={i} variants={fadeUp} whileHover={{ scale: 1.02 }}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#E7EEF2] hover:border-[#19C8D6]/50 hover:shadow-[0_8px_20px_rgba(25,200,214,0.06)] transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F8FBFC] border border-[#E7EEF2] group-hover:bg-[#19C8D6]/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <feature.icon className="w-4 h-4 text-[#0E6D73]" strokeWidth={2} />
                    </div>
                    <span className="font-bold text-[#17233A] text-sm group-hover:text-[#0E6D73] transition-colors">{feature.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 6: FAQ
        ==================================================
      */}
      <section className="py-24 md:py-32 bg-[#F8FBFC] border-t border-[#E7EEF2]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#17233A] mb-6 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-lg text-[#58667E]">Clear answers to help you understand our consulting approach.</p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "What does an insurance consultant do?", a: "An insurance consultant provides independent, expert advice on identifying risks, evaluating existing coverage, recommending necessary policies, and structuring a comprehensive insurance program that aligns with your business goals." },
              { q: "How often should insurance policies be reviewed?", a: "We recommend a comprehensive review annually before renewal, or whenever your business undergoes significant changes such as expansion, new product launches, or major acquisitions." },
              { q: "Can you review policies purchased from another broker?", a: "Yes, our consulting services are completely independent. We frequently audit and review existing programs placed by other brokers to ensure you are adequately protected and not overpaying." },
              { q: "Do you provide consulting for small businesses?", a: "Absolutely. While we serve large enterprises, we also offer scalable consulting solutions tailored to the specific risks and budgets of growing small and medium-sized businesses." },
              { q: "How do you identify coverage gaps?", a: "We conduct a deep-dive discovery into your operational, legal, and financial exposures and map them against the explicit terms, conditions, and exclusions of your current policies." },
              { q: "Do you assist during claims?", a: "Yes. Our consulting extends to claims advocacy, where we help you navigate complex claims, negotiate with adjusters, and ensure a fair and timely settlement." }
            ].map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border border-[#E7EEF2] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#19C8D6]/50"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-[#17233A] pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#19C8D6] transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-[#58667E] text-sm leading-relaxed border-t border-[#E7EEF2]/50 mt-2">
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
        FINAL CTA
        ==================================================
      */}
      <section className="relative py-32 bg-[#FFFFFF] overflow-hidden border-t border-[#E7EEF2]">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#19C8D6]/10 to-[#0E6D73]/5 rounded-full blur-[100px]" />
          <motion.div 
            animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-20 w-32 h-32 bg-white/40 border border-[#E7EEF2] rounded-3xl backdrop-blur-md rotate-12 shadow-xl"
          />
          <motion.div 
            animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-20 w-40 h-40 bg-white/40 border border-[#E7EEF2] rounded-full backdrop-blur-md -rotate-12 shadow-xl"
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-[#17233A] mb-8 tracking-tight"
          >
            Let's Build a Smarter <br className="hidden md:block"/> Insurance Strategy Together
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-[#58667E] mb-12 leading-relaxed font-light max-w-2xl mx-auto"
          >
            Whether you're protecting a growing business, reviewing existing coverage, or preparing for future risks, our consultants provide practical guidance backed by industry expertise.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/contact" className="px-10 py-5 rounded-2xl bg-[#0E6D73] text-white font-bold text-lg hover:bg-[#17233A] hover:scale-105 transition-all duration-300 shadow-[0_15px_30px_rgba(14,109,115,0.2)]">
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
