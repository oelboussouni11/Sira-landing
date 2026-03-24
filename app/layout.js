import "./globals.css";

export const metadata = {
  title: "Sira Medical Pro — Votre Santé, Simplifiée",
  description:
    "Prenez rendez-vous avec les meilleurs médecins au Maroc, gérez vos dossiers médicaux et accédez à des soins de qualité.",
  openGraph: {
    title: "Sira Medical Pro",
    description: "La plateforme médicale n°1 au Maroc",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
