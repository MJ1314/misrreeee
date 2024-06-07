// Recursive.tsx
import { EditorElement } from '@/providers/editor/editor-provider'
import React from 'react'
import TextComponent from './text'
import Container from './container'
import VideoComponent from './video'
import LinkComponent from './link-component'
import ContactFormComponent from './contact-form-component'
import Checkout from './checkout'
import HeroComponent from './hero'
import HeaderComponent from './header'
import FooterComponent from './footer' // Import the FooterComponent
import ButtonComponent from './button' // Import the ButtonComponent
import PhotoComponent from './PhotoComponent'// Import the PhotoComponent


type Props = {
  element: EditorElement
}

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case 'text':
      return <TextComponent element={element} />
    case 'container':
      return <Container element={element} />
    case 'video':
      return <VideoComponent element={element} />
    case 'contactForm':
      return <ContactFormComponent element={element} />
    case 'paymentForm':
      return <Checkout element={element} />
    case '2Col':
      return <Container element={element} />
    case '3Col': // Add the 3Col case
      return <Container element={element} />
    case '__body':
      return <Container element={element} />
    case 'link':
      return <LinkComponent element={element} />
    case 'hero':
      return <HeroComponent element={element} />
    case 'header':
      return <HeaderComponent element={element} />
    case 'footer': // Add the footer case
      return <FooterComponent element={element} />
      case 'button': // Add the button case
      return <ButtonComponent element={element} />
      case 'photo': // Add the photo case
      return <PhotoComponent element={element} />
    default:
      return null
  }
}

export default Recursive
