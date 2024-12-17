import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

async function getPendingOrders() {
    const orders = await prisma.order.findMany({
      where:{
        status:false
      },
      include:{
        orderProducts:{
          include:{
            product:true
          }
        }
      }
    })
    return orders
}

export default async function OrdersPage() {
  const orders =await getPendingOrders()
  return (
    <>
        <Heading>Administrar Ordenes</Heading>
        <form
          action={async ()=>{
            "use server"
            revalidatePath('/admin/orders')
          }}
        >
          <input type="submit"
            value={'Actualizar Ordenes'}
            className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center
      font-bold cursor-pointer"
          />
        </form>
        {orders.length?(
          <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mt-5">
            {orders.map(order=>(
              <OrderCard 
              order={order}
              key={order.id}
              />
            ))}
          </div>
        ):<p className="text-center">No hay ordenes pendientes</p>}
    </>
  )
}
