import styles from './index.module.css';
import InputErrorMessage from '../input-error-message';
import SubmitBtn from '../submit-btn';
import { useState, useEffect, useContext } from 'react';
import ConfigContext from '../../contexts/ConfigContext';

const ImageInput = props => {
    const configContext = useContext(ConfigContext);

    const [imgInput, setImgInput] = useState('');
    const [preview, setPreview] = useState('');
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        setImgInput('');
        setPreview('');
        setRefresh(false);
    }, [refresh]);

    const onChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setImgInput('');
            setPreview('');

            return;
        }

        previewFile(file);
        setImgInput(e.target.value);
    }

    const previewFile = (file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setPreview(reader.result);
        };
    }

    const upload = async e => {
        e.preventDefault();

        const body = {
            file: preview
        }

        const promise = await fetch(`${configContext.restApiUrl}/img/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const response = await promise.json();

        props.setUrl(response.url);

        setRefresh(true);
    }

    return (
        <div className={styles.block}>
            <div style={{ marginBottom: '2.5%' }}>
                <input type='file' onChange={onChange} value={imgInput} placeholder='Image' />
            </div>
            {preview && (
                <div className={styles.previewDiv}>
                    <img className={styles.preview} src={preview} alt='preview' />
                </div>
            )}
            <SubmitBtn onClick={upload}>Upload Image</SubmitBtn>
        </div>
    );
}

export default ImageInput;
