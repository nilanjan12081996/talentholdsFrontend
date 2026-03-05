import { Geist, Geist_Mono, DM_Sans, Poppins, Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "../assets/css/custom.css";
import Header from "./ui/header";
import Footer from "./ui/footer";
import Providers from "./Reducer/Providers";
import ClientLayoutWrapper from "./clientLayoutWrapper";
import { ThemeProvider } from "./context/ThemeContext";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // choose what you need
  variable: "--font-poppins", // optional (for CSS variable use)
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
  variable: "--font-bricolage", // optional for Tailwind/CSS use
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const helveticaNeue = localFont({
  src: [
    {
      path: "../assets/fonts/helveticaneuecyr-roman.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-neue",
});

export const metadata = {
  title: "TalentHold",
  description: "TalentHold",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${bricolage.variable} antialiased`}
      >
        <ThemeProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
