'use client'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Form } from './components/Form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Select } from './components/Select'
import {
  Pencil,
  PhoneCall,
  SendHorizonal,
  Trash2,
  UploadCloud,
  UserCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { phoneNumberMask } from '@/utils/phone'
import { RotatingTriangles } from 'react-loader-spinner'
import axios from 'axios'
import { SelectItem } from './components/Select/SelectItem'
// import { FileList } from '/./components/Form/FileList'

const createFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'Digite seu nome.' })
    .min(3, { message: 'Digite um nome válido.' }),
  email: z
    .string()
    .nonempty({ message: 'Digite seu email.' })
    .email({ message: 'Email inválido.' }),
  cellphone: z
    .string()
    .nonempty({ message: 'Digite seu telefone.' })
    .min(15, { message: 'Telefone inválido, digite um telefone válido.' }),
  message: z.string(),
  // .min(3, { message: 'Digite uma mensagem com mais de 3 caracteres.' }),
  anexo: z
    .custom<FileList>((list) => list instanceof FileList)
    .refine((file) => file?.length > 0, { message: 'Escolha um arquivo.' }),
  // .transform((file) => file[0]),
})

type CreateFormData = z.infer<typeof createFormSchema>

export default function Home() {
  const [sppiner, setSppiner] = useState(false)
  const createForm = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
  })

  const { handleSubmit, watch, setValue, control, reset } = createForm

  const phoneValue = watch('cellphone')

  useEffect(() => {
    setValue('cellphone', phoneNumberMask(phoneValue))
  }, [phoneValue, setValue])

  async function newForm(data: CreateFormData) {
    // console.log(data.anexo)
    // console.log(JSON.stringify(data, null, 2))
    setSppiner(true)
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('cellphone', data.cellphone)
      formData.append('message', data.message)
      formData.append('anexo', data.anexo[0])

      await axios.post('/api', formData)
      setSppiner(false)
      toast.success('Formulário enviado com secesso!', {
        position: toast.POSITION.TOP_CENTER,
      })
      reset()
    } catch (error) {
      console.error(error)
      setSppiner(false)
      toast.error(
        'Não foi possível enviar seu contato, por favor tente mais tarde.',
        { position: toast.POSITION.TOP_CENTER },
      )
    }
  }

  const anexoFile = watch('anexo')

  function removeFile() {
    setValue('anexo', anexoFile)
  }

  // const teste = anexoFile.item(0)?.name
  // console.log(anexoFile?.item(0)?.name)

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6 bg-zinc-900 px-8">
      <h1 className="text-center text-2xl font-bold text-zinc-300">
        Preencha o formulário e envie seu curriculo.
      </h1>
      <FormProvider {...createForm}>
        <form
          id="send"
          onSubmit={handleSubmit(newForm)}
          className="flex w-full max-w-md flex-col gap-3"
        >
          <Form.Field>
            <Form.Prefix>
              <UserCircle className="h-5 w-5 text-zinc-300" />
            </Form.Prefix>
            <Form.Input type="name" name="name" placeholder="Nome" />
          </Form.Field>
          <Form.ErrorMessage field="name" />
          <Controller
            name="email"
            control={control}
            render={({ field: { ref, onChange } }) => (
              <SelectPrimitive.Root onValueChange={onChange}>
                <Select ref={ref} placeholder="Selecione seu contato...">
                  <SelectItem value="lcbrj@terra.com.br">
                    Claudio Contador
                  </SelectItem>
                  <SelectItem value="pedidosmarju@gmail.com">Marju</SelectItem>
                  <SelectItem value="claudomiromonteiro@gmail.com">
                    Claudomiro
                  </SelectItem>
                </Select>
              </SelectPrimitive.Root>
            )}
          />

          <Form.Field>
            <Form.Prefix>
              <PhoneCall className="h-5 w-5" />
            </Form.Prefix>
            <Form.Input
              type="tel"
              name="cellphone"
              placeholder="99 9 9999-9999"
            />
          </Form.Field>
          <Form.ErrorMessage field="cellphone" />

          <Form.Field>
            <Form.Prefix>
              <Pencil className="h-5 w-5" />
            </Form.Prefix>
            <Form.TextArea name="message" placeholder="Envie sua mensagem..." />
          </Form.Field>
          <Form.ErrorMessage field="message" />
          {/* <Form.Field> */}
          <Form.Label
            htmlFor="anexo"
            // className="flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border border-zinc-300 px-3 py-2 text-center text-zinc-950 hover:shadow-sm"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full border-4 border-zinc-50 bg-zinc-100">
                <UploadCloud className="text-firstColor h-5 w-5" />
              </div>
              <span className="text-sm text-zinc-300">
                <span className="text-secondColor font-semibold">
                  Clique aqui
                </span>{' '}
                para carregar seu arquivo
              </span>
              <span className="text-sm text-zinc-300">
                Somente arquivos PDF
              </span>
            </div>
            <Form.Input
              type="file"
              name="anexo"
              accept="application/pdf"
              className="sr-only"
            />
          </Form.Label>
          {/* </Form.Field> */}
          <Form.ErrorMessage field="anexo" />
          {/* <p>anexo:{anexoFile?.item(0)?.name}</p> */}
          {anexoFile?.length > 0 ? (
            <div className="space-x-3">
              <p className="flex gap-2 rounded-md border border-zinc-300 py-2 pl-2 text-sm font-semibold text-zinc-300">
                <UploadCloud className="h-4 w-4" />
                <span className="flex-1">{anexoFile?.item(0)?.name}</span>
                <Trash2
                  className="mr-2 h-4 w-4 cursor-pointer text-red-600"
                  onClick={removeFile}
                />
              </p>
            </div>
          ) : null}
        </form>
        <button
          type="submit"
          form="send"
          className="py2 flex items-center justify-center gap-2 rounded-md border border-zinc-600 bg-slate-400 px-8 py-2 font-semibold"
        >
          {!sppiner && (
            <>
              Enviar
              <SendHorizonal />
            </>
          )}
          {sppiner && (
            <RotatingTriangles
              height="20"
              width="20"
              // radius="48"
              // color="#000"
              ariaLabel="watch-loading"
              visible={true}
            />
          )}
        </button>
        <ToastContainer />
      </FormProvider>
    </main>
  )
}
