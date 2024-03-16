'use client'
import { useState, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormtoolsForm, FormtoolsInput, FormtoolsSchema } from 'formtools-react'
import { UserFeedback } from '@/types'
import { Basic, Address, AddressOptions } from './form'
import APISource from "@/api/source"

import { LuLoader2 } from "react-icons/lu"

export default function Home() {
    const [ methods, setMethods ] = useState<UseFormReturn>()

    const [ sending, setSending ] = useState<boolean>(false)
    const [ stopedLoad, setStopedLoad ] = useState<boolean>(false)
    const [ succeeded, setSucceeded ] = useState<boolean>(false)
    const [ showConvene, setShowConvene ] = useState<boolean>(false)

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
                                    <option value="2 horas">Menos de 2 horas</option>
                                    <option value="Mais de 2 horas">Mais de 2 horas</option>
                                    <option value="Outro dia">Agendar para outro dia</option>
                                </select>
                            </div>
                        </div>
                        <div className='formtools-container'>
                            <label className='formtools-label' htmlFor="time-wait">Preferência do atendimento</label>
                            <div className='formtools-insider'>
                                <select className='formtools-input' id="time-wait" {...methods?.register('preference', {
                                    required: true,
                                    onChange: (e) => {
                                        setShowConvene(e.target.value == 'convene')
                                    }
                                })}>
                                    <option value="Privado">Privado</option>
                                    <option value="Público">Público</option>
                                    <option value="Convenio">Convênio Médico</option>
                                </select>
                            </div>
                        </div>
                        {showConvene && <FormtoolsInput name="convene_name" id='convene_name' label="Nome do Convênio" />}
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
            </div>
        </div>
    </>
}
