import { cn } from '@renderer/utils/cn'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-purple hover:bg-pink text-background',
  secondary: 'bg-current-line hover:bg-comment text-text',
  outline: 'border border-purple text-purple hover:bg-purple hover:text-background',
  ghost: 'text-text hover:bg-current-line',
  link: 'text-cyan underline-offset-2 hover:underline px-0 py-0',
  danger: 'bg-red hover:bg-pink text-background'
}

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <button
      className={cn(
        `px-3 py-1 text-[13px] cursor-pointer rounded-sm disabled:opacity-50 ${variantClasses[variant]}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
