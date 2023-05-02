import React from "react"
import {IconButton, TextField} from "@material-ui/core"
import {AddBox} from "@material-ui/icons"
import {useAddItemForm} from "./useAddItemForm";

export type AddItemFormSubmitHelperType = { setError: (error: string) => void, setTitle: (title: string) => void}
type AddItemFormPropsType = {
    addItem: (title: string, helper: AddItemFormSubmitHelperType) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({addItem, disabled = false}: AddItemFormPropsType) {
    const {error, title, onChangeHandler, onKeyPressHandler, addItemHandler} = useAddItemForm(addItem)

    return <div>
        <TextField variant="outlined"
                   disabled={disabled}
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItemHandler} disabled={disabled} style={{marginLeft: '5px'}}>
            <AddBox/>
        </IconButton>
    </div>
})
