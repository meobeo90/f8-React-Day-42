import { useLoginMutation } from "@/services/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "@/schemas/loginSchema";
import { sanitizeInput } from "@/utils/sanitize";
import PasswordInput from "@/components/PasswordInput";


function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState();
    const [login, {data, isSuccess, isError, isLoading}] = useLoginMutation();
    const {
        register, handleSubmit, formState:{errors}
    } = useForm({
        resolver: yupResolver(loginSchema)
    });

    useEffect(()=>{
        if(isSuccess){
            const {access_token} = data;
            console.log(data);
            localStorage.setItem("accessToken", access_token);
            navigate("/");
        }
    },[isSuccess, data, navigate])

    const onSubmit = (values) => {
        login({
            email: sanitizeInput(values.email.trim()),
            password: values.password,
        });
    }
    return (
        <div className="w-full">
            <h1 className="text-black text-3xl font-bold py-2 mb-4 text-center">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-90">
              <div>
                    <input type="text" {...register("email")} className="border rounded-sm p-2 w-full" placeholder="Enter email..."/>
                    {errors.email &&
                        (<p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>)
                    }
              </div>
               <PasswordInput
               register = {register} name="password" placeholder="Enter password..." autoComplete="current-password" show={showPassword} toggle={()=> setShowPassword(v=>!v)} error={errors.password?.message}/>
                <button disabled={isLoading} type="submit" className="cursor-pointer py-3 px-2 rounded-xl bg-pink-600 text-white font-bold">
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                {isError && (
                    <p className="text-red-500 text-sm font-medium">
                        Email hoặc mật khẩu không chính xác
                    </p>
                )}
            </form>
        </div>
    )
}
export default Login;