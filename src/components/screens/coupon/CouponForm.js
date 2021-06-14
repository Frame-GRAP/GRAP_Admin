import React, {useState, useEffect} from "react";
import {Grid, TextField} from "@material-ui/core";
import useForm, {Form} from "../../controls/useForm";
import Controller from "../../controls/Controller";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";

const initialValues = {
    gameName:"",
    name: "",
    expirationDate: new Date()
}

function CouponForm(props) {
    const { addCoupon, editCoupon, recordForEdit, setGameId } = props
    const [gameName, setGameName] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('gameName' in fieldValues)
            temp.gameName = fieldValues.gameName ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
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
        e.preventDefault();
        if (validate()) {
            if(values.couponId){
                editCoupon(values, resetForm);
            }
            else{
                addCoupon(values, resetForm);
            }
        }
    }

    useEffect(() => {
        async function fetchGameData() {
            const request = await axios.get(`http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game?name=${gameName}`);

            setSearchResult(request.data);
            return request;
        }

        fetchGameData();
    }, [gameName])

    useEffect(() => {
        if(recordForEdit != null){
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    const changeGameName = (event) => {
        setTimeout(() => {
            const getName = event.target.value;
            if(getName !== "")
                setGameName(getName);
        }, 1000);
    }

    const changeGameId = (event, value) => {
        if(value !== null){
            const getId = value.id;
            setGameId(getId);
            setValues({...values, ["gameName"]: value.name});
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    {!recordForEdit &&
                    <Autocomplete
                        options={searchResult}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Game Name" variant="outlined" onChange={changeGameName}/>}
                        onChange={changeGameId}
                    />
                    }
                    <Controller.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
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
