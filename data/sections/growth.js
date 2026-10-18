// data/sections/growth.js
// Your content for this section. Fill in the empty bits between the quotes/brackets.
// How each block type works, with examples: data/HOW-TO-EDIT.md
// Tip: for long writing use backticks `like this` and leave a blank line between paragraphs.
RDW.defineSection({
  id: "growth",

  blocks: [
    // Personal goals  [list]
    { id: "goals", type: "list", title: "Personal goals", group: "Growth", items: [], ordered: false },

    // Skills to develop  [list]
    {
      id: "skills-to-develop",
      type: "list",
      title: "Skills to develop",
      group: "Growth",
      items: [],
      ordered: false
    },

    // Productivity & discipline  [paragraph] — Honest answers only. Procrastination counts as a hobby.
    {
      id: "productivity",
      type: "paragraph",
      title: "Productivity & discipline",
      group: "Growth",
      text: [],
      more: []
    },

    // Lessons from difficult experiences  [cards]
    {
      id: "lessons",
      type: "cards",
      title: "Lessons from difficult experiences",
      group: "Growth",
      items: []
    },

    // Questions about myself  [list]
    {
      id: "self-questions",
      type: "list",
      title: "Questions about myself",
      group: "Experiments",
      items: [],
      ordered: false
    },

    // Personal experiments  [cards] — Hypothesis, what happened, what you learned.
    {
      id: "experiments",
      type: "cards",
      title: "Personal experiments",
      group: "Experiments",
      items: []
    },

    // Monthly self-reflections  [journal] — Use "Edit" → "Add entry". It pre-fills this month.
    {
      id: "monthly-reflections",
      type: "journal",
      title: "Monthly self-reflections",
      group: "Journal",
      items: []
    },

    // What makes me…  [fields]
    {
      id: "what-makes-me",
      type: "fields",
      title: "What makes me…",
      group: "Feelings",
      items: [
        { label: "Happy", value: "" },
        { label: "Inspired", value: "" },
        { label: "Frustrated", value: "" },
        { label: "Understood", value: "" },
        { label: "Comforted", value: "" },
        { label: "Connected", value: "" }
      ]
    },

    // How I recharge & regain perspective  [list]
    {
      id: "recharge",
      type: "list",
      title: "How I recharge & regain perspective",
      group: "Feelings",
      items: [],
      ordered: false
    },

    // How I react to criticism  [paragraph]
    {
      id: "criticism",
      type: "paragraph",
      title: "How I react to criticism",
      group: "Feelings",
      text: [],
      more: []
    },

    // Creative motivation  [paragraph]
    {
      id: "creative-motivation",
      type: "paragraph",
      title: "Creative motivation",
      group: "Feelings",
      text: [],
      more: []
    },

    // Personal boundaries  [list]
    {
      id: "personal-boundaries",
      type: "list",
      title: "Personal boundaries",
      group: "Boundaries",
      items: [],
      ordered: false
    },

    // Things I wish people understood about me  [list]
    {
      id: "wish-understood",
      type: "list",
      title: "Things I wish people understood about me",
      group: "Boundaries",
      items: [],
      ordered: false
    }
  ]
});
