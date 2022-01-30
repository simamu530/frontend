import { auth } from '../plugins/firebase'

const middleware = ({ route, store, redirect }) => {
  auth.onAuthStateChanged((user) => {
    // ログインしていなければ、 /login へリダイレクトする
    if (!user && route.name !== 'login') redirect('/login')
  })
}

export default middleware