import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.scss"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Saúde Já!",
    description: "Para você que deseja ter um atendimento mais rápido",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body className={inter.className}>
                <div className="bg-sky-100 flex items-center justify-center min-h-[100vh] flex-col p-4">
                    {children}
                </div>
            </body>
        </html>
    )
}
