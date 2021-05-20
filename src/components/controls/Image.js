import React, {useState} from "react";
import ImageUploader from 'react-images-upload';

export default function Image(props){
    const {name, label, value, onChange, ...other} = props;
    const onDrop = (name, value, pictureBase64) => ({
        target:{
            name, value
        }
    });

    return (
        < ImageUploader
            withIcon={true}
            buttonText='이미지를 선택하세요'
            onChange={(files, pictures) => onChange(onDrop(name, files, pictures))}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
        />
    )
}
