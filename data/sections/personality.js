// data/sections/personality.js
// Your content for this section. Fill in the empty bits between the quotes/brackets.
// How each block type works, with examples: data/HOW-TO-EDIT.md
// Tip: for long writing use backticks `like this` and leave a blank line between paragraphs.
RDW.defineSection({
  id: "personality",

  blocks: [
    // Personality frameworks  [fields] — Results from the tests you have taken.
    {
      id: "frameworks",
      type: "fields",
      title: "Personality frameworks",
      group: "Profile",
      items: [
        { label: "MBTI", value: "" },
        { label: "Enneagram", value: "" },
        { label: "Big Five", value: "" },
        { label: "Zodiac", value: "" },
        { label: "Other tests", value: "" }
      ]
    },

    // Identified personality traits  [tags] — One-word traits.
    { id: "traits", type: "tags", title: "Identified personality traits", group: "Profile", items: [] },

    // Strengths  [list]
    { id: "strengths", type: "list", title: "Strengths", group: "Profile", items: [], ordered: false },

    // Weaknesses  [list] — Be honest. Nobody is checking. (Everybody is checking.)
    {
      id: "weaknesses",
      type: "list",
      title: "Weaknesses",
      group: "Profile",
      items: [],
      ordered: false
    },

    // Around strangers vs. close friends  [paragraph] — Two different people, or the same one in a different hat?
    {
      id: "strangers-vs-friends",
      type: "paragraph",
      title: "Around strangers vs. close friends",
      group: "Social side",
      text: [],
      more: []
    },

    // Communication style & humour  [paragraph]
    {
      id: "communication-humor",
      type: "paragraph",
      title: "Communication style & humour",
      group: "Social side",
      text: [],
      more: []
    },

    // Emotional tendencies  [paragraph]
    {
      id: "emotional-tendencies",
      type: "paragraph",
      title: "Emotional tendencies",
      group: "Inner world",
      text: [],
      more: []
    },

    // Motivations  [list] — What gets you out of bed.
    {
      id: "motivations",
      type: "list",
      title: "Motivations",
      group: "Inner world",
      items: [],
      ordered: false
    },

    // Discouragements  [list] — What puts you back in it.
    {
      id: "discouragements",
      type: "list",
      title: "Discouragements",
      group: "Inner world",
      items: [],
      ordered: false
    },

    // Decision-making  [paragraph]
    {
      id: "decision-making",
      type: "paragraph",
      title: "Decision-making",
      group: "Mind",
      text: [],
      more: []
    },

    // Things I overthink  [list] — The 3am list.
    {
      id: "overthinking",
      type: "list",
      title: "Things I overthink",
      group: "Mind",
      items: [],
      ordered: false
    },

    // Contradictions & paradoxes  [list] — Things about you that argue with each other.
    {
      id: "contradictions",
      type: "list",
      title: "Contradictions & paradoxes",
      group: "Mind",
      items: [],
      ordered: false
    },

    // Self-perception vs. how others may see me  [fields]
    {
      id: "self-vs-others",
      type: "fields",
      title: "Self-perception vs. how others may see me",
      group: "Self-image",
      items: [
        { label: "How I see myself", value: "" },
        { label: "How others might see me", value: "" },
        { label: "The gap", value: "" }
      ]
    },

    // Ideal self vs. current self  [fields]
    {
      id: "ideal-vs-current",
      type: "fields",
      title: "Ideal self vs. current self",
      group: "Self-image",
      items: [
        { label: "Ideal me", value: "" },
        { label: "Current me", value: "" },
        { label: "What is in between", value: "" }
      ]
    },

    // Traits that changed over time  [timeline] — Who you were, who you are.
    {
      id: "traits-changed",
      type: "timeline",
      title: "Traits that changed over time",
      group: "Self-image",
      items: [],
      order: "oldest"
    },

    // How well do you know me?  [quiz] — Add questions, pick the right answer number, set result tiers (keep one at 0%).
    {
      id: "know-me-quiz",
      type: "quiz",
      title: "How well do you know me?",
      group: "Quiz",
      intro: "",
      questions: [],
      results: [
        { min: 0, title: "", text: [] }
      ]
    }
  ]
});
