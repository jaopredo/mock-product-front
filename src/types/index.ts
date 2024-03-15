
export interface UserFeedback {
    name: string,
    phone: string,
    email: string,
    time_wait: string,
    preference: string,
    address: {
        state: string,
        street: string,
        cep: string
    }
}
