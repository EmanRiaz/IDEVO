import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"| "outlineTask"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export default function Button({ variant = "primary", size = "md", className = "", children, ...props }: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none"

  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
    outline: "border-2 border-[#C72C88] text-[#C72C88] text-base font-semibold hover:bg-pink-50",
    outlineTask: "border-2 border-[#10898F] text-[#10898F] text-base font-semibold hover:bg-pink-50",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
