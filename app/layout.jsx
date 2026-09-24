import "./globals.css";
import { Raleway } from 'next/font/google';
import { Audiowide } from 'next/font/google';

const mainFont = Raleway({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-main',
});

const logoFont = Audiowide({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-logo',
});

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "CrowdTune – Let Everyone Vote on What Plays Next",
    template: "%s | CrowdTune",
  },
  description:
    "Start a session, share a QR code, and let your friends vote on the music from their own phones. No app, no signup. The top-voted song plays next.",
  keywords: [
    "crowd music voting",
    "shared party playlist",
    "collaborative queue",
    "vote on songs",
    "party music app",
  ],
  openGraph: {
    title: "CrowdTune – Let Everyone Vote on What Plays Next",
    description:
      "Share a QR code and let your whole group vote on the music from their phones. No app, no account.",
    url: "/",
    siteName: "CrowdTune",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrowdTune – Let Everyone Vote on What Plays Next",
    description:
      "Share a QR code and let your whole group vote on the music from their phones.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className={`${mainFont.variable} ${logoFont.variable}`}>{children}
        
      </body>
    </html>
  );
}
