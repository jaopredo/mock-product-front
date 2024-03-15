'use client'
import { useState, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormtoolsForm, FormtoolsSchema } from 'formtools-react'
import { UserFeedback } from '@/types'
import { Basic, Address, AddressOptions } from './form'
import APISource from "@/api/source"

import { LuLoader2 } from "react-icons/lu"
import { IoIosArrowForward, IoIosClose } from "react-icons/io"

export default function Home() {
    const [ methods, setMethods ] = useState<UseFormReturn>()

    const [ sending, setSending ] = useState<boolean>(false)
    const [ stopedLoad, setStopedLoad ] = useState<boolean>(false)
    const [ succeeded, setSucceeded ] = useState<boolean>(false)
    const [ showVideo, setShowVideo ] = useState<boolean>(false)

    return <>
        <div className='md:flex-row flex-col-reverse relative rounded-md bg-white flex items-stretch justify-between gap-3 md:w-4/5 w-[96%] shadow-lg'>
            <div className='p-6 flex-grow'>
                <FormtoolsForm<UserFeedback> setMethods={setMethods} onSubmit={(data) => {
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
                        schema={Basic}
                    />
                    <fieldset className='formtools-group'>
                        <legend className='formtools-group-title'>Informações de endereço</legend>
                        <FormtoolsSchema
                            schema={Address}
                        />
                        <div className='formtools-container'>
                            <label className='formtools-label' htmlFor="state">Estado (UF)</label>
                            <div className='formtools-insider'>
                                <select className='formtools-input' id="state" {...methods?.register('address.state', {
                                    required: true
                                })}>
                                    {AddressOptions.map((opt, key) => <option key={key} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className='formtools-group'>
                        <legend className='formtools-group-title'>Informações do atendimento</legend>
                        <div className='formtools-container'>
                            <label className='formtools-label' htmlFor="time-wait">Quanto tempo pode aguardar?</label>
                            <div className='formtools-insider'>
                                <select className='formtools-input' id="time-wait" {...methods?.register('time_wait', {
                                    required: true
                                })}>
                                    <option value="2h">Menos de 2 horas</option>
                                    <option value="today">Ainda hoje</option>
                                    <option value="another-day">Outro dia</option>
                                </select>
                            </div>
                        </div>
                        <div className='formtools-container'>
                            <label className='formtools-label' htmlFor="time-wait">Preferência do atendimento</label>
                            <div className='formtools-insider'>
                                <select className='formtools-input' id="time-wait" {...methods?.register('preference', {
                                    required: true
                                })}>
                                    <option value="private">Privado</option>
                                    <option value="public">Público</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>
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
            <div className='w-full md:w-auto p-3 pt-10 pb-10 md:rounded-r-md rounded-t-md bg-gradient-to-b from-cyan-300 to-cyan-500 text-white flex flex-col items-center justify-center gap-2'>
                <h1 className="text-4xl text-cyan-700 mb-5">Saúde <span className="font-bold">Já!</span></h1>
                <h2 className='font-bold text-xl text-center md:text-2xl'>DESEJA UM ATENDIMENTO RÁPIDO?</h2>
                <p className='text-center text-sm md:text-base w-3/5'>Informe-nos sua localidade e informaremos o hospital/clínica com menor fila próximo a você!</p>
                <span className='flex items-center justify-center gap-3 group' onClick={() => {
                    setShowVideo(true)
                }}>
                    <p className='hover:cursor-pointer text-xs md:text-base transition-all font-bold'>Clique e veja como será o produto final</p>
                    <IoIosArrowForward className='w-5 h-5'/>
                </span>
            </div>
        </div>
        { showVideo && <div className='fixed z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-black opacity-60 w-full h-full'>
        </div> }
        { showVideo && <div className='md:flex-row flex-col fixed md:w-3/5 w-[90%] z-20 h-[90%] rounded-md md:rounded-r-md left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white flex items-stretch justify-between overflow-auto'>
            <IoIosClose className='absolute right-4 top-3 z-30 hover:scale-105 active:scale-110 bg-cyan-500 text-white w-8 h-8 hover:cursor-pointer rounded-[50%] transition-all' onClick={() => {
                setShowVideo(false)
            }} onTouchStart={() => setShowVideo(false)}/>
            <video className='md:h-full md:w-auto h-1/2' controls>
                <source src='/demo-video.mp4' type='video/mp4' />
            </video>
            <div className='flex-grow flex flex-col items-center justify-center p-6'>
                <h1 className='font-bold md:text-2xl text-xl text-cyan-500'>VÍDEO DEMONSTRAÇÃO</h1>
                <p className='text-justify mt-2 text-sm md:text-base'>O vídeo ao lado demonstra o protótipo do nosso aplicativo, explicando o que cada página e como ele vai funcionar. O objetivo principal é fazer uma conexão mais rápida e direta entre paciente/médico ou paciente/serviço, de forma a gastar menos tempo dentro de filas e agilizando o processo de procura de um serviço</p>
            </div>
        </div>}
    </>
}
