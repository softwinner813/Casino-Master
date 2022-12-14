import horizontalMenuConfig from "../../../configs/horizontalMenuConfig"
const init = {
  data : horizontalMenuConfig
}

const customizerReducer = (state = init, action) => {
  switch (action.type) {
    case "HORIZONTALMENU":
      return { ...state, data : action.data }
    default:
      return state
  }
}

export default customizerReducer
