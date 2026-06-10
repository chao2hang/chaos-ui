import { PageHeader } from "@/components/business/page-header"
import { Button } from "@/components/ui/button"
import { PlusIcon, DownloadIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PageHeaderPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">PageHeader</h1>
      <p className="mt-2 text-muted-foreground">
        Page header with title, description, breadcrumbs, and action buttons.
      </p>

      <section className="mt-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Title only</CardDescription>
          </CardHeader>
          <CardContent>
            <PageHeader title="Dashboard" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Description</CardTitle>
            <CardDescription>Title and description</CardDescription>
          </CardHeader>
          <CardContent>
            <PageHeader
              title="Users"
              description="Manage your team members and their account permissions."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Breadcrumbs</CardTitle>
            <CardDescription>Title with breadcrumb navigation</CardDescription>
          </CardHeader>
          <CardContent>
            <PageHeader
              title="User Details"
              description="View and edit user information."
              breadcrumbItems={[
                { label: "Home", href: "/" },
                { label: "Users", href: "/users" },
                { label: "John Doe" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Actions</CardTitle>
            <CardDescription>Title with action buttons</CardDescription>
          </CardHeader>
          <CardContent>
            <PageHeader
              title="Invoices"
              description="Manage and track your invoices."
              actions={
                <>
                  <Button variant="outline" size="sm">
                    <DownloadIcon />
                    Export
                  </Button>
                  <Button size="sm">
                    <PlusIcon />
                    New Invoice
                  </Button>
                </>
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Full Example</CardTitle>
            <CardDescription>
              Breadcrumbs, title, description, and actions combined
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PageHeader
              title="Products"
              description="Manage your product catalog, inventory, and pricing."
              breadcrumbItems={[
                { label: "Home", href: "/" },
                { label: "Catalog", href: "/catalog" },
                { label: "Products" },
              ]}
              actions={
                <>
                  <Button variant="outline" size="sm">
                    Import
                  </Button>
                  <Button size="sm">
                    <PlusIcon />
                    Add Product
                  </Button>
                </>
              }
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
