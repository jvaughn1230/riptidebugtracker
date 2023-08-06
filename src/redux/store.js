import { configureStore } from "@reduxjs/toolkit";

export default function store(){
    const store = configureStore({
        reducer: rootReducer;
        
    })
};
