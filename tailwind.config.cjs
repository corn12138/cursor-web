/**@type {import('tailwindcss').Config} */ //这是一个类型注释，用于告诉编辑器这是一个tailwindcss配置文件

const defaultTheme = require('tailwindcss/defaultTheme') //引入默认主题


module.exports = {
    content: ['./index.html', './src/**/*.{js,tsx,ts,jsx}'], //指定需要处理的文件
    theme: {
        // container的作用是限制内容的宽度
        container: {
            center: true,
            padding: '2rem',
            screens: {
                // sm:'640px',
                // md:'768px',
                // lg:'1024px',
                // xl:'1280px',
                '2xl': '1400px',
            }
        },
        // extend的作用是扩展主题
        extend: {
            // 添加一个新的字体
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            // 添加一个新的颜色
            colors: {
                border: 'hsl(var(--border))', //使用css变量
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    // dark:'hsl(var(--primary-dark))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                }, //secondary 是指定的颜色
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                }, //destructive 是指定的颜色
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                }, //muted 是指定的颜色
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                }, //accent 是指定的颜色
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                }, //popover 是指定的颜色
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                }, //card 是指定的颜色
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            //    keyframes是用来定义动画的
            keyframes: {
                'accordion-down': {
                    from: {
                        height: 0,
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: 0,
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 300ms ease-out',
                'accordion-up': 'accordion-up 300ms ease-out',
            },
        },
    },
    plugins:[require('tailwindcss-animate'),require('@tailwindcss/typography')], //释义：引入tailwindcss-animate插件和@tailwindcss/typography插件
}