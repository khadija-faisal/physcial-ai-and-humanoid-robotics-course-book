/**
 * Root component swizzle for Docusaurus
 * This file overrides the default Root component to inject the ChatWidget globally
 *
 * Reference: https://docusaurus.io/docs/swizzling
 */

import React from 'react';
import type { ReactNode } from 'react';

// Import default Root component from Docusaurus theme
import OriginalRoot from '@theme-original/Root';

// Import the custom ChatWidget component
import ChatWidget from '../components/ChatWidget';

type RootProps = {
  children: ReactNode;
};

export default function Root({ children }: RootProps): JSX.Element {
  return (
    <OriginalRoot>
      {children}
      <ChatWidget />
    </OriginalRoot>
  );
}
