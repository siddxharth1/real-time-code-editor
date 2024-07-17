import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function AccordiansNext() {
  return (
    <>
      <h1 className="font-bold text-3xl">Why Choose Us?</h1>
      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Real-Time Collaboration"
        >
          Our platform is designed for real-time interaction. Watch as your
          collaborators type, see their changes live, and communicate instantly
          through our integrated chat.
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Easy to Use">
          No installations or complicated setups. Create a room, invite people,
          and start coding together. It's that simple.
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          title="Versatile and Flexible"
        >
          Whether you are coding alone or with a team, interviewing candidates,
          or teaching students, our platform adapts to your needs. Customize
          your environment, manage multiple sessions, and enjoy a seamless
          coding experience.
        </AccordionItem>
      </Accordion>
    </>
  );
}
