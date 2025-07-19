/**
 * Represents a single result of a report
 * (Reports may contain multiple results from different sources)
 */
export type Result = {
  title: string; // !Model's title based on text content
  commentaries: string[]; // !Editor's commentaries
  // textContent: string; // !System's Accumulated text content
  alignment?: number; // !Model's framework alignment score (0–10)
  summary: string; // !Model's thoughtful summary with framework reflection
  images?: string[]; // !System's relevant image URLs (e.g., thumbnails)
  href: string; // !System's assigned link
  tags?: string[]; // !Model's categories/topics, including framework themes
  politicalBiases: string[]; // !Model's examination and tagging for political biases eg: leftist, right, progressive, conservative
};

/**
 * Represents a report of multiple results from a search query
 */
export type Report = {
  searchQuery: string; // !System's Search query being used to get news site links
  results: Result[]; // !System's search results list
  title: string; // !Model's clear and concise report title
  date: string; // !System's ISO 8601 format (e.g., 2025-05-03)
};

/**
 * Represents a request or message to the server via socket
 * (Enables structured communication between client and server)
 */
export type Request = {
  query?: string;
  maxReports?: number;
  index?: number;
};

type TagSet = {
  tagsAvailable: string[];
};

type Feed = {
  preferenceTags: string[];
  urlReportTitle: string;
  urlResultTitle: string;
};

type Optimize = {
  prompt: string;
  preferences: string[];
};

type Search = {
  searchQuery: string;
};

type Query = {
  searchQuery: string;
};

type Forward = {
  href: string;
};

type Error = {
  error: string;
};

export type Body = Search | Forward | Query | Error | Feed | Optimize | TagSet;

export type Command = {
  name: string;
  body: string;
};

export type Block = Report | Body;

/**
 * Represents a response or block or message from the server via socket
 * (Enables structured communication between client and server)
 * (May be a report or another type of block)
 */
export type Response = Block[];
