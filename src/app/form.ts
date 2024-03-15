import { SchemaType } from "formtools-react"

export const Basic: SchemaType[] = [
    {
        formtool: 'group',
        title: 'Informações do cliente',
        schema: [
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
            {
                formtool: 'mask',
                name: 'cpf',
                label: 'CPF',
                mask: '000.000.000-00',
                validation: {
                    required: true
                }
            }
        ]
    },
]


export const Address: SchemaType[] = [
    {
        formtool: 'mask',
        name: 'address.cep',
        label: 'CEP',
        mask: '00000-000',
        validation: {
            required: true
        }
    },
    {
        formtool: 'text',
        name: 'address.street',
        label: 'Rua',
        placeholder: 'Cidade, Rua e Número',
        validation: {
            required: true
        }
    },
]

export const AddressOptions = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' }
]
