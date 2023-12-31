'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Dropzone } from './dropzone'

const addProductFormSchema = z.object({
  name: z.string().min(5, { message: 'Name must have at least 5 words' }),
  description: z.string().optional(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  weight: z.coerce.number(),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  images: z.instanceof(File).array(),
  category: z.string({ required_error: 'Select one category' }),
})

type AddProductFormValues = z.infer<typeof addProductFormSchema>

const categories = [
  {
    value: 'j45hj4h5h',
    label: 'shirts',
  },
  {
    value: 'j344jj',
    label: 'shoes',
  },
  {
    value: 'dfdjfjdf89df8',
    label: 'black-shoes',
  },
  {
    value: 'bdnfnbdf8',
    label: 'blue-pants',
  },
  {
    value: 'bbdnfbdfnb33',
    label: 'rayban oculus',
  },
]

export function AddProductForm() {
  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductFormSchema),
    mode: 'onChange',
  })

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = form

  function handleAddProduct(data: AddProductFormValues) {
    console.log({ data })

    setValue('name', '')
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
        <div className="grid grid-cols-1 space-y-6 lg:grid-cols-[16rem_1fr] lg:space-x-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width (cm)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="180" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="362" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (cm)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="55" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (US$)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="72.90" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="63" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="White t-shirt..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Lorem ipsum dolor sit amet..."
                      className="h-32 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Images ({field.value?.length ?? '0'})</FormLabel>
                    <FormControl>
                      <Dropzone onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add Product
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
