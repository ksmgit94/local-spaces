import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-textInverted hover:bg-primaryHover rounded-md",
        destructive:
          "bg-error text-textInverted hover:bg-error/90 rounded-md",
        outline:
          "border border-border bg-background hover:bg-backgroundAlt hover:text-textPrimary rounded-md",
        secondary:
          "bg-backgroundAlt text-textPrimary hover:bg-backgroundAlt/80 rounded-md",
        ghost: "hover:bg-backgroundAlt hover:text-textPrimary rounded-md",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-5 py-3 text-base",
        sm: "px-3 py-2 text-sm rounded-md",
        lg: "px-8 py-4 text-lg rounded-lg",
        icon: "p-3 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
