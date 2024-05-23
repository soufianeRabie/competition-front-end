
export const initialState = {
  user: null,
  actions : [],
  users : [],
  intervennats : [],
  etablissments :[],
  regions : [],
  entreprises :[],
  themes : [],
  plans : [],
  certifications : [],
  domains :[],
}

const AppReducer = (state = initialState, action) => {
  console.log(action)
  switch (action?.type) {
    case 'SET_USER':
      return {...state, user: action?.payload?.user}
    case 'SET_INIT':
      const data = action?.payload
      return {...state ,
        user: data?.user,
        themes: data?.themes,
        etablissements: data?.etablissements,
        entreprises: data?.entreprises,
        intervennats: data?.intervennats,
        regions: data?.regions,
        actions:  data?.actions,
        users:  data?.users,

      }


  }
}

export default AppReducer
