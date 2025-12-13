import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, TrendingUp, Award, Users, Sparkles, Star } from "lucide-react";
import type { Language } from "@/data/content";
import ContactButtonMenu from "@/components/ContactButtonMenu";

interface OrbitNetworkTestimonialsProps {
  content: {
    title: string;
    subtitle: string;
    cases: Array<{
      id: string;
      title: string;
      background: string;
      outcome: string;
      testimonial?: string;
      industry?: string;
    }>;
  };
  language: Language;
}

// Industry color mapping for cosmic theme
const industryColors = {
  Government: { glow: "rgba(251, 191, 36, 0.6)", accent: "#fbbf24", trail: "#fcd34d" },
  Management: { glow: "rgba(34, 211, 238, 0.6)", accent: "#22d3ee", trail: "#67e8f9" },
  "Education & Immigration": { glow: "rgba(167, 139, 250, 0.6)", accent: "#a78bfa", trail: "#c4b5fd" },
  "Career Transition": { glow: "rgba(248, 113, 113, 0.6)", accent: "#f87171", trail: "#fca5a5" },
  default: { glow: "rgba(156, 163, 175, 0.6)", accent: "#9ca3af", trail: "#d1d5db" }
};

export default function OrbitNetworkTestimonials({
  content,
  language,
}: OrbitNetworkTestimonialsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const whatsappMessage =
    language === "zh"
      ? "您好！我看到了很多成功案例，希望能了解如何開始我的職涯轉變之旅。"
      : "Hello! I've seen the success stories and would like to learn how to start my career transformation journey.";

  // Orbital configuration - distribute 6 testimonials across 3 layers
  // Adjusted radii for better spacing with simplified center
  const orbitalConfig = [
    { radius: 180, rotationDuration: 30, direction: 1, testimonials: [0, 1] },  // Inner orbit - 2 items
    { radius: 300, rotationDuration: 40, direction: -1, testimonials: [2, 3] }, // Middle orbit - 2 items
    { radius: 420, rotationDuration: 50, direction: 1, testimonials: [4, 5] },  // Outer orbit - 2 items
  ];

  // Get industry icon and colors
  const getIndustryData = (industry?: string) => {
    let icon = Users;
    let colorScheme = industryColors.default;

    if (industry?.includes("Government") || industry?.includes("政府")) {
      icon = Award;
      colorScheme = industryColors.Government;
    } else if (industry?.includes("Management") || industry?.includes("管理")) {
      icon = TrendingUp;
      colorScheme = industryColors.Management;
    } else if (industry?.includes("Education") || industry?.includes("教育") || industry?.includes("Immigration")) {
      icon = Sparkles;
      colorScheme = industryColors["Education & Immigration"];
    } else if (industry?.includes("Career Transition") || industry?.includes("職涯轉換")) {
      icon = Star;
      colorScheme = industryColors["Career Transition"];
    }

    return { icon, colors: colorScheme };
  };

  // Calculate position on orbit
  const getOrbitPosition = (orbitRadius: number, index: number, totalInOrbit: number) => {
    const angle = (index / totalInOrbit) * 360;
    const radians = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radians) * orbitRadius,
      y: Math.sin(radians) * orbitRadius,
      angle
    };
  };

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className={`text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 bg-clip-text text-transparent mb-6 ${
              language === "zh" ? "font-chinese" : ""
            }`}
            style={{ fontFamily: language === "zh" ? "inherit" : "'Playfair Display', serif" }}
          >
            {content.title}
          </h2>
          <p
            className={`text-xl text-slate-700 max-w-3xl mx-auto ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {content.subtitle}
          </p>
        </motion.div>

        {/* Orbit Network System */}
        <div className="relative w-full max-w-7xl mx-auto mb-20">
          {/* Desktop & Tablet: Full Orbit System */}
          <div className="hidden md:block">
            <div className="relative" style={{ height: "900px" }}>
              {/* Center Hub - Benson's Photo (Simplified Focal Point) */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <div className="relative">
                  {/* Outer Pulsing Glow */}
                  <motion.div
                    className="absolute -inset-8 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)",
                      filter: "blur(25px)",
                    }}
                    animate={!prefersReducedMotion ? {
                      scale: [1, 1.15, 1],
                      opacity: [0.4, 0.7, 0.4],
                    } : {}}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Inner Glow Ring */}
                  <motion.div
                    className="absolute -inset-4 rounded-full border-2 border-purple-300/30"
                    animate={!prefersReducedMotion ? {
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.6, 0.3],
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />

                  {/* Photo Container - Clean Circle */}
                  <div className="relative w-36 h-36 md:w-44 md:h-44">
                    <img
                      src="/images/benson-logo.png"
                      alt="Benson Wong - Career Coach"
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-2xl bg-gradient-to-br from-purple-100 to-purple-50"
                    />
                    {/* Decorative outer ring */}
                    <div className="absolute -inset-1 rounded-full border-2 border-purple-200/50 pointer-events-none" />
                  </div>

                  {/* Name Label Below Photo */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span
                      className={`text-lg font-semibold text-purple-900 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md border border-purple-100 ${
                        language === "zh" ? "font-chinese" : ""
                      }`}
                    >
                      Benson Wong
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Orbital Paths and Testimonials */}
              {orbitalConfig.map((orbit, orbitIndex) => (
                <div key={orbitIndex}>
                  {/* Orbital Ring Visualization */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed opacity-30"
                    style={{
                      width: orbit.radius * 2,
                      height: orbit.radius * 2,
                      borderColor: orbit.testimonials.map(i => {
                        const industry = content.cases[i]?.industry;
                        const { colors } = getIndustryData(industry);
                        return colors.accent;
                      })[0] || "#9ca3af",
                    }}
                  />

                  {/* Testimonials in this orbit */}
                  {orbit.testimonials.map((testimonialIndex, positionInOrbit) => {
                    const story = content.cases[testimonialIndex];
                    if (!story) return null;

                    const { icon: IconComponent, colors } = getIndustryData(story.industry);
                    const position = getOrbitPosition(orbit.radius, positionInOrbit, orbit.testimonials.length);
                    const isHovered = hoveredId === story.id;
                    const isOtherHovered = hoveredId !== null && !isHovered;

                    return (
                      <div key={story.id}>
                        {/* Connection Line to Center */}
                        <svg
                          className="absolute top-1/2 left-1/2 pointer-events-none"
                          style={{
                            width: orbit.radius * 2,
                            height: orbit.radius * 2,
                            transform: "translate(-50%, -50%)",
                            opacity: isHovered ? 0.6 : isOtherHovered ? 0.1 : 0.2,
                            transition: "opacity 0.3s ease",
                          }}
                        >
                          <motion.line
                            x1="50%"
                            y1="50%"
                            x2={`calc(50% + ${position.x}px)`}
                            y2={`calc(50% + ${position.y}px)`}
                            stroke={colors.accent}
                            strokeWidth={isHovered ? "2" : "1"}
                            strokeDasharray="5,5"
                            animate={!prefersReducedMotion && isHovered ? {
                              strokeDashoffset: [0, -10],
                            } : {}}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </svg>

                        {/* Orbital Rotation Container - Wrapper for proper centering */}
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{
                            width: orbit.radius * 2,
                            height: orbit.radius * 2,
                          }}
                        >
                          <motion.div
                            className="relative w-full h-full"
                            style={{
                              transformOrigin: "center center",
                            }}
                            // TEMP: Animation paused for alignment review
                            // animate={!prefersReducedMotion ? {
                            //   rotate: orbit.direction === 1 ? 360 : -360,
                            // } : {}}
                            transition={{
                              duration: orbit.rotationDuration,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                          {/* Testimonial Node */}
                          <motion.div
                            className="absolute"
                            style={{
                              left: `calc(50% + ${position.x}px)`,
                              top: `calc(50% + ${position.y}px)`,
                              transform: "translate(-50%, -50%)",
                            }}
                            // TEMP: Counter-rotation paused for alignment review
                            // animate={!prefersReducedMotion ? {
                            //   rotate: orbit.direction === 1 ? -360 : 360, // Counter-rotate to keep cards upright
                            // } : {}}
                            transition={{
                              duration: orbit.rotationDuration,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <motion.div
                              className="relative cursor-pointer"
                              onHoverStart={() => setHoveredId(story.id)}
                              onHoverEnd={() => setHoveredId(null)}
                              animate={{
                                scale: isHovered ? 3.3 : 1,
                                zIndex: isHovered ? 50 : 10,
                                opacity: isOtherHovered ? 0.3 : 1,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                              }}
                            >
                              {/* Glow Effect */}
                              <motion.div
                                className="absolute inset-0 rounded-2xl"
                                style={{
                                  background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
                                  filter: "blur(15px)",
                                }}
                                animate={{
                                  opacity: isHovered ? 0.8 : 0.4,
                                  scale: isHovered ? 1.3 : 1,
                                }}
                              />

                              {/* Card */}
                              <div
                                className="relative bg-white/95 backdrop-blur-xl rounded-2xl border-2 overflow-hidden shadow-lg"
                                style={{
                                  borderColor: colors.accent,
                                  width: isHovered ? "350px" : "120px",
                                  minHeight: isHovered ? "auto" : "120px",
                                  filter: isOtherHovered ? "blur(2px)" : "none",
                                  transition: "all 0.3s ease",
                                }}
                              >
                                {/* Collapsed State */}
                                {!isHovered && (
                                  <div className="p-6 flex flex-col items-center justify-center h-full">
                                    <IconComponent
                                      className="w-8 h-8 mb-2"
                                      style={{ color: colors.accent }}
                                    />
                                    <div
                                      className={`text-xs text-center font-medium text-slate-800 ${
                                        language === "zh" ? "font-chinese" : ""
                                      }`}
                                    >
                                      {story.title.split(" ").slice(0, 2).join(" ")}
                                    </div>
                                  </div>
                                )}

                                {/* Expanded State */}
                                {isHovered && (
                                  <div className="p-6 max-h-96 overflow-y-auto custom-scrollbar">
                                    {/* Icon Header */}
                                    <div className="flex items-center gap-3 mb-4">
                                      <div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${colors.accent}20` }}
                                      >
                                        <IconComponent
                                          className="w-6 h-6"
                                          style={{ color: colors.accent }}
                                        />
                                      </div>
                                      <div>
                                        <h3
                                          className={`text-base font-bold text-slate-900 mb-1 ${
                                            language === "zh" ? "font-chinese" : ""
                                          }`}
                                        >
                                          {story.title}
                                        </h3>
                                        {story.industry && (
                                          <span
                                            className={`text-xs px-2 py-1 rounded font-medium ${
                                              language === "zh" ? "font-chinese" : ""
                                            }`}
                                            style={{
                                              backgroundColor: `${colors.accent}20`,
                                              color: colors.accent,
                                            }}
                                          >
                                            {story.industry}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Background */}
                                    <div className="mb-4">
                                      <h4
                                        className={`text-xs font-semibold mb-2 ${
                                          language === "zh" ? "font-chinese" : ""
                                        }`}
                                        style={{ color: colors.accent }}
                                      >
                                        {language === "zh" ? "背景：" : "Background:"}
                                      </h4>
                                      <p
                                        className={`text-xs text-slate-700 leading-relaxed ${
                                          language === "zh" ? "font-chinese" : ""
                                        }`}
                                      >
                                        {story.background}
                                      </p>
                                    </div>

                                    {/* Outcome */}
                                    <div className="mb-4">
                                      <h4
                                        className={`text-xs font-semibold mb-2 ${
                                          language === "zh" ? "font-chinese" : ""
                                        }`}
                                        style={{ color: colors.accent }}
                                      >
                                        {language === "zh" ? "成果：" : "Outcome:"}
                                      </h4>
                                      <p
                                        className={`text-xs text-slate-900 font-medium leading-relaxed ${
                                          language === "zh" ? "font-chinese" : ""
                                        }`}
                                      >
                                        {story.outcome}
                                      </p>
                                    </div>

                                    {/* Testimonial */}
                                    {story.testimonial && (
                                      <div
                                        className="rounded-lg p-3 border-l-4"
                                        style={{
                                          backgroundColor: `${colors.accent}10`,
                                          borderColor: colors.accent,
                                        }}
                                      >
                                        <Quote
                                          className="w-4 h-4 mb-2 opacity-50"
                                          style={{ color: colors.accent }}
                                        />
                                        <p
                                          className={`text-xs text-slate-700 italic leading-relaxed ${
                                            language === "zh" ? "font-chinese" : ""
                                          }`}
                                        >
                                          "{story.testimonial}"
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical Stack */}
          <div className="md:hidden space-y-6">
            {content.cases.map((story, index) => {
              const { icon: IconComponent, colors } = getIndustryData(story.industry);

              return (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-40"
                    style={{
                      background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
                      filter: "blur(20px)",
                    }}
                  />

                  {/* Card */}
                  <div
                    className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 border-2 shadow-lg"
                    style={{ borderColor: colors.accent }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${colors.accent}20` }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: colors.accent }} />
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-bold text-slate-900 mb-1 ${
                            language === "zh" ? "font-chinese" : ""
                          }`}
                        >
                          {story.title}
                        </h3>
                        {story.industry && (
                          <span
                            className={`text-xs px-2 py-1 rounded font-medium ${
                              language === "zh" ? "font-chinese" : ""
                            }`}
                            style={{
                              backgroundColor: `${colors.accent}20`,
                              color: colors.accent,
                            }}
                          >
                            {story.industry}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Background */}
                    <div className="mb-4">
                      <h4
                        className={`text-sm font-semibold mb-2 ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                        style={{ color: colors.accent }}
                      >
                        {language === "zh" ? "背景：" : "Background:"}
                      </h4>
                      <p
                        className={`text-sm text-slate-700 leading-relaxed ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {story.background}
                      </p>
                    </div>

                    {/* Outcome */}
                    <div className="mb-4">
                      <h4
                        className={`text-sm font-semibold mb-2 ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                        style={{ color: colors.accent }}
                      >
                        {language === "zh" ? "成果：" : "Outcome:"}
                      </h4>
                      <p
                        className={`text-sm text-slate-900 font-medium leading-relaxed ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {story.outcome}
                      </p>
                    </div>

                    {/* Testimonial */}
                    {story.testimonial && (
                      <div
                        className="rounded-lg p-4 border-l-4"
                        style={{
                          backgroundColor: `${colors.accent}10`,
                          borderColor: colors.accent,
                        }}
                      >
                        <Quote className="w-5 h-5 mb-2 opacity-50" style={{ color: colors.accent }} />
                        <p
                          className={`text-sm text-slate-700 italic leading-relaxed ${
                            language === "zh" ? "font-chinese" : ""
                          }`}
                        >
                          "{story.testimonial}"
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          <h3
            className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 bg-clip-text text-transparent mb-4 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh"
              ? "準備好創造您的成功故事了嗎？"
              : "Ready to Create Your Success Story?"}
          </h3>
          <p
            className={`text-lg text-slate-700 mb-8 max-w-2xl mx-auto ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh"
              ? "每一個成功故事都從第一次對話開始。讓我們一起探討如何實現您的職涯目標。"
              : "Every success story starts with a conversation. Let's explore how to achieve your career goals together."}
          </p>
          <ContactButtonMenu
            label={
              language === "zh" ? "開始我的成功之旅" : "Start My Success Journey"
            }
            language={language}
            whatsappMessage={whatsappMessage}
            context="orbit-network-cta"
            variant="consultation"
            size="xl"
            className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          />
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 191, 36, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 191, 36, 0.7);
        }
      `}</style>
    </section>
  );
}
