export const SHADOW_COUNT = 4;

export const DEFAULT_VOICE_BROWSER = "Microsoft Mark - English (United States)";
export const DEFAULT_VOICE_ELEVEN = "Lily";

// Canonical Gospels
export const canonicalGospels: string[] = ["Matthew", "Mark", "Luke", "John"];

// Acts of the Apostles
export const actsOfApostles: string[] = ["Acts"];

// Epistles of Paul
export const epistlesOfPaul: string[] = [
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
];

// General Epistles
export const generalEpistles: string[] = [
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
];

// Book of Revelation
export const bookOfRevelation: string[] = ["Revelation"];

// The Pentateuch
export const pentateuch: string[] = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
];

// The Historical Books
export const historicalBooks: string[] = [
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
];

// The Wisdom Books
export const wisdomBooks: string[] = [
  "Job",
  "Psalm",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
];

// The Prophetic Books
export const propheticBooks: string[] = [
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
];

// Compile All Names
export const bibleNames: string[] = [
  ...canonicalGospels,
  ...actsOfApostles,
  ...epistlesOfPaul,
  ...generalEpistles,
  ...bookOfRevelation,
  ...pentateuch,
  ...historicalBooks,
  ...wisdomBooks,
  ...propheticBooks,
];

export const bibleDivisions: { [key: string]: string[] } = {
  "Canonical Gospels": canonicalGospels,
  "Acts of the Apostles": actsOfApostles,
  "Epistles of Paul": epistlesOfPaul,
  "General Epistles": generalEpistles,
  "Book of Revelation": bookOfRevelation,
  "The Pentateuch": pentateuch,
  "Historical Books": historicalBooks,
  "Wisdom Books": wisdomBooks,
  "Prophetic Books": propheticBooks,
};
