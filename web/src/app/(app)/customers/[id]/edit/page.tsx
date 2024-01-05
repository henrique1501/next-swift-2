import { UpdateCustomerForm } from '../../components/update-customer-form'

export default function UpdateCustomer() {
  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Update Customer</h1>
        <span className="block text-muted-foreground">
          Update a customer present in your list.
        </span>
      </div>

      <UpdateCustomerForm />
    </section>
  )
}
