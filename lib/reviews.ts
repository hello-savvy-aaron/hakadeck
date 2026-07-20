// Text transcripts of the real Google review screenshots in
// public/images/reviews/ — kept as data so inner pages can render crawlable
// review excerpts (the marquee's images carry no indexable text). When a new
// screenshot is added there, transcribe it here too.
//
// Policy note: these appear as visible text only. Do NOT feed them into
// review/aggregateRating schema — self-serving review markup on an owned
// entity violates Google's structured-data policy.

export type ReviewQuote = {
  name: string;
  text: string;
};

export const REVIEW_QUOTES: ReviewQuote[] = [
  {
    name: "Brian R.",
    text: "Peter was great to work with. He really listened to what I needed and came up with a custom plan for our deck. I would highly recommend working with Haka!",
  },
  {
    name: "Sue Ann P.",
    text: "Excellent experience with Pete and his crew. They are professional and absolutely know what they are doing. Several neighbors hired them after our project. Highly recommend!",
  },
  {
    name: "Brad H.",
    text: "I can't say enough about the performance of Pete and his team. He delivered what he promised. Moreover, they did a superb job on the foundation of our new deck. I would recommend Haka to anyone.",
  },
  {
    name: "Josh U.",
    text: "We took several bids but Pete the owner stuck out the best — not from a pricing standpoint but just overall as a person. He gave us many options to think about.",
  },
  {
    name: "Shelly S.",
    text: "Pete did an excellent job and we are very happy with his work. Pete communicated with us throughout the whole project and made sure we were satisfied and comfortable with all the work completed.",
  },
  {
    name: "JC D.",
    text: "Pete and Haka were AMAZING to work with. Pete (the owner of the company) was extremely helpful from the quote to the cleanup and completion of the project.",
  },
  {
    name: "Louis H.",
    text: "Pete was amazing from start to finish! Clean and professional work, communication throughout was excellent! Highly recommend.",
  },
  {
    name: "Derrick K.",
    text: "Pete has a great team! Their build speed and quality are perfect. Pete replies to your message within a minute, every time.",
  },
  {
    name: "Google reviewer",
    text: "Pete and his crew did a great job and met a tight timeline for us ahead of a graduation party. Everything turned out perfectly with no surprises. Highly recommend Haka!",
  },
];

// Deterministic per-page rotation: a stable pair of quotes chosen from the
// slug so every service/location page shows different (but consistent) proof.
export function quotesFor(seed: string, count = 2): ReviewQuote[] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const start = h % REVIEW_QUOTES.length;
  return Array.from({ length: count }, (_, i) => REVIEW_QUOTES[(start + i) % REVIEW_QUOTES.length]);
}
