// data/sections/worldview.js
// Your content for this section. Fill in the empty bits between the quotes/brackets.
// How each block type works, with examples: data/HOW-TO-EDIT.md
// Tip: for long writing use backticks `like this` and leave a blank line between paragraphs.
RDW.defineSection({
  id: "worldview",

  blocks: [
    // Core values  [list]
    {
      id: "core-values",
      type: "list",
      title: "Core values",
      group: "Foundations",
      items: [],
      ordered: false
    },

    // Religion, faith & moral principles  [paragraph] — Only what you are comfortable sharing.
    {
      id: "faith",
      type: "paragraph",
      title: "Religion, faith & moral principles",
      group: "Foundations",
      text: [],
      more: []
    },

    // My definitions  [fields]
    {
      id: "definitions",
      type: "fields",
      title: "My definitions",
      group: "Foundations",
      items: [
        { label: "Happiness", value: "" },
        { label: "Love", value: "" },
        { label: "A good life", value: "" },
        { label: "A good person", value: "" }
      ]
    },

    // Views on people & society  [fields]
    {
      id: "views-people",
      type: "fields",
      title: "Views on people & society",
      group: "Views",
      items: [
        { label: "Friendship", value: "" },
        { label: "Relationships", value: "" },
        { label: "Creativity", value: "" },
        { label: "Individuality", value: "" },
        { label: "Society", value: "" }
      ]
    },

    // Views on technology  [fields]
    {
      id: "views-tech",
      type: "fields",
      title: "Views on technology",
      group: "Views",
      items: [
        { label: "Technology", value: "" },
        { label: "AI", value: "" },
        { label: "The internet", value: "" }
      ]
    },

    // Commonly misunderstood beliefs  [list]
    {
      id: "misunderstood",
      type: "list",
      title: "Commonly misunderstood beliefs",
      group: "Opinions",
      items: [],
      ordered: false
    },

    // Strong agreements  [list]
    {
      id: "strong-agreements",
      type: "list",
      title: "Strong agreements",
      group: "Opinions",
      items: [],
      ordered: false
    },

    // Strong disagreements  [list]
    {
      id: "strong-disagreements",
      type: "list",
      title: "Strong disagreements",
      group: "Opinions",
      items: [],
      ordered: false
    },

    // Uncertain beliefs  [list] — Things you are 51% sure about.
    {
      id: "uncertain",
      type: "list",
      title: "Uncertain beliefs",
      group: "Opinions",
      items: [],
      ordered: false
    },

    // Opinions that have changed  [timeline] — Then vs. now.
    {
      id: "changed-opinions",
      type: "timeline",
      title: "Opinions that have changed",
      group: "Opinions",
      items: [],
      order: "oldest"
    },

    // Personal philosophy & manifesto  [paragraph] — Go wild. Capital letters allowed.
    {
      id: "manifesto",
      type: "paragraph",
      title: "Personal philosophy & manifesto",
      group: "Philosophy",
      text: [],
      more: []
    },

    // Principles I want to live by  [list]
    {
      id: "principles",
      type: "list",
      title: "Principles I want to live by",
      group: "Philosophy",
      items: [],
      ordered: false
    },

    // Non-negotiable boundaries  [list]
    {
      id: "boundaries",
      type: "list",
      title: "Non-negotiable boundaries",
      group: "Philosophy",
      items: [],
      ordered: false
    },

    // Unanswered questions  [list] — The big ones, and the dumb ones.
    {
      id: "unanswered",
      type: "list",
      title: "Unanswered questions",
      group: "Philosophy",
      items: [],
      ordered: false
    }
  ]
});
