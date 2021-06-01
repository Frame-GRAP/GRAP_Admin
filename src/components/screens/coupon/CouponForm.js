import React, {useState, useEffect} from "react";
import {Grid} from "@material-ui/core";
import useForm, {Form} from "../../controls/useForm";
import Controller from "../../controls/Controller";

const initialValues = {
    gameName:"",
    couponName: "",
    expirationDate: new Date()
}

function CouponForm(props) {
    const { addOrEdit, recordForEdit, editGame } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('gameName' in fieldValues)
            temp.gameName = fieldValues.gameName ? "" : "This field is required."
        if ('couponName' in fieldValues)
            temp.couponName = fieldValues.couponName ? "" : "This field is required."
        if ('expirationDate' in fieldValues)
            temp.expirationDate = fieldValues.expirationDate ? "" : "This field is required."
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
                        name="gameName"
                        label="GameName"
                        value={values.gameName}
                        onChange={handleInputChange}
                        error={errors.gameName}
                    />
                    }
                    <Controller.Input
                        name="couponName"
                        label="CouponName"
                        value={values.couponName}
                        onChange={handleInputChange}
                        error={errors.couponName}
                    />
                    <Controller.DatePicker
                        name="expirationDate"
                        label="ExpirationDate"
                        value={values.expirationDate}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
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

export default CouponForm;
