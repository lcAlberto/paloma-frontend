export const state = () => ({
    authUser: ref({}),
    errors: {
        message: null,
        fields: ref([])
    },
    loading: false,

    toast: <ToastType>{
        type: 'info',
        message: 'Message Content',
        config: {
            duration: 3000,
            position: 'tl'
        }
    }
})

interface ToastType {
    type: string,
    message: string,
    config: ConfigType,
}

interface ConfigType {
    duration: number
    position: string
}
