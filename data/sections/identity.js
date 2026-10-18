// data/sections/identity.js
// Your content for this section. Fill in the empty bits between the quotes/brackets.
// How each block type works, with examples: data/HOW-TO-EDIT.md
// Tip: for long writing use backticks `like this` and leave a blank line between paragraphs.
RDW.defineSection({
  id: "identity",

  blocks: [
    // Identity card  [fields] — Fill what you like. Blank ones stay hidden from visitors.
    {
      id: "identity-card",
      type: "fields",
      title: "Identity card",
      group: "",
      items: [
        { label: "Full name", value: "" },
        { label: "Preferred name", value: "" },
        { label: "Pronouns", value: "" },
        { label: "Birthday", value: "" },
        { label: "Age", value: "" },
        { label: "Country", value: "" },
        { label: "Nationality", value: "" }
      ]
    },

    // Languages  [list] — Languages you speak, and how well.
    { id: "languages", type: "list", title: "Languages", group: "", items: [], ordered: false },

    // Previous usernames  [list] — Old handles. The embarrassing ones are the best ones.
    {
      id: "previous-usernames",
      type: "list",
      title: "Previous usernames",
      group: "",
      items: [],
      ordered: false
    },

    // Redacted usernames  [list] — Type <Secret&7> for a 7-letter censor bar. NEVER type the real name here, not even once. The bar is all the site ever knows.
    {
      id: "redacted-usernames",
      type: "list",
      title: "Redacted usernames",
      group: "",
      items: [],
      ordered: false
    },

    // Signature image  [gallery] — One image of your signature. Put it in images/identity/
    { id: "signature", type: "gallery", title: "Signature image", group: "", items: [] },

    // Biography  [paragraph] — Short bio on top, long bio in the "full version" box.
    { id: "biography", type: "paragraph", title: "Biography", group: "", text: [], more: [] },

    // Personal introduction  [paragraph] — The "hi, I am…" bit.
    {
      id: "introduction",
      type: "paragraph",
      title: "Personal introduction",
      group: "",
      text: [],
      more: []
    },

    // What this site is about  [paragraph] — Why does this website exist? (Valid answer: because.)
    {
      id: "about-this-site",
      type: "paragraph",
      title: "What this site is about",
      group: "",
      text: [],
      more: []
    },

    // Frequently asked questions about me  [faq] — Questions people keep asking.
    {
      id: "identity-faq",
      type: "faq",
      title: "Frequently asked questions about me",
      group: "",
      items: []
    }
  ]
});
