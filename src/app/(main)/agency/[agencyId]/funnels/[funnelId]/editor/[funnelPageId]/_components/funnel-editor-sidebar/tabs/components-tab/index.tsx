import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { EditorBtns } from '@/lib/constants'
import React from 'react'
import TextPlaceholder from './text-placeholder'
import ContainerPlaceholder from './container-placeholder'
import VideoPlaceholder from './video-placeholder'
import TwoColumnsPlaceholder from './two-columns-placeholder'
import ThreeColumnsPlaceholder from './three-columns-placeholder' // Import ThreeColumnsPlaceholder
import LinkPlaceholder from './link-placeholder'
import ContactFormComponentPlaceholder from './contact-form-placeholder'
import CheckoutPlaceholder from './checkout-placeholder'
import HeroPlaceholder from './hero-placeholder' 
import HeaderPlaceholder from './header-placeholder'
import FooterPlaceholder from './footer-placeholder' // Import FooterPlaceholder
import ButtonPlaceholder from './button-placeholder' // Import ButtonPlaceholder
import PhotoPlaceholder from './PhotoPlaceholder' // Import PhotoPlaceholder



type Props = {}

const ComponentsTab = (props: Props) => {
  const elements: {
    Component: React.ReactNode
    label: string
    id: EditorBtns
    group: 'layout' | 'elements'
  }[] = [
    {
      Component: <TextPlaceholder />,
      label: 'Text',
      id: 'text',
      group: 'elements',
    },
    {
      Component: <ContainerPlaceholder />,
      label: 'Container',
      id: 'container',
      group: 'layout',
    },
    {
      Component: <TwoColumnsPlaceholder />,
      label: '2 Columns',
      id: '2Col',
      group: 'layout',
    },
    {
      Component: <ThreeColumnsPlaceholder />, // Add ThreeColumnsPlaceholder
      label: '3 Columns',
      id: '3Col',
      group: 'layout',
    },
    {
      Component: <VideoPlaceholder />,
      label: 'Video',
      id: 'video',
      group: 'elements',
    },
    {
      Component: <ContactFormComponentPlaceholder />,
      label: 'Contact',
      id: 'contactForm',
      group: 'elements',
    },
    {
      Component: <HeroPlaceholder />,
      label: 'Hero',
      id: 'hero',
      group: 'elements',
    },
    {
      Component: <CheckoutPlaceholder />,
      label: 'Checkout',
      id: 'paymentForm',
      group: 'elements',
    },
    {
      Component: <LinkPlaceholder />,
      label: 'Link',
      id: 'link',
      group: 'elements',
    },
    {
      Component: <HeaderPlaceholder />,
      label: 'Header',
      id: 'header',
      group: 'elements',
    },
    {
      Component: <FooterPlaceholder />, // Add FooterPlaceholder
      label: 'Footer',
      id: 'footer',
      group: 'elements',
    },
    {
      Component: <ButtonPlaceholder />, // Add ButtonPlaceholder
      label: 'Button',
      id: 'button',
      group: 'elements',
    },
    {
      Component: <PhotoPlaceholder />, // Add PhotoPlaceholder
      label: 'Photo',
      id: 'photo',
      group: 'elements',
    },
    
  ]

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Layout', 'Elements']}
    >
      <AccordionItem
        value="Layout"
        className="px-6 py-0 border-y-[1px]"
      >
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'layout')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="Elements"
        className="px-6 py-0 "
      >
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ComponentsTab
