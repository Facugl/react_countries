import * as C from "./styles"
import { ThemeActions, useForm } from "../../contexts/ThemeContext"

export const Header = () => {
  const { state, dispatch } = useForm()

  const handleChangeTheme = () => {
    dispatch({
      type: ThemeActions.setTheme,
      payload: state.theme === "light" ? "dark" : "light"
    })
  }

  return (
    <C.Header theme={state.theme}>
      <div className="container">
        <h1>Where in the World?</h1>
        <p onClick={handleChangeTheme}>Dark Mode</p>
      </div>
    </C.Header>
  )
}