
export const initialState = {
  user: null,
}

const AppReducer = (state = initialState, action) => {
  console.log(action)
  switch (action?.type) {
    case 'SET_USER':
      return {...state, user: action?.payload?.user}
  }
}

export default AppReducer
