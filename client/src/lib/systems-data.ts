export interface System {
  id: string;
  name: string;
  description: string;
  image: string;
  features?: string[];
}

export interface SystemCategory {
  id: string;
  name: string;
  description: string;
  systems: System[];
}

export const systemCategories: SystemCategory[] = [
  {
    id: "commercial-floor-systems",
    name: "Commercial Floor Systems",
    description: "Durable and aesthetic flooring solutions for commercial spaces.",
    systems: [
      {
        id: "simflake-sb-uv",
        name: "SIMFLAKE SB/UV",
        description: "Industrial grade protection for any concrete surface in less than a day.",
        image: "/images/systems/simflake-sb-uv.png"
      },
      {
        id: "simflake-sb",
        name: "SIMFLAKE SB",
        description: "Industrial-grade protection for any concrete surface in less than a day.",
        image: "/images/systems/simflake-sb.png"
      },
      {
        id: "simflake-rb",
        name: "Simflake RB",
        description: "3-layer customizable UV stable Decorative Chip system that is easy to clean.",
        image: "/images/systems/simflake-rb.png"
      },
      {
        id: "simflake-sb-polyurea",
        name: "SIMFLAKE SB 1-Day Polyurea",
        description: "Industrial-grade protection for any concrete surface in less than a day.",
        image: "/images/systems/simflake-sb-polyurea.jpg"
      }
    ]
  },
  {
    id: "concrete-polishing-systems",
    name: "Concrete Polishing Systems",
    description: "High-gloss, low-maintenance polished concrete solutions.",
    systems: [
      // Placeholder for specific polishing systems if found, otherwise generic
      {
        id: "polished-concrete-basic",
        name: "Basic Polished Concrete",
        description: "Standard polished concrete system for industrial and commercial use.",
        image: "/images/systems/polished-concrete.jpg"
      }
    ]
  },
  {
    id: "decorative-chip-systems",
    name: "Decorative Chip Systems",
    description: "Versatile and attractive chip systems for various applications.",
    systems: [
      {
        id: "simflake-sb-uv-chip",
        name: "SIMFLAKE SB/UV",
        description: "Industrial grade protection for any concrete surface in less than a day.",
        image: "/images/systems/simflake-sb-uv.png"
      },
      {
        id: "simflake-sb-chip",
        name: "SIMFLAKE SB",
        description: "Industrial-grade protection for any concrete surface in less than a day.",
        image: "/images/systems/simflake-sb.png"
      },
      {
        id: "simflake-rb-chip",
        name: "Simflake RB",
        description: "3-layer customizable UV stable Decorative Chip system that is easy to clean.",
        image: "/images/systems/simflake-rb.png"
      }
    ]
  },
  {
    id: "decorative-quartz-system",
    name: "Decorative Quartz System",
    description: "Durable and decorative quartz flooring systems.",
    systems: [
      {
        id: "simquartz-db",
        name: "Simquartz DB",
        description: "4-layer Decorative Quartz System.",
        image: "/images/systems/simquartz-db.jpg"
      }
    ]
  },
  {
    id: "high-performance-epoxy-systems",
    name: "High Performance-Epoxy Systems",
    description: "Heavy-duty epoxy systems for demanding environments.",
    systems: [
      {
        id: "simfloor-esd",
        name: "Simfloor ESD",
        description: "Electrostatic dissipative flooring for sensitive environments.",
        image: "/images/systems/simfloor-esd.jpg"
      },
      {
        id: "simfloor-hb-epoxy",
        name: "Simfloor HB-Epoxy",
        description: "A high-gloss and durable epoxy system built to withstand abusive environments.",
        image: "/images/systems/simfloor-hb-epoxy.jpg"
      },
      {
        id: "simfloor-high-wear-urethane",
        name: "Simfloor High-Wear Urethane",
        description: "A long-lasting 3-layer urethane system that offers exceptional durability for high-traffic areas.",
        image: "/images/systems/simfloor-high-wear-urethane.jpg"
      },
      {
        id: "simfloor-epoxy-siloxane",
        name: "Simfloor Epoxy Siloxane",
        description: "A chemical-resistant 3-layer system that offers maximum floor protection.",
        image: "/images/systems/simfloor-epoxy-siloxane.jpg"
      }
    ]
  },
  {
    id: "metallic-floor-systems",
    name: "Metallic Floor Systems",
    description: "Unique and vibrant metallic flooring solutions.",
    systems: [
      {
        id: "simfloor-metallic",
        name: "Simfloor Metallic",
        description: "A highly customizable system that delivers unique vibrant pearlescent and iridescent finishes.",
        image: "/images/systems/simfloor-metallic.jpg"
      }
    ]
  },
  {
    id: "best-choice-resurfacing-systems",
    name: "Best Choice Resurfacing Systems",
    description: "Systems designed to resurface and restore damaged concrete.",
    systems: [
      {
        id: "simcrete-sl-quartz",
        name: "Simcrete SL-Quartz",
        description: "3-layer quartz urethane mortar slurry system with excellent MVT resistance.",
        image: "/images/systems/simquartz-db.jpg"
      },
      {
        id: "simcrete-sl",
        name: "Simcrete SL",
        description: "3-layer cementitious urethane mortar slurry non-slip system for resurfacing eroded concrete.",
        image: "/images/systems/simcrete-sl.png"
      },
      {
        id: "simcrete-sf-flake",
        name: "Simcrete SF-Flake",
        description: "3-layer Decorative Chip urethane mortar slurry system with excellent MVT resistance.",
        image: "/images/systems/simcrete-sf-flake.png"
      },
      {
        id: "simcrete-sf",
        name: "Simcrete SF",
        description: "3-layer cementitious urethane mortar slurry non-slip system for resurfacing eroded concrete.",
        image: "/images/systems/simcrete-sl.png"
      }
    ]
  }
];
