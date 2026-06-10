"use client"
import { EmptyState } from "@/components/business/empty-state"
import { Button } from "@/components/ui/button"
import { FolderOpenIcon, SearchIcon, FileTextIcon, UsersIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function EmptyStatePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">EmptyState</h1>
      <p className="mt-2 text-muted-foreground">
        Empty state placeholder with icon, text, and optional call-to-action.
      </p>

      <section className="mt-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Title only</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState title="No results found" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Description</CardTitle>
            <CardDescription>Title and description</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="No projects yet"
              description="Get started by creating your first project."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Custom Icon</CardTitle>
            <CardDescription>Pass a Lucide icon component</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={SearchIcon}
              title="No search results"
              description="Try adjusting your search terms or filters."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Action Button</CardTitle>
            <CardDescription>Include a call-to-action</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={FolderOpenIcon}
              title="No files uploaded"
              description="Upload files to get started with your project."
              action={<Button size="sm">Upload File</Button>}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Various Contexts</CardTitle>
            <CardDescription>Different empty state use cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <EmptyState
                  icon={FileTextIcon}
                  title="No documents"
                  description="Create a document to begin."
                  action={
                    <Button size="sm" variant="outline">
                      New Document
                    </Button>
                  }
                />
              </div>
              <div className="rounded-lg border p-4">
                <EmptyState
                  icon={UsersIcon}
                  title="No team members"
                  description="Invite people to collaborate."
                  action={
                    <Button size="sm">Invite Members</Button>
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
