import {ADD_ACTIONS, ADD_INTERVENANT, ADD_THEMES} from "@/library/index.jsx";

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
        intervennats: data?.intervenants,
        regions: data?.regions,
        actions:  data?.actions,
        users:  data?.users,

      }

    case ADD_THEMES:
      return {...state ,
        themes: [action?.payload?.theme , ...state.themes]
      }

    case ADD_INTERVENANT:
      return {...state ,
        intervennats: [action?.payload?.intervenant , ...state.intervennats]
      }

    case ADD_ACTIONS:
      return {...state ,
        actions: [action?.payload?.action , ...state.actions]
      }


  }
}

export default AppReducer
