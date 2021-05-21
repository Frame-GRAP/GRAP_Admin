import React, {useState, useEffect} from "react";
import {Grid} from "@material-ui/core";
import useForm, {Form} from "../../controls/useForm";
import Controller from "../../controls/Controller";

const initialValues = {
    name: "",
    description: "",
    developer: "",
    publisher: "",
    releaseDate: new Date(),
    downloadUrl: "",
    img:[]
}

function GameForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."
        if ('developer' in fieldValues)
            temp.developer = fieldValues.developer ? "" : "This field is required."
        if ('publisher' in fieldValues)
            temp.publisher = fieldValues.publisher ? "" : "This field is required."
        if ('downloadUrl' in fieldValues)
            temp.downloadUrl = fieldValues.downloadUrl ? "" : "This field is required."
        if('img' in fieldValues)
            temp.img = fieldValues.img ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if(recordForEdit != null){
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    {!recordForEdit &&
                    <Controller.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />}
                    <Controller.Input
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
                    />
                    {!recordForEdit &&
                    <Controller.Input
                        name="developer"
                        label="Developer"
                        value={values.developer}
                        onChange={handleInputChange}
                        error={errors.developer}
                    />
                    }
                    {!recordForEdit &&
                    <Controller.Input
                        name="publisher"
                        label="Publisher"
                        value={values.publisher}
                        onChange={handleInputChange}
                        error={errors.publisher}
                    />
                    }
                    <Controller.Input
                        name="downloadUrl"
                        label="DownloadUrl"
                        value={values.downloadUrl}
                        onChange={handleInputChange}
                        error={errors.downloadUrl}
                    />
                    {!recordForEdit &&
                    <Controller.DatePicker
                        name="releaseDate"
                        label="ReleaseDate"
                        value={values.releaseDate}
                        onChange={handleInputChange}
                    />
                    }
                </Grid>
                <Grid item xs={6}>
                    {!recordForEdit &&
                    <Controller.Image
                        name="img"
                        label="Img"
                        value={values.img}
                        onChange={handleInputChange}
                        error={errors.img}
                    />
                    }
                    <div>
                        <Controller.Button
                            text="Submit"
                            onClick={handleSubmit}
                        />
                        <Controller.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}

export default GameForm;
