import React, { useState, useEffect, useRef } from "react";
import {
  defaultQueryForm,
  defaultForceGuess,
  rangeStart,
  rangeEnd,
} from "./config";
import { generatePossibilities, mean } from "./utils";
import { QueryForm, GameEndNotice } from "./types";
import { Flex, Box, Button, Text, Link } from "@radix-ui/themes";
import { AllowedColors } from "../../components/RadixColors";
import Hint from "../../components/Hint";

type Mind = {
  title: string;
  content: string | number;
  reveal: boolean;
};

const App: React.FC = () => {
  const [workingRange, setWorkingRange] = useState([rangeStart, rangeEnd]);
  const [gamingStatus, setGamingStatus] = useState(false);
  const [queryForm, setQueryForm] = useState<QueryForm>(defaultQueryForm);
  const [forcedGuess, setForcedGuess] =
    useState<GameEndNotice>(defaultForceGuess);
  const queriesRequired = useRef(777);
  const possibilities = useRef<number[]>(
    generatePossibilities(rangeStart, rangeEnd),
  );
  const [rangeQuery, setRangeQuery] = useState({ rangeStart: 0, rangeEnd: 0 });
  const [isKnownRange, setIsKnownRange] = useState(true);

  const [currentThought, setCurrentThought] = useState({} as Mind);

  useEffect(() => {
    const thinkingMind = setInterval(() => {
      setCurrentThought({
        title: "Considering a set of endless possibilities",
        content:
          possibilities.current[
            Math.floor(Math.random() * possibilities.current.length)
          ] ?? "No possibilities left",
        reveal: gamingStatus,
      });
    }, 1000);
    return () => clearInterval(thinkingMind);
  }, [queriesRequired.current, possibilities.current]);

  useEffect(() => {
    possibilities.current = generatePossibilities(
      workingRange[0],
      workingRange[1],
    );
  }, [workingRange]);

  const generatePossibilityQuery = () => {
    if (possibilities.current.length > 1 && queriesRequired.current > 0) {
      const meanPossibilities = Math.floor(mean(possibilities.current));
      const halfPossibilities = meanPossibilities;
      setQueryForm({
        visibility: true,
        textContent: `Is your number more than ${prettyNumber(halfPossibilities)}?`,
        operator: ">",
        term: halfPossibilities,
      });
    }
    queriesRequired.current = queriesRequired.current - 1;

    if (queriesRequired.current === 0 || possibilities.current.length === 1) {
      const min = Math.min(...possibilities.current);
      const max = Math.max(...possibilities.current);
      const forceGuess = Math.floor(Math.random() * (max - min + 1)) + min;
      setForcedGuess({
        textContent: "I'll make a guess. Is your number: ",
        forceGuess: forceGuess,
      });
    }
  };

  const applyQueryResult = (confirmation: boolean) => {
    if (!isKnownRange) {
      stepRangeQuery(confirmation);
      return;
    }
    if (queryForm.operator === ">") {
      possibilities.current = possibilities.current.filter((possibility) =>
        confirmation
          ? possibility > queryForm.term
          : possibility <= queryForm.term,
      );
    }
    generatePossibilityQuery();
  };

  const scaleTerm = (term: number) => {
    return Math.floor(term * 2);
  };
  const stepRangeQuery = (confirmation: boolean) => {
    let foundRangeEnd = false;

    if (queryForm.operator === ">") {
      if (confirmation) {
        // If the number is greater than the term, the range starts from the term
        // and ends at the previous range
        queriesRequired.current = Math.ceil(Math.log2(queryForm.term));
        setRangeQuery((prevRangeQuery) => ({
          rangeStart: queryForm.term,
          rangeEnd: prevRangeQuery.rangeEnd,
        }));
      } else {
        // If the number is less than the term, the range ends on the term, found the end of the range
        // and the start of the range is the previous range start
        foundRangeEnd = true;
        queriesRequired.current = Math.ceil(Math.log2(queryForm.term));
        setRangeQuery((prevRangeQuery) => ({
          rangeStart: prevRangeQuery.rangeStart,
          rangeEnd: queryForm.term,
        }));
      }

      if (foundRangeEnd) {
        const rqs = rangeQuery.rangeStart;
        const qft = queryForm.term;
        setIsKnownRange(true);
        possibilities.current = generatePossibilities(rqs, qft);
        generatePossibilityQuery();
      } else {
        setQueryForm({
          visibility: true,
          textContent: `Is your number more than ${prettyNumber(scaleTerm(queryForm.term))}?`,
          operator: ">",
          term: scaleTerm(queryForm.term),
        });
      }
    }
  };

  const prettyNumber = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const initiateRangeQuery = () => {
    const firstBoundQuery = 2000;
    setIsKnownRange(false);
    setGamingStatus(true);
    setQueryForm({
      visibility: true,
      textContent: `Is your number more than ${prettyNumber(firstBoundQuery)}?`,
      operator: ">",
      term: firstBoundQuery,
    });
  };

  const mayaPlaysAgain = () => {
    setQueryForm({ ...defaultQueryForm });
    setGamingStatus(false);
    queriesRequired.current = 777;
    setWorkingRange([rangeStart, rangeEnd]);
    possibilities.current = generatePossibilities(rangeStart, rangeEnd);
    setRangeQuery({ rangeStart: 0, rangeEnd: 0 });
  };

  const beginGame = () => {
    setGamingStatus(true);
    initiateRangeQuery();
  };

  const inferIsGuess = (msg: string) => {
    const keyMatchersRegex = [/\s*I./, /guess/, /number/, /is/i];
    let matches = 0;
    keyMatchersRegex.forEach((regex) => {
      if (regex.test(msg)) {
        matches++;
      }
    });
    return matches === keyMatchersRegex.length;
  };

  const colorize = (msg: string) => {
    return inferIsGuess(msg) ? "blue" : "";
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="h-screen"
    >
      {!gamingStatus ? (
        <Flex className="!flex-col">
          <Text className="mb-4 !w-[400px] !text-wrap">
            "I can guess any natural number you think of from the range (0,∞)" -
            Rennie
          </Text>
          <Button
            onClick={beginGame}
            className="bg-blue-500 text-white px-4 py-2 rounded !max-w-fit"
          >
            I have a number
          </Button>
          <Link href="/">thewriter.com</Link>
        </Flex>
      ) : (
        <Box className="text-center">
          <Text className="text-xl mb-4">{`Maximum steps required: ${queriesRequired.current}`}</Text>
          {queryForm.visibility &&
            queriesRequired.current > 0 &&
            possibilities.current.length > 1 && (
              <Box className="flex !gap-4">
                <Flex className="!gap-2">
                  <Text>{queryForm.textContent}</Text>
                  <Flex gap={"3"}>
                    <Button
                      variant="ghost"
                      onClick={() => applyQueryResult(true)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Yes
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => applyQueryResult(false)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      No
                    </Button>
                  </Flex>
                </Flex>
                <Hint className="max-w-[500px]">
                  A simple yes or no question, though seemingly weak, may filter
                  up to half + 1 the amoung of possibilities
                </Hint>
              </Box>
            )}
          {(gamingStatus && queriesRequired.current === 0) ||
          possibilities.current.length === 1 ? (
            <Box>
              <Text
                color={colorize(forcedGuess.textContent) as AllowedColors}
              >{`${forcedGuess.textContent} ${forcedGuess.forceGuess}?`}</Text>

              <Link
                className="!cursor-pointer"
                onClick={() => mayaPlaysAgain()}
              >
                play again{" "}
              </Link>
              <Link href="/">thewriter.com</Link>
            </Box>
          ) : null}
        </Box>
      )}
      <Box className="mt-4 !py-16 !px-16">
        <Text className="opacity-70 transform scale-70">
          {currentThought.reveal
            ? currentThought.content
            : currentThought.title}
        </Text>
      </Box>
    </Flex>
  );
};

export default App;
