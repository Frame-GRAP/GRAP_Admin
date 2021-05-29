import React, {useState, useEffect} from "react";
import {Grid} from "@material-ui/core";
import useForm, {Form} from "../../controls/useForm";
import Controller from "../../controls/Controller";

const initialValues = {
    name: "",
    img: "",
    email: "",
    nickname: "",
    membership: "",
}

function UserForm(props) {
    const { addOrEdit, recordForEdit, editGame } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "This field is required"
        if('nickname' in fieldValues)
            temp.nickname = fieldValues.nickname ? "" : "This field is required"
        if('membership' in fieldValues)
            temp.membership = fieldValues.membership ? "" : "This field is required"
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
                    <Controller.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controller.Input
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    {/*{!recordForEdit &&*/}
                    <Controller.Input
                        name="nickname"
                        label="Nickname"
                        value={values.nickname}
                        onChange={handleInputChange}
                        error={errors.nickname}
                    />
                    {/*{!recordForEdit &&*/}
                    <Controller.Input
                        name="membership"
                        label="Membership"
                        value={values.membership}
                        onChange={handleInputChange}
                        error={errors.membership}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller.Image
                        name="img"
                        label="Img"
                        value={values.img}
                        onChange={handleInputChange}
                        error={errors.img}
                    />
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

export default UserForm;
