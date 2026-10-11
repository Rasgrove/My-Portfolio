// Root layout: pass-through only.
// The [locale]/layout.tsx owns <html> and <body>.
// This file must NOT render <html> or <body> to avoid
// the hydration error: "html cannot be a child of body".
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
