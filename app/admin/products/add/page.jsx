"use client"
import { GlobalContext } from '@/context/GlobalContext';
import { baseURL } from '@/utils/paths';
import { regexSoloLetras, regexSoloValores } from '@/utils/regexStore';
import { allowed_photo_extensions, allowed_photo_max_size, capitalizedFirstLetter } from '@/utils/validations';
import React, { useContext, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import ImageModal from './_components/ImageModal';

//   /products/add
const adminProductsAdd = () => {

    const [currentPhoto, setCurrentPhoto] = useState(undefined);
    const { store } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(false);
    const [productTitle, setProductTitle] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productPhotos, setProductPhotos] = useState([]);
    const [addCategory, setAddCategory] = useState(false);

    const inputClassName = 'input text-center input-bordered input-primary w-full max-w-xl';

    const deletePhoto = (position) => {

        let newArray = []

        if (productPhotos.length > 1) {
            productPhotos.map((photo, index) => index !== position ? newArray.push(photo) : null)
        } else {
            newArray = []
        }

        setProductPhotos(newArray)
    }

    const validateFormData = (target, emptyErrorMessage, regexErrorMessage, regex) => {

        // validateFormData = (target, emptyErrorMessage, regexErrorMessage, regex)
        // target: recibe un nodelist del input, buscado por el nombre (document.getElementsByName()[0])
        // emptyErrorMessage: En caso de estar vacio el campo, enviara este mensaje
        // regexErrorMessage: En caso de estar mal la validacion por regex, enviara este mensaje
        // regex: Recibe el regex que validara si esta bien formateada la informacion recibida

        let hasError = false;
        //Validando los campos para que no esten vacios y que cumplan cierta condicion, dependiendo del regex que le pasemos
        // -Las imagenes se validan aparte, por ser otro tipo de dato
        // -Para mejor legibilidad, se crea una funcion


        if (target.name === "product-photos") {
            // validatePhotos(file, sibling, list)
            return hasError = validatePhotos(productPhotos, target.files, target.nextElementSibling, target.classList);

        } else {

            if (target.value === "" || target.value === undefined) {
                hasError = true;
                target.nextElementSibling.classList.remove("hidden");
                target.nextElementSibling.innerHTML = emptyErrorMessage;
                target.classList.add("border-error")
                target.classList.remove("border-primary")
                return hasError;

            } else if (regex ? !regex.test(target.value) : null) {
                hasError = true;
                target.nextElementSibling.classList.remove("hidden");
                target.nextElementSibling.innerHTML = regexErrorMessage;
                target.classList.add("border-error")
                target.classList.remove("border-primary")
                return hasError;
            } else {
                hasError = false;
                target.nextElementSibling.classList.add("hidden")
                target.classList.add("border-primary")
                target.classList.remove("border-error")
                return hasError;
            }
        }
    }

    const validateAfterSubmit = () => {
        let hasError = true;

        let counter = 0;

        const title = document.getElementsByName("product-title")[0]
        const price = document.getElementsByName("product-price")[0]
        const description = document.getElementsByName('product-description')[0]
        const category = document.getElementsByName('product-category')[0]
        const images = document.getElementsByName('product-photos')[0]

        // validateFormData = (target, emptyErrorMessage, regexErrorMessage, regex)
        // target: recibe un nodelist del input, buscado por el nombre (document.getElementsByName()[0])
        // emptyErrorMessage: En caso de estar vacio el campo, enviara este mensaje
        // regexErrorMessage: En caso de estar mal la validacion por regex, enviara este mensaje
        // regex: Recibe el regex que validara si esta bien formateada la informacion recibida
        validateFormData(title, "El titulo no puede quedar vacio", "El titulo debe tener solo letras") ? null : counter += 1;
        validateFormData(price, "El precio no puede quedar vacio", "El precio debe tener un formato valido (22.22)", regexSoloValores) ? null : counter += 1;
        validateFormData(description, "La descripcion no puede quedar vacia", "La descripcion debe tener solo letras") ? null : counter += 1;
        validateFormData(category, "Debes seleccionar una opcion de categoria") ? null : counter += 1;
        validateFormData(images) ? null : counter += 1;


        counter === 5 ? hasError = false : hasError = true;

        return hasError;
    }

    const validatePhotos = (stateFiles, targetFiles, sibling, list) => {
        // files: e
        // asd
        // asd
        // asd
        let hasError = false;
        let counter = stateFiles.lenght

        if (stateFiles.lenght === 0 && targetFiles.length === 0) {
            hasError = true;
            counter -= 1
            sibling.classList.remove("hidden");
            sibling.innerHTML = "At least one image is required";
            list.add("border-error")
            list.remove("border-primary")
            return hasError
        }

        stateFiles?.map((image) => {

            let backwardsString = image.name.split(".").reverse()

            if (!allowed_photo_extensions.includes(backwardsString[0].toLowerCase())) {
                hasError = true;
                counter -= 1
                sibling.classList.remove("hidden");
                sibling.innerHTML = "Files format must be .jpg, .jpeg, .png.";
                list.add("border-error")
                list.remove("border-primary")
                return hasError;
            }

            if (image.size > allowed_photo_max_size) {
                hasError = true;
                counter -= 1
                sibling.classList.remove("hidden");
                sibling.innerHTML = "Files weight must be less than 2 MB.";
                list.add("border-error")
                list.remove("border-primary")
                toast.error("Files weight must be less than 2 MB.")
                return hasError;
            }
        })

        // Si el contador sigue teniendo la misma cantidad, significa que ninguna foto dio error
        // Por lo tanto, quitamos el error y devolvemos el contador a 0
        if (counter === stateFiles.lenght) {
            hasError = false;
            sibling.classList.add("hidden")
            list.add("border-primary")
            list.remove("border-error")
            counter = 0;
            return hasError;
        }

        return hasError;
    }

    const addProductOnSubmit = async (e) => {
        e.preventDefault()

        //Si esta todo validado correctamente, puede continuar con el fetch
        if (validateAfterSubmit()) {
            return toast.warning("You must make sure you fill out all the fields and have no errors.", { autoClose: 3000 })
        }

        setIsLoading(true)

        const sendedFormData = new FormData();
        sendedFormData.append('title', productTitle)
        sendedFormData.append('price', parseFloat(productPrice))
        sendedFormData.append('description', productDescription)
        sendedFormData.append('category', productCategory)
        productPhotos?.map((image) => sendedFormData.append('images', image))

        try {

            const options = {
                method: 'POST',
                body: sendedFormData
            }

            const respJson = await fetch(`${baseURL}/products/add`, options);
            const data = await respJson.json();

            if (data.success) {
                toast.success("Producto Añadido correctamente", { autoClose: 2000 })
            } else if (data.warning) {
                toast.warning(data.warning, { autoClose: 2000 })
            }

        } catch (error) {
            toast.error(`Ha ocurrido un error... ${error}`);
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className='flex flex-col p-10'>
            <form onSubmit={addProductOnSubmit} className='form-control py-10 gap-6'>
                <h3 className='text-center text-3xl font-bold py-2'>Add Product</h3>
                {/*------------------------- PRODUCT TITLE -------------------------*/}
                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Product Title</label>
                    <input
                        className={inputClassName}
                        placeholder='Golden Neclace'
                        type="text"
                        name="product-title"
                        onChange={(e) => {
                            setProductTitle(capitalizedFirstLetter(e.target.value))
                            validateFormData(e.target, "El titulo no puede quedar vacio", "El titulo debe tener solo letras")
                        }}
                    />
                    <small className='hidden text-error'></small>
                </div>

                {/*------------------------- PRODUCT PRICE -------------------------*/}
                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Price</label>
                    <input
                        className={inputClassName}
                        placeholder='123.32'
                        type="text"
                        name="product-price"
                        onChange={(e) => {
                            setProductPrice(e.target.value)
                            validateFormData(e.target, "El precio no puede quedar vacio", "El precio debe tener un formato valido (22.22)", regexSoloValores)
                        }}
                    />
                    <small className='hidden text-error'></small>
                </div>

                {/*------------------------- PRODUCT DESCRIPTION -------------------------*/}
                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Description</label>
                    <textarea
                        className="textarea text-center input-bordered textarea-primary w-full max-w-xl mt-1"
                        placeholder='Duis maximus augue purus, nec interdum sem ultrices vel.'
                        type="text"
                        name="product-description"
                        rows={3}
                        onChange={(e) => {
                            setProductDescription(e.target.value)
                            validateFormData(e.target, "La descripcion no puede quedar vacia", "La descripcion debe tener solo letras")
                        }}
                    />
                    <small className='hidden text-error'></small>
                </div>

                {/*------------------------- PRODUCT CATEGORY -------------------------*/}
                <div className='flex flex-col gap-2 items-center w-full'>
                    <div className='grid grid-cols-3 w-full max-w-xl'>
                        <label className='col-start-2 text-lg font-bold justify-self-center' htmlFor="">Category</label>
                        <button
                            type='button'
                            className='btn btn-sm btn-primary justify-self-end'
                            onClick={() => setAddCategory(!addCategory)}
                        >
                            {
                                addCategory ? "Select Category" : "New Category"
                            }
                        </button>
                    </div>
                    {
                        addCategory === false ?
                            <select
                                defaultValue={''}
                                className="text-center select select-primary w-full max-w-xl"
                                name="product-category"
                                onChange={(e) => {
                                    setProductCategory(e.target.value)
                                    validateFormData(e.target, "Debes seleccionar una opcion de categoria")
                                }}
                                onBlur={(e) => validateFormData(e.target, "Debes seleccionar una opcion de categoria")}
                            >
                                <option value={''} disabled>Select an existing category</option>
                                {
                                    store.categories ?
                                        store.categories.map((category) => {
                                            return (
                                                <option key={`add-product-${category}`} value={category}>{category}</option>
                                            )
                                        })
                                        :
                                        null
                                }
                            </select>
                            :
                            <input
                                type="text"
                                name="product-category"
                                className={inputClassName}
                                id="" onChange={(e) => {
                                    setProductCategory(capitalizedFirstLetter(e.target.value))
                                    validateFormData(e.target, "Debes seleccionar una opcion de categoria")
                                }} />
                    }
                    <small className='hidden text-error'></small>
                </div>

                {/*------------------------- PRODUCT IMAGES -------------------------*/}
                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Images</label>
                    <input
                        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                        type="file"
                        name="product-photos"
                        id="product-photos"
                        multiple
                        onChange={(e) => {
                            setProductPhotos(Array.prototype.slice.call(e.target.files))
                            validateFormData(e.target, "Files must be format .jpg, .jpeg, .png")
                        }}
                    />
                    <small className='hidden text-error'></small>
                </div>

                {/*------------------------- SECCION PREVISUALIZADORA DE IMAGENES -------------------------*/}
                <div className={`flex ${productPhotos.length > 0 ? "border border-neutral gap-6 px-5 py-10 overflow-x-auto custom-scrollbar" : ""}`}>
                    {
                        productPhotos ?
                            productPhotos.map((photo, index) => {
                                return (

                                    <div key={`prev-image-viewer-${index}`} className='relative min-w-[400px] min-h-[250px] max-h-[250px] flex justify-center items-center border border-neutral'>
                                        <img
                                            id={`prev-image-viewer-${index}`}
                                            onClick={() => {
                                                setCurrentPhoto(photo)
                                                document.getElementById(`my_image_viewer_modal`).showModal()
                                            }}
                                            className='cursor-pointer object-contain max-w-[400px] max-h-[250px]'
                                            src={URL.createObjectURL(photo)}
                                            alt=""
                                        />
                                        <MdDelete
                                            className='absolute text-neutral text-4xl bg-primary hover:bg-secondary hover:scale-95 cursor-pointer top-0 right-0'
                                            onClick={(e) => deletePhoto(index)}
                                        />
                                    </div>

                                )
                            })
                            :
                            null
                    }
                </div>

                {/* <------------------------- REGISTER BUTTON ---------------------------> */}
                <button type='submit' disabled={store.isLoading} className='btn btn-primary w-1/3 disabled:opacity-75 self-center'>
                    {isLoading ?
                        <span className="loading loading-spinner loading-lg text-neutral"></span>
                        :
                        'Add Product'}
                </button>
            </form>

            {/* Se genera un dialogo, el cual despues es llamado por el id y se va modificando dinamicamente la imagen a mostrar*/}
            <ImageModal file={currentPhoto} />

        </div>
    )
}

export default adminProductsAdd