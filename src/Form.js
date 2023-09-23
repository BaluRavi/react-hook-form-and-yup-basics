import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const Form = () => {

    const schema = yup.object().shape({
        fullname: yup.string().required("Please Enter Full Name"),
        email: yup.string().email().required(),
        age: yup.number().positive().integer().min(18).required(),
        password: yup.string().min(4).max(20).required(),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords dont match!!").required()
    })


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
    }


    return (<form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Full Name..." {...register("fullname")} ></input>
        <p>{errors.fullname?.message}</p>
        <br></br>
        <input type="text" placeholder="Email..." {...register("email")} />
        <p>{errors.email?.message}</p>
        <br></br>
        <input type="number" placeholder="Age..." {...register("age")} />
        <p>{errors.age?.message}</p>
        <br></br>
        <input type="password" placeholder="Password..." {...register("password")} ></input>
        <p>{errors.password?.message}</p>
        <br></br>
        <input type="password" placeholder="Confirm password..." {...register("confirmPassword")} />
        <p>{errors.confirmPassword?.message}</p>
        <br></br>
        <input type="submit" />
    </form>)
}