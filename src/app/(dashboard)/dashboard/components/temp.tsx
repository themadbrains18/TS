// 'use client'

// import React from 'react'
// import Button from '@/components/ui/Button'
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { on } from 'stream';
// import DashInput from '../addtemplate/components/DashInput';

// const Temp = () => {
//     const formSchema = z.object({
//         name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
//       });
      
//       // Create a TypeScript type from the schema
//       type FormData = z.infer<typeof formSchema>;
      
//         const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
//           resolver: zodResolver(formSchema),
//         });
//       console.log(errors)
//         const onSubmit = (data: FormData) => {
//           console.log(data.name);
//         //   alert('Form submitted successfully!');
//         };
//   return (
// <>
// <form onSubmit={handleSubmit(onSubmit)}>
//     <DashInput name='name' onChange={()=>{}}   register={register('name')}  placeholder='name' />
//     <Button>click to submit</Button>
// </form>
// </>  )
// }

// export default Temp