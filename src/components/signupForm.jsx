import { useForm } from "react-hook-form"
import SignupErrorCard from "./signupErrorCard"
import axios from "axios"
import { useDispatch } from "react-redux"
import { changeLoginStatus } from "../features/login/loginSlice"


export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, data, {withCredentials:true})
    .then(response => {
      console.log('sign in successfull', response)
      dispatch(changeLoginStatus({loggedIn: true, user: response.data}))
    }).catch(error => {
      console.log('sign in failed')
      dispatch(changeLoginStatus({loggedIn:false, user:null}))
      
    })
  }


  // console.log(watch("example")) // watch input value by passing the name of it


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center align-middle md:w-1/2 mx-auto px-3">

      <label htmlFor="name" className="mt-10">Name</label>
      <input className="border-solid border-2 border-sky-400 rounded-md py-3 px-2" type="text" id="name" {...register('name', {required: true, maxLength: 15})}/>
      {errors.name && <SignupErrorCard type={errors.name.type} fieldName={"name"}/>}

      <label htmlFor="email" className="mt-3">Email</label>
      <input className="border-solid border-2 border-sky-500 rounded-md py-3 px-2" type="email" id="email" {...register('email', {required: true, pattern: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ })}/>
      {errors.email && <SignupErrorCard type={errors.email.type} fieldName={"email"}/>}
      
      <label htmlFor="password" className="mt-3">Password</label>
      <input className="border-solid border-2 border-sky-600 rounded-md py-3 px-2" type="password" id="password" {...register('password', {required: true, maxLength: 15, pattern: /^(?=.*[A-Za-z]{5,})(?=.*\d).+$/ })}/>
      {errors.password && <SignupErrorCard type={errors.password.type} fieldName={"password"} /> }

      


      <input className="border-solid border-2 border-sky-500 rounded-md py-3 text-center bg-blue-700 mt-10" type="submit" />
    </form>
  )
}