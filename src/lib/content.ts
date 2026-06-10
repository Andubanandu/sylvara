export const nav = {
  services: "Services",
  work: "Work",
  about: "About",
  contact: "Contact",
};

export const home = {
  hero: {
    badge: "FULL-SERVICE DESIGN AGENCY",
    line1: "Bold Design.",
    line2: "Real Results.",
    sub: "We build high-converting websites and brand identities for businesses that want to stand out. Web design, branding, SEO, and more — all under one roof.",
    ctaPrimary: "Get a Free Quote",
    ctaGhost: "View Our Work →",
  },
  services: {
    label: "WHAT WE DO",
    h2: "Everything your brand needs, in one place.",
    more: "+ 4 more services →",
  },
  scroll: {
    title: "Designed to convert.",
    subtitle: "Built to perform.",
  },
  cta: {
    h2: "Ready to get started?",
    sub: "Free consultation, no commitment.",
    btn: "Book a Call",
  },
};

export const services = {
  hero: {
    badge: "WHAT WE OFFER",
    h1: "Services Built for Growth",
    sub: "From your first website to a full brand overhaul — we have the skills to move your business forward.",
  },
  list: [
    {
      title: "Web Design",
      desc: "Beautiful, responsive websites that load fast and convert visitors into customers. Built to work flawlessly on every device.",
      price: "Starting from €799",
    },
    {
      title: "Branding",
      desc: "Complete brand identity systems — strategy, visual identity, brand guidelines, and assets that set you apart from the competition.",
      price: "Starting from €599",
    },
    {
      title: "Logo Design",
      desc: "A distinctive, versatile logo that represents your business perfectly across print, web, and social media.",
      price: "Starting from €299",
    },
    {
      title: "SEO",
      desc: "On-page optimisation, technical SEO, and content strategy to get your website ranking on Google and driving organic traffic.",
      price: "Starting from €399/mo",
    },
    {
      title: "E-Commerce",
      desc: "Online shops designed to sell. Seamless checkout experience, product management, and payment integration.",
      price: "Starting from €999",
    },
    {
      title: "Social Media Design",
      desc: "On-brand graphics, templates, and visual content for Instagram, Facebook, LinkedIn, and beyond.",
      price: "Starting from €299",
    },
    {
      title: "Copywriting",
      desc: "Compelling website copy, blog posts, and marketing content that speaks to your audience and drives action.",
      price: "Starting from €199",
    },
    {
      title: "Website Maintenance",
      desc: "Monthly care plans covering updates, backups, security monitoring, and performance checks — so you never have to worry.",
      price: "Starting from €99/mo",
    },
  ],
  process: {
    h2: "How We Work",
    sub: "A clear, collaborative process from first call to launch day.",
    steps: [
      { n: 1, title: "Discover", desc: "We learn about your business, goals, and audience." },
      { n: 2, title: "Design", desc: "We craft the visual direction and get your approval." },
      { n: 3, title: "Build", desc: "We develop the full solution to the highest standard." },
      { n: 4, title: "Launch", desc: "We go live and support you through the handover." },
    ],
  },
};

export const portfolio = {
  hero: {
    badge: "OUR WORK",
    h1: "Work We're Proud Of",
    sub: "A selection of projects across web design, branding, and digital.",
  },
  filters: ["All", "Web Design", "Branding", "E-Commerce"],
  projects: [
    { category: "web", initials: "MK", gradient: "linear-gradient(135deg,#1e3a5f,#2563eb)", tag: "Web Design", title: "Mäkke Café", desc: "Brand identity and website for a specialty coffee shop in Tallinn." },
    { category: "web", initials: "NF", gradient: "linear-gradient(135deg,#0f172a,#1d4ed8)", tag: "Web Design", title: "NordFlow SaaS", desc: "Landing page and onboarding flow for a B2B productivity platform." },
    { category: "branding", initials: "KC", gradient: "linear-gradient(135deg,#1a1a2e,#4a1942)", tag: "Branding", title: "Kivi & Co.", desc: "Full rebrand and brand guidelines for a construction consultancy." },
    { category: "ecommerce", initials: "LB", gradient: "linear-gradient(135deg,#1a1a1a,#6b21a8)", tag: "E-Commerce", title: "Lumi Boutique", desc: "E-commerce store for a Scandinavian fashion label." },
    { category: "web", initials: "HD", gradient: "linear-gradient(135deg,#042f2e,#0d9488)", tag: "Web Design", title: "Harmo Dental", desc: "Website and SEO setup for a modern dental clinic." },
    { category: "branding", initials: "PS", gradient: "linear-gradient(135deg,#1c1917,#b45309)", tag: "Branding", title: "Päike Studio", desc: "Logo and social media kit for a photography studio." },
  ],
  stats: [
    { value: "50+", label: "Projects Delivered" },
    { value: "3", label: "Years of Experience" },
    { value: "100%", label: "Client Satisfaction" },
  ],
  cta: "Start Your Project",
};

export const about = {
  hero: {
    badge: "WHO WE ARE",
    h1: "We Are Sylvara",
    sub: "A small team of designers and developers who believe great digital work changes how businesses grow. We work closely with our clients — no account managers, just direct collaboration with the people building your project.",
  },
  team: {
    h2: "Meet the Team",
    members: [
      { initials: "MK", name: "Marten Kask", role: "Lead Designer & Founder", bio: "10 years of UI/UX experience across agencies and startups." },
      { initials: "LT", name: "Laura Tamm", role: "Web Developer", bio: "Full-stack developer with a love for clean, performant front-ends." },
      { initials: "KS", name: "Karl Sepp", role: "Brand Strategist", bio: "Helps clients find their voice and stand out in crowded markets." },
    ],
  },
  values: {
    h2: "What We Stand For",
    items: [
      { title: "Quality", desc: "We don't cut corners. Every project gets our full attention and a standard we're proud to put our name on." },
      { title: "Transparency", desc: "Clear timelines, honest pricing, and open communication from kickoff to handover." },
      { title: "Results", desc: "Beautiful design is only half the job. We build things that perform and help your business grow." },
    ],
  },
  cta: "Work With Us",
};

export const contact = {
  hero: {
    badge: "GET IN TOUCH",
    h1: "Let's Build Something Great",
    sub: "Tell us about your project and we'll get back to you within 24 hours.",
  },
  form: {
    labelName: "Your Name",
    placeholderName: "Jane Smith",
    labelEmail: "Email Address",
    placeholderEmail: "jane@company.com",
    labelService: "Service Interested In",
    defaultService: "Select a service…",
    labelMessage: "Message",
    placeholderMessage: "Tell us about your project, timeline, and any details that would help us understand what you need.",
    submit: "Send Message",
    errorName: "Please enter your name.",
    errorEmail: "Please enter a valid email address.",
    errorService: "Please select a service.",
    errorMessage: "Please write a short message.",
    successH3: "Message sent!",
    successP: "Thanks for reaching out. We'll be in touch within 24 hours.",
  },
  book: {
    h3: "Book a Discovery Call",
    p: "Prefer to talk? Book a free 30-minute call and we'll walk through your project together.",
    btn: "Book on Calendly",
  },
  info: {
    email: "hello@sylvaradesign.com",
    location: "Tallinn, Estonia",
    response: "We reply within 24 hours",
  },
};

export const footer = {
  tagline: "Bold Design. Real Results.",
  nav: "Navigation",
  follow: "Follow Us",
  copy: "© 2025 Sylvara Web Design. All rights reserved.",
  privacy: "Privacy Policy",
};
