// data/sections/creative.js
// Your content for this section. Fill in the empty bits between the quotes/brackets.
// How each block type works, with examples: data/HOW-TO-EDIT.md
// Tip: for long writing use backticks `like this` and leave a blank line between paragraphs.
RDW.defineSection({
  id: "creative",

  blocks: [
    // Favorite art styles & techniques  [tags]
    {
      id: "art-styles",
      type: "tags",
      title: "Favorite art styles & techniques",
      group: "Art",
      items: []
    },

    // My original characters  [cards] — Name, description, reference image.
    {
      id: "original-characters",
      type: "cards",
      title: "My original characters",
      group: "Art",
      items: []
    },

    // Oldest surviving artwork  [gallery] — The ancient relic. Be brave.
    {
      id: "oldest-artwork",
      type: "gallery",
      title: "Oldest surviving artwork",
      group: "Art",
      items: []
    },

    // Art history  [timeline] — Your art timeline.
    {
      id: "art-history",
      type: "timeline",
      title: "Art history",
      group: "Art",
      items: [],
      order: "oldest"
    },

    // Influences  [list]
    {
      id: "art-influences",
      type: "list",
      title: "Influences",
      group: "Art",
      items: [],
      ordered: false
    },

    // Experiments  [cards]
    { id: "art-experiments", type: "cards", title: "Experiments", group: "Art", items: [] },

    // Progress over time  [gallery] — Before / after pairs, in order.
    { id: "art-progress", type: "gallery", title: "Progress over time", group: "Art", items: [] },

    // Artwork gallery  [gallery] — Screenshots, dates, descriptions.
    { id: "artwork-gallery", type: "gallery", title: "Artwork gallery", group: "Art", items: [] },

    // My music taste  [paragraph]
    {
      id: "music-taste",
      type: "paragraph",
      title: "My music taste",
      group: "Music",
      text: [],
      more: []
    },

    // Genres & subgenres  [tags]
    { id: "music-subgenres", type: "tags", title: "Genres & subgenres", group: "Music", items: [] },

    // Favorite producers & composers  [list]
    {
      id: "fav-producers",
      type: "list",
      title: "Favorite producers & composers",
      group: "Music",
      items: [],
      ordered: false
    },

    // How my taste has evolved  [timeline]
    {
      id: "taste-evolution",
      type: "timeline",
      title: "How my taste has evolved",
      group: "Music",
      items: [],
      order: "oldest"
    },

    // Favorite sounds & melodies  [list]
    {
      id: "fav-sounds",
      type: "list",
      title: "Favorite sounds & melodies",
      group: "Music",
      items: [],
      ordered: false
    },

    // Music I have produced  [audio] — Put the files in music/ and list the names.
    { id: "music-produced", type: "audio", title: "Music I have produced", group: "Music", items: [] },

    // Producer tags & musical signatures  [audio] — Short audio previews.
    {
      id: "producer-tags",
      type: "audio",
      title: "Producer tags & musical signatures",
      group: "Music",
      items: []
    },

    // My history with computers & the internet  [timeline]
    {
      id: "computer-history",
      type: "timeline",
      title: "My history with computers & the internet",
      group: "Tech",
      items: [],
      order: "oldest"
    },

    // Coding experience & languages  [cards]
    {
      id: "coding-languages",
      type: "cards",
      title: "Coding experience & languages",
      group: "Tech",
      items: []
    },

    // Favorite software & creative tools  [list]
    {
      id: "fav-software",
      type: "list",
      title: "Favorite software & creative tools",
      group: "Tech",
      items: [],
      ordered: false
    },

    // Websites, games & projects I built  [cards]
    {
      id: "built-projects",
      type: "cards",
      title: "Websites, games & projects I built",
      group: "Tech",
      items: []
    },

    // Current learning goals  [list]
    {
      id: "learning-goals",
      type: "list",
      title: "Current learning goals",
      group: "Tech",
      items: [],
      ordered: false
    },

    // Dream PC specifications  [fields] — Dream big. Dream expensive.
    {
      id: "dream-pc",
      type: "fields",
      title: "Dream PC specifications",
      group: "Tech",
      items: [
        { label: "CPU", value: "" },
        { label: "GPU", value: "" },
        { label: "RAM", value: "" },
        { label: "Storage", value: "" },
        { label: "Motherboard", value: "" },
        { label: "Case", value: "" },
        { label: "Monitor", value: "" },
        { label: "Peripherals", value: "" }
      ]
    },

    // Upgrade wishlist  [list]
    {
      id: "upgrade-wishlist",
      type: "list",
      title: "Upgrade wishlist",
      group: "Tech",
      items: [],
      ordered: false
    },

    // My gaming origin  [paragraph] — The first game. The first controller.
    {
      id: "gaming-origin",
      type: "paragraph",
      title: "My gaming origin",
      group: "Gaming",
      text: [],
      more: []
    },

    // Gaming history  [timeline]
    {
      id: "gaming-history",
      type: "timeline",
      title: "Gaming history",
      group: "Gaming",
      items: [],
      order: "oldest"
    },

    // Favorite platforms  [list]
    {
      id: "fav-platforms",
      type: "list",
      title: "Favorite platforms",
      group: "Gaming",
      items: [],
      ordered: false
    },

    // Games that influenced me personally  [cards]
    {
      id: "games-influenced",
      type: "cards",
      title: "Games that influenced me personally",
      group: "Gaming",
      items: []
    },

    // Roblox history & identity  [paragraph]
    {
      id: "roblox",
      type: "paragraph",
      title: "Roblox history & identity",
      group: "Gaming",
      text: [],
      more: []
    },

    // Minecraft worlds & memorable builds  [cards] — Screenshots welcome.
    {
      id: "minecraft",
      type: "cards",
      title: "Minecraft worlds & memorable builds",
      group: "Gaming",
      items: []
    },

    // Favorite gaming experiences  [list]
    {
      id: "fav-gaming-experiences",
      type: "list",
      title: "Favorite gaming experiences",
      group: "Gaming",
      items: [],
      ordered: false
    },

    // Games completed  [list]
    {
      id: "games-completed",
      type: "list",
      title: "Games completed",
      group: "Gaming",
      items: [],
      ordered: false
    },

    // Games to complete  [list] — The backlog of shame.
    {
      id: "games-to-complete",
      type: "list",
      title: "Games to complete",
      group: "Gaming",
      items: [],
      ordered: false
    },

    // Games to play  [list]
    {
      id: "games-to-play",
      type: "list",
      title: "Games to play",
      group: "Gaming",
      items: [],
      ordered: false
    },

    // Complete favorite games collection  [cards]
    {
      id: "games-collection",
      type: "cards",
      title: "Complete favorite games collection",
      group: "Gaming",
      items: []
    }
  ]
});
