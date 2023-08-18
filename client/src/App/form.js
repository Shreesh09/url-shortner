import {useState} from "react";
import { useForm } from "react-hook-form";
export function Form () {
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = async (data) => {
        await fetch("https://boilerplate-express.shreeshnautiyal.repl.co/name", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setError(result.error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input  {...register("first")}/>
                <input  {...register("last")}/>
                {error ? <p itemType={"alert"}>{error}</p> : <></>}
                <button type={"submit"}>SUBMIT</button>
            </form>
        </div>
    );
}