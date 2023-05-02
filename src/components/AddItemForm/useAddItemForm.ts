import {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddItemFormSubmitHelperType} from "./AddItemForm";

export const useAddItemForm = (onItemAdded: (title: string, helper: AddItemFormSubmitHelperType) => void) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = async () => {
        if (title.trim() !== "") {
            onItemAdded(title, {setError, setTitle})
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItemHandler()
        }
    }
    return {
        error, title, onChangeHandler, onKeyPressHandler, addItemHandler
    }
}