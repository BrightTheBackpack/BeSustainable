import React from 'react';
import { getAuthenticatedAppForUser } from '#/lib/firebase/serverApp';
import Home from '#/components/home';
export const metadata = {
  title: 'Your App Name',
  description: 'Your app description',
};
import { UserProvider } from '#/components/user';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { currentUser } = await getAuthenticatedAppForUser();
  
  return (
    <html lang="en-US">
      <UserProvider>
      <body>
        {children}
      </body>

      </UserProvider>
      
     
    </html>
  );
}