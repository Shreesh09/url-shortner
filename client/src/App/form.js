import {useState} from "react";
import { useForm } from "react-hook-form";
import './form_style.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
export function Form () {
    const [error, setError] = useState("");
    const [url, setUrl] = useState("");
    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = async (data) => {
        await fetch("https://url-shortner-3z51.vercel.app/api/url", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((result) => {
                if(result.error)
                    setError(result.error);
                else{
                    setError("");
                    setUrl(result.url);
                }
            });
    };

    return (
        <div id={"box"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id={"heading-box"}>
                    <h1 id={"heading"}>URL SHORTNER</h1>
                </div>
                <div className={"field"}>
                    <p className={"field-heading"}>Enter a url</p>
                    <div id={"label"}>
                        <input  {...register("link")}/>
                    </div>
                    {error ? <div className={"error"}><FontAwesomeIcon className={"error-icon"} icon={faCircleExclamation} /><p className={"error-text"} itemType={"alert"}>{error}</p></div> : <></>}
                </div>

                <div className={"field"}>
                    <p  className={"field-heading"}>Short url</p>
                    <div id={'short-url'}>
                        <p id={'url'}>{url}&nbsp;</p>
                    </div>
                </div>
                <div id={"button-box"}>
                    <button id={"submit-button"} type={"submit"}>SUBMIT</button>
                </div>
            </form>
        </div>
    );
}