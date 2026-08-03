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
  email: "info@mbsbytvilla.com",
  phones: [
    {
      label: "Dr. Naren",
      number: "+94 77777777",
    },
  ],
  address: {
    line: "Kandeboddayaya, Rathmalgaha Ela",
    city: "Dambulla 21100",
    country: "Sri Lanka",
    context: "Bindunuwewa / Rathmalgaha Ela",
    documentLine: "bordering by bindunu wewa-Rathmalgaha- Ela",
    full: "Kandeboddayaya, Rathmalgaha Ela, Dambulla 21100, Sri Lanka",
  },
  mapsUrl:
    "https://www.google.com/maps/place/Mind+Body+%26+Soul,+Kandeboddayaya,+Rathmalgaha+Ella,+Dambulla+21100/@7.8445328,80.6738738,17z",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.2!2d80.6738738!3d7.8445328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcaf652ef18c33%3A0xc90ec139683167d7!2sMind%20Body%20%26%20Soul!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk",
};

export const navLinks = [
  { label: "About", id: "about" },
  { label: "Stay", id: "villas" },
  { label: "Care", id: "care" },
  { label: "Life", id: "life" },
  { label: "Gallery", id: "gallery" },
];

export const heroImage = "/images/hero/villa-lap-pool.avif";

export const heroEyebrow = "Dambulla, Sri Lanka";
export const heroHeadline =
  "Live the Life You Still Deserve, Surrounded by Nature";
export const heroSupport =
  "Experience a peaceful retirement in the heart of Sri Lanka, where luxury living meets compassionate care. Nestled within 28 acres of lush gardens, lakes, and forest, Mind Body & Soul offers a unique lifestyle that combines independence, wellness, and professional support in a serene environment.";

export const heroCtas = [
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
      "Inspired by personal experiences caring for loved ones affected by Alzheimer's disease and dementia, Dr. Naren, Clinical psychologist, our founder envisioned a place that feels less like a traditional nursing home and more like a luxury resort where residents can continue to live meaningful, fulfilling lives.",
      "Every aspect of our community reflects that vision: personalised care, respect for individuality, and a genuine commitment to helping every guest feel valued, comfortable, and at home.",
    ],
  },
  image: "/images/about/pavilion-grounds.avif",
  imageAlt: "Open-air pavilion and gardens at Mind Body & Soul in Dambulla",
  secondaryImage: "/images/about/forest-balcony.avif",
  secondaryImageAlt: "Wooden balcony overlooking lush tropical forest",
  tertiaryImage: "/images/about/garden-mountain.avif",
  tertiaryImageAlt: "Gardens and distant hills across the enclosed grounds",
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
    image: "/images/hero/villa-lap-pool.avif",
    imageAlt: "Private villa terrace and lap pool among gardens",
    features: [] as string[],
  },
  {
    id: "healthcare",
    label: "02",
    title: "Compassionate Care Around the Clock",
    subtitle: "Healthcare",
    description:
      "Our dedicated care team provides personalised assistance tailored to every resident's individual needs. Our goal is to help residents maintain their independence while ensuring their health, safety, and wellbeing.",
    image: "/images/villas/window-seat.avif",
    imageAlt: "Quiet window seat looking onto the gardens",
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
    image: "/images/care/medical-support.avif",
    imageAlt: "Doctor reviewing care details with a guest during a calm medical consultation",
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
    image: "/images/villas/veranda-dining.avif",
    imageAlt: "Private villa veranda with dining and lounge seating in tropical gardens",
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
    image: "/images/villas/outdoor-dining-terrace.avif",
    imageAlt: "Outdoor dining terrace set among the trees",
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
    image: "/images/villas/wellness-pavilion.avif",
    imageAlt: "Open pavilion with step-friendly access among calm natural grounds",
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
    image: "/images/villas/bamboo-lounge.avif",
    imageAlt: "Open-air lounge for couples and family amid bamboo gardens",
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
  image: "/images/life/blue-loungers.avif",
  imageAlt: "Restorative garden loungers at Mind Body & Soul",
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
    image: "/images/hero/villa-lap-pool.avif",
    imageAlt: "Private villa terrace and lap pool",
  },
  {
    id: "personalised-care",
    step: "02",
    title: "Personalised Care",
    description:
      "Care plans tailored to every individual's unique needs.",
    image: "/images/villas/window-seat.avif",
    imageAlt: "Quiet private corner for restful living",
  },
  {
    id: "wellness-lifestyle",
    step: "03",
    title: "Wellness Lifestyle",
    description: "Yoga, meditation, Ayurveda, and healthy living.",
    image: "/images/life/blue-loungers.avif",
    imageAlt: "Garden loungers for wellness and rest",
  },
  {
    id: "natural-environment",
    step: "04",
    title: "Beautiful Natural Environment",
    description:
      "28 acres of gardens, forests, lakes, and mountain views.",
    image: "/images/about/garden-mountain.avif",
    imageAlt: "Gardens and mountain views at Mind Body & Soul",
  },
  {
    id: "independence-support",
    step: "05",
    title: "Independence with Support",
    description:
      "Freedom to enjoy life while receiving professional care whenever needed.",
    image: "/images/about/forest-balcony.avif",
    imageAlt: "Private balcony overlooking the forest canopy",
  },
];

function galleryItem(
  src: string,
  alt: string,
  caption: string,
  span: "tall" | "wide" | "normal",
) {
  return {
    src,
    thumb: `/images/thumbs${src.replace(/^\/images/, "")}`,
    alt,
    caption,
    span,
  };
}

export const gallery = [
  galleryItem(
    "/images/gallery/grounds-canopy.avif",
    "Trees framing pavilions and brick buildings on the grounds",
    "28 acres of gardens, forests, and lakes",
    "tall",
  ),
  galleryItem(
    "/images/hero/villa-lap-pool.avif",
    "Private villa lap pool with sun loungers",
    "Private villa pools",
    "wide",
  ),
  galleryItem(
    "/images/gallery/poolside-garden.avif",
    "Poolside garden seating under tropical shade",
    "Shaded garden living",
    "normal",
  ),
  galleryItem(
    "/images/location/lake-sunset.avif",
    "Golden light over water and distant hills",
    "Breathtaking mountain views",
    "normal",
  ),
  galleryItem(
    "/images/villas/bedroom-daybed.avif",
    "Villa bedroom with daybed and four-poster bed",
    "Private villas designed for comfort",
    "tall",
  ),
  galleryItem(
    "/images/villas/villa-evening.avif",
    "Villa porch glowing with lantern light at dusk",
    "Warm evenings on the veranda",
    "wide",
  ),
  galleryItem(
    "/images/villas/indoor-outdoor-bath.avif",
    "Indoor-outdoor villa bathroom with blue tile floors",
    "Spa-inspired bathrooms",
    "normal",
  ),
  galleryItem(
    "/images/villas/patio-lounge.avif",
    "Covered villa patio with blue lounge seating",
    "Garden and forest views",
    "normal",
  ),
  galleryItem(
    "/images/life/blue-loungers.avif",
    "Blue outdoor loungers among the trees",
    "Quiet corners for rest",
    "normal",
  ),
  galleryItem(
    "/images/villas/canopy-bed.avif",
    "Canopied villa bed with soft natural light",
    "Luxury living with compassionate care",
    "wide",
  ),
  galleryItem(
    "/images/gallery/forest-desk.avif",
    "Outdoor writing desk overlooking the forest",
    "Space to think and be",
    "tall",
  ),
  galleryItem(
    "/images/care/garden-loungers.avif",
    "Red cushion loungers in a shaded garden",
    "Rest among the trees",
    "normal",
  ),
  galleryItem(
    "/images/life/garden-jeep.avif",
    "Off-road vehicle ready for local excursions",
    "Organised outings nearby",
    "normal",
  ),
  galleryItem(
    "/images/gallery/activity-pavilion.avif",
    "Open activity pavilion for wellness and gatherings",
    "Spaces to gather and move",
    "wide",
  ),
];

export const location = {
  title: "Dambulla",
  displayTitle: ["Find us", "Dambulla"] as [string, string],
  description:
    "Mind Body & Soul by T-Villa is a luxury retirement and wellness resort located in the peaceful surroundings of Dambulla, Sri Lanka.",
  atmosphere:
    "Surrounded by over 4,500 trees, tranquil lakes, landscaped gardens, and breathtaking mountain views — a safe and relaxing retreat away from the stress of city life.",
  image: "/images/location/lake-meadow.avif",
  imageAlt: "Lake and meadow landscape near Dambulla in central Sri Lanka",
};

export const bookingIntro = {
  eyebrow: "Begin Your Next Chapter",
  title: ["Begin Your", "Next Chapter"] as [string, string],
  support:
    "Whether you're exploring retirement living for yourself or a loved one, we're here to help. Discover a place where luxury, nature, and compassionate care come together to create an exceptional quality of life.",
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
