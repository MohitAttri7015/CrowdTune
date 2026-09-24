import Nav from "@/components/nav/nav";

export const metadata = {
  title: {
    absolute: "CrowdTune – Let Everyone Vote on What Plays Next",
  },
  description:
    "Start a session, share a QR code, and let your friends vote on the music from their own phones. No app, no signup. The top-voted song plays next.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CrowdTune – Let Everyone Vote on What Plays Next",
    description:
      "Share a QR code and let your whole group vote on the music from their phones. No app, no account.",
    url: "/",
    siteName: "CrowdTune",
    type: "website",
  },
};

export default function MarketingLayout({ children }) {
  return (
    <div className="w-full">
      <header>
        <Nav />
      </header>

      {children}
    </div>
  );
}