export type Language = "en" | "zh";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface Navigation {
  items: NavigationItem[];
}

export interface MyStory {
  title: string;
  content: string[];
  imagePath: string;
}

export interface FAQ {
  question: string;
  answer: string[];
}

export interface ServicePlan {
  name: string;
  sessions: number;
  suggestedDuration: string;
  contractDuration: string;
  targetAudience: string;
  price: number;
  additionalRate?: number;
  features: string[];
  upgradeInfo: string;
}

export interface SessionTopic {
  category: string;
  description: string;
  topics: string[];
}

export interface LanguageCulture {
  title: string;
  content: string[];
}

export interface Content {
  navigation: Navigation;
  hero: {
    title: string;
    subtitle: string;
    headlineTitle: string;
    description: string;
    credentials: string[];
    coreValuesTitle: string;
    coreValues: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    cta: {
      primary: string;
      secondary: string;
    };
  };
  stats: {
    clients: string;
    coachingHours: string;
    interviews: string;
    efficiencyRate: string;
    efficiencyDescription: string;
    maxSessions: string;
    maxSessionsDescription: string;
    satisfaction: string;
    satisfactionDescription: string;
    sectionTitle: string;
    sectionSubtitle: string;
  };
  myStory: MyStory;
  coreBenefits: {
    title: string;
    subtitle: string;
    quote: {
      text: string;
      author: string;
    };
    benefits: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      keyPoints: string[];
    }>;
  };
  services: {
    title: string;
    subtitle: string;
    career: {
      title: string;
      description: string;
      features: string[];
      sessions: string;
    };
    jobApplication: {
      title: string;
      description: string;
      features: string[];
      sessions: string;
    };
  };
  servicePlans: {
    quote: {
      text: string;
      author: string;
    };
    oprahQuote: {
      text: string;
      author: string;
    };
    plans: ServicePlan[];
    footnotes: string[];
  };
  sessionTopics: SessionTopic[];
  pricing: {
    title: string;
    subtitle: string;
    packages: Array<{
      name: string;
      price: number;
      originalPrice?: number;
      discount?: string;
      sessions: number;
      description: string;
      features: string[];
      additionalRate?: number;
      popular?: boolean;
    }>;
    note: string;
  };
  successStories: {
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
  authority: {
    title: string;
    subtitle: string;
    experienceBadges: string[];
    experienceContent: string[];
    specialties: string[];
    certifications: Array<{
      name: string;
      shortName: string;
      description: string;
    }>;
    qualifications: Array<{
      name: string;
      description: string;
    }>;
    experience: {
      years: string;
      background: string;
      specialties: string[];
    };
  };
  languageCulture: LanguageCulture;
  faq: FAQ[];
  additionalOfferings: {
    title: string;
    subtitle: string;
    courses: Array<{
      name: string;
      price: number;
      description: string;
      duration?: string;
      features: string[];
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    channels: Array<{
      name: string;
      label: string;
      value: string;
      link: string;
      icon: string;
      primary?: boolean;
    }>;
    cta: string;
    footer: string;
  };
}

export const content: Record<Language, Content> = {
  en: {
    navigation: {
      items: [
        { id: "home", label: "Home", href: "#home" },
        { id: "why-benson", label: "Why Benson", href: "#why-benson" },
        { id: "services", label: "My Services", href: "#services" },
        {
          id: "success-stories",
          label: "Benefits and Success Stories",
          href: "#success-stories",
        },
        { id: "faq", label: "FAQ", href: "#faq" },
      ],
    },
    hero: {
      title: "Benson Wong",
      subtitle: "Australia & International Career Coach",
      headlineTitle: "Let Your Professional Value Shine in Australian and International Workplaces",
      description:
        "You don't have to navigate Australian, international, and foreign company careers alone! With 15 years of Australian hands-on experience, professional coaching techniques, and unique perspectives as a recruiter and internal coach, I'll help you master the 'rules of the Western workplace game', cross cultural barriers, and position yourself precisely—not just to start your career, but to make it continuously brilliant!\n\nWhether it's clarifying your strengths, mastering interview tactics to confidently secure your ideal job offer, or planning a 5-10 year career blueprint with concrete pathways to achievement. Starting today, let me help you know yourself better and transform anxiety into action!",
      credentials: [
        "ICF PCC Certified Coach",
        "CICA RPCDP Career Development Professional",
        "15+ Years Australian Workplace Experience",
      ],
      coreValuesTitle: "Three Core Values of My Coaching Services",
      coreValues: [
        {
          icon: "TrendingUp",
          title: "Rebuild Confidence and Value",
          description: "Overcome the constraints of Asian cultural 'humility'. I help you see your strengths and abilities, and confidently present them in language that Western employers understand"
        },
        {
          icon: "Users",
          title: "Precise Career Positioning",
          description: "Reject ineffective 'scattershot' approaches. By combining personal strengths, career goals, and market realities, I help you target high-success job opportunities and career options with precision"
        },
        {
          icon: "Heart",
          title: "Professional Companionship and Support",
          description: "Your best ally on the career path. At critical moments, I provide strategic perspectives and mental support, guiding you to make the most grounded, regret-free choices in uncertainty"
        }
      ],
      cta: {
        primary: "Book・Consult",
        secondary: "",
      },
    },
    stats: {
      clients: "300+",
      coachingHours: "500+",
      interviews: "200+",
      efficiencyRate: "83%",
      efficiencyDescription:
        "of clients achieve their goals in 5 sessions or fewer",
      maxSessions: "100%",
      maxSessionsDescription:
        "of clients complete their goals within 10 sessions",
      satisfaction: "93%",
      satisfactionDescription: "client satisfaction rate",
      sectionTitle: "Proven Results & Client Success",
      sectionSubtitle:
        "Real outcomes from coaching that delivers measurable impact",
    },
    myStory: {
      title: "A 20-Year Journey from International Student to Australian Public Service",
      content: [
        "In 2004, I arrived in Australia with my luggage as an international student. After graduation, I gained experience at local educational institutions, travel agencies, and banks. Then in 2011, I broke through fierce competition to enter the Australian Federal Government through a competitive graduate program, and over the following 15 years, I transferred and promoted multiple times, encountering and solving many career challenges.",
        "This journey taught me: to establish yourself in Australian and international workplaces, you need not only expertise but also an understanding of Western workplace rules. I hope to be 'the mentor I most wished I could have met back then', helping you avoid unnecessary detours and achieve your ideals and values in Australian and international workplaces faster!"
      ],
      imagePath: "/images/benson-profile.jpg"
    },
    coreBenefits: {
      title: "Beyond Your Dream Job, What Else Will You Gain?",
      subtitle:
        "Every coaching journey is unique. Beyond achieving career goals, my clients most commonly report these four core transformations:",
      quote: {
        text: "Believe you can do it, and you are already halfway to success.",
        author: "Roosevelt",
      },
      benefits: [
        {
          id: "clearer-goals",
          title: "Clearer Goals and Enhanced Self-Awareness",
          description:
            "Many clients initially describe themselves as 'knowing what they don't want, but not knowing what they do want.' Through dialogue, they gradually clarify their internal expectations, understand the gap between ideal and reality, and thus focus more on 'what truly matters to them.'",
          icon: "Target",
          keyPoints: [
            "Re-evaluate and redefine personal career objectives",
            "Develop deeper self-understanding and awareness",
            "Gain clarity on life and career aspirations",
            "Align goals with personal values and strengths",
          ],
        },
        {
          id: "increased-confidence",
          title: "Strengthened Confidence and Self-Worth",
          description:
            "Many clients, after a few conversations with me, finally 'see' and can articulate their strengths and past achievements for the first time. They realize: 'I'm actually not bad; I just didn't know how to recognize or present myself.' This self-recognition often becomes the key to their breakthrough.",
          icon: "TrendingUp",
          keyPoints: [
            "Recognize and articulate personal strengths clearly",
            "Build confidence to pursue dream opportunities",
            "Overcome self-doubt and limiting beliefs",
            "Develop lasting confidence for future challenges",
          ],
        },
        {
          id: "enhanced-motivation",
          title: "Enhanced Action Motivation",
          description:
            "Many clients initially feel their goals are too big and don't know where to start, so they hesitate. Through step-by-step breakdown and clarification, abstract goals become manageable, and clients begin to feel 'I can actually do this' and are thus more willing to take the first step.",
          icon: "Zap",
          keyPoints: [
            "Break down large goals into actionable steps",
            "Create clear timing and priority frameworks",
            "Transform overwhelming objectives into manageable tasks",
            "Increase motivation through structured planning",
          ],
        },
        {
          id: "peace-of-mind",
          title: "Reduced Anxiety and Inner Peace",
          description:
            "Career and life decisions always carry uncertainty. Through dialogue, clients gradually clarify their thinking, trade-offs, and potential scenarios, allowing them to face major changes with a calmer and more grounded mindset.",
          icon: "Heart",
          keyPoints: [
            "Gain confidence in major life decisions",
            "Clarify thoughts and consideration factors",
            "Reduce anxiety around career transitions",
            "Feel secure in chosen path and direction",
          ],
        },
      ],
    },
    services: {
      title: "Professional Coaching Services",
      subtitle:
        "Comprehensive career guidance tailored for Chinese-speaking professionals in Australia",
      career: {
        title: "Career Coaching",
        description:
          "Strategic career guidance to help you navigate your professional journey with confidence and clarity.",
        features: [
          "Clarify current career direction and options (1-2 sessions)",
          "Consider career or job transitions (1-2 sessions)",
          "Plan long-term career goals and pathways (2-3 sessions)",
          "Design and execute growth action plans (4-6 sessions)",
          "Navigate career and workplace challenges (1-2 sessions)",
        ],
        sessions: "1-6 sessions recommended based on your specific goals",
      },
      jobApplication: {
        title: "Job Application Coaching",
        description:
          "Expert guidance to enhance your job applications and interview performance for the Australian market.",
        features: [
          "CV optimization and tailoring (1-2 sessions)",
          "Application documents and transferable skills development (1-3 sessions)",
          "Pre-interview mindset and preparation (1 session)",
          "Mock interviews and practice (1-3 sessions)",
          "Post-interview review and feedback (1-2 sessions)",
          "Professional networking strategies (1-3 sessions)",
        ],
        sessions: "1-6 sessions recommended based on your application needs",
      },
    },
    servicePlans: {
      quote: {
        text: "Setting goals is the first step to turning invisible dreams into visible reality.",
        author: "Tony Robbins"
      },
      oprahQuote: {
        text: "A coach can help you stop those crazy voices in your head that keep telling you: you're not good enough.",
        author: "Oprah Winfrey"
      },
      plans: [
        {
          name: "Launch Plan",
          sessions: 1,
          suggestedDuration: "Single session",
          contractDuration: "3 months*",
          targetAudience: "Those with specific questions or topic focus",
          price: 220,
          features: [
            "90-minute intensive session",
            "Personalized career guidance",
            "Actionable strategies",
            "Follow-up resources",
          ],
          upgradeInfo: "Can upgrade to other packages within contract period"
        },
        {
          name: "Action Plan",
          sessions: 5,
          suggestedDuration: "5-8 weeks",
          contractDuration: "6 months*",
          targetAudience: "Most common choice, most clients achieve goals within 5 sessions",
          price: 990,
          additionalRate: 198,
          features: [
            "5 × 90-minute sessions",
            "Structured coaching progression",
            "Priority scheduling",
            "Additional sessions at $198 each",
          ],
          upgradeInfo: "Can upgrade to Strategy Plan within contract period"
        },
        {
          name: "Strategy Plan",
          sessions: 10,
          suggestedDuration: "10-16 weeks",
          contractDuration: "12 months*",
          targetAudience: "Need comprehensive coaching or multiple topic focus",
          price: 1880,
          additionalRate: 178,
          features: [
            "10 × 90-minute sessions",
            "Comprehensive skill development",
            "Ongoing support and resources",
            "Additional sessions at $178 each",
          ],
          upgradeInfo: "Best value for comprehensive transformation"
        }
      ],
      footnotes: [
        "* Calculated from the first session date",
        "** Prices subject to change; refer to the latest website announcement"
      ]
    },
    sessionTopics: [
      {
        category: "Career Goals",
        description: "Clarify direction and positioning",
        topics: [
          "Clarify short/medium/long-term career goals",
          "Understand your career positioning",
          "Explore new career directions",
          "Plan study paths for career transition"
        ]
      },
      {
        category: "Job Application",
        description: "CV, application documents, and job search strategies",
        topics: [
          "CV writing and optimization",
          "Cover letter and application documents",
          "Develop job search strategies",
          "Discover transferable skills"
        ]
      },
      {
        category: "Interview Preparation",
        description: "Mock interviews and strategies",
        topics: [
          "Mock interview and feedback",
          "Answer common interview questions",
          "Build a story bank for interview responses",
          "Strategies for salary negotiation"
        ]
      },
      {
        category: "Workplace Adaptation",
        description: "Career development and relationships",
        topics: [
          "Adapt to new job/work environment",
          "Develop professional networking skills",
          "Manage workplace relationships",
          "Communicate effectively in the workplace"
        ]
      },
      {
        category: "Mental Preparation",
        description: "Confidence and mindset",
        topics: [
          "Overcome imposter syndrome",
          "Build and strengthen confidence",
          "Overcome fear and procrastination",
          "Clarify and face inner struggles"
        ]
      },
      {
        category: "Special Situations",
        description: "Transitions and challenges",
        topics: [
          "Consider job/career transition",
          "Face decisions: stay or leave",
          "Respond to workplace challenges",
          "Support re-entry to workforce"
        ]
      }
    ],
    pricing: {
      title: "Investment in Your Career",
      subtitle:
        "Professional coaching packages designed to deliver measurable results",
      packages: [
        {
          name: "Single Session",
          price: 220,
          sessions: 1,
          description:
            "Perfect for specific questions or focused coaching needs",
          features: [
            "90-minute intensive session",
            "Personalized career guidance",
            "Actionable strategies",
            "Follow-up resources",
          ],
        },
        {
          name: "Five-Session Package",
          price: 990,
          originalPrice: 1100,
          discount: "10% off",
          sessions: 5,
          description:
            "Comprehensive coaching for career transitions or job search success",
          features: [
            "5 × 90-minute sessions",
            "Structured coaching progression",
            "Additional sessions at $198 each",
            "Priority scheduling",
          ],
          additionalRate: 198,
          popular: true,
        },
        {
          name: "Ten-Session Package",
          price: 1880,
          originalPrice: 2200,
          discount: "≈15% off",
          sessions: 10,
          description: "Complete career transformation and mastery program",
          features: [
            "10 × 90-minute sessions",
            "Comprehensive skill development",
            "Additional sessions at $178 each",
            "Ongoing support and resources",
          ],
          additionalRate: 178,
        },
      ],
      note: "Based on experience, clients typically achieve their career coaching goals within a maximum of ten sessions while mastering job application skills!",
    },
    successStories: {
      title: "Success Stories & Client Testimonials",
      subtitle:
        "Real transformations from Chinese-speaking professionals who achieved their career goals",
      cases: [
        {
          id: "chef-to-public-servant",
          title: "Adam: Chef to Permanent Public Servant",
          background:
            "Originally a chef, Adam recognized the food industry wasn't his lifelong passion and the high physical demands weren't suitable for long-term work. He began seriously considering long-term career development and aimed for the Australian public service due to good salary and benefits, but lacked confidence in transitioning successfully without white-collar experience in Australia.",
          outcome:
            "Under Benson's guidance, Adam successfully packaged his transferable skills from different work experiences in Taiwan and Australia, achieved career transition success, and obtained permanent public service qualification!",
          industry: "Government",
        },
        {
          id: "working-holiday-to-pr",
          title: "Ben: Working Holiday to Successful Immigration",
          background:
            "Ben came to Australia on a working holiday and fell in love with the country, beginning to explore immigration possibilities. Without a university degree from Taiwan and limited English skills, Ben lacked confidence in studying in Australia and applying for skilled migration. Additionally, he felt lost among various factors including financial burden, personal interests, and immigration probability.",
          outcome:
            "Benson helped Ben clarify his personal aspirations and identify the most suitable study plan. Ben successfully graduated while managing economic needs and achieved successful immigration!",
          industry: "Education & Immigration",
        },
        {
          id: "management-position-success",
          title: "Cindy: From Applying to Interviewing to Landing Her Dream Management Position",
          background:
            "Cindy already had extensive professional work experience in Australia and sought Benson's help to challenge herself for a management position.",
          outcome:
            "Within approximately one month, Cindy received four interview opportunities, obtained two offers, and was placed on the shortlist for the other two!",
          testimonial:
            "Thank you Benson for accompanying me in preparing my resume and interviews, allowing me to present my past education and experience in a completely different way, and helping me get my dream position! I have participated in many interviews, but I have never grasped the preparation rhythm like these recent times. Additionally, this period of guidance helped me face my lack of confidence and uncertainty. I am very happy that I finally stepped out of the unconfident framework. Under Benson's guidance, I learned to more accurately express my achievements and strengths, gained more confidence to compete for the positions I want!",
          industry: "Management",
        },
        {
          id: "new-immigrant-mother",
          title: "Dora: New Immigrant Mother Breaking Through to a New Career Chapter",
          background:
            "Dora initially applied to forty to fifty positions with no response, becoming disheartened. At the time, Dora felt anxious, inferior, and self-doubting due to her status as a new immigrant and returning mother.",
          outcome:
            "But now Dora has not only found work but also started studying courses of interest, hoping to go higher and further in her field of interest in the future!",
          testimonial:
            "After consulting with Benson, I discovered that each job application resume needs to be adjusted according to the job description. Additionally, I originally thought my Taiwan career experience was useless, but with proper packaging, it turned out to be valuable highlights on my Australian resume! Also thank Benson for the warm and professional assistance, using his own experience to encourage me, helping me rebuild confidence and have the strength to continue job searching.",
          industry: "Career Transition",
        },
        {
          id: "graduate-program-success",
          title: "Elva: Fierce Competition but Still Standing Out in Government Graduate Program",
          background:
            "Elva, holding a graduate visa, was applying to state government graduate programs—positions that are rare for temporary visa holders and highly competitive even for locals.",
          outcome:
            "Successfully obtained position in highly competitive government graduate program.",
          testimonial:
            "Benson clearly told me what areas my resume and job application documents should focus on, and carefully pointed out my weaknesses in answering interview questions. After several interview practice sessions and guidance, no matter how detailed the questions, I could naturally apply the STAR framework and quickly organize complete examples to showcase myself. Additionally, Benson skillfully guided me to think of examples I hadn't considered that could demonstrate my abilities and experience. This gave me a new understanding and interpretation of my experience and abilities, and most importantly, my confidence significantly increased. Thank you Benson!",
          industry: "Government",
        },
        {
          id: "re-entry-success",
          title: "Fiona: Smoothly Re-entering Australian Job Market with New Clarity",
          background:
            "Fiona returned to Australia after some time back home and found the job market highly competitive, with resumes often receiving no response.",
          outcome:
            "After Benson's job application coaching, Fiona successfully obtained her desired job and continues to receive career coaching for better workplace adaptation and long-term career planning.",
          testimonial:
            "Benson keenly and quickly observed my career interests, direction, and personal characteristics, providing many valuable insights based on my traits. These proved extremely helpful in securing my job. Additionally, Benson rationally and meticulously helped me objectively analyze my situation and encouraged me to participate in interviews with sincerity, mutual respect, and thorough preparation. What impressed me was that Benson helped me understand that even the best interview answers from others might not be suitable for me. Benson helped me confidently persist in being my best self, rather than performing confidence for results. Regarding career consultation with Benson, in one sentence: I wish I had met him sooner!",
          industry: "Career Transition",
        },
        {
          id: "contractor-to-public-servant",
          title: "Gary: From Bank Contract Engineer to Permanent Public Servant",
          background:
            "Gary was a contract engineer at a bank, but the uncertain nature of contract work made him want to seek more stable career development. His goal was the Australian public service, known for good salary and benefits.",
          outcome:
            "With Benson's guidance, Gary successfully transitioned from the private sector to the public service, obtaining a permanent position with stable career prospects!",
          testimonial:
            "Benson helped me understand how to present my technical background in a way that resonated with government recruiters. The structured approach to applications and interviews gave me the confidence I needed to make this significant career change.",
          industry: "Government",
        },
        {
          id: "interview-rescue",
          title: "Henry: One CV Revision Plus Two Interview Rescues",
          background:
            "Henry had interviews coming up quickly and needed urgent help with both CV optimization and interview preparation in a very short timeframe.",
          outcome:
            "After targeted CV revision and two intensive mock interview sessions, Henry walked into his interviews feeling prepared and confident, ultimately landing the position he wanted!",
          testimonial:
            "I was in a panic with interviews approaching fast. Benson's focused approach helped me quickly identify and address my weak points. The mock interviews were incredibly realistic and helped me feel much more prepared. Worth every minute!",
          industry: "Career Transition",
        },
        {
          id: "imposter-syndrome",
          title: "Iris: Breaking Through Limiting Beliefs and Overcoming Imposter Syndrome",
          background:
            "Iris had the skills and experience for advancement but was held back by self-doubt and imposter syndrome. She constantly questioned whether she was 'good enough' and hesitated to apply for positions she was qualified for.",
          outcome:
            "Through coaching, Iris learned to recognize her authentic strengths, reframe her internal narrative, and confidently pursue opportunities that aligned with her capabilities. She now approaches her career with a healthier mindset and has secured a more senior position.",
          testimonial:
            "Benson helped me see that my 'weaknesses' were often just my strengths viewed from the wrong angle. Learning to articulate my value in my own authentic voice, rather than trying to sound like someone else, was transformational. I finally feel like I belong in the rooms I used to feel intimidated by.",
          industry: "Career Transition",
        },
      ],
    },
    authority: {
      title: "Professional Experience & Core Expertise",
      subtitle:
        "Internationally recognized qualifications and extensive Australian workplace experience",
      experienceBadges: [
        "15+ Years Australian Experience",
        "300+ Clients",
        "500+ Coaching Hours",
        "200+ Interviewees"
      ],
      experienceContent: [
        "Entered the Australian Federal Government through a competitive graduate program in 2011, and over 15 years gained extensive experience in policy development, program management, and talent development—including serving as a recruiter and conducting interviews for hundreds of candidates.",
        "This unique combination of perspectives allows me to understand both sides: what candidates struggle with and what employers are actually looking for. I bring this insider knowledge to help you navigate the Australian job market more effectively.",
        "Whether you're targeting public or private sector roles, I can help you present your experience in ways that resonate with Australian recruiters and hiring managers."
      ],
      specialties: [
        "Career Anchoring & Goal Setting",
        "Public & Private Sector Applications",
        "Strategic Career Planning",
        "Workplace Leadership",
        "Australian Public Service",
        "Graduate Program Coaching",
        "Cross-cultural Integration",
        "Interview Preparation",
        "Imposter Syndrome"
      ],
      certifications: [
        {
          name: "International Coach Federation Professional Certified Coach",
          shortName: "ICF PCC",
          description:
            "Globally recognized coaching certification ensuring professional coaching standards and ethics. PCC credential demonstrates advanced coaching competency with 500+ hours of coaching experience.",
        },
        {
          name: "Career Industry Council of Australia Registered Professional Career Development Professional",
          shortName: "CICA RPCDP",
          description:
            "Professional certification for career development and guidance in the Australian context",
        },
      ],
      qualifications: [
        {
          name: "Diploma of Professional Coaching",
          description:
            "Comprehensive training in professional coaching methodologies and practices",
        },
        {
          name: "Graduate Certificate in Career Development",
          description:
            "Specialized education in career development theory and practice",
        },
        {
          name: "Graduate Certificate in Business Psychology",
          description:
            "Understanding of workplace psychology and organizational behavior",
        },
        {
          name: "Master of Applied Linguistics in TESOL",
          description:
            "Advanced expertise in language education and cross-cultural communication",
        },
        {
          name: "Certificate IV in Training and Assessment",
          description: "Australian vocational education teaching qualification",
        },
        {
          name: "Nationally Accredited Mediator",
          description: "Qualification in conflict resolution and mediation",
        },
      ],
      experience: {
        years: "15+ Years",
        background:
          "Extensive Australian government sector experience providing deep insights into the Australian workplace culture, expectations, and career progression pathways. Proudly serving Chinese-speaking professionals across Australia, Taiwan, and Hong Kong.",
        specialties: [
          "Career Anchoring & Goal Setting",
          "Public & Private Sector Job Applications",
          "Strategic Career Planning",
          "Workplace Leadership Development",
          "Australian Public Service",
          "Graduate Program Coaching",
          "Cross-cultural Workplace Integration",
          "Bilingual Professional Development",
        ],
      },
    },
    languageCulture: {
      title: "Understanding Language, Understanding Culture Even More",
      content: [
        "I work in Chinese (Mandarin and Cantonese) and English. Beyond language, I deeply understand the cultural differences between Eastern and Western workplaces—including communication styles, expression habits, and professional expectations.",
        "This isn't just about language translation, but helping you convert your strengths into advantages that Western employers can recognize and value."
      ]
    },
    faq: [
      {
        question: "How is coaching different from consulting or mentoring?",
        answer: [
          "Consulting typically involves the consultant providing direct advice and solutions based on their expertise. Mentoring usually involves an experienced person sharing their journey and guidance.",
          "Coaching, as I practice it, focuses on helping you discover your own answers through structured dialogue. I ask powerful questions, offer frameworks, and provide feedback—but the insights and decisions come from you. This approach creates more lasting change because the solutions are authentically yours."
        ]
      },
      {
        question: "What topics can coaching help with?",
        answer: [
          "Common topics include: career direction and goal setting, job search strategy, resume and application optimization, interview preparation, workplace challenges, confidence building, work-life balance, and career transitions.",
          "Essentially, if you're facing a career-related question or challenge, coaching can likely help you think through it more clearly and take more effective action."
        ]
      },
      {
        question: "How many sessions will I need?",
        answer: [
          "This depends on your specific situation and goals. Some clients achieve what they need in 1-3 sessions (e.g., focused interview prep). Others benefit from 5-10 sessions for more comprehensive career planning or skill development.",
          "Based on my experience, 83% of clients achieve their goals within 5 sessions, and 100% within 10 sessions. I recommend starting with the Action Plan (5 sessions) for most situations, which can be upgraded if needed."
        ]
      },
      {
        question: "Do you only work with people targeting the Australian public service?",
        answer: [
          "Not at all! While my public service background gives me unique insights for those targeting government roles, my coaching approach and career frameworks apply equally well to private sector, non-profit, and international organizations.",
          "About half my clients work in or target the private sector. The core skills—self-presentation, interview performance, career strategy—are transferable across sectors."
        ]
      },
      {
        question: "What if I don't know what I want to do?",
        answer: [
          "That's actually one of the most common starting points! Many clients come to me saying 'I know what I don't want, but not what I do want.'",
          "Through our conversations, we'll explore your values, strengths, interests, and constraints. You don't need to have answers before we start—that's what the coaching process is for."
        ]
      },
      {
        question: "How do online sessions work?",
        answer: [
          "All sessions are conducted via video call (Zoom or similar), which allows flexibility regardless of your location in Australia or overseas.",
          "Sessions are typically 90 minutes. I'll send you a link before our scheduled time, and we'll have a focused conversation based on your priorities. Many clients find online sessions actually more convenient than in-person meetings."
        ]
      }
    ],
    additionalOfferings: {
      title: "Additional Learning Opportunities",
      subtitle:
        "Specialized courses and workshops to enhance your career development",
      courses: [
        {
          name: "APS Introduction Course",
          price: 150,
          description:
            "Comprehensive introduction to Australian Public Service career opportunities and application processes",
          duration: "Half-day workshop",
          features: [
            "APS structure and culture overview",
            "Application process guidance",
            "Selection criteria writing",
            "Interview preparation strategies",
          ],
        },
        {
          name: "Professional Networking Workshop",
          price: 350,
          description:
            "Master the art of professional networking in the Australian business environment",
          duration: "Full-day workshop",
          features: [
            "Networking strategies and techniques",
            "Cultural considerations for Chinese professionals",
            "LinkedIn optimization",
            "Conversation skills and follow-up",
          ],
        },
      ],
    },
    contact: {
      title: "Ready to Embrace a Better, Stronger You?",
      subtitle: "",
      channels: [
        {
          name: "whatsapp",
          label: "WhatsApp",
          value: "+852 9702 0812",
          link: "https://wa.me/85297020812",
          icon: "MessageCircle",
        },
        {
          name: "line",
          label: "LINE",
          value: "ktuin0918",
          link: "https://line.me/ti/p/f2z0Vc5Hm_",
          icon: "MessageSquare",
        },
        {
          name: "threads",
          label: "Threads",
          value: "@benson.pcc.coach",
          link: "https://www.threads.net/@benson.pcc.coach",
          icon: "AtSign",
        },
        {
          name: "facebook",
          label: "Facebook",
          value: "@benson.pcc.coach",
          link: "https://www.facebook.com/benson.pcc.coach",
          icon: "Facebook",
        },
      ],
      cta: "Start your career transformation today",
      footer: "©2026 by Benson Wong ICF PCC & CICA RPCDP",
    },
  },
  zh: {
    navigation: {
      items: [
        { id: "home", label: "首頁", href: "#home" },
        { id: "why-benson", label: "選擇Benson的理由", href: "#why-benson" },
        { id: "services", label: "服務內容", href: "#services" },
        {
          id: "success-stories",
          label: "顧客收穫與推薦",
          href: "#success-stories",
        },
        { id: "faq", label: "常見問題", href: "#faq" },
      ],
    },
    hero: {
      title: "Benson Wong",
      subtitle: "澳洲 & 國際職涯教練",
      headlineTitle: "讓您的專業價值，在澳洲及國際職場裡大放異彩",
      description:
        "澳洲、國際與外商的職涯路，您不需要獨自摸索！結合15年澳洲實戰經驗、專業教練技術、以及擔任招募官及內部教練的獨特視角，我將協助您掌握「西方職場的遊戲規則」，跨越文化隔閡、精準定位，不只開啟職涯，更要持續精彩！\n\n無論是釐清優勢、面試攻防，助您自信拿下理想 job offer；或是規劃5到10年的職涯藍圖，具體建構實現路徑。從今天開始，讓我陪您更加認識自己，將焦慮轉化為行動！",
      credentials: [
        "國際教練聯盟認證教練 ICF PCC",
        "澳洲職涯產業協會職涯發展師 CICA RPCDP",
        "15+ 年澳洲職場經驗",
      ],
      coreValuesTitle: "教練服務的三大核心價值",
      coreValues: [
        {
          icon: "TrendingUp",
          title: "重塑自信與價值",
          description: "克服亞洲文化「謙卑」的束縛。協助您看見自己的優勢與實力，並用西方僱主聽得懂的語言自信展現"
        },
        {
          icon: "Users",
          title: "精準定位職涯",
          description: "拒絕無效的「亂槍打鳥」。結合個人優勢、職涯目標以及市場現況，為您鎖定高勝率的職缺及職涯選項，精準出擊"
        },
        {
          icon: "Heart",
          title: "專業陪伴與支持",
          description: "職涯路上的最佳戰友。在關鍵時刻提供策略觀點與心理建設，引導您在未知中做出最踏實、無悔的選擇"
        }
      ],
      cta: {
        primary: "預約・諮詢",
        secondary: "",
      },
    },
    stats: {
      clients: "300+",
      coachingHours: "500+",
      interviews: "200+",
      efficiencyRate: "83%",
      efficiencyDescription: "的客人僅需五次或更少的晤談就可完成引導目標",
      maxSessions: "100%",
      maxSessionsDescription: "的客人在十次晤談內完成所有目標",
      satisfaction: "93%",
      satisfactionDescription: "顧客滿意率",
      sectionTitle: "實證成果與客戶成功",
      sectionSubtitle: "提供可衡量影響力的引導服務帶來的真實成果",
    },
    myStory: {
      title: "從留學生到澳洲公職的20年旅程",
      content: [
        "2004年，我帶著行李來到澳洲留學。畢業後我經歷過本地教育機構、旅行社及銀行的磨練，然後在2011年突破重圍，通過競爭激烈的畢業生計畫進入澳洲聯邦政府部門，並在其後15年的時間裡多次升轉職，遇到並解決許多職涯挑戰。",
        "這段旅程讓我明白：要在澳洲及國際職場立足，不只需要專業，更要懂得西方職場的遊戲規則。我希望能成為那個「當年我最希望能遇到的導師」，陪您少走冤枉路，更快的在澳洲及國際職場裡實現您的理想與價值！"
      ],
      imagePath: "/images/benson-profile.jpg"
    },
    coreBenefits: {
      title: "除了理想工作，您還將獲得什麼？",
      subtitle:
        "每一段引導旅程都是獨一無二的。除了實現職涯目標，我的客戶最常回饋這四大核心轉變：",
      quote: {
        text: "相信你能做到，你就已經成功了一半。",
        author: "羅斯福",
      },
      benefits: [
        {
          id: "clearer-goals",
          title: "目標更清晰，自我認知更深入",
          description:
            "很多客戶一開始形容自己「知道不想要什麼，但不知道想要什麼」。透過對話，逐步釐清心中的期待、認識理想與現實的差距，進而更加專注在「對自己真正重要的事」上。",
          icon: "Target",
          keyPoints: [
            "重新評估並重新定義個人職涯目標",
            "發展更深層的自我理解與認知",
            "對人生與職涯抱負獲得清晰認識",
            "將目標與個人價值觀和優勢保持一致",
          ],
        },
        {
          id: "increased-confidence",
          title: "自信提升，自我價值更肯定",
          description:
            "不少客戶與我聊過幾次後，才終於「看見」並能說出自己的優勢與過去的成就。他們發現：「原來我沒有那麼差，只是不懂得如何看待與呈現自己。」這份自我認可，往往成為他們突破的關鍵。",
          icon: "TrendingUp",
          keyPoints: [
            "清楚認識並表達個人優勢",
            "建立追求夢想機會的信心",
            "克服自我懷疑和限制性信念",
            "培養面對未來挑戰的持久信心",
          ],
        },
        {
          id: "enhanced-motivation",
          title: "行動力提升，起步更順暢",
          description:
            "很多客戶一開始覺得目標太大、無從下手，所以遲遲沒有行動。透過一步步的拆解與釐清，抽象的目標變得可控，客戶開始感到「原來我做得到」，因而更願意踏出第一步。",
          icon: "Zap",
          keyPoints: [
            "將大目標分解為可行的步驟",
            "建立清晰的時程和優先級框架",
            "將壓倒性目標轉化為可管理的任務",
            "透過結構化規劃提升行動動力",
          ],
        },
        {
          id: "peace-of-mind",
          title: "焦慮減少，內心更踏實",
          description:
            "職涯與人生的抉擇總有不確定性。透過對話，客戶逐步釐清自己的思路、權衡與可能情境，讓自己在面對重大改變時，能以更平和踏實的心態迎接。",
          icon: "Heart",
          keyPoints: [
            "在重大人生決定中獲得信心",
            "釐清思緒和考量因素",
            "減少職涯轉換的焦慮",
            "對所選擇的道路感到安全踏實",
          ],
        },
      ],
    },
    services: {
      title: "專業教練服務",
      subtitle: "為在澳華語專業人士量身定制的全面職涯指導",
      career: {
        title: "職涯引導",
        description: "策略性職涯指導，助您自信清晰地導航專業路徑。",
        features: [
          "定位當前職涯方向及選項 (1-2 次)",
          "考慮是否轉換職涯或工作 (1-2 次)",
          "規劃長期職涯目標與路徑 (2-3 次)",
          "設計並執行成長行動計畫 (4-6 次)",
          "妥善應對職涯與職場挑戰 (1-2 次)",
        ],
        sessions: "根據您的具體目標建議 1-6 次晤談",
      },
      jobApplication: {
        title: "工作申請引導",
        description: "專業指導助您提升工作申請和面試表現，適應澳洲市場需求。",
        features: [
          "CV 調整 (1-2 次)",
          "申請書例子討論及調整，包含發掘通用技能及建立職涯故事庫 (1-3 次)",
          "面試前心態調整及準備 (1 次)",
          "模擬面試 (1-3 次)",
          "面試後討論 (1-2 次)",
          "Networking 的說話之道 (1-3 次)",
        ],
        sessions: "根據您的申請需求建議 1-6 次晤談",
      },
    },
    servicePlans: {
      quote: {
        text: "設定目標是將無形的夢想轉化為有形現實的第一步。",
        author: "Tony Robbins"
      },
      oprahQuote: {
        text: "教練能幫助你停止腦中那些瘋狂的聲音，這些聲音總是在告訴你：你不夠好。",
        author: "歐普拉"
      },
      plans: [
        {
          name: "啟航計畫",
          sessions: 1,
          suggestedDuration: "單次晤談",
          contractDuration: "3個月*",
          targetAudience: "有特定問題或單一主題者",
          price: 258,
          features: [
            "90 分鐘深度晤談",
            "個人化職涯指導",
            "可行策略建議",
            "後續資源提供",
          ],
          upgradeInfo: "合約期內可升級其他方案"
        },
        {
          name: "行動計畫",
          sessions: 5,
          suggestedDuration: "5-8週",
          contractDuration: "6個月*",
          targetAudience: "最多人選擇，大部分客戶5次內達成目標",
          price: 1088,
          additionalRate: 198,
          features: [
            "5 × 90 分鐘晤談",
            "結構化教練進程",
            "優先排程",
            "後續可以單次 $198 加購",
          ],
          upgradeInfo: "合約期內可升級戰略計畫"
        },
        {
          name: "戰略計畫",
          sessions: 10,
          suggestedDuration: "10-16週",
          contractDuration: "12個月*",
          targetAudience: "需要全面引導或涵蓋多個主題者",
          price: 2088,
          additionalRate: 178,
          features: [
            "10 × 90 分鐘晤談",
            "全面技能發展",
            "持續支持與資源",
            "後續可以單次 $178 加購",
          ],
          upgradeInfo: "全面轉型的最佳價值"
        }
      ],
      footnotes: [
        "* 從第一次晤談當天算起",
        "** 價格如有變動，以官網最新公告為準"
      ]
    },
    sessionTopics: [
      {
        category: "職涯目標",
        description: "釐清方向與定位",
        topics: [
          "釐清短中長期職涯目標",
          "了解自己的職涯定位",
          "探索新的職涯方向",
          "轉職進修路線規劃"
        ]
      },
      {
        category: "工作申請",
        description: "履歷、申請文件與求職策略",
        topics: [
          "履歷撰寫與優化",
          "Cover letter與申請文件",
          "制定求職策略",
          "發掘通用技能"
        ]
      },
      {
        category: "面試準備",
        description: "模擬面試與策略",
        topics: [
          "模擬面試與反饋",
          "回答常見面試問題",
          "建立面試回答故事庫",
          "薪資談判策略"
        ]
      },
      {
        category: "職場適應",
        description: "職涯發展與人際",
        topics: [
          "新工作/環境適應",
          "發展職場人脈技巧",
          "處理職場人際關係",
          "有效職場溝通"
        ]
      },
      {
        category: "心理建設",
        description: "自信與心態",
        topics: [
          "克服冒牌者症候群",
          "建立及強化自信心",
          "克服恐懼與拖延",
          "釐清與面對內心糾結"
        ]
      },
      {
        category: "特殊情況",
        description: "轉換與挑戰",
        topics: [
          "考慮轉職/轉換跑道",
          "面對去留抉擇",
          "應對職場挑戰",
          "支持重返職場"
        ]
      }
    ],
    pricing: {
      title: "職涯投資方案",
      subtitle: "專業教練套餐，致力於提供可衡量的成果",
      packages: [
        {
          name: "單次晤談",
          price: 220,
          sessions: 1,
          description: "適合特定問題或重點教練需求",
          features: [
            "90 分鐘深度晤談",
            "個人化職涯指導",
            "可行策略建議",
            "後續資源提供",
          ],
        },
        {
          name: "五次組合",
          price: 990,
          originalPrice: 1100,
          discount: "10% 優惠",
          sessions: 5,
          description: "全面教練助力職涯轉換或求職成功",
          features: [
            "5 × 90 分鐘晤談",
            "結構化教練進程",
            "後續可以單次 $198 加購",
            "優先排程",
          ],
          additionalRate: 198,
          popular: true,
        },
        {
          name: "十次組合",
          price: 1880,
          originalPrice: 2200,
          discount: "≈15% 優惠",
          sessions: 10,
          description: "完整職涯轉型與技能精通計劃",
          features: [
            "10 × 90 分鐘晤談",
            "全面技能發展",
            "後續可以單次 $178 加購",
            "持續支持與資源",
          ],
          additionalRate: 178,
        },
      ],
      note: "根據經驗客戶僅需最多十次晤談便能達成職涯引導目標，及學會工作申請的相關技巧！",
    },
    successStories: {
      title: "成功案例及客戶推薦",
      subtitle: "華語專業人士實現職涯目標的真實轉變故事",
      cases: [
        {
          id: "chef-to-public-servant",
          title: "阿明：廚師轉永久性公務員",
          background:
            "原本是廚師的阿明認為餐飲業並非終生志趣所在，而且對體力要求較高，恐不適合長期從事，所以開始認真思考長期的職涯發展。長期聽說澳洲公務員薪資福利都還不錯的阿明開始朝這個方向準備，然而在澳洲沒有文職經驗的阿明對自己能否轉職成功感到缺乏信心。",
          outcome:
            "在 Benson 的輔導下阿明成功的包裝自己過去從台灣及澳洲不同工作經驗中累積的 transferrable skills 轉職成功，取得永久性公務員的資格！",
          industry: "政府部門",
        },
        {
          id: "working-holiday-to-pr",
          title: "小寶：打工度假轉成功移民",
          background:
            "小寶來澳洲打工度假後覺得很喜歡這裡，開始探索移民的可能性。在台灣沒有大學學歷，英文又不是很好的小寶對自己要在澳洲讀書進而申請技術移民相當沒有自信。此外小寶也在經濟負擔、個人興趣與移民機率等各種因素中感到迷失，不確定自己的下一步該怎麼走。",
          outcome:
            "Benson 幫小寶明確了個人志向及最適合的進修方案。小寶在能兼顧經濟需求的狀況下順利畢業且成功移民！",
          industry: "教育與移民",
        },
        {
          id: "management-position-success",
          title: "小琪：從申請到面試到拿下心儀的管理職",
          background:
            "已經在澳洲有豐富專業工作經歷的小琪因為想要挑戰主管職而找到了 Benson。",
          outcome:
            "在大約一個月的時間裡，小琪得到了四個面試機會，拿到兩個 offers，另外兩個也有進入候補名單！",
          testimonial:
            "感謝 Benson 陪我準備履歷和面試，讓我以非常不一樣的方式呈現自己過去的學經歷，並且得到了自己夢寐以求的職位！我參加過非常多次的面試，但是從來沒有像最近這幾次一樣抓到準備的節奏。此外，這段時間的引導讓我好好的面對自己不自信跟不確定的態度。我很開心自己終於走出了不自信的框架，在 Benson 的指導下，我學會更加準確的把自己的成果跟優點講出來，增加更多信心去爭取我想要的職位！",
          industry: "管理職",
        },
        {
          id: "new-immigrant-mother",
          title: "小朵：新移民媽媽突破困境開啟新職涯篇章",
          background:
            "小朵在剛開始求職的時候投了四五十個履歷都石沉大海，灰心喪志之餘找到了 Benson。當時的小朵因為自己新移民和二度就業媽媽的身分備感焦慮、自卑與自我懷疑。",
          outcome:
            "但是現在的小朵不但找了工作，也開始進修有興趣的課程，希望將來能在有興趣的專業領域走得更高更遠！",
          testimonial:
            "跟 Benson 諮詢之後，才發現每份工作申請的履歷要根據 job description 做出調整。另外，原本以為沒什麼用的台灣職涯經歷，經過適度的包裝之後原來可以成為澳洲履歷上有價值的亮點！也謝謝 Benson 溫暖且專業的協助，用自身的經驗給我鼓勵，讓我重新建立起了自信，也有力氣繼續求職。",
          industry: "職涯轉換",
        },
        {
          id: "graduate-program-success",
          title: "小艾：激烈競爭中依然脫穎而出的政府畢業生計畫",
          background:
            "持有畢業生簽證的小艾正在申請州政府的畢業生計畫——這種職位對臨時簽證持有者來說非常罕見，即使對本地人也競爭激烈。",
          outcome: "成功獲得高競爭政府畢業生計劃職位。",
          testimonial:
            "Benson 很清楚地告訴我履歷及工作申請文件應該著重在哪些地方，並且很細膩地點出我在回答面試問題時的弱點。在幾次的面試練習及提點後，不論遇到多麼詳細的問題，我都能自然而然地套用 STAR 框架，並且能很快且有條理地整理出完整的例子展現自己。另外，Benson 也很厲害地引導我想到我自己沒想過能用來展現自我能力跟經驗的例子。這使我意識到，自己過去的工作經驗雖然乍看之下不一定跟 job description 很相關，但仔細剖析後還是能找出一些關鍵的通用技能。這讓我對於自己的經歷與能力有了重新的解讀與認識，更重要的是，我的自信心真的大增了不少。謝謝 Benson！",
          industry: "政府部門",
        },
        {
          id: "re-entry-success",
          title: "小菲：順利重返澳洲就業市場並找到新方向",
          background:
            "小菲回國一陣子重回澳洲後發現就業市場競爭激烈，履歷投出後往往石沉大海。",
          outcome:
            "小菲在 Benson 的工作申請引導後成功獲得了心儀的工作，並持續透過職涯引導更好的應對新職場的挑戰，及做長線的職涯佈局。",
          testimonial:
            "Benson 敏銳迅速地觀察到了我的職涯興趣、方向與個人性格特質，並針對我的特點給了很多寶貴的看法。事實證明，這些極大地幫助我拿到了工作。此外，Benson 理性細緻地幫助我客觀冷靜地分析現狀，並鼓勵我以真誠、相互尊重與認真準備的態度參加面試。我想這些是母語非英文、不懂幽默技巧、又不善言談的我能成功得到工作的原因。印象深刻的是，Benson 還讓我明白了即使是別人口中最棒的面試回答也未必適合我。​Benson 讓我自信地堅持做最好的自己，而不是為了結果而表演出最好的自信。關於與 Benson 的職涯諮詢，一句話來說就是相見恨晚！",
          industry: "職涯轉換",
        },
        {
          id: "contractor-to-public-servant",
          title: "小剛：從銀行合約制工程師到永久性公務員",
          background:
            "小剛原本是銀行的合約制工程師，但合約工作的不穩定性讓他想尋求更穩定的職涯發展。他的目標是薪資福利都還不錯的澳洲公務員。",
          outcome:
            "在 Benson 的指導下，小剛成功從私營部門轉型到公務體系，取得了穩定職涯前景的永久職位！",
          testimonial:
            "Benson 幫助我理解如何用能讓政府招聘者產生共鳴的方式呈現我的技術背景。結構化的申請和面試方法給了我做出這個重大職業轉變所需的信心。",
          industry: "政府部門",
        },
        {
          id: "interview-rescue",
          title: "小漢：一次履歷修改加上兩次面試急救",
          background:
            "小漢的面試即將來臨，需要在很短的時間內緊急獲得履歷優化和面試準備的幫助。",
          outcome:
            "經過針對性的履歷修改和兩次密集的模擬面試，小漢帶著準備充分和自信的心態走進面試，最終成功拿下了他想要的職位！",
          testimonial:
            "面試快到了我非常恐慌。Benson 專注的方法幫助我快速識別並解決了我的弱點。模擬面試非常逼真，讓我感覺準備得更充分了。每一分鐘都值得！",
          industry: "職涯轉換",
        },
        {
          id: "imposter-syndrome",
          title: "小愛：打破限制性思維與克服冒牌者症候群",
          background:
            "小愛擁有晉升所需的技能和經驗，但自我懷疑和冒牌者症候群讓她躊躇不前。她不斷質疑自己是否「夠格」，遲遲不敢申請自己有資格的職位。",
          outcome:
            "透過教練引導，小愛學會了認識自己真實的優勢、重新詮釋內心的敘事，並自信地追求符合她能力的機會。她現在以更健康的心態面對職涯，並獲得了更高階的職位。",
          testimonial:
            "Benson 幫助我看到，我的「弱點」往往只是從錯誤角度看待的優點。學會用自己真實的聲音來表達我的價值，而不是試圖聽起來像別人，這是一個轉變性的體驗。我終於感覺自己屬於那些曾經讓我感到害怕的場合了。",
          industry: "職涯轉換",
        },
      ],
    },
    authority: {
      title: "專業經驗及核心專長領域",
      subtitle: "國際認可資格與豐富澳洲職場經驗",
      experienceBadges: [
        "15+ 年澳洲職場經驗",
        "300+ 客戶",
        "500+ 引導時數",
        "面試人選 200+"
      ],
      experienceContent: [
        "2011年通過競爭激烈的畢業生計畫進入澳洲聯邦政府部門，在其後15年的時間裡累積了豐富的政策制定、項目管理和人才發展經驗——包括擔任招募官，面試過數百位候選人。",
        "這種獨特的視角組合讓我能夠理解兩方面：候選人的困難所在，以及雇主真正在尋找什麼。我將這種內部人士的知識帶入引導，幫助您更有效地駕馭澳洲求職市場。",
        "無論您的目標是公共部門還是私營企業職位，我都能幫助您以與澳洲招聘人員和用人經理產生共鳴的方式呈現您的經驗。"
      ],
      specialties: [
        "職涯定錨與目標設定",
        "公私單位工作申請",
        "策略性職涯規劃",
        "職場領導力",
        "澳洲公務部門",
        "畢業生計劃教練",
        "跨文化職場融合",
        "面試準備",
        "冒牌者症候群"
      ],
      certifications: [
        {
          name: "國際教練聯盟專業認證教練",
          shortName: "ICF PCC",
          description: "全球認可的教練認證，確保專業教練標準和職業道德。PCC資格證明了具有500+小時教練經驗的高級教練能力。",
        },
        {
          name: "澳洲職涯產業協會註冊專業職涯發展師",
          shortName: "CICA RPCDP",
          description: "澳洲職涯發展和指導的專業認證",
        },
      ],
      qualifications: [
        {
          name: "專業教練文憑",
          description: "專業教練方法論和實踐的全面培訓",
        },
        {
          name: "職涯發展學士後證書",
          description: "職涯發展理論與實踐的專業教育",
        },
        {
          name: "職場心理學士後證書",
          description: "職場心理學和組織行為的深度理解",
        },
        {
          name: "對外英語教學碩士",
          description: "語言教育和跨文化溝通的高級專業知識",
        },
        {
          name: "澳洲職業教育教學四級證書",
          description: "澳洲職業教育教學資格",
        },
        {
          name: "國家認可調解員資格",
          description: "衝突解決與調解資格",
        },
      ],
      experience: {
        years: "15+ 年",
        background:
          "豐富的澳洲政府部門經驗，深入了解澳洲職場文化、期望和職涯發展路徑。專業服務澳洲、台灣及香港的華語專業人士。",
        specialties: [
          "職涯定錨與目標設定",
          "公私單位工作申請",
          "策略性職涯規劃",
          "職場領導力發展",
          "澳洲公務部門",
          "畢業生計劃教練",
          "跨文化職場融合",
          "雙語專業發展",
        ],
      },
    },
    languageCulture: {
      title: "懂語言，更懂文化",
      content: [
        "我以中文（國語及廣東話）和英文工作。除了語言，我深刻理解東西方職場的文化差異——包括溝通風格、表達習慣和專業期望。",
        "這不只是語言翻譯，而是幫助您將自己的優勢轉化為西方雇主能夠認可和重視的優勢。"
      ]
    },
    faq: [
      {
        question: "教練引導和顧問諮詢或導師指導有什麼不同？",
        answer: [
          "顧問諮詢通常是顧問根據其專業知識提供直接的建議和解決方案。導師指導通常是由有經驗的人分享他們的經歷和指導。",
          "我所實踐的教練引導，專注於透過結構化的對話幫助您發現自己的答案。我會提出有力的問題、提供框架並給予反饋——但洞見和決定來自您自己。這種方法能創造更持久的改變，因為解決方案是真正屬於您的。"
        ]
      },
      {
        question: "教練引導可以幫助哪些主題？",
        answer: [
          "常見主題包括：職涯方向和目標設定、求職策略、履歷和申請優化、面試準備、職場挑戰、自信建立、工作生活平衡，以及職涯轉型。",
          "基本上，如果您面臨職涯相關的問題或挑戰，教練引導很可能能幫助您更清晰地思考並採取更有效的行動。"
        ]
      },
      {
        question: "我需要多少次晤談？",
        answer: [
          "這取決於您的具體情況和目標。有些客戶在1-3次晤談中就達成他們的需求（例如，集中的面試準備）。其他人則從5-10次晤談中獲益，進行更全面的職涯規劃或技能發展。",
          "根據我的經驗，83%的客戶在5次晤談內達成目標，100%在10次內達成。對於大多數情況，我建議從行動計畫（5次晤談）開始，如有需要可以升級。"
        ]
      },
      {
        question: "你只服務目標是澳洲公務員的人嗎？",
        answer: [
          "完全不是！雖然我的公務員背景讓我對於目標是政府職位的人有獨特的見解，但我的教練方法和職涯框架同樣適用於私營企業、非營利組織和國際組織。",
          "大約一半的客戶在私營企業工作或以此為目標。核心技能——自我呈現、面試表現、職涯策略——在各行各業都是可轉移的。"
        ]
      },
      {
        question: "如果我不知道我想做什麼怎麼辦？",
        answer: [
          "這實際上是最常見的起點之一！很多客戶來找我時說「我知道我不想要什麼，但不知道我想要什麼。」",
          "透過我們的對話，我們會探索您的價值觀、優勢、興趣和限制。在我們開始之前，您不需要有答案——這正是教練過程的用途。"
        ]
      },
      {
        question: "線上晤談如何進行？",
        answer: [
          "所有晤談都通過視訊通話（Zoom或類似平台）進行，無論您在澳洲境內還是海外都可以靈活安排。",
          "晤談通常為90分鐘。我會在預定時間前發送連結給您，然後我們會根據您的優先事項進行專注的對話。很多客戶發現線上晤談實際上比面對面會議更方便。"
        ]
      }
    ],
    additionalOfferings: {
      title: "額外學習機會",
      subtitle: "專業課程和工作坊，提升您的職涯發展",
      courses: [
        {
          name: "APS 入門課程",
          price: 150,
          description: "全面介紹澳洲公務員職涯機會和申請流程",
          duration: "半日工作坊",
          features: [
            "APS 結構和文化概覽",
            "申請流程指導",
            "選擇標準撰寫",
            "面試準備策略",
          ],
        },
        {
          name: "專業人脈工作坊",
          price: 350,
          description: "掌握在澳洲商業環境中的專業人脈藝術",
          duration: "全日工作坊",
          features: [
            "人脈策略和技巧",
            "華語專業人士的文化考量",
            "LinkedIn 優化",
            "對話技巧和後續跟進",
          ],
        },
      ],
    },
    contact: {
      title: "準備好迎接更好、更強大的自己了嗎？",
      subtitle: "",
      channels: [
        {
          name: "line",
          label: "LINE",
          value: "ktuin0918",
          link: "https://line.me/ti/p/f2z0Vc5Hm_",
          icon: "MessageSquare",
        },
        {
          name: "whatsapp",
          label: "WhatsApp",
          value: "+852 9702 0812",
          link: "https://wa.me/85297020812",
          icon: "MessageCircle",
        },
        {
          name: "facebook",
          label: "Facebook",
          value: "@benson.pcc.coach",
          link: "https://www.facebook.com/benson.pcc.coach",
          icon: "Facebook",
        },
        {
          name: "threads",
          label: "Threads",
          value: "@benson.pcc.coach",
          link: "https://www.threads.net/@benson.pcc.coach",
          icon: "AtSign",
        },
      ],
      cta: "今天就開始您的職涯轉變",
      footer: "©2026 by Benson Wong ICF PCC & CICA RPCDP",
    },
  },
};
