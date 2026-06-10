import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent } from "@/components/ui/card"

export default function PaginationPage() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-heading text-3xl font-bold">Pagination</h1>
        <p className="mt-2 text-muted-foreground">
          Navigation for paginated content with page links, previous/next buttons, and ellipsis for large page ranges.
        </p>
      </div>

      {/* Basic Pagination */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Basic</h2>
          <p className="text-sm text-muted-foreground">Standard pagination with numbered pages and prev/next.</p>
        </div>
        <Card>
          <CardContent>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </section>

      {/* With Ellipsis */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Ellipsis</h2>
          <p className="text-sm text-muted-foreground">Pagination with ellipsis for large page ranges.</p>
        </div>
        <Card>
          <CardContent>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">8</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    9
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </section>

      {/* With First/Last */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With First/Last</h2>
          <p className="text-sm text-muted-foreground">Pagination with first and last page links.</p>
        </div>
        <Card>
          <CardContent>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" text="First" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    5
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">6</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" text="Last" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </section>

      {/* Compact */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Compact</h2>
          <p className="text-sm text-muted-foreground">Minimal pagination showing only previous and next.</p>
        </div>
        <Card>
          <CardContent>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </section>

      {/* Compact with Current Page */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Compact with Page Info</h2>
          <p className="text-sm text-muted-foreground">Compact pagination displaying the current page number.</p>
        </div>
        <Card>
          <CardContent>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
