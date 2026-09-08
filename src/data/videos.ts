export interface Reel {
  id: string;
  url: string;
  vimeoId: string;
  title: string;
  category: string;
  description: string;
  views?: string;
  likes?: string;
  tags?: string[];
}

export interface VideoShowcase {
  id: string;
  url: string;
  vimeoId: string;
  title: string;
  category: string;
  description: string;
  views?: string;
  likes?: string;
  tags: string[];
  duration?: string;
  aspectRatio?: string;
}

/** Vertical Reels — rendered at 9:16 aspect ratio. */
export const reels: Reel[] = [
  {
    id: "reel-01",
    url: "https://vimeo.com/1068495229",
    vimeoId: "1068495229",
    title: "Cinematic Color Grade Showcase",
    category: "Color Grade",
    description: "Advanced cinematic color grading, tone curve transformation, dynamic contrast balancing, and mood grading tailored for high-end commercial visual impact.",
    views: "2.8M",
    likes: "145K",
    tags: ["Color Grading", "DaVinci Resolve", "Mood Lighting", "Cinematic"]
  },
  {
    id: "reel-02",
    url: "https://vimeo.com/1066199796",
    vimeoId: "1066199796",
    title: "Nischa Breakdown (Ali Abdaal Style)",
    category: "Ali Abdaal Style Editing",
    description: "High-retention talking head breakdown using fast-paced kinetic typography, paper-tear textures, engaging sound design, and animated screen captures.",
    views: "3.4M",
    likes: "218K",
    tags: ["Ali Abdaal Style", "Kinetic Typography", "Retention Editing", "Motion Graphics"]
  },
  {
    id: "reel-03",
    url: "https://vimeo.com/1066154660",
    vimeoId: "1066154660",
    title: "High-Impact Athlete Reel",
    category: "Athlete Reel",
    description: "High-octane athletic performance film with beat-synced speed ramping, seamless whip transitions, dynamic camera shake, and explosive sound design.",
    views: "4.2M",
    likes: "295K",
    tags: ["Sports Reel", "Speed Ramping", "Sound FX", "Action Editing"]
  },
  {
    id: "reel-04",
    url: "https://vimeo.com/1066093854",
    vimeoId: "1066093854",
    title: "Pink Load Commercial Trailer",
    category: "Commercial Trailer",
    description: "Commercial cinematic promotional trailer combining bold visual contrast, dramatic pacing, cinematic typography, and narrative brand storytelling.",
    views: "1.9M",
    likes: "112K",
    tags: ["Commercial", "Brand Trailer", "Cinematography", "Narrative"]
  },
  {
    id: "reel-05",
    url: "https://vimeo.com/1066092808",
    vimeoId: "1066092808",
    title: "Ali Abdaal Style Productivity Reel",
    category: "Ali Abdaal Style",
    description: "Educational and productivity short-form edit packed with animated UI mockups, floating highlight markers, crisp sound cues, and engaging storytelling.",
    views: "3.1M",
    likes: "196K",
    tags: ["Productivity", "UI Animation", "Micro-Interactions", "Sound Cues"]
  },
  {
    id: "reel-06",
    url: "https://vimeo.com/1066091840",
    vimeoId: "1066091840",
    title: "Guillaume Luxury Brand Story",
    category: "Brand Storytelling",
    description: "Luxury personal brand storytelling reel blending cinematic B-roll, editorial typography, atmospheric soundscapes, and elegant pacing.",
    views: "2.4M",
    likes: "168K",
    tags: ["Luxury Brand", "Storytelling", "Editorial", "Cinematic B-Roll"]
  },
  {
    id: "reel-07",
    url: "https://vimeo.com/1066082075",
    vimeoId: "1066082075",
    title: "Sports & Fitness Commercial Reel",
    category: "Sports Commercial Reel",
    description: "Power-packed sports commercial featuring intense gym footage, rhythmic beat synchronization, heavy bass impacts, and neon-graded lighting.",
    views: "2.7M",
    likes: "182K",
    tags: ["Fitness Commercial", "Beat Sync", "Neon Color Grade", "Impact Audio"]
  },
  {
    id: "reel-08",
    url: "https://vimeo.com/1066081023",
    vimeoId: "1066081023",
    title: "Warehouse Creative Commercial",
    category: "Warehouse Creative Reel",
    description: "Raw industrial visual showcase highlighting warehouse operations with gritty color palettes, dynamic zoom effects, and modern urban rhythm.",
    views: "1.8M",
    likes: "128K",
    tags: ["Industrial", "Creative Reel", "Urban Rhythm", "Dynamic Zooms"]
  }
];

/** Horizontal videos — rendered at 16:9 widescreen format. */
export const videos: VideoShowcase[] = [
  {
    id: "video-01",
    url: "https://vimeo.com/1066093431",
    vimeoId: "1066093431",
    title: "ChatGPT Cash Cow Faceless Video Production",
    category: "Cash Cow & YouTube Automation",
    description: "High-retention faceless documentary edit engineered for algorithmic reach, integrating custom 2D motion graphics, automated visual sequences, curated stock footage, and immersive voiceover pacing.",
    views: "1.4M",
    likes: "94K",
    tags: ["YouTube Automation", "Faceless Video", "Motion Graphics", "Retention Editing"],
    duration: "16:9 Widescreen",
    aspectRatio: "16/9"
  },
  {
    id: "video-02",
    url: "https://vimeo.com/1066091977",
    vimeoId: "1066091977",
    title: "Alex Hormozi Style High-Retention Talking Head",
    category: "Talking Head Masterclass",
    description: "Engaging talking-head editing built with dynamic animated subtitles, floating emoji highlights, sound-synced punch zooms, and rapid visual pattern interrupts designed to maximize audience watch time.",
    views: "2.2M",
    likes: "172K",
    tags: ["Alex Hormozi Style", "Subtitles Animation", "Pattern Interrupts", "Sound FX"],
    duration: "16:9 Widescreen",
    aspectRatio: "16/9"
  },
  {
    id: "video-03",
    url: "https://vimeo.com/1066091632",
    vimeoId: "1066091632",
    title: "Iman Gadzhi Style 3D Motion Graphics & Documentary VFX",
    category: "Motion Graphics & 3D VFX",
    description: "Agency-grade documentary motion design featuring 3D camera mapping, animated vintage newspaper archives, bespoke glassmorphism UI elements, and cinematic orchestral soundscapes.",
    views: "1.9M",
    likes: "138K",
    tags: ["Iman Gadzhi Style", "3D Camera VFX", "Documentary Motion", "After Effects"],
    duration: "16:9 Widescreen",
    aspectRatio: "16/9"
  },
  {
    id: "video-04",
    url: "https://vimeo.com/1066091555",
    vimeoId: "1066091555",
    title: "Aakarsh Executive Bio & Talking Head Video",
    category: "Corporate & Executive Presentation",
    description: "Corporate talking-head production featuring studio-grade color balancing, audio mastering, custom branded lower-thirds, smooth multi-camera angle switches, and professional narrative framing.",
    views: "980K",
    likes: "72K",
    tags: ["Executive Bio", "Studio Grade", "Color Balancing", "Audio Mastering"],
    duration: "16:9 Widescreen",
    aspectRatio: "16/9"
  },
  {
    id: "video-05",
    url: "https://vimeo.com/1066091094",
    vimeoId: "1066091094",
    title: "Týnka & Láďa Cinematic Wedding Film",
    category: "Wedding Cinematography",
    description: "Emotional wedding cinematography with filmic color grading, acoustic sound design, golden-hour light shaping, and multi-angle narrative synchronization capturing intimate romantic milestones.",
    views: "640K",
    likes: "56K",
    tags: ["Wedding Film", "Filmic Color", "Emotional Storytelling", "4K Drone"],
    duration: "16:9 Widescreen",
    aspectRatio: "16/9"
  },
  {
    id: "video-06",
    url: "https://vimeo.com/1066090855",
    vimeoId: "1066090855",
    title: "Petra & Lukáš Wedding Ceremony Highlights",
    category: "Wedding Cinematography",
    description: "Emotional ceremony highlight reel featuring vow audio synchronization, ambient soundscapes, soft light grading, and high-framerate slow-motion captures of sacred wedding moments.",
    views: "810K",
    likes: "65K",
    tags: ["Ceremony Highlights", "Vow Audio Sync", "Slow Motion", "Warm Palette"],
    duration: "16:9 Widescreen",
    aspectRatio: "16/9"
  },
  {
    id: "video-07",
    url: "https://vimeo.com/1066090625",
    vimeoId: "1066090625",
    title: "Petra & Lukáš Wedding Reception & Celebration",
    category: "Wedding Cinematography",
    description: "High-energy wedding reception film featuring dynamic party speed ramps, low-light color grading, festive atmosphere sound design, and seamless beat transitions.",
    views: "560K",
    likes: "49K",
    tags: ["Reception Story", "Speed Ramps", "Low Light Grading", "Multi-Cam"],
    duration: "16:9 Widescreen",
    aspectRatio: "16/9"
  },
  {
    id: "video-08",
    url: "https://vimeo.com/1066089898",
    vimeoId: "1066089898",
    title: "Magnates Media Style Video Essay Documentary",
    category: "Documentary & Video Essay",
    description: "Intricate business and historical video essay edit inspired by Magnates Media—incorporating 2.5D parallax photo animations, newspaper headline reveals, dark ambient lighting, and gripping storytelling.",
    views: "3.1M",
    likes: "255K",
    tags: ["Magnates Media Style", "2.5D Parallax", "Historical Motion", "Sound Design"],
    duration: "16:9 Widescreen",
    aspectRatio: "16/9"
  },
  {
    id: "video-09",
    url: "https://vimeo.com/1066087047",
    vimeoId: "1066087047",
    title: "Luxury Real Estate Showcase & Commercial Film",
    category: "Real Estate Film Production",
    description: "Premium property commercial showcase featuring cinematic sky replacement, dynamic gimbal walkthroughs, seamless speed-ramp transitions, HDR color grading, and ambient spatial audio.",
    views: "1.3M",
    likes: "92K",
    tags: ["Real Estate Showcase", "Commercial Film", "Sky Replacement", "Gimbal Walkthrough"],
    duration: "16:9 Widescreen",
    aspectRatio: "16/9"
  }
];
