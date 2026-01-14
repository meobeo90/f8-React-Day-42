import PasswordInput from "@/components/PasswordInput";
import useToggle from "@/hooks/useToggle";
import registerSchema from "@/schemas/registerSchema";
import { useRegisterMutation } from "@/services/auth";
import { sanitizeInput } from "@/utils/sanitize";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";


function Register() {
    const navigate = useNavigate();
    const [registerUser, {isLoading}] = useRegisterMutation();
    const [showPassword, setShowPassword] = useToggle(false);
    const [showConfirmPassword, setShowConfirmPassword] = useToggle(false);
    const {
        register, handleSubmit, formState: {errors}
    }=useForm({
        resolver: yupResolver(registerSchema)
    })
    const onSubmit = async (values)=>{
        const safeFullName = sanitizeInput(values.fullName.trim());
        const safeEmail = sanitizeInput(values.email.trim());
        const [firstName, ...rest] = safeFullName.split(" ");
        try {
            const res = await registerUser({
                firstName,
                lastName: rest.join(" "),
                email: safeEmail,
                password: values.password,
                password_confirmation: values.confirmPassword
            }).unwrap();
            console.log(res);
            const token = res?.access_token || res?.data.access_token;

         if (token) localStorage.setItem("accessToken", res.access_token);            
            navigate("/")
        } catch (errors) {
            console.log(errors);
            
            const message = errors?.data.message.email?.[0] ||
            "Đăng ký không thành công!";
            
            toast.error(message);
        }
    }
    return (
        <div className="w-full">
            <h2 className="text-black text-3xl font-bold py-2 mb-4 text-center">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-90">
                <input type="text" {...register("fullName")} className="border rounded-sm p-2" placeholder="Enter your full name..."/>
                <p className="text-red-500 text-sm">
                    {errors.fullName?.message}
                </p>
                <PasswordInput
                register = {register} name="password" placeholder="Enter password..." show={showPassword} autoComplete="new-password" toggle={()=> setShowPassword(v=>!v)} error={errors.password.message} />
                <PasswordInput
                register = {register} name="confirmPassword" placeholder="Enter confirm password..." show={showConfirmPassword} autoComplete="new-password" toggle={()=> setShowConfirmPassword(v=>!v)} error={errors.confirmPassword.message} />
         
                <button disabled={isLoading} type="submit" className="cursor-pointer py-3 px-2 rounded-xl bg-pink-600 text-white font-bold">
                    {isLoading ? "Signing up..." : "Signup"}
                </button>
                <p className="text-sm font-bold">
                    Đã có tài khoản? <Link to="/login"className="hover:text-pink-600">Đăng nhập</Link>
                </p>
            </form>
        </div>
    )
}
export default Register;