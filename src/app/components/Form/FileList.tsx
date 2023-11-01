// 'use client'

// import { Trash2, UploadCloud } from 'lucide-react'
// import { useFileInput } from './Field'

// export function FileList() {
//   const { files } = useFileInput()

//   return (
//     <div className="mt-4 space-x-3">
//       {files.map((file) => {
//         return (
//           <p
//             key={file.name}
//             className="flex gap-2 rounded-md border border-zinc-500 py-2 pl-2 text-sm font-semibold"
//           >
//             <UploadCloud className="h-4 w-4" />
//             <span className="flex-1">{file.name}</span>
//             <Trash2
//               className="mr-2 h-4 w-4 cursor-pointer text-red-600"
//               // onClick={removeFile}
//             />
//           </p>
//         )
//       })}
//     </div>
//   )
// }
