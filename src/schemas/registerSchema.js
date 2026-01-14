import * as yup from "yup";
const registerSchema = yup.object({
  fullName: yup.string().required("Họ tên không được để trống!"),
  email: yup
    .string()
    .required("Email không được để trống!")
    .email("Email không đúng định dạng!"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống!")
    .min(8, "Mật khẩu phải có độ dài tối thiểu 8 ký tự!"),
  confirmPassword: yup
    .string()
    .required("Xác nhận mật khẩu không được để trống!")
    .oneOf(
      [yup.ref("password"), null],
      "Mật khẩu và xác nhận mật khẩu phải trùng nhau!"
    ),
});

export default registerSchema;
