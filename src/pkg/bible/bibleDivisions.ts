import {
  actsOfApostles,
  bookOfRevelation,
  canonicalGospels,
  epistlesOfPaul,
  generalEpistles,
  historicalBooks,
  pentateuch,
  propheticBooks,
  wisdomBooks,
} from "./config";

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
