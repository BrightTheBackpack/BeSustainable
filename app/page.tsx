import React from 'react'
import type { AppProps } from 'next/app'

import { ThemeProvider } from 'theme-ui'
import theme from '#/lib/theme'
import '#/lib/firebase'
// import { getAuthenticatedAppForUser } from '#/lib/firebase/serverApp.js'
import  Home  from '#/components/home'
export const dynamic = "force-dynamic";
import { getAuthenticatedAppForUser } from '#/lib/firebase/serverApp';

const App =  ({ Component, pageProps }: AppProps) => {




  return (
    <div>
        <Home  />
      
    </div>
  )
}

export default App
