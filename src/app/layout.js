import "./globals.css";
import { Inter } from "next/font/google";
import AOSInit from "@/utils/aos";
import ScrollToTop from "@/utils/ScrollToTop";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "شرکت فنجان داغ خوارزمی - SET Coffee | فروشگاه اینترنتی قهوه ست",
  description: "Mohammad Saleh Kamali project with Next.js v13",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" >
      <body suppressHydrationWarning={true} className={inter.className}>
        <AOSInit />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
