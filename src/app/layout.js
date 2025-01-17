"use client";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/store/store";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navbar />
        <main>
          <Provider store={store}>{children}</Provider>
        </main>
      </body>
    </html>
  );
}
