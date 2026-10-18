// data/sections/facts.js
// Your content for this section. Fill in the empty bits between the quotes/brackets.
// How each block type works, with examples: data/HOW-TO-EDIT.md
// Tip: for long writing use backticks `like this` and leave a blank line between paragraphs.
RDW.defineSection({
  id: "facts",

  blocks: [
    // Random facts about me  [list] — The weirder the better.
    {
      id: "random-facts",
      type: "list",
      title: "Random facts about me",
      group: "Facts",
      items: [],
      ordered: false
    },

    // Things I always do  [list]
    {
      id: "always-do",
      type: "list",
      title: "Things I always do",
      group: "Habits",
      items: [],
      ordered: false
    },

    // Things that annoy me  [list]
    {
      id: "annoyances",
      type: "list",
      title: "Things that annoy me",
      group: "Habits",
      items: [],
      ordered: false
    },

    // Odd habits  [list]
    { id: "odd-habits", type: "list", title: "Odd habits", group: "Habits", items: [], ordered: false },

    // Favorite words & expressions  [list]
    {
      id: "favorite-words",
      type: "list",
      title: "Favorite words & expressions",
      group: "Language",
      items: [],
      ordered: false
    },

    // Common misunderstandings about me  [list]
    {
      id: "misunderstandings",
      type: "list",
      title: "Common misunderstandings about me",
      group: "Language",
      items: [],
      ordered: false
    },

    // Inside jokes  [list] — Explain them or do not. Mystery is fine.
    {
      id: "inside-jokes",
      type: "list",
      title: "Inside jokes",
      group: "Language",
      items: [],
      ordered: false
    },

    // Things that feel uniquely like me  [list]
    {
      id: "uniquely-me",
      type: "list",
      title: "Things that feel uniquely like me",
      group: "Identity",
      items: [],
      ordered: false
    },

    // Favorite visual aesthetics  [tags]
    {
      id: "visual-aesthetics",
      type: "tags",
      title: "Favorite visual aesthetics",
      group: "Identity",
      items: []
    },

    // My personal color palette  [palette] — Your colours, your hex codes. (The site stays black & white, your palette does not have to.)
    {
      id: "personal-palette",
      type: "palette",
      title: "My personal color palette",
      group: "Identity",
      items: []
    },

    // The meaning of the Dweeb identity  [paragraph]
    {
      id: "dweeb-meaning",
      type: "paragraph",
      title: "The meaning of the Dweeb identity",
      group: "Branding",
      text: [],
      more: []
    },

    // How the Dweeb branding evolved  [timeline]
    {
      id: "dweeb-evolution",
      type: "timeline",
      title: "How the Dweeb branding evolved",
      group: "Branding",
      items: [],
      order: "oldest"
    }
  ]
});
