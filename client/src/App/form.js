import {useState} from "react";
import { useForm } from "react-hook-form";
export function Form () {
    const [error, setError] = useState("");
    const [url, setUrl] = useState("");
    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = async (data) => {
        await fetch("http://localhost:3030/api/url", {
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
                    setUrl(result.url);
                }
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input  {...register("link")}/>
                {error ? <p itemType={"alert"}>{error}</p> : <></>}
                <button type={"submit"}>SUBMIT</button>
            </form>
            <h2>Shortened URL</h2>
            <p>{url}</p>
        </div>
    );
}