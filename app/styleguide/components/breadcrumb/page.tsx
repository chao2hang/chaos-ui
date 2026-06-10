import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage as BreadcrumbCurrentPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
import { HomeIcon } from "lucide-react"
export default function BreadcrumbShowcase() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Breadcrumb</h1>
      <p className="mt-2 text-muted-foreground">Navigation breadcrumb showing the current page location.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic</h2>
        <Breadcrumb><BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Products</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbCurrentPage>Widget Pro</BreadcrumbCurrentPage></BreadcrumbItem>
        </BreadcrumbList></Breadcrumb>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Icon</h2>
        <Breadcrumb><BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#" className="flex items-center gap-1"><HomeIcon className="size-3.5" />Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbCurrentPage>Dashboard</BreadcrumbCurrentPage></BreadcrumbItem>
        </BreadcrumbList></Breadcrumb>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Ellipsis</h2>
        <Breadcrumb><BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Category</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbCurrentPage>Current Page</BreadcrumbCurrentPage></BreadcrumbItem>
        </BreadcrumbList></Breadcrumb>
      </section>
    </div>
  )
}
