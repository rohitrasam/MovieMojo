import axios from 'axios'

const login = () => {
    axios.post('http://127.0.0.1:8000/users/login')
.then(res=> setData(res.data))
.catch(err=> console.log(err))
}

const signup = () => {
    axios.post('http://127.0.0.1:8000/users/signup')
.then(res=> setData(res.data))
.catch(err=> console.log(err))
}

