import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "daybreaker";

const questions = [
  {
    question: "Is it accessible?",
    answer: "Yes. Keyboard and screen reader support are built in.",
  },
  {
    question: "Can I restyle it?",
    answer: "Override the tokens, or pass className and classList.",
  },
  {
    question: "Is there a dark mode?",
    answer: "Add the dark class to the html element.",
  },
] as const;

export const Example = () => (
  <Accordion className="w-64">
    {questions.map(({ question, answer }) => (
      <AccordionItem key={question}>
        <AccordionTrigger>{question}</AccordionTrigger>
        <AccordionPanel>{answer}</AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
);
