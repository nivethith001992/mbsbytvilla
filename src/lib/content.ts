export const brand = {
  name: "Mind Body & Soul",
  legalName: "Mind Body & Soul by T-Villa",
  shortName: "MBS",
  tagline: "Live the Life You Still Deserve, Surrounded by Nature",
  mission:
    "To help every guest live life with comfort, confidence, and dignity.",
  description:
    "Mind Body & Soul by T-Villa is a luxury retirement and wellness resort located in the peaceful surroundings of Dambulla, Sri Lanka. Designed for older adults who value both independence and professional care, our resort provides an environment where residents can enjoy a fulfilling lifestyle while receiving personalised support whenever needed.",
  languages: "English and Sinhala",
  email: "info@mindbodyandsoul.lk",
  phones: [
    { label: "Amrit CanagaRetna", number: "+94 77 774 4025", href: "tel:+94777744025" },
    { label: "Janaki Kuruppu", number: "+94 70 255 6451", href: "tel:+94702556451" },
  ],
  whatsapp: {
    number: "+94777744025",
    href: "https://wa.me/94777744025",
  },
  address: {
    line: "Kandeboddayaya, Rathmalgaha Ela",
    city: "Dambulla 21100",
    country: "Sri Lanka",
    context: "Bindunuwewa / Rathmalgaha Ela",
    documentLine: "bordering by bindunu wewa-Rathmalgaha- Ela",
    full: "Kandeboddayaya, Rathmalgaha Ela, Dambulla 21100, Sri Lanka",
  },
  social: {
    facebook: "https://www.facebook.com/mindbodyandsoul.lk",
    instagram: "https://www.instagram.com/p/CWQeegeo1o7/",
    maps: "https://www.google.com/maps/place/Mind+Body+%26+Soul,+Kandeboddayaya,+Rathmalgaha+Ella,+Dambulla+21100/@7.8445328,80.6738738,17z",
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.2!2d80.6738738!3d7.8445328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcaf652ef18c33%3A0xc90ec139683167d7!2sMind%20Body%20%26%20Soul!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk",
};

export const navLinks = [
  { label: "About", id: "about" },
  { label: "Stay", id: "villas" },
  { label: "Care", id: "care" },
  { label: "Life", id: "life" },
  { label: "Gallery", id: "gallery" },
  { label: "Location", id: "location" },
];

export const heroImage =
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2400&q=80";

export const heroEyebrow = "Dambulla, Sri Lanka";
export const heroHeadline =
  "Live the Life You Still Deserve, Surrounded by Nature";
export const heroSupport =
  "Experience a peaceful retirement in the heart of Sri Lanka, where luxury living meets compassionate care. Nestled within 28 acres of lush gardens, lakes, and forest, Mind Body & Soul offers a unique lifestyle that combines independence, wellness, and professional support in a serene environment.";

export const heroCtas = [
  { label: "Schedule a Visit", to: "booking" },
  { label: "Enquire Today", to: "booking" },
] as const;

/** About Us + Philosophy + Our Story */
export const about = {
  eyebrow: "About Us",
  title: "Where Comfort, Care & Nature Come Together",
  displayTitle: ["Where Comfort, Care", "& Nature Come Together"] as [
    string,
    string,
  ],
  pullQuote:
    "To help every guest live life with comfort, confidence, and dignity.",
  paragraphs: [
    "Mind Body & Soul by T-Villa is a luxury retirement and wellness resort located in the peaceful surroundings of Dambulla, Sri Lanka. Designed for older adults who value both independence and professional care, our resort provides an environment where residents can enjoy a fulfilling lifestyle while receiving personalised support whenever needed.",
    "Surrounded by over 4,500 trees, tranquil lakes, landscaped gardens, and breathtaking mountain views, our community offers a safe and relaxing retreat away from the stress of city life. Every detail has been carefully designed to promote comfort, dignity, and wellbeing.",
    "Whether you're looking for a short wellness stay or a long-term retirement solution, Mind Body & Soul provides a lifestyle where every guest can truly feel at home.",
  ],
  philosophy: {
    eyebrow: "Our Philosophy",
    title: "Everybody Is an Individual",
    paragraphs: [
      "We believe that exceptional care begins with understanding every individual. No two people are the same, and neither are their needs. Our approach is centred around personalised care plans that respect each guest's lifestyle, independence, and personal preferences.",
      "Rather than following rigid schedules, we create an environment that encourages freedom, dignity, and meaningful living. Guests enjoy the privacy of their own villa while knowing that professional support is available whenever required.",
    ],
    missionLead: "At Mind Body & Soul, our mission is simple:",
    mission:
      "To help every guest live life with comfort, confidence, and dignity.",
  },
  ourStory: {
    eyebrow: "Our Story",
    title: "Inspired by Love. Built with Purpose.",
    paragraphs: [
      "Mind Body & Soul was created from a deeply personal vision—to provide older adults with the quality of life, dignity, and compassionate care they deserve.",
      "Inspired by personal experiences caring for loved ones affected by Alzheimer's disease and dementia, our founder envisioned a place that feels less like a traditional nursing home and more like a luxury resort where residents can continue to live meaningful, fulfilling lives.",
      "Every aspect of our community reflects that vision: personalised care, respect for individuality, and a genuine commitment to helping every guest feel valued, comfortable, and at home.",
    ],
  },
  image:
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
  imageAlt: "Lush tropical gardens at Mind Body & Soul in Dambulla",
  secondaryImage:
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
  secondaryImageAlt: "Plunge pool among greenery at the resort",
  tertiaryImage:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80",
  tertiaryImageAlt: "Gardens and trees across the enclosed grounds",
};

/** Care section — Independent Living, Healthcare, Medical Support */
export const careIntro = {
  eyebrow: "Care",
  title: ["Freedom with", "Peace of Mind"] as [string, string],
  support:
    "We provide the perfect balance between independence and compassionate care.",
};

export const careSpaces = [
  {
    id: "independent-living",
    label: "01",
    title: "Freedom with Peace of Mind",
    subtitle: "Independent Living with Care",
    description:
      'Many of our residents wish to maintain their independence while having access to professional support whenever necessary. Our "Independent Living with Care" philosophy allows guests to enjoy their own routines, social activities, and personal freedom while benefiting from 24-hour care assistance. Unlike traditional nursing homes, our community encourages an active lifestyle with flexible meal times, engaging activities, and opportunities to connect with others in a welcoming environment. We provide the perfect balance between independence and compassionate care.',
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Private villa terrace among gardens",
    features: [] as string[],
  },
  {
    id: "healthcare",
    label: "02",
    title: "Compassionate Care Around the Clock",
    subtitle: "Healthcare",
    description:
      "Our dedicated care team provides personalised assistance tailored to every resident's individual needs. Our goal is to help residents maintain their independence while ensuring their health, safety, and wellbeing.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Quiet professional care setting",
    features: [
      "24-Hour Care Support",
      "Medication Management",
      "Routine Health Monitoring",
      "Assistance with Daily Living",
      "Personal Care",
      "Mobility Assistance",
      "Specialist Medical Referrals",
    ],
  },
  {
    id: "medical-support",
    label: "03",
    title: "Access to World-Class Healthcare",
    subtitle: "Medical Support",
    description:
      "When specialist medical attention is required, guests have access to some of Sri Lanka's leading hospitals, including Lanka Hospitals, Durdans Hospital, Asiri Hospital, Hemas Hospitals, and Nawaloka Hospital. Our staff are available to assist with appointments and accompany guests during hospital visits when required.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Calm wellness atmosphere",
    features: [
      "Lanka Hospitals",
      "Durdans Hospital",
      "Asiri Hospital",
      "Hemas Hospitals",
      "Nawaloka Hospital",
    ],
  },
];

/** Stay — Accommodation, Dining, Accessibility, Family */
export const accommodations = [
  {
    id: "accommodation",
    name: "Private Villas",
    chakra: "Luxury Accommodation",
    meaning: "Private Villas Designed for Comfort",
    description:
      "Our beautifully designed villa accommodations offer privacy, comfort, and relaxation in the heart of nature. Our villas allow residents to enjoy independent living while knowing professional care is always close by.",
    features: [
      "Spacious bedroom and living area",
      "Private plunge pool",
      "Air conditioning",
      "Modern bathroom",
      "Outdoor terrace",
      "Coffee and tea facilities",
      "Beautiful garden and lake views",
      "Emergency assistance system",
    ],
    capacity: "Independent living with care nearby",
    accent: "Privacy, comfort, and relaxation in nature",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Private luxury villa terrace with plunge pool in tropical gardens",
  },
  {
    id: "dining",
    name: "Dining",
    chakra: "Dining Experience",
    meaning: "Fresh, Healthy & Flexible Dining",
    description:
      "Meals are prepared daily by experienced chefs using fresh ingredients, including chemical-free organic vegetables grown within our own gardens. Guests can enjoy breakfast, lunch, and dinner at times that suit their personal schedule, either in our restaurant, dining area, or within the privacy of their villa. We also accommodate favourite family recipes and special dietary needs whenever possible.",
    features: [
      "Sri Lankan Cuisine",
      "Western Cuisine",
      "Asian Specialities",
      "Thai Dishes",
      "Vegetarian Options",
      "Custom Dietary Requirements",
    ],
    capacity: "Flexible meal times, your schedule",
    accent: "Organic produce from our own gardens",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Garden produce and hospitality dining",
  },
  {
    id: "accessibility",
    name: "Accessibility",
    chakra: "Designed for Everyone",
    meaning: "Designed for Everyone",
    description:
      "We are committed to making our resort accessible and welcoming for all guests. Our goal is to ensure every resident enjoys comfort, independence, and ease of movement throughout the resort.",
    features: [
      "Wheelchair-Accessible Villas",
      "Step-Free Access",
      "Wider Doorways",
      "Accessible Bathrooms",
      "Ramp Access Throughout the Property",
      "Accessible Swimming Pool Facilities",
      "Hydraulic Wheelchair Lift Transport",
      "Dedicated Care Assistance",
    ],
    capacity: "Comfort, independence, and ease of movement",
    accent: "Accessible and welcoming for all guests",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Accessible boutique villa nestled in calm natural grounds",
  },
  {
    id: "family",
    name: "Family & Visitors",
    chakra: "Stay Together",
    meaning: "Stay Together",
    description:
      "Friends, partners, and family members are always welcome. Couples can stay together even if only one partner requires additional care. Visiting family members may also stay with us, allowing loved ones to spend meaningful time together in a peaceful holiday setting.",
    features: [
      "Friends, partners, and family welcome",
      "Couples can stay together",
      "Care for one partner when needed",
      "Visiting family may stay with us",
      "Meaningful time together",
      "Peaceful holiday setting",
    ],
    capacity: "Loved ones welcome anytime",
    accent: "A peaceful place to be together",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Open-air villa living with private pool for couples and family",
  },
];

export const villasIntro = {
  eyebrow: "Stay",
  title: ["Private Villas", "Designed for Comfort"] as [string, string],
  support:
    "Our beautifully designed villa accommodations offer privacy, comfort, and relaxation in the heart of nature.",
};

/** Life — Wellness, Community, Excursions */
export const lifeIntro = {
  eyebrow: "Life",
  title: ["Enrich", "Every Day"] as [string, string],
  support:
    "An active lifestyle plays an essential role in healthy ageing. We provide a wide variety of recreational, social, and wellness activities designed to keep both the body and mind engaged.",
};

export const wellness = {
  eyebrow: "Wellness & Activities",
  title: "Enrich Every Day",
  intro:
    "An active lifestyle plays an essential role in healthy ageing. We provide a wide variety of recreational, social, and wellness activities designed to keep both the body and mind engaged.",
  activities: [
    "Yoga & Meditation",
    "Arts & Crafts",
    "Gardening",
    "Photography",
    "Fishing",
    "Card & Board Games",
    "Music & Singing",
    "Cooking Sessions",
    "Swimming",
    "Nature Walks",
    "Birthday Celebrations",
    "Seasonal Events",
  ],
  relaxation:
    "For additional relaxation, guests may also enjoy our Ayurveda treatments, Panchakarma therapies, and sauna facilities.",
  image:
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
  imageAlt: "Restorative wellness atmosphere at Mind Body & Soul",
};

export const community = {
  eyebrow: "Community & Social Life",
  title: "A Vibrant Community",
  paragraphs: [
    "Retirement is about more than receiving care—it's about belonging to a community.",
    "At Mind Body & Soul, residents build meaningful friendships while enjoying shared experiences, social gatherings, celebrations, and cultural activities. Our peaceful environment encourages both personal reflection and social interaction, helping every guest maintain a fulfilling lifestyle.",
  ],
};

export const excursions = {
  eyebrow: "Excursions",
  title: "Explore the Beauty of Sri Lanka",
  intro:
    "Guests are encouraged to experience the rich culture and natural beauty surrounding the resort.",
  listIntro: "Regular excursions include visits to:",
  destinations: [
    "Sigiriya Lion Rock",
    "Dambulla Cave Temple",
    "Kandy",
    "Polonnaruwa",
    "Local Villages",
    "Weekly Shopping Trips",
    "Scenic Nature Trails",
  ],
  closing:
    "Every outing is carefully organised to ensure comfort, safety, and enjoyment.",
};

/** Why Choose Us — used in Journey horizontal panels */
export const journeyIntro = {
  eyebrow: "Why Choose Us",
  title: ["Why Choose", "Mind Body & Soul"] as [string, string],
};

export const journeySteps = [
  {
    id: "luxury-villa-living",
    step: "01",
    title: "Luxury Villa Living",
    description:
      "Private villas surrounded by nature with modern amenities.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Private villa terrace and plunge pool",
  },
  {
    id: "personalised-care",
    step: "02",
    title: "Personalised Care",
    description:
      "Care plans tailored to every individual's unique needs.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Compassionate care setting",
  },
  {
    id: "wellness-lifestyle",
    step: "03",
    title: "Wellness Lifestyle",
    description: "Yoga, meditation, Ayurveda, and healthy living.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Wellness and Ayurveda atmosphere",
  },
  {
    id: "natural-environment",
    step: "04",
    title: "Beautiful Natural Environment",
    description:
      "28 acres of gardens, forests, lakes, and mountain views.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Sunlight through trees at Mind Body & Soul",
  },
  {
    id: "independence-support",
    step: "05",
    title: "Independence with Support",
    description:
      "Freedom to enjoy life while receiving professional care whenever needed.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Calm outdoor living space at the resort",
  },
  {
    id: "experienced-team",
    step: "06",
    title: "Experienced Team",
    description:
      "A compassionate team dedicated to exceptional care and hospitality.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Peaceful luxury accommodation among trees",
  },
];

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
    alt: "Tropical garden path at Mind Body & Soul",
    caption: "28 acres of gardens, forests, and lakes",
    span: "tall" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
    alt: "Plunge pool overlooking lush greenery",
    caption: "Private plunge pool",
    span: "wide" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80",
    alt: "Morning light over a quiet pool",
    caption: "Accessible swimming facilities",
    span: "normal" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80",
    alt: "Sri Lankan highland mist and mountains",
    caption: "Breathtaking mountain views",
    span: "normal" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
    alt: "Sunlight filtering through forest canopy",
    caption: "Over 4,500 trees",
    span: "tall" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    alt: "Luxury tropical villa accommodation exterior",
    caption: "Private villas designed for comfort",
    span: "wide" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80",
    alt: "Boutique villa nestled in nature",
    caption: "Wheelchair-accessible villas",
    span: "normal" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
    alt: "Modern open-air villa with private pool",
    caption: "Garden and lake views",
    span: "normal" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=80",
    alt: "Restorative wellness atmosphere",
    caption: "Ayurveda, Panchakarma & sauna",
    span: "normal" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1400&q=80",
    alt: "Warm villa interior with natural materials",
    caption: "Luxury living with compassionate care",
    span: "wide" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=80",
    alt: "Garden produce and outdoor living",
    caption: "Chemical-free organic vegetables",
    span: "tall" as const,
  },
];

