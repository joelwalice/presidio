import "./globals.css";


export const metadata = {
  title: "Order Schedule website",
  description: "Website that is developed using NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
