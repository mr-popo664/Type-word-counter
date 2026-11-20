/**
 * Mohit Tools — Centralized Tool Registry (Single Source of Truth)
 * Powers homepage directory, live search, category filtering, footer quick links,
 * and automatic "Related Tools" cross-linking across all pages.
 */

(function (globalScope) {
  'use strict';

  const TOOLS_REGISTRY = [
    {
      id: 'word-counter',
      title: 'Advanced Word & Character Counter',
      shortTitle: 'Word Counter',
      category: 'Writing & SEO',
      description:
        'Measure word count, characters with and without spaces, sentences, paragraphs, estimated reading and speaking times, keyword density, and social media character limits in real time.',
      url: '/tools/word-counter/',
      keywords: [
        'word counter',
        'character counter',
        'reading time',
        'seo text analyzer',
        'keyword density',
        'tweet limit',
        'writing tool',
      ],
      badge: 'Real-Time',
      featured: true,
      iconSvg:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/><line x1="8" y1="9" x2="10" y2="9"/></svg>',
    },
    {
      id: 'subnet-calculator',
      title: 'Visual IPv4 / CIDR Subnet Calculator',
      shortTitle: 'IPv4 Subnet Calc',
      category: 'Networking',
      description:
        'Calculate IPv4 subnet masks, network and broadcast addresses, wildcard masks, and usable host ranges with live interactive 32-bit binary octet visualization.',
      url: '/tools/subnet-calculator/',
      keywords: [
        'ipv4',
        'cidr',
        'subnet calculator',
        'subnet mask',
        'binary ip',
        'network engineering',
        'wildcard mask',
        'vlsm',
      ],
      badge: 'Binary Visualizer',
      featured: true,
      iconSvg:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" aria-hidden="true"><rect x="2" y="3" width="6" height="5" rx="1"/><rect x="16" y="3" width="6" height="5" rx="1"/><rect x="9" y="16" width="6" height="5" rx="1"/><path d="M5 8v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><line x1="12" y1="12" x2="12" y2="16"/></svg>',
    },
    {
      id: 'safe-zone-checker',
      title: 'TikTok, Reels & Shorts Safe-Zone Overlay Checker',
      shortTitle: 'Safe-Zone Checker',
      category: 'Creators',
      description:
        'Preview vertical 9:16 images and videos under accurate TikTok, Instagram Reels, and YouTube Shorts UI overlays to ensure captions, logos, and subjects avoid dead zones.',
      url: '/tools/safe-zone-checker/',
      keywords: [
        'tiktok safe zone',
        'instagram reels overlay',
        'youtube shorts ui',
        '9:16 preview',
        'creator tool',
        'video framing',
      ],
      badge: '9:16 Overlay',
      featured: false,
      iconSvg:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 6h4"/><path d="M9 10h6v5H9z" stroke-dasharray="2 1.5"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    },
    {
      id: 'carousel-splitter',
      title: 'Instagram Carousel Slide Splitter & Grid Previewer',
      shortTitle: 'Carousel Splitter',
      category: 'Creators',
      description:
        'Slice wide panoramic images into seamless multi-slide Instagram carousel panels (4:5 portrait, 1:1 square, or 16:9) and preview your 3x3 profile grid before posting.',
      url: '/tools/carousel-splitter/',
      keywords: [
        'instagram carousel splitter',
        'panorama slicer',
        'seamless swipe',
        '3x3 grid preview',
        'social media design',
      ],
      badge: 'Client-Side Canvas',
      featured: false,
      iconSvg:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',
    },
    {
      id: 'resistor-decoder',
      title: 'Resistor Color Code Decoder',
      shortTitle: 'Resistor Decoder',
      category: 'Electronics',
      description:
        'Decode 4-band, 5-band, and 6-band axial resistors with a live interactive SVG resistor body, exact resistance values in Ohms/kOhms/MOhms, tolerance range, and temperature coefficient (PPM).',
      url: '/tools/resistor-decoder/',
      keywords: [
        'resistor color code',
        '4 band resistor',
        '5 band resistor',
        '6 band resistor',
        'electronics calculator',
        'ohm decoder',
        'ppm',
      ],
      badge: '4 / 5 / 6-Band',
      featured: false,
      iconSvg:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" aria-hidden="true"><line x1="2" y1="12" x2="6" y2="12"/><rect x="6" y="7" width="12" height="10" rx="2"/><line x1="9" y1="7" x2="9" y2="17"/><line x1="12" y1="7" x2="12" y2="17"/><line x1="15" y1="7" x2="15" y2="17"/><line x1="18" y1="12" x2="22" y2="12"/></svg>',
    },
    {
      id: 'ps5-storage-calculator',
      title: 'PS5 "Can I Fit GTA 6?" Storage Calculator & Visualizer',
      shortTitle: 'PS5 Storage Calc',
      category: 'Gaming',
      description:
        'Calculate true usable PS5 SSD capacity across Standard, Slim, and Pro models, stack your installed games, and see exactly how much headroom remains for Grand Theft Auto VI.',
      url: '/tools/ps5-storage-calculator/',
      keywords: [
        'ps5 storage calculator',
        'gta 6 file size',
        'ps5 ssd usable space',
        'ps5 slim storage',
        'ps5 pro 2tb',
        'game storage planner',
      ],
      badge: 'SSD Visualizer',
      featured: false,
      iconSvg:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="15" x2="11" y2="15"/><circle cx="16.5" cy="15" r="1"/></svg>',
    },
    {
      id: 'leonida-tracker',
      title: 'GTA 6 Cheat Codes & 100% Leonida Progress Tracker',
      shortTitle: 'Leonida Tracker',
      category: 'Gaming',
      description:
        'Browse a filterable directory of GTA 6 cheat codes across PlayStation and Xbox alongside an interactive, locally saved 100% Leonida completion checklist.',
      url: '/tools/leonida-tracker/',
      keywords: [
        'gta 6 cheat codes',
        'leonida 100 percent tracker',
        'gta vi checklist',
        'vice city collectibles',
        'ps5 xbox cheats',
      ],
      badge: 'Saved Locally',
      featured: false,
      iconSvg:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" aria-hidden="true"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    },
  ];

  const TOOL_CATEGORIES = [
    'All',
    'Networking',
    'Writing & SEO',
    'Creators',
    'Electronics',
    'Gaming',
  ];

  function filterTools(category, query) {
    const normalizedCategory = (category || 'All').trim();
    const normalizedQuery = (query || '').trim().toLowerCase();

    return TOOLS_REGISTRY.filter(function (tool) {
      const matchesCategory =
        normalizedCategory === 'All' || tool.category === normalizedCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        tool.title,
        tool.shortTitle,
        tool.category,
        tool.description,
        tool.badge,
      ]
        .concat(tool.keywords || [])
        .join(' ')
        .toLowerCase();

      return haystack.indexOf(normalizedQuery) !== -1;
    });
  }

  function getRelatedTools(currentToolId, count) {
    const limit = typeof count === 'number' && count > 0 ? count : 3;
    const current = TOOLS_REGISTRY.find(function (t) {
      return t.id === currentToolId;
    });
    const others = TOOLS_REGISTRY.filter(function (t) {
      return t.id !== currentToolId;
    });

    if (!current) {
      return others.slice(0, limit);
    }

    // Prioritize tools in the same category, then remaining tools in deterministic order
    const sameCategory = others.filter(function (t) {
      return t.category === current.category;
    });
    const differentCategory = others.filter(function (t) {
      return t.category !== current.category;
    });

    return sameCategory.concat(differentCategory).slice(0, limit);
  }

  const exported = {
    TOOLS_REGISTRY: TOOLS_REGISTRY,
    TOOL_CATEGORIES: TOOL_CATEGORIES,
    filterTools: filterTools,
    getRelatedTools: getRelatedTools,
  };

  if (typeof window !== 'undefined') {
    window.TOOLS_REGISTRY = TOOLS_REGISTRY;
    window.TOOL_CATEGORIES = TOOL_CATEGORIES;
    window.MohitToolsData = exported;
  }

  if (typeof globalScope !== 'undefined' && typeof window === 'undefined') {
    globalScope.TOOLS_REGISTRY = TOOLS_REGISTRY;
    globalScope.MohitToolsData = exported;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exported;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
