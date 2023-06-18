import Provider from "@/store/Provider";
import { Inter } from "next/font/google";
import { Header } from "./components";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "News App",
  description: "A new aggregator app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200`}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
