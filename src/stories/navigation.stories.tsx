import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
} from "..";

const meta = { title: "Components/Navigation" } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabBar: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList>
        <Tab value="account">Account</Tab>
        <Tab value="billing">Billing</Tab>
        <Tab value="team" disabled>
          Team
        </Tab>
      </TabsList>
      <TabsPanel value="account">Manage your account details.</TabsPanel>
      <TabsPanel value="billing">Update your payment method.</TabsPanel>
    </Tabs>
  ),
};

const questions = [
  {
    question: "Is it accessible?",
    answer: "Yes. Keyboard and screen reader support come built in.",
  },
  {
    question: "Can I restyle it?",
    answer: "Override the --wz-* tokens, or pass className and classList.",
  },
  {
    question: "Does it support dark mode?",
    answer: "Add the dark class to the html element, or use ThemeProvider.",
  },
] as const;

export const AccordionList: Story = {
  render: () => (
    <Accordion className="w-96">
      {questions.map(({ question, answer }) => (
        <AccordionItem key={question}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionPanel>{answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const Breadcrumbs: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#home">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#projects">Projects</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>woozui</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};
