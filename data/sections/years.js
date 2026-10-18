// data/sections/years.js
// Your content for this section. Fill in the empty bits between the quotes/brackets.
// How each block type works, with examples: data/HOW-TO-EDIT.md
// Tip: for long writing use backticks `like this` and leave a blank line between paragraphs.
RDW.defineSection({
  id: "years",

  pages: [
    {
      id: "2026", year: 2026, title: "2026",
      blocks: [
        // This Year in My Life — preview  [fields] — Shown on the dashboard when this is the current year.
        {
          id: "year-preview",
          type: "fields",
          title: "This Year in My Life — preview",
          group: "Overview",
          items: [
            { label: "Headline", value: "" },
            { label: "Theme word", value: "" },
            { label: "Mood", value: "" },
            { label: "Favourite memory", value: "" }
          ]
        },

        // Annual summary  [paragraph] — Several paragraphs about the year.
        {
          id: "year-summary",
          type: "paragraph",
          title: "Annual summary",
          group: "Overview",
          text: [],
          more: []
        },

        // Major milestones  [timeline]
        {
          id: "year-milestones",
          type: "timeline",
          title: "Major milestones",
          group: "Overview",
          items: [],
          order: "oldest"
        },

        // New hobbies & skills  [list]
        {
          id: "year-hobbies",
          type: "list",
          title: "New hobbies & skills",
          group: "Growth",
          items: [],
          ordered: false
        },

        // Projects started  [list]
        {
          id: "year-started",
          type: "list",
          title: "Projects started",
          group: "Growth",
          items: [],
          ordered: false
        },

        // Projects completed  [list]
        {
          id: "year-completed",
          type: "list",
          title: "Projects completed",
          group: "Growth",
          items: [],
          ordered: false
        },

        // Favourite media  [list] — Games, shows, songs, books…
        {
          id: "year-media",
          type: "list",
          title: "Favourite media",
          group: "Taste",
          items: [],
          ordered: false
        },

        // Memorable moments  [cards]
        { id: "year-moments", type: "cards", title: "Memorable moments", group: "Memories", items: [] },

        // Photos, screenshots & other media  [gallery]
        {
          id: "year-photos",
          type: "gallery",
          title: "Photos, screenshots & other media",
          group: "Memories",
          items: []
        }
      ]
    }
  ],

  blocks: []
});
