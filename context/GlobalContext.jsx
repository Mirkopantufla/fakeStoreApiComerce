'use client'
import { createContext, useState } from "react";
import getState from "./GlobalFlux.jsx"

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [state, setState] = useState(getState({
        getStore: () => state.store,
        getActions: () => state.actions,
        setStore: (updateStore) => setState({
            store: Object.assign(state.store, updateStore),
            actions: { ...state.actions }
        })
    }))

    return (
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    )
}