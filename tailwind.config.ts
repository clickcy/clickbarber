
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(220, 91%, 47%)',
					foreground: 'hsl(0, 0%, 98%)'
				},
				secondary: {
					DEFAULT: 'hsl(210, 40%, 96.1%)',
					foreground: 'hsl(222.2, 47.4%, 11.2%)'
				},
				destructive: {
					DEFAULT: 'hsl(0, 84.2%, 60.2%)',
					foreground: 'hsl(210, 40%, 98%)'
				},
				muted: {
					DEFAULT: 'hsl(210, 40%, 96.1%)',
					foreground: 'hsl(215.4, 16.3%, 46.9%)'
				},
				accent: {
					DEFAULT: 'hsl(210, 40%, 96.1%)',
					foreground: 'hsl(222.2, 47.4%, 11.2%)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(0, 0%, 100%)',
					foreground: 'hsl(222.2, 84%, 4.9%)'
				},
				sidebar: {
					DEFAULT: 'hsl(220, 13%, 18%)',
					foreground: 'hsl(220, 9%, 46%)',
					primary: 'hsl(220, 91%, 47%)',
					'primary-foreground': 'hsl(0, 0%, 98%)',
					accent: 'hsl(220, 13%, 28%)',
					'accent-foreground': 'hsl(220, 9%, 86%)',
					border: 'hsl(220, 13%, 28%)',
					ring: 'hsl(220, 91%, 47%)'
				},
				barber: {
					blue: 'hsl(220, 91%, 47%)',
					'blue-light': 'hsl(220, 91%, 87%)',
					dark: 'hsl(220, 13%, 18%)',
					'dark-lighter': 'hsl(220, 13%, 28%)',
					gold: 'hsl(45, 93%, 58%)',
					'gold-light': 'hsl(45, 93%, 88%)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
