'use client'
import { FormtoolsForm, FormtoolsSchema } from 'formtools-react'
import { UserFeedback } from '@/types'
import FormConfig from './form'

export default function Home() {

    return <div className='rounded-md bg-white flex items-stretch justify-between gap-3 w-3/5 shadow-lg'>
        <div className='p-10 flex-grow'>
            <h1 className='text-xl text-center font-bold'>Informações Necessárias</h1>
            <FormtoolsForm<UserFeedback> onSubmit={(data) => {
                console.log(data)
            }}>
                <FormtoolsSchema
                    schema={FormConfig}
                />
                <button className='submit-button'>ENVIAR</button>
            </FormtoolsForm>
        </div>
        <div className='p-3 rounded-r-md w-3/5 bg-gradient-to-b from-cyan-300 to-cyan-500 text-white flex flex-col items-center justify-center gap-2'>
            <h1 className='font-bold text-2xl'>DESEJA UM ATENDIMENTO RÁPIDO?</h1>
            <p className='text-center w-3/5'>Informe-nos sua localidade e informaremos o hospital/clínica com menor fila próximo a você!</p>
            <p>Veja como será o produto final</p>
        </div>
    </div>
}
