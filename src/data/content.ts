export type Language = 'en' | 'zh'

export interface NavigationItem {
  id: string
  label: string
  href: string
}

export interface Navigation {
  items: NavigationItem[]
}

export interface Content {
  navigation: Navigation
  hero: {
    title: string
    subtitle: string
    description: string
    credentials: string[]
    cta: {
      primary: string
      secondary: string
    }
  }
  coreBenefits: {
    title: string
    subtitle: string
    quote: {
      text: string
      author: string
    }
    benefits: Array<{
      id: string
      title: string
      description: string
      icon: string
      keyPoints: string[]
    }>
  }
  services: {
    title: string
    subtitle: string
    career: {
      title: string
      description: string
      features: string[]
      sessions: string
    }
    jobApplication: {
      title: string
      description: string
      features: string[]
      sessions: string
    }
  }
  pricing: {
    title: string
    subtitle: string
    packages: Array<{
      name: string
      price: number
      originalPrice?: number
      discount?: string
      sessions: number
      description: string
      features: string[]
      additionalRate?: number
      popular?: boolean
    }>
    note: string
  }
  successStories: {
    title: string
    subtitle: string
    cases: Array<{
      id: string
      title: string
      background: string
      outcome: string
      testimonial?: string
      industry?: string
    }>
  }
  authority: {
    title: string
    subtitle: string
    certifications: Array<{
      name: string
      shortName: string
      description: string
    }>
    qualifications: Array<{
      name: string
      description: string
    }>
    experience: {
      years: string
      background: string
      specialties: string[]
    }
  }
  additionalOfferings: {
    title: string
    subtitle: string
    courses: Array<{
      name: string
      price: number
      description: string
      duration?: string
      features: string[]
    }>
  }
  contact: {
    title: string
    subtitle: string
    channels: Array<{
      name: string
      label: string
      value: string
      link: string
      icon: string
      primary?: boolean
    }>
    cta: string
  }
}

