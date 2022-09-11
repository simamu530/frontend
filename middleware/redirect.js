export default function ({ redirect, store }) {
  const user = store.state.user
  if(!user) {
    redirect('/login')
  }
}