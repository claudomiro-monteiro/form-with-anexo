import { TextareaHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
}

export function TextArea(props: TextAreaProps) {
  const { register } = useFormContext()

  return (
    <textarea
      id={props.name}
      className="w-full flex-1 border-0 bg-transparent p-0 text-lg text-zinc-100 placeholder-zinc-500 outline-none placeholder:text-base"
      {...register(props.name)}
      {...props}
    />
  )
}
