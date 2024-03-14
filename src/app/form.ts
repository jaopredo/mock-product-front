import { SchemaType } from "formtools-react"

const FormConfig: SchemaType[] = [
    {
        formtool: 'text',
        name: 'name',
        label: 'Nome',
        validation: {
            required: true
        }
    },
    {
        formtool: 'mask',
        name: 'phone',
        label: 'Telefone',
        mask: '(00) 00000-0000',
        validation: {
            required: true
        }
    },
    {
        formtool: 'email',
        name: 'email',
        label: 'Email',
        validation: {
            required: true
        }
    },
]

export default FormConfig