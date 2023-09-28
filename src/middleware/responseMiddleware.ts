export const responseTransformer =  (status: Partial<Number | String>, data: Object) => {
    return {
        status,
        data
    }
} 