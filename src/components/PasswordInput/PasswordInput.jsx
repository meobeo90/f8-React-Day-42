import { Eye, EyeOff } from "lucide-react";

function PasswordInput({
register, name, show, toggle, placeholder, autoComplete ="new-password", error
}) {
    console.log(error);
    
    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="relative">
                <input type={show? "text" : "password"} {...register(name)} autoComplete={autoComplete} className="w-full border rounded-sm p-2" placeholder={placeholder}/>
                    <button type="button" onClick={toggle} className="absolute z-10 top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer">
                        {show ? <EyeOff size="18"/> : <Eye size="18"/>}
                    </button>
            </div>
            {error && (
                <p className="text-red-500 text-sm">
                   {error}     
                </p>
            )}
        </div>
    )
}
export default PasswordInput;