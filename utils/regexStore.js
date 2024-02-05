//Correos validados con formato valido
export const regexCorreos = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

//Solo letras admitidas en este campo
export const regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ'\s]+$/;

//Solo textos descriptivos, permite numeros, letras y caracteres
//Permite: numeros 0-9 
// letras minusculas a-z 
// letras mayusculas A-Z 
// Vocales con tilde 
// Caracteres especiales: ñ Ñ / ' ² ! ¡ ) ( , . - [ ] whitespace
export const regexTextSpecialCharacters = /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ/'²!¡)(,.\‐\-\s\[\]]+$/;

//Solo numeros del 0-9
export const regexSoloNumeros = /^[0-9]+$/;

//Solo numeros del 0-9
export const regexSoloValores = /^\d+(?:[.,]\d+)?$/;

//Rut Valido, que sea una cadena 'xxxxxxxx-x'
export const regexRut = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/;

//- Minimo 8 caracteres
//- Almenos una letra Mayuscula
//- Almenos una letra Minuscula
//- Almenos un numero
//- Almenos un caracter especial
export const regexSecurePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//-Caracteres escpeciales
export const regexSpecialCharacters = /^[`!@#$%&^*()_+\-=\[\]{};':\\|,.<>\/?~¡"¿¬]/;