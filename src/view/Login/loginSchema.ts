import * as yup from "yup";
import { errorMessage } from "../../helpers/errorMessage";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(errorMessage.emailRequired)
    .required(errorMessage.emailRequired),
  password: yup.string().required(errorMessage.passwordRequired),
});
