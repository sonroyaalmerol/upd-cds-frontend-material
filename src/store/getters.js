const getters = {
  alert: state => state.app.alert,
  alertType: state => state.app.alertType,
  updateAvailable: state => state.app.updateAvailable,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  first_name: state => state.user.first_name,
  last_name: state => state.user.last_name,
  upid: state => state.user.upid,
  username: state => state.user.username,
  uid: state => state.user.uid,
  krhid: state => state.user.krhid,
  profileid: state => state.user.profileid,
  isAthletePerformer: state => state.user.isAthletePerformer,
  isCouncil: state => state.user.isCouncil
}
export default getters
