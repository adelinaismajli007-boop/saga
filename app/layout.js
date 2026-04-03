export const metadata = {
  title: 'News Saga',
  description: 'Latest news from News Saga',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
