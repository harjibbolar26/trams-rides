const plugin = require('tailwindcss/plugin');


/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		backgroundImage: {
  			'circular-gradient': 'radial-gradient(ellipse, #FFF, #F8F8F8, #F1F1F1, #EEE)'
  		},
  		fontFamily: {
  			'circular-std': ["CircularStd", "sans-serif"]
  		},
  		colors: {
  			default: 'var(--dark-grey)',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			grey: 'var(--grey)',
  			error: 'var(--error)',
  			white: 'var(--white)',
  			hover: 'var(--purple-hover)',
  			border: 'hsl(var(--border))',
  			lightGrey: 'var(--light-grey)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        ".text-gradient": {
          background: `linear-gradient(90deg, ${theme(
            "colors.primary.DEFAULT"
          )}, ${theme("colors.hover")})`,
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          transition: "background 0.3s ease-in-out, -webkit-text-fill-color 0.3s ease-in-out"
        },
        ".text-gradient-reverse": {
          background: `linear-gradient(90deg, ${theme(
            "colors.hover"
          )}, ${theme("colors.primary.DEFAULT")})`,
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
           transition: "background 0.3s ease-in-out, -webkit-text-fill-color 0.3s ease-in-out"
        }
      });
    }),
      require("tailwindcss-animate")
],
};
