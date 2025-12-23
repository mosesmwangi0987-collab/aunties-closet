import './globals.css'

export const metadata = {
  title: "Aunty's Closet - Fashion for Every Woman",
  description: 'Shop the latest fashion at Aunty\'s Closet',
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