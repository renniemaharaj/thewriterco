import React, { useState, useEffect, useRef } from "react";
import {
  defaultQueryForm,
  defaultForceGuess,
  rangeStart,
  rangeEnd,
} from "./config";
import { generatePossibilities, mean } from "./utils";
import { QueryForm, GameEndNotice } from "./types";
import { Flex, Box, Button, Text } from "@radix-ui/themes";

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
        textContent: `Is your number more than ${halfPossibilities}?`,
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
        textContent: "I made a guess, your number is: ",
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
          textContent: `Is your number more than ${queryForm.term * 2}?`,
          operator: ">",
          term: queryForm.term * 2,
        });
      }
    }
  };

  const initiateRangeQuery = () => {
    const firstBoundQuery = 2000;
    setIsKnownRange(false);
    setGamingStatus(true);
    setQueryForm({
      visibility: true,
      textContent: `Is your number more than ${firstBoundQuery}?`,
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
            "I can guess any natural number you think of between 0 and infinity"
            - Rennie
          </Text>
          <Button
            onClick={beginGame}
            className="bg-blue-500 text-white px-4 py-2 rounded !max-w-fit"
          >
            I have a number
          </Button>
        </Flex>
      ) : (
        <Box className="text-center">
          <Text className="text-xl mb-4">{`Maximum steps required: ${queriesRequired.current}`}</Text>
          {queryForm.visibility &&
            queriesRequired.current > 0 &&
            possibilities.current.length > 1 && (
              <Box className="flex gap-4">
                <Flex className="gap-2">
                  <Text>{queryForm.textContent}</Text>
                  <Flex className="gap-1">
                    <Button
                      onClick={() => applyQueryResult(true)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => applyQueryResult(false)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      No
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            )}
          {(gamingStatus && queriesRequired.current === 0) ||
          possibilities.current.length === 1 ? (
            <Box>
              <Text>{`${forcedGuess.textContent} ${forcedGuess.forceGuess}?`}</Text>
              <Button
                onClick={mayaPlaysAgain}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Play Again
              </Button>
            </Box>
          ) : null}
        </Box>
      )}
      <Box className="mt-4 !py-16 !px-16">
        {possibilities.current.length <= 50 ? (
          <>
            <Text className="text-lg">Possibilities</Text>
            <Flex className="flex-wrap gap-2">
              {possibilities.current.map((possibility) => (
                <Text key={possibility} className="">
                  {possibility}
                </Text>
              ))}
            </Flex>
          </>
        ) : (
          <Text className="opacity-70 transform scale-70">Thinking...</Text>
        )}
      </Box>
    </Flex>
  );
};

export default App;
