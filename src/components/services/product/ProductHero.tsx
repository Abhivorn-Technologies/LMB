"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";

interface ProductHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badges: string[];
}

const formSchema = z.object({
  name: z.string()
    .min(1, "Full Name is required")
    .min(2, "Minimum 2 characters required")
    .max(50, "Maximum 50 characters allowed")
    .regex(/^[\p{L}\s\-'.]+$/u, "Invalid characters in name")
    .refine(val => val.trim().length >= 2, "Name cannot be just spaces")
    .refine(val => !/^\d+$/.test(val), "Name cannot be only numbers"),
  email: z.string()
    .min(1, "Email Address is required")
    .email("Enter a valid email address")
    .max(100, "Maximum 100 characters allowed"),
  mobile: z.string()
    .min(1, "Mobile Number is required")
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .refine(val => !/^(\d)\1{9}$/.test(val), "Invalid mobile number"),
  address: z.string()
    .max(255, "Maximum 255 characters allowed")
    .refine(val => !val || val.trim().length >= 5, "Address must be at least 5 characters")
    .refine(val => !/[<>&"\'%`~!@#$^\*+=\[\]{}|\\/?,;:]/.test(val), "Address contains restricted characters")
    .optional()
    .or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

export const ProductHero: React.FC<ProductHeroProps> = ({
  title,
  subtitle,
  description,
  image,
  badges,
}) => {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", mobile: "", address: "" }
  });

  const isVehicle = title.toLowerCase().includes('car') || title.toLowerCase().includes('two wheeler') || title.toLowerCase().includes('motor');
  
  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    
    // Log the details being sent and their destination
    console.log("=== SENDING FORM DETAILS ===");
    console.log("Destination Email:", "narasimharao@lmbib.com (configured in Web3Forms)");
    console.log("Phone Number:", data.mobile);
    console.log("Other Details:", {
      name: data.name,
      email: data.email,
      address: data.address || "Not provided",
      product: title,
    });
    console.log("============================");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "efbbb5cd-70f5-4980-b5d5-5c1ad4ca09a9",
          subject: `Quick Quote Request: ${title}`,
          from_name: "LMB Website Portal",
          "Insurance Product": title,
          "Name": data.name,
          "Email Address": data.email,
          "Mobile Number": data.mobile,
          "Address": data.address || "Not provided",
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus("success");
        reset();
        
        // Open WhatsApp
        const whatsappMsg = `Hello LMB, I would like to request a callback.\nName: ${data.name}\nEmail: ${data.email}\nMobile: ${data.mobile}\nAddress: ${data.address || "Not provided"}\nProduct: ${title}`;
        const whatsappUrl = `https://wa.me/919347067788?text=${encodeURIComponent(whatsappMsg)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const getCategoryDetails = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('car') || t.includes('motor')) return { icon: Icons.Car, color: '#F39C12', bg: 'bg-orange-50' };
    if (t.includes('bike') || t.includes('two wheeler') || t.includes('scooter')) return { icon: Icons.Bike, color: '#F39C12', bg: 'bg-orange-50' };
    if (t.includes('health') || t.includes('mediclaim') || t.includes('medical') || t.includes('disease')) return { icon: Icons.HeartPulse, color: '#F39C12', bg: 'bg-orange-50' };
    if (t.includes('travel') || t.includes('international') || t.includes('trip') || t.includes('schengen')) return { icon: Icons.Plane, color: '#F39C12', bg: 'bg-orange-50' };
    if (t.includes('home') || t.includes('property') || t.includes('griha')) return { icon: Icons.Home, color: '#F39C12', bg: 'bg-orange-50' };
    if (t.includes('business') || t.includes('commercial') || t.includes('workmen') || t.includes('contractor') || t.includes('jcb') || t.includes('truck') || t.includes('marine') || t.includes('cyber')) return { icon: Icons.Briefcase, color: '#F39C12', bg: 'bg-orange-50' };
    if (t.includes('life') || t.includes('term') || t.includes('retirement') || t.includes('pension') || t.includes('savings')) return { icon: Icons.HeartHandshake, color: '#F39C12', bg: 'bg-orange-50' };
    
    return { icon: Icons.ShieldCheck, color: '#F39C12', bg: 'bg-orange-50' };
  };

  const { icon: CategoryIcon, color, bg } = getCategoryDetails(title);

  return (
    <>
      <section className="relative w-full pt-28 pb-12 lg:pt-32 lg:pb-12 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        {/* Subtle, highly professional background accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] opacity-60 -z-10"></div>
        
        <div className="max-w-7xl mx-auto w-full px-6 relative z-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* LEFT: Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2.5 mb-1 justify-center lg:justify-start">
                  {badges.map((badge, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <Icons.ShieldCheck size={14} className="text-emerald-600" />
                      <span className="text-[11px] font-bold tracking-widest text-slate-700 uppercase">{badge}</span>
                    </div>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-[#0F172A] leading-[1.08] tracking-tight text-center lg:text-left">
                  {title.replace('Insurance', '').trim()} <span className="text-blue-600">Insurance</span>
                </h1>
                
                <h2 className="text-slate-500 font-sans text-xl md:text-2xl font-semibold tracking-tight text-center lg:text-left">
                  {subtitle}
                </h2>

                <p className="text-[17px] text-slate-600 leading-relaxed max-w-xl font-medium mt-2 text-center lg:text-left mx-auto lg:mx-0 px-2 lg:px-0">
                  {description}
                </p>
              </div>
              
              {/* Trust features - Ultra clean */}
              <div className="flex flex-wrap gap-x-6 lg:gap-x-8 gap-y-4 mt-4 lg:mt-6 pt-6 border-t border-slate-100 justify-center lg:justify-start">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Icons.Zap size={16} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Fast Claims</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Icons.Wrench size={16} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Cashless Network</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Icons.PhoneCall size={16} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">24x7 Support</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Ultra-Clean Form Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 relative w-full mt-8 lg:mt-0"
            >
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col mx-auto max-w-md border border-slate-100">
                
                {/* Clean Header */}
                <div className="w-full px-6 pt-6 pb-4 flex items-center gap-4 relative">
                   <div className="w-12 h-12 rounded-[14px] bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                     <CategoryIcon className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">Request Callback</h3>
                     <p className="text-slate-500 text-[14px] mt-0.5">We'll call you back shortly</p>
                   </div>
                </div>

                {/* Form Content */}
                <div className="px-6 pb-6 relative">
                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-col items-center justify-center text-center py-6"
                      >
                        <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mb-6">
                          <Icons.Check className="w-8 h-8 text-[#10B981]" strokeWidth={3} />
                        </div>
                        <h4 className="text-[22px] font-bold text-[#0F172A] mb-3">Request Successful</h4>
                        <p className="text-slate-500 mb-8 text-[15px] leading-relaxed max-w-[280px]">
                          Thank you for your interest. An LMB representative will contact you shortly to discuss your requirements.
                        </p>
                        <div className="w-full">
                          <Button 
                            onClick={() => setStatus("idle")}
                            variant="outline" 
                            className="w-full py-6 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold uppercase tracking-widest text-[13px] shadow-sm bg-white transition-colors"
                          >
                            Start New Inquiry
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form 
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col"
                        noValidate
                      >
                        {status === "error" && (
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-[14px] font-medium mb-6">
                            <Icons.AlertCircle size={18} /> An error occurred. Please try again.
                          </div>
                        )}

                        {/* Professional Input: Name */}
                        <div className="mb-3 mt-0">
                          <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            placeholder="e.g. John Doe"
                            maxLength={50}
                            {...register("name")}
                            onInput={(e) => { 
                              e.currentTarget.value = e.currentTarget.value.replace(/[^\p{L}\s\-'.]/gu, ''); 
                            }}
                            className={`w-full bg-white border ${errors.name ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-50'} rounded-xl px-4 h-[42px] text-slate-900 focus:outline-none focus:ring-4 transition-all text-[14px] placeholder:text-slate-400`}
                          />
                          <AnimatePresence>
                            {errors.name && (
                              <motion.span 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-[13px] text-red-500 mt-2 block"
                              >
                                {errors.name.message}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Professional Input: Email */}
                        <div className="mb-3">
                          <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="email" 
                            placeholder="e.g. you@example.com"
                            maxLength={100}
                            {...register("email")}
                            className={`w-full bg-white border ${errors.email ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-50'} rounded-xl px-4 h-[42px] text-slate-900 focus:outline-none focus:ring-4 transition-all text-[14px] placeholder:text-slate-400`}
                          />
                          <AnimatePresence>
                            {errors.email && (
                              <motion.span 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-[13px] text-red-500 mt-2 block"
                              >
                                {errors.email.message}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        {/* Professional Input: Mobile */}
                        <div className="mb-3">
                          <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <div className={`flex items-center h-[42px] border ${errors.mobile ? 'border-red-400 focus-within:ring-red-100' : 'border-slate-200 focus-within:border-blue-500 focus-within:ring-blue-50'} rounded-xl bg-white overflow-hidden focus-within:ring-4 transition-all`}>
                            <div className="px-3 text-slate-500 font-medium border-r border-slate-200 shrink-0 text-[14px] h-full flex items-center bg-slate-50/50">
                              +91
                            </div>
                            <input 
                              type="tel" 
                              placeholder="Enter Mobile Number" 
                              maxLength={10}
                              {...register("mobile")}
                              onInput={(e) => { 
                                let val = e.currentTarget.value.replace(/\D/g, '');
                                if (val.length > 0 && !/^[6-9]/.test(val[0])) {
                                  val = val.replace(/^[^6-9]+/, '');
                                }
                                e.currentTarget.value = val.substring(0,10); 
                              }}
                              className="w-full h-full bg-transparent px-3 text-slate-900 focus:outline-none text-[14px] placeholder:text-slate-400"
                            />
                          </div>
                          <AnimatePresence>
                            {errors.mobile && (
                              <motion.span 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-[13px] text-red-500 mt-2 block"
                              >
                                {errors.mobile.message}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        {/* Professional Input: Address */}
                        <div className="mb-5">
                          <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                            Address <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <input 
                            type="text" 
                            placeholder="Enter your address"
                            maxLength={255}
                            {...register("address")}
                            className={`w-full bg-white border ${errors.address ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-50'} rounded-xl px-4 h-[42px] text-slate-900 focus:outline-none focus:ring-4 transition-all text-[14px] placeholder:text-slate-400`}
                          />
                          <AnimatePresence>
                            {errors.address && (
                              <motion.span 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-[13px] text-red-500 mt-2 block"
                              >
                                {errors.address.message}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        {/* Submit Button */}
                        <Button 
                          type="submit" 
                          disabled={status === "loading"}
                          className="w-full h-[48px] text-[14px] uppercase tracking-wider font-bold rounded-xl bg-[#FFB800] hover:bg-[#F39C12] text-slate-900 border-none transition-colors flex items-center justify-center mt-1 shadow-sm"
                        >
                          {status === "loading" ? (
                            <><Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                          ) : (
                            "Request Callback"
                          )}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </>
  );
};
