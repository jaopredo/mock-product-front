'use client'
import { useState } from 'react'
import { FormtoolsForm, FormtoolsSchema } from 'formtools-react'
import { UserFeedback } from '@/types'
import FormConfig from './form'
import APISource from "@/api/source"

import { LuLoader2 } from "react-icons/lu"
import { IoIosArrowForward, IoIosClose } from "react-icons/io"

export default function Home() {
    const [ sending, setSending ] = useState<boolean>(false)
    const [ stopedLoad, setStopedLoad ] = useState<boolean>(false)
    const [ succeeded, setSucceeded ] = useState<boolean>(false)
    const [ showVideo, setShowVideo ] = useState<boolean>(false)

    return <>
        <div className='relative rounded-md bg-white flex items-stretch justify-between gap-3 w-4/5 shadow-lg'>
            <div className='p-10 flex-grow'>
                <h1 className='text-xl text-center font-bold'>Informações Necessárias</h1>
                <FormtoolsForm<UserFeedback> onSubmit={(data) => {
                    setSending(true)
                    APISource.post<UserFeedback>('', data as UserFeedback).then(resp => {
                        setSending(false)
                        if (!resp.data.error) {
                            setSucceeded(true)
                        }
                        setStopedLoad(true)
                    })
                }}>
                    <FormtoolsSchema
                        schema={FormConfig}
                    />
                    <button disabled={sending} className='submit-button'>
                        {sending && 'ENVIANDO'}
                        {!sending && 'ENVIAR'}
                        {sending && <LuLoader2 className='animate-spin'/>}
                    </button>
                </FormtoolsForm>
                { stopedLoad && <p className='text-cyan-500 mt-2 text-sm font-bold break-words max-w-1/2'>
                    {succeeded && <>Solicitação recebida com sucesso, em alguns minutos entraremos em contato!</>}
                    {!succeeded && <>Solicitação não recebida, por favor tente novamente</>}
                </p> }
            </div>
            <div className='p-3 rounded-r-md w-3/5 bg-gradient-to-b from-cyan-300 to-cyan-500 text-white flex flex-col items-center justify-center gap-2'>
                <h1 className='font-bold text-2xl'>DESEJA UM ATENDIMENTO RÁPIDO?</h1>
                <p className='text-center w-3/5'>Informe-nos sua localidade e informaremos o hospital/clínica com menor fila próximo a você!</p>
                <span className='flex items-center justify-center gap-3 group' onClick={() => {
                    setShowVideo(true)
                }}>
                    <p className='hover:cursor-pointer transition-all font-bold'>Veja como será o produto final</p>
                    <IoIosArrowForward className='w-5 h-5'/>
                </span>
            </div>
        </div>
        { showVideo && <div className='fixed z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-black opacity-60 w-full h-full'>
        </div> }
        { showVideo && <div className='fixed z-20 h-[90%] w-1/2 rounded-r-md left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white flex items-stretch justify-between'>
            <IoIosClose className='absolute top-3 right-3 w-8 h-8 hover:cursor-pointer hover:bg-rose-500 rounded-[50%] text-rose-500 hover:text-white transition-all' onClick={() => {
                setShowVideo(false)
            }}/>
            <video className='h-full w-auto' controls>
                <source src='/demo-video.mp4' type='video/mp4' />
            </video>
            <div className='flex-grow flex flex-col items-center justify-center p-3'>
                <h1 className='font-bold text-2xl'>VÍDEO DEMONSTRAÇÃO</h1>
                <p className='text-justify mt-2'>O vídeo ao lado demonstra o protótipo do nosso aplicativo, explicando o que cada página e como ele vai funcionar. O objetivo principal é fazer uma conexão mais rápida e direta entre paciente/médico ou paciente/serviço, de forma a gastar menos tempo dentro de filas e agilizando o processo de procura de um serviço</p>
            </div>
        </div> }
    </>
}
