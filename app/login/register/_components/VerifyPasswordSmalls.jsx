import { regexSpecialCharacters } from '@/utils/regexStore';
import React from 'react'

const VerifyPasswordSmalls = (props) => {

    const checkIfContainsUpperCase = () => {

        for (let i = 0; i < props.registerPassword?.length; i++) {

            //Numeros decimales Unicode UTF-8, del 65 al 90, son letras A-Z en mayuscula
            if (props.registerPassword[i].charCodeAt() >= 65 && props.registerPassword[i].charCodeAt() <= 90) {
                return 'text-secondary'
            }
        }
        return 'text-warning'
    }

    const checkIfContainsLowerCase = () => {

        for (let i = 0; i < props.registerPassword?.length; i++) {

            //Numeros decimales Unicode UTF-8, del 97 al 122, son letras a-z
            if (props.registerPassword[i].charCodeAt() >= 97 && props.registerPassword[i].charCodeAt() <= 122) {
                return 'text-secondary'
            }
        }
        return 'text-warning'
    }

    const checkIfContainsNumber = () => {
        for (let i = 0; i < props.registerPassword?.length; i++) {

            //Numeros decimales Unicode UTF-8, del 49 al 57, son los numeros 1-9
            if (props.registerPassword[i].charCodeAt() >= 48 && props.registerPassword[i].charCodeAt() <= 57) {
                return 'text-secondary'
            }
        }
        return 'text-warning'
    }

    const checkIfContainsSpecialCharacter = () => {
        for (let i = 0; i < props.registerPassword?.length; i++) {
            //Numeros decimales Unicode UTF-8, del 49 al 57, son los numeros 1-9
            if (regexSpecialCharacters.test(props.registerPassword[i])) {
                return 'text-secondary'
            }
        }
        return 'text-warning'
    }


    return (
        <>
            <small className={props.registerPassword?.length >= 8 ? 'text-secondary' : 'text-warning'}>- Minimo 8 caracteres</small>
            <small className={props.registerPassword ? checkIfContainsUpperCase() : checkIfContainsUpperCase()}>- Almenos una letra Mayuscula</small>
            <small className={props.registerPassword ? checkIfContainsLowerCase() : checkIfContainsLowerCase()}>- Almenos una letra Minuscula</small>
            <small className={props.registerPassword ? checkIfContainsNumber() : checkIfContainsNumber()}>- Almenos un numero</small>
            <small className={props.registerPassword ? checkIfContainsSpecialCharacter() : checkIfContainsSpecialCharacter()}>- Almenos un caracter especial</small>
        </>
    )
}

export default VerifyPasswordSmalls