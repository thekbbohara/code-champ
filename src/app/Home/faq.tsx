import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const FAQs = () => {
  const faqs = [
    {
      question: "How does the competition system work?",
      answer: "You will be matched with an opponent of similar skill level for a timed coding challenge. Both participants work on the same problem, and the first to submit a correct solution wins."
    },
    {
      question: "What kinds of rewards can I win?",
      answer: "Winners earn tokens that can be exchanged for premium features, upgrade subscriptions, or even real money"
    },
    {
      question: "Are the challenges similar to real interview question ?",
      answer: "Yes! Our AI generates challenges based on real world interview questions form top tech companies, ensuring you're practicing relevent questions.'"
    },
    {
      question: "How does anti-cheating system work?",
      answer: "We prevent users from copying and pasting solutions by disabling these actions in the input fields. Additionally, we track user activity within the page—if the user switches to another tab, leaves the page, or tries to open a new tab during the match, the system will automatically end the session, and the user will lose the match. This approach helps maintain a fair and focused environment for all participants."
    }
  ]
  return (<section className="flex flex-wrap lg:flex-nowrap mx-auto w-fit lg:max-w-[90vw] max-w-[500px] px-2">
    <div className="w-full">
      <h1 className="text-[32px] font-bold text-gray-200" id="faqs">Common Questions</h1>
      <p className="text-gray-400 text-[18px] font-medium ">Everything you need to know about improving your technical interview skill</p>
    </div>
    <Accordion type="multiple" className="w-full  flex flex-col gap-4">
      {faqs.map(({ question, answer }, id) =>
        <AccordionItem value={`item-${id}`} key={id} className="flex flex-col gap-2">
          <AccordionTrigger className="font-semibold text-[18px] text-gray-300 text-start">{question}</AccordionTrigger>
          <AccordionContent className="text-gray-400 font-medium">{answer}</AccordionContent>
        </AccordionItem>)}
    </Accordion>

  </section>)
}
export default FAQs;