export const content: Record<Language, Content> = {
  en: {
    navigation: {
      items: [
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'why-benson', label: 'Why Benson', href: '#why-benson' },
        { id: 'services', label: 'My Services', href: '#services' },
        { id: 'success-stories', label: 'Benefits and Success Stories', href: '#success-stories' },
        { id: 'fees', label: 'Fees', href: '#fees' }
      ]
    },
    hero: {
      title: "Benson Wong",
      subtitle: "Career and Job Application Coach",
      description: "Welcome! Please get in touch if you have any questions about my Career Coaching and Job Application Coaching services.",
      credentials: [
        "ICF ACC Certified Coach",
        "CICA RPCDP Career Development Professional",
        "15+ Years Australian Workplace Experience"
      ],
      cta: {
        primary: "Book Consultation",
        secondary: "Learn More"
      }
    },
    coreBenefits: {
      title: "What Do Benson's Clients Gain?",
      subtitle: "Each client's goals, needs, and personal situation are different, so benefits vary accordingly. Beyond finding ideal jobs and careers, here are several core benefits I frequently observe:",
      quote: {
        text: "Believe you can do it, and you are already halfway to success.",
        author: "Roosevelt"
      },
      benefits: [
        {
          id: "clearer-goals",
          title: "Clearer Goals and Enhanced Self-Awareness",
          description: "Many clients re-evaluate or even redefine their goals during the guidance process because they develop a deeper understanding of themselves and begin to know more clearly what they truly want in life and career.",
          icon: "Target",
          keyPoints: [
            "Re-evaluate and redefine personal career objectives",
            "Develop deeper self-understanding and awareness",
            "Gain clarity on life and career aspirations",
            "Align goals with personal values and strengths"
          ]
        },
        {
          id: "increased-confidence",
          title: "Increased Confidence",
          description: "Many clients tell me that through our conversations, they see and can clearly articulate their strengths and abilities for the first time. Some even say that if it weren't for our discussions, they would never have applied for or obtained their dream job.",
          icon: "TrendingUp",
          keyPoints: [
            "Recognize and articulate personal strengths clearly",
            "Build confidence to pursue dream opportunities",
            "Overcome self-doubt and limiting beliefs",
            "Develop lasting confidence for future challenges"
          ]
        },
        {
          id: "enhanced-motivation",
          title: "Enhanced Action Motivation",
          description: "Many clients initially feel their goals are too big and don't know where to start, so they do nothing. I help them clarify the actions they need to take and plan timing and priorities. When goals are broken down into specific actionable steps, things suddenly become feasible, and clients become more motivated to act!",
          icon: "Zap",
          keyPoints: [
            "Break down large goals into actionable steps",
            "Create clear timing and priority frameworks",
            "Transform overwhelming objectives into manageable tasks",
            "Increase motivation through structured planning"
          ]
        },
        {
          id: "peace-of-mind",
          title: "Peace of Mind and Sense of Security",
          description: "Making major life or career decisions is always unsettling, such as whether to quit a job, return to school for further education, or consider immigrating to Australia. By working with me to clarify thoughts and considerations, clients can more confidently confirm they are making the right choice, the most suitable for themselves.",
          icon: "Heart",
          keyPoints: [
            "Gain confidence in major life decisions",
            "Clarify thoughts and consideration factors",
            "Reduce anxiety around career transitions",
            "Feel secure in chosen path and direction"
          ]
        }
      ]
    },
    services: {
      title: "Professional Coaching Services",
      subtitle: "Comprehensive career guidance tailored for Chinese-speaking professionals in Australia",
      career: {
        title: "Career Coaching",
        description: "Strategic career guidance to help you navigate your professional journey with confidence and clarity.",
        features: [
          "Clarify current career direction and options (1-2 sessions)",
          "Consider career or job transitions (1-2 sessions)",
          "Plan long-term career goals and pathways (2-3 sessions)",
          "Design and execute growth action plans (4-6 sessions)",
          "Navigate career and workplace challenges (1-2 sessions)"
        ],
        sessions: "1-6 sessions recommended based on your specific goals"
      },
      jobApplication: {
        title: "Job Application Coaching",
        description: "Expert guidance to enhance your job applications and interview performance for the Australian market.",
        features: [
          "CV optimization and tailoring (1-2 sessions)",
          "Application documents and transferable skills development (1-3 sessions)",
          "Pre-interview mindset and preparation (1 session)",
          "Mock interviews and practice (1-3 sessions)",
          "Post-interview review and feedback (1-2 sessions)",
          "Professional networking strategies (1-3 sessions)"
        ],
        sessions: "1-6 sessions recommended based on your application needs"
      }
    },
    pricing: {
      title: "Investment in Your Career",
      subtitle: "Professional coaching packages designed to deliver measurable results",
      packages: [
        {
          name: "Single Session",
          price: 220,
          sessions: 1,
          description: "Perfect for specific questions or focused coaching needs",
          features: [
            "90-minute intensive session",
            "Personalized career guidance",
            "Actionable strategies",
            "Follow-up resources"
          ]
        },
        {
          name: "Five-Session Package",
          price: 990,
          originalPrice: 1100,
          discount: "10% off",
          sessions: 5,
          description: "Comprehensive coaching for career transitions or job search success",
          features: [
            "5 × 90-minute sessions",
            "Structured coaching progression",
            "Additional sessions at $198 each",
            "Priority scheduling"
          ],
          additionalRate: 198,
          popular: true
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
            "Ongoing support and resources"
          ],
          additionalRate: 178
        }
      ],
      note: "Based on experience, clients typically achieve their career coaching goals within a maximum of ten sessions while mastering job application skills!"
    },
    successStories: {
      title: "Client Success Stories",
      subtitle: "Real transformations from Chinese-speaking professionals who achieved their career goals",
      cases: [
        {
          id: "chef-to-public-servant",
          title: "Chef to Public Servant",
          background: "A chef who recognized that the food industry wasn't their lifelong passion and required high physical demands unsuitable for long-term work. They began seriously considering long-term career development and aimed for the Australian public service due to good salary and benefits, but lacked confidence in their ability to transition successfully without white-collar experience in Australia.",
          outcome: "Under Benson's guidance, A successfully packaged their transferable skills from different work experiences in Taiwan and Australia, achieved career transition success, and obtained permanent public service qualification!",
          industry: "Government"
        },
        {
          id: "working-holiday-to-pr",
          title: "Working Holiday to Permanent Resident",
          background: "B came to Australia on a working holiday and fell in love with the country, beginning to explore immigration possibilities. Without a university degree from Taiwan and limited English skills, B lacked confidence in studying in Australia and applying for skilled migration. Additionally, B felt lost among various factors including financial burden, personal interests, and immigration probability, uncertain about their next steps.",
          outcome: "Benson helped B clarify their personal aspirations and identify the most suitable study plan. B successfully graduated while managing economic needs and achieved successful immigration!",
          industry: "Education & Immigration"
        },
        {
          id: "management-position-success",
          title: "Management Position Success",
          background: "C, who already had extensive professional work experience in Australia, sought Benson's help to challenge themselves for a management position.",
          outcome: "Within approximately one month, C received four interview opportunities, obtained two offers, and was placed on the shortlist for the other two!",
          testimonial: "Thank you Benson for accompanying me in preparing my resume and interviews, allowing me to present my past education and experience in a completely different way, and helping me get my dream position! I have participated in many interviews, but I have never grasped the preparation rhythm like these recent times. Additionally, this period of guidance helped me face my lack of confidence and uncertainty. I am very happy that I finally stepped out of the unconfident framework. Under Benson's guidance, I learned to more accurately express my achievements and strengths, gained more confidence to compete for the positions I want!",
          industry: "Management"
        },
        {
          id: "new-immigrant-mother",
          title: "New Immigrant Mother's Success",
          background: "D initially applied to forty to fifty positions with no response, becoming disheartened and finding Benson. At the time, D felt anxious, inferior, and self-doubting due to their status as a new immigrant and returning mother.",
          outcome: "But now D has not only found work but also started studying courses of interest, hoping to go higher and further in their field of interest in the future!",
          testimonial: "After consulting with Benson, I discovered that each job application resume needs to be adjusted according to the job description. Additionally, I originally thought my Taiwan career experience was useless, but with proper packaging, it turned out to be valuable highlights on my Australian resume! Also thank Benson for the warm and professional assistance, using his own experience to encourage me, helping me rebuild confidence and have the strength to continue job searching.",
          industry: "Career Transition"
        },
        {
          id: "graduate-program-success",
          title: "Graduate Program Success",
          background: "E, holding a graduate visa, was successfully accepted into a state government graduate program! Being employed as an Australian public servant with a temporary visa is already quite rare, especially for such a competitive program that even locals find difficult to enter and which provides substantial training resources!",
          outcome: "Successfully obtained position in highly competitive government graduate program.",
          testimonial: "Benson clearly told me what areas my resume and job application documents should focus on, and carefully pointed out my weaknesses in answering interview questions. After several interview practice sessions and guidance, no matter how detailed the questions, I could naturally apply the STAR framework and quickly organize complete examples to showcase myself. Additionally, Benson skillfully guided me to think of examples I hadn't considered that could demonstrate my abilities and experience. This made me realize that although my past work experience might not seem directly relevant to the job description, careful analysis could still identify key transferable skills. This gave me a new understanding and interpretation of my experience and abilities, and most importantly, my confidence significantly increased. Thank you Benson!",
          industry: "Government"
        },
        {
          id: "re-entry-success",
          title: "Re-entry to Australian Job Market",
          background: "F returned to Australia after some time back home and found the job market highly competitive, with resumes often receiving no response. After Benson's job application coaching, F successfully obtained their desired job and continues to receive career coaching for better workplace adaptation and long-term career planning.",
          outcome: "Successfully obtained desired position and continues professional development.",
          testimonial: "Benson keenly and quickly observed my career interests, direction, and personal characteristics, providing many valuable insights based on my traits. These proved extremely helpful in securing my job. Additionally, Benson rationally and meticulously helped me objectively analyze my situation and encouraged me to participate in interviews with sincerity, mutual respect, and thorough preparation. I believe these are the reasons why someone like me - not a native English speaker, lacking humor skills, and not good at conversation - could successfully get the job. What impressed me was that Benson helped me understand that even the best interview answers from others might not be suitable for me. Benson helped me confidently persist in being my best self, rather than performing confidence for results. Regarding career consultation with Benson, in one sentence: I wish I had met him sooner!",
          industry: "Career Transition"
        }
      ]
    },
    authority: {
      title: "Professional Credentials & Experience",
      subtitle: "Internationally recognized qualifications and extensive Australian workplace experience",
      certifications: [
        {
          name: "International Coach Federation Associate Certified Coach",
          shortName: "ICF ACC",
          description: "Globally recognized coaching certification ensuring professional coaching standards and ethics"
        },
        {
          name: "Career Industry Council of Australia Registered Professional Career Development Professional",
          shortName: "CICA RPCDP",
          description: "Professional certification for career development and guidance in the Australian context"
        }
      ],
      qualifications: [
        {
          name: "Diploma of Professional Coaching",
          description: "Comprehensive training in professional coaching methodologies and practices"
        },
        {
          name: "Graduate Certificate in Career Development",
          description: "Specialized education in career development theory and practice"
        },
        {
          name: "Graduate Certificate in Business Psychology",
          description: "Understanding of workplace psychology and organizational behavior"
        },
        {
          name: "Master of Applied Linguistics in TESOL",
          description: "Advanced expertise in language education and cross-cultural communication"
        },
        {
          name: "Certificate IV in Training and Assessment",
          description: "Australian vocational education teaching qualification"
        }
      ],
      experience: {
        years: "15+ Years",
        background: "Extensive Australian government sector experience providing deep insights into the Australian workplace culture, expectations, and career progression pathways.",
        specialties: [
          "Australian Public Service",
          "Corporate Coaching",
          "Graduate Program Coaching",
          "Cross-cultural Workplace Integration",
          "Bilingual Professional Development"
        ]
      }
    },
    additionalOfferings: {
      title: "Additional Learning Opportunities",
      subtitle: "Specialized courses and workshops to enhance your career development",
      courses: [
        {
          name: "APS Introduction Course",
          price: 150,
          description: "Comprehensive introduction to Australian Public Service career opportunities and application processes",
          duration: "Half-day workshop",
          features: [
            "APS structure and culture overview",
            "Application process guidance",
            "Selection criteria writing",
            "Interview preparation strategies"
          ]
        },
        {
          name: "Professional Networking Workshop",
          price: 350,
          description: "Master the art of professional networking in the Australian business environment",
          duration: "Full-day workshop",
          features: [
            "Networking strategies and techniques",
            "Cultural considerations for Chinese professionals",
            "LinkedIn optimization",
            "Conversation skills and follow-up"
          ]
        }
      ]
    },
    contact: {
      title: "Ready to Transform Your Career?",
      subtitle: "Get in touch to start your professional journey with personalized coaching",
      channels: [
        {
          name: "whatsapp",
          label: "WhatsApp",
          value: "+852 9702 0812",
          link: "https://wa.me/85297020812",
          icon: "MessageCircle",
          primary: true
        },
        {
          name: "line",
          label: "LINE",
          value: "ktuin0918",
          link: "https://line.me/ti/p/f2z0Vc5Hm_",
          icon: "MessageSquare"
        },
        {
          name: "facebook",
          label: "Facebook",
          value: "@careercoachbenson",
          link: "https://www.facebook.com/careercoachbenson",
          icon: "Facebook"
        },
        {
          name: "threads",
          label: "Threads",
          value: "@aus_jobs_and_career_coach",
          link: "https://www.threads.net/@aus_jobs_and_career_coach",
          icon: "AtSign"
        }
      ],
      cta: "Start your career transformation today"
    }
  },
  zh: {
    navigation: {
      items: [
        { id: 'home', label: '首頁', href: '#home' },
        { id: 'why-benson', label: '選擇Benson的理由', href: '#why-benson' },
        { id: 'services', label: '服務內容', href: '#services' },
        { id: 'success-stories', label: '顧客收穫與推薦', href: '#success-stories' },
        { id: 'fees', label: '費用', href: '#fees' },
        { id: 'additional-courses', label: '影片課程及工作坊', href: '#additional-courses' }
      ]
    },
    hero: {
      title: "Benson Wong",
      subtitle: "澳洲職涯 & 工作申請教練",
      description: "歡迎光臨，希望我有這個榮幸能幫助您往理想職涯更邁前一步！如果您對我的職涯引導及工作申請引導服務有任何問題，歡迎與我聯絡。",
      credentials: [
        "國際教練聯盟認證教練 ICF ACC",
        "澳洲職涯產業協會職涯發展師 CICA RPCDP",
        "15+ 年澳洲職場經驗"
      ],
      cta: {
        primary: "預約諮詢",
        secondary: "了解更多"
      }
    },
    coreBenefits: {
      title: "Benson 的客戶有什麼收穫？",
      subtitle: "每位客戶的目標、需求與個人情況不同，因此收穫也各不相同。除了找到理想的工作與職涯之外，我經常看到的幾個核心收穫包括：",
      quote: {
        text: "相信你能做到，你就已經成功了一半。",
        author: "羅斯福"
      },
      benefits: [
        {
          id: "clearer-goals",
          title: "目標更明確，自我認識提升",
          description: "很多客戶在引導過程中重新評估甚至重新定義自己的目標，因為他們對自己有了更深的了解，開始更清楚地知道自己在人生與職涯中真正想要的是什麼。",
          icon: "Target",
          keyPoints: [
            "重新評估並重新定義個人職涯目標",
            "發展更深層的自我理解與認知",
            "對人生與職涯抱負獲得清晰認識",
            "將目標與個人價值觀和優勢保持一致"
          ]
        },
        {
          id: "increased-confidence",
          title: "自信心提升",
          description: "許多客戶跟我說，透過我們的對話，他們第一次真正看見並能清楚表達自己的優勢與能力。有些人甚至說，如果不是因為與我談過，他們根本不會去申請、也不會拿到夢寐以求的工作。這份自信非常強大，能幫助他們在未來面對各種職涯與人生挑戰。",
          icon: "TrendingUp",
          keyPoints: [
            "清楚認識並表達個人優勢",
            "建立追求夢想機會的信心",
            "克服自我懷疑和限制性信念",
            "培養面對未來挑戰的持久信心"
          ]
        },
        {
          id: "enhanced-motivation",
          title: "行動動力提升",
          description: "很多客戶一開始覺得自己的目標太大、無從下手，所以什麼都沒做。我會協助他們釐清需要採取的行動，並針對時程與優先順序進行規劃。當目標被拆解成一個個具體可行的小步驟後，事情突然變得可行，客戶也因此更有動力去行動！",
          icon: "Zap",
          keyPoints: [
            "將大目標分解為可行的步驟",
            "建立清晰的時程和優先級框架",
            "將壓倒性目標轉化為可管理的任務",
            "透過結構化規劃提升行動動力"
          ]
        },
        {
          id: "peace-of-mind",
          title: "安心與踏實感",
          description: "要做出人生或職涯的重大決定總是令人不安，例如是否要離職、重返校園進修，或是考慮移民到澳洲等。透過和我一起釐清思緒與考量因素，客戶能更有信心地確認自己做的是對的、最適合自己的選擇。",
          icon: "Heart",
          keyPoints: [
            "在重大人生決定中獲得信心",
            "釐清思緒和考量因素",
            "減少職涯轉換的焦慮",
            "對所選擇的道路感到安全踏實"
          ]
        }
      ]
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
          "妥善應對職涯與職場挑戰 (1-2 次)"
        ],
        sessions: "根據您的具體目標建議 1-6 次晤談"
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
          "Networking 的說話之道 (1-3 次)"
        ],
        sessions: "根據您的申請需求建議 1-6 次晤談"
      }
    },
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
            "後續資源提供"
          ]
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
            "優先排程"
          ],
          additionalRate: 198,
          popular: true
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
            "持續支持與資源"
          ],
          additionalRate: 178
        }
      ],
      note: "根據經驗客戶僅需最多十次晤談便能達成職涯引導目標，及學會工作申請的相關技巧！"
    },
    successStories: {
      title: "成功案例及客戶推薦",
      subtitle: "華語專業人士實現職涯目標的真實轉變故事",
      cases: [
        {
          id: "chef-to-public-servant",
          title: "廚師轉公務員",
          background: "原本是廚師的 A 認為餐飲業並非終生志趣所在，而且對體力要求較高，恐不適合長期從事，所以開始認真思考長期的職涯發展。長期聽說澳洲公務員薪資福利都還不錯的 A 開始朝這個方向準備，然而在澳洲沒有文職經驗的 A 對自己能否轉職成功感到缺乏信心。",
          outcome: "在 Benson 的輔導下 A 成功的包裝自己過去從台灣及澳洲不同工作經驗中累積的 transferrable skills 轉職成功，取得永久性公務員的資格！",
          industry: "政府部門"
        },
        {
          id: "working-holiday-to-pr",
          title: "打工度假轉永久居民",
          background: "B 來澳洲打工度假後覺得很喜歡這裡，開始探索移民的可能性。在台灣沒有大學學歷，英文又不是很好的 B 對自己要在澳洲讀書進而申請技術移民相當沒有自信。此外 B 也在經濟負擔、個人興趣與移民機率等各種因素中感到迷失，不確定自己的下一步該怎麼走。",
          outcome: "Benson 幫 B 明確了個人志向及最適合的進修方案。B 在能兼顧經濟需求的狀況下順利畢業且成功移民！",
          industry: "教育與移民"
        },
        {
          id: "management-position-success",
          title: "管理職位成功",
          background: "已經在澳洲有豐富專業工作經歷的 C 因為想要挑戰主管職而找到了 Benson。",
          outcome: "在大約一個月的時間裡， C 得到了四個面試機會，拿到兩個 offers，另外兩個也有進入候補名單！",
          testimonial: "感謝 Benson 陪我準備履歷和面試，讓我以非常不一樣的方式呈現自己過去的學經歷，並且得到了自己夢寐以求的職位！我參加過非常多次的面試，但是從來沒有像最近這幾次一樣抓到準備的節奏。此外，這段時間的引導讓我好好的面對自己不自信跟不確定的態度。我很開心自己終於走出了不自信的框架，在 Benson 的指導下，我學會更加準確的把自己的成果跟優點講出來，增加更多信心去爭取我想要的職位！",
          industry: "管理職"
        },
        {
          id: "new-immigrant-mother",
          title: "新移民媽媽的成功",
          background: "D 在剛開始求職的時候投了四五十個履歷都石沉大海，灰心喪志之餘找到了 Benson。當時的 D 因為自己新移民和二度就業媽媽的身分備感焦慮、自卑與自我懷疑。",
          outcome: "但是現在的 D 不但找了工作，也開始進修有興趣的課程，希望將來能在有興趣的專業領域走得更高更遠！",
          testimonial: "跟 Benson 諮詢之後，才發現每份工作申請的履歷要根據 job description 做出調整。另外，原本以為沒什麼用的台灣職涯經歷，經過適度的包裝之後原來可以成為澳洲履歷上有價值的亮點！也謝謝 Benson 溫暖且專業的協助，用自身的經驗給我鼓勵，讓我重新建立起了自信，也有力氣繼續求職。",
          industry: "職涯轉換"
        },
        {
          id: "graduate-program-success",
          title: "畢業生計劃成功",
          background: "持有畢業生簽證的 E 成功被州政府的畢業生計畫錄取！以臨時簽證的身分被錄用為澳洲公務員已經頗為難得，還是這種連本地人都相當難進，會獲得大量栽培資源的計畫！",
          outcome: "成功獲得高競爭政府畢業生計劃職位。",
          testimonial: "Benson 很清楚地告訴我履歷及工作申請文件應該著重在哪些地方，並且很細膩地點出我在回答面試問題時的弱點。在幾次的面試練習及提點後，不論遇到多麼詳細的問題，我都能自然而然地套用 STAR 框架，並且能很快且有條理地整理出完整的例子展現自己。另外，Benson 也很厲害地引導我想到我自己沒想過能用來展現自我能力跟經驗的例子。這使我意識到，自己過去的工作經驗雖然乍看之下不一定跟 job description 很相關，但仔細剖析後還是能找出一些關鍵的通用技能。這讓我對於自己的經歷與能力有了重新的解讀與認識，更重要的是，我的自信心真的大增了不少。謝謝 Benson！",
          industry: "政府部門"
        },
        {
          id: "re-entry-success",
          title: "重返澳洲就業市場",
          background: "F 回國一陣子重回澳洲後發現就業市場競爭激烈，履歷投出後往往石沉大海。F 在 Benson 的工作申請引導後成功獲得了心儀的工作，並持續透過職涯引導更好的應對新職場的挑戰，及做長線的職涯佈局。",
          outcome: "成功獲得理想職位並持續專業發展。",
          testimonial: "Benson 敏銳迅速地觀察到了我的職涯興趣、方向與個人性格特質，並針對我的特點給了很多寶貴的看法。事實證明，這些極大地幫助我拿到了工作。此外，Benson 理性細緻地幫助我客觀冷靜地分析現狀，並鼓勵我以真誠、相互尊重與認真準備的態度參加面試。我想這些是母語非英文、不懂幽默技巧、又不善言談的我能成功得到工作的原因。印象深刻的是，Benson 還讓我明白了即使是別人口中最棒的面試回答也未必適合我。​Benson 讓我自信地堅持做最好的自己，而不是為了結果而表演出最好的自信。關於與 Benson 的職涯諮詢，一句話來說就是相見恨晚！",
          industry: "職涯轉換"
        }
      ]
    },
    authority: {
      title: "專業認證與經驗",
      subtitle: "國際認可資格與豐富澳洲職場經驗",
      certifications: [
        {
          name: "國際教練聯盟認證教練",
          shortName: "ICF ACC",
          description: "全球認可的教練認證，確保專業教練標準和職業道德"
        },
        {
          name: "澳洲職涯產業協會註冊專業職涯發展師",
          shortName: "CICA RPCDP",
          description: "澳洲職涯發展和指導的專業認證"
        }
      ],
      qualifications: [
        {
          name: "專業教練文憑",
          description: "專業教練方法論和實踐的全面培訓"
        },
        {
          name: "職涯發展學士後證書",
          description: "職涯發展理論與實踐的專業教育"
        },
        {
          name: "職場心理學士後證書",
          description: "職場心理學和組織行為的深度理解"
        },
        {
          name: "對外英語教學碩士",
          description: "語言教育和跨文化溝通的高級專業知識"
        },
        {
          name: "澳洲職業教育教學資格",
          description: "澳洲職業教育教學四級證書"
        }
      ],
      experience: {
        years: "15+ 年",
        background: "豐富的澳洲政府部門經驗，深入了解澳洲職場文化、期望和職涯發展路徑。",
        specialties: [
          "澳洲公務部門",
          "企業教練",
          "畢業生計劃教練",
          "跨文化職場融合",
          "雙語專業發展"
        ]
      }
    },
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
            "面試準備策略"
          ]
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
            "對話技巧和後續跟進"
          ]
        }
      ]
    },
    contact: {
      title: "準備好轉變您的職涯了嗎？",
      subtitle: "聯繫我們，開始您的個人化教練專業之旅",
      channels: [
        {
          name: "whatsapp",
          label: "WhatsApp",
          value: "+852 9702 0812",
          link: "https://wa.me/85297020812",
          icon: "MessageCircle",
          primary: true
        },
        {
          name: "line",
          label: "LINE",
          value: "ktuin0918",
          link: "https://line.me/ti/p/f2z0Vc5Hm_",
          icon: "MessageSquare"
        },
        {
          name: "facebook",
          label: "Facebook",
          value: "@careercoachbenson",
          link: "https://www.facebook.com/careercoachbenson",
          icon: "Facebook"
        },
        {
          name: "threads",
          label: "Threads",
          value: "@aus_jobs_and_career_coach",
          link: "https://www.threads.net/@aus_jobs_and_career_coach",
          icon: "AtSign"
        }
      ],
      cta: "今天就開始您的職涯轉變"
    }
  }
}