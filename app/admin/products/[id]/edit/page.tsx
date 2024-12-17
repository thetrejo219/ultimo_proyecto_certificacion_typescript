import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

import { notFound } from "next/navigation"

async function getProductById(id:number) {
    const product = await prisma.product.findUnique({
        where:{
            id
        }
    })
    if(!product){
        notFound()
    }
    return product
}
type EditProductsPageProps={
  params:{id:string}
}

export default async function EditProductsPage({params}:EditProductsPageProps) {
  const product= await getProductById(+params.id)
  console.log(product)
  return (
    <div>
      <Heading>Editar Producto: {product.name}</Heading>
      <GoBackButton/>
      <EditProductForm>
        <ProductForm
          product={product}
        />
      </EditProductForm>
    </div>
  )
}
