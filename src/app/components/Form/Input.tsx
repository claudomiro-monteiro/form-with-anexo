import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function Input(props: InputProps) {
  const { register } = useFormContext()

  return (
    <input
      id={props.name}
      className="w-full flex-1 border-0 bg-transparent p-0 text-lg text-zinc-100 placeholder-zinc-500 outline-none placeholder:text-base"
      {...register(props.name)}
      {...props}
    />
  )
}
