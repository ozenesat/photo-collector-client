// // import { useState } from 'react'
// import { withRouter } from 'react-router-dom'
// import { useCookies } from 'react-cookie'
// import { signOut } from '../../api/auth'
// import messages from '../AutoDismissAlert/messages'
//
// const SignOut = (props) => {
//   const [cookies, setCookie] = useCookies(['user'])
//   const msgAlert = props.msgAlert
//   // const history = props.history
//   const clearUser = props.clearUser
//   const user = props.user
//   console.log(cookies) // find a way to get rid of it!
//   signOut(user)
//     .finally(() => msgAlert({
//       heading: 'Signed Out Successfully',
//       message: messages.signOutSuccess,
//       variant: 'primary'
//     }))
//     .finally(() => setCookie('user', ''))
//     .finally(() => clearUser())
//     // .finally(() => history.push('/welcome'))
//   return ''
// }
//
// export default withRouter(SignOut)
