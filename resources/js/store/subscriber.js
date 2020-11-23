import store from './store'

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'auth/SET_TOKEN':
            if (mutation.payload) {
                localStorage.setItem('token', mutation.payload)
            } else {
                localStorage.removeItem('token')
            }
            break;
        case 'auth/SET_USER':
            if (mutation.payload) {
                localStorage.setItem('user', JSON.stringify(mutation.payload))
            } else {
                localStorage.removeItem('user')
            }
    }
})