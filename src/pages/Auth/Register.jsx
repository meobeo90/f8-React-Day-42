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
            const token = res?.access_token;

            if (token) localStorage.setItem("accessToken", token);            
            navigate("/")
        } catch (error) {
            console.log(error);
           let message = "Đã có lỗi hệ thống xảy ra. Vui lòng thử lại sau!";
           const isNetworkError = error?.data === "Network Error" || error?.error === "TypeError: Failed to fetch";
           if (isNetworkError) {
            message = "Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng!"
           }
           else if (error?.data && typeof error.data === "object") {
            const errors = error.data;
            message = "Đăng ký không thành công!";
            if(errors?.email) {
                message = `${message} Email đã tồn tại!`
            }
             if(errors?.lastName || errors?.firstName) {
                message = `${message} Tên không hợp lệ!`
            }
           }
           toast.error(message);
        }
    }
    return (
        <div className="w-full">
            <h2 className="text-black text-3xl font-bold py-2 mb-4 text-center">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-90">
                <div>
                    <input type="text" {...register("fullName")} className="border rounded-sm p-2 w-full" placeholder="Enter your full name..."/>
                    {errors.fullName && (
                        <p className="text-red-500 text-sm">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>
                <div>
                    <input type="text" {...register("email")} className="border rounded-sm p-2 w-full" autoComplete="email" placeholder="Enter email..."/>
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <PasswordInput
                register = {register} name="password" placeholder="Enter password..." show={showPassword} toggle={()=> setShowPassword(v=>!v)} error={errors.password?.message} />
                <PasswordInput
                register = {register} name="confirmPassword" placeholder="Enter confirm password..." show={showConfirmPassword} toggle={()=> setShowConfirmPassword(v=>!v)} error={errors.confirmPassword?.message} />
         
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