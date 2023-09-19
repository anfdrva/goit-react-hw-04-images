import { ButtonStyled } from "./Button.styled"


export const Button = ({nextPage}) => {
    return (
         <ButtonStyled onClick={nextPage}>Load More</ButtonStyled>
    )
}