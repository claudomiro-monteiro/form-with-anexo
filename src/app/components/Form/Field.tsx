import { HTMLAttributes, createContext, useContext, useState } from 'react'

export type FieldProps = HTMLAttributes<HTMLDivElement>

type FileInputContextProps = {
  files: File[]
  onFilesSelected: (files: File[]) => void
  // removeFile: () => void
}

const FileInputContext = createContext({} as FileInputContextProps)

export function Field(props: FieldProps) {
  const [files, setFiles] = useState<File[]>([])

  return (
    <FileInputContext.Provider value={{ files, onFilesSelected: setFiles }}>
      <div
        className="flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-200"
        {...props}
      />
    </FileInputContext.Provider>
  )
}

export const useFileInput = () => useContext(FileInputContext)
