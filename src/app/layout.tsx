import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { Rubik } from 'next/font/google';

// components
import NavBar from './components/NavBar';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
});

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				// className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				className={rubik.className}
			>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