export const location = {
  title: "Dambulla",
  displayTitle: ["Find us", "Dambulla"] as [string, string],
  description:
    "Mind Body & Soul by T-Villa is a luxury retirement and wellness resort located in the peaceful surroundings of Dambulla, Sri Lanka.",
  atmosphere:
    "Surrounded by over 4,500 trees, tranquil lakes, landscaped gardens, and breathtaking mountain views — a safe and relaxing retreat away from the stress of city life.",
  image:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
  imageAlt: "Misty hills near Dambulla in central Sri Lanka",
  attractions: [
    {
      name: "Sigiriya Lion Rock",
      detail: "Regular organised excursion",
    },
    {
      name: "Dambulla Cave Temple",
      detail: "Regular organised excursion",
    },
    {
      name: "Kandy",
      detail: "Regular organised excursion",
    },
    {
      name: "Polonnaruwa",
      detail: "Regular organised excursion",
    },
    {
      name: "Local Villages",
      detail: "Regular organised excursion",
    },
    {
      name: "Weekly Shopping Trips",
      detail: "Regular organised outing",
    },
    {
      name: "Scenic Nature Trails",
      detail: "Organised for comfort, safety, and enjoyment",
    },
  ],
};

export const bookingIntro = {
  eyebrow: "Begin Your Next Chapter",
  title: ["Begin Your", "Next Chapter"] as [string, string],
  support:
    "Whether you're exploring retirement living for yourself or a loved one, we're here to help. Discover a place where luxury, nature, and compassionate care come together to create an exceptional quality of life.",
  primaryCta: "Book a Private Tour",
  secondaryCta: "Contact Our Team",
  cta: "Book a Private Tour",
  formNote: "We respond personally — usually within one business day.",
  placeholder:
    "Tell us about a short wellness stay, long-term retirement living, or visiting with family…",
};

export const galleryIntro = {
  eyebrow: "Gallery",
  title: ["Gardens,", "villas & light"] as [string, string],
  support:
    "A quiet look at the grounds — private villas, gardens, lakes, and the natural setting that surrounds Mind Body & Soul.",
};

/** SEO */
export const seo = {
  title:
    "Luxury Retirement Living in Dambulla, Sri Lanka | Mind Body & Soul by T-Villa",
  description:
    "Experience luxury retirement living in Dambulla, Sri Lanka. Mind Body & Soul by T-Villa offers private villas, personalised elderly care, wellness programmes, independent living with support, and peaceful surroundings designed for comfort, dignity, and wellbeing.",
};
