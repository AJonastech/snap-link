"use client"
import React, { useState, useEffect } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusCircle } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { trpc } from '@/trpc/client'
import { LoadingButton } from '@/components/ui/LoadingButton'
import DeleteModal from '@/components/DeleteModal'
import LinksTable from '@/components/LinksTable'
import LinksTableLoader from '@/components/LinksTableLoader'
import PaginationView from '@/components/PaginationView'


function Page() {
  const { toast } = useToast()
  const [page, setPage] = useState(1)
  const limit = 5
  const linksQuery = trpc.links.fetchLinks.useQuery({
    page,
    limit
  })

  const [linkToDelete, setLinkToDelete] = useState<string | null>(null)

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const openDeleteModal = (customId: string) => {

    setLinkToDelete(customId)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setLinkToDelete(null)
    setShowDeleteModal(false)
  }

  const confirmDelete = () => {
    if (linkToDelete) {
      handleDelete(linkToDelete)

    }
  }


  const mutation = trpc.links.createLink.useMutation(
    {
      onSettled: () => {
        linksQuery.refetch()
      },
      onSuccess: () => {
        setShowCreateForm(false)
        setFormData({
          originalUrl: '',
          customSlug: '',
          isPasswordProtected: false,
          password: '',
          expiryDate: ''
        })
        setIsFormSubmitted(false)
        toast({
          title: "Success",
          description: "Custom link created successfully",
        }),
        setLinkToDelete(null)
      },
   
      onError: (error) => {
        setIsFormSubmitted(false)
        toast({
          title: "Error",
          description: error?.message || "Failed to creates custom link",
        })
      }
    }
  )

  const { mutate: deleteLinkMutation, isPending: isDeleting, isError: isDeleteFailed } = trpc.links.deleteLink.useMutation({
    onSettled: () => {
      linksQuery.refetch()
    },
    onSuccess: () => {
      closeDeleteModal()
      toast({
        title: "Success",
        description: "Custom link deleted successfully",
        variant:"success"
      })
    },
    onError: (error) => {

      toast({
        title: "Error",
        description: error.message || "Failed to delete custom link",
        variant:"destructive"
      })
    }
  })






  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    originalUrl: '',
    customSlug: '',
    isPasswordProtected: false,
    password: '',
    expiryDate: ''
  })

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const handleCreate = async () => {
    const expiryDate = formData.expiryDate ? new Date(formData.expiryDate) : undefined;
    const isValidExpiryDate = expiryDate && !isNaN(expiryDate.getTime());
    setIsFormSubmitted(true)
    const newLink = {
      originalUrl: formData.originalUrl,
      customSlug: formData.customSlug,
      isPasswordProtected: formData.isPasswordProtected,
      password: formData.isPasswordProtected ? formData.password : undefined,
      expiryDate: isValidExpiryDate ? expiryDate : undefined, // Converted Date
    };

    mutation.mutate({
      originalUrl: newLink.originalUrl,
      customId: newLink.customSlug,
      password: newLink.password,
      expiryDate: newLink.expiryDate, // This should now be a Date or undefined
    });


  }


  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Optional: scroll to top on page change
  }

  const handleDelete = (customId: string) => {
    deleteLinkMutation({
      customId: customId
    })
  }
  return (
    <>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Custom Links</h1>
            <p className="text-muted-foreground">
              Create and manage your personalized short links
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Custom Link
          </Button>
        </div>

        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Custom Link {mutation.error?.message}</CardTitle>
              <CardDescription>
                Customize your short link with advanced features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="originalUrl">Original URL</Label>
                  <Input
                    id="originalUrl"
                    placeholder="https://example.com"
                    value={formData.originalUrl}
                    onChange={(e) => setFormData({ ...formData, originalUrl: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="customSlug">Custom Slug</Label>
                  <Input
                    id="customSlug"
                    placeholder="my-custom-link"
                    value={formData.customSlug}
                    onChange={(e) => setFormData({ ...formData, customSlug: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.isPasswordProtected}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPasswordProtected: checked })}
                  />
                  <Label>Password Protection</Label>
                </div>

                {formData.isPasswordProtected && (
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                  <Input
                    id="expiryDate"
                    type="datetime-local"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>

                <LoadingButton loading={mutation.isPending} onClick={handleCreate} >Create Link</LoadingButton>
                {mutation.isPending && <div>Loading...</div>}
                {isFormSubmitted && mutation.error && <div className="text-red-500">Error: {mutation.error.message}</div>}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Your Custom Links</CardTitle>
            <CardDescription>
              Manage and track your custom short links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Original URL</TableHead>
                  <TableHead>Custom Link</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  linksQuery.isLoading ? <LinksTableLoader/> : 
             
                  <LinksTable
                  linkData={linksQuery.data?.links.map(link => ({
                    ...link,
                    expiryDate: link.expiryDate ? new Date(link.expiryDate) : null,
                    createdAt: new Date(link.createdAt),
                    clickCount: link._count.clickDetails
                  })) || []}
                  openDeleteModal={openDeleteModal}
                />
                }
               
              </TableBody>
            </Table>
            {linksQuery.data?.links.length === 0 && !linksQuery.isLoading && (
                <div className="flex justify-center items-center min-h-[300px]">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="text-4xl">🔗</div>
                  <h3 className="font-semibold text-lg">No custom links yet</h3>
                  <p className="text-muted-foreground">Create your first custom link to get started</p>
                  <Button 
                  onClick={() => setShowCreateForm(true)}
                  variant="outline"
                  className="mt-2"
                  >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create your first link
                  </Button>
                </div>
                </div>
            )}

          <PaginationView
            currentPage={page}
            totalPages={linksQuery.data?.pagination.totalPages || 1}
            hasNextPage= {linksQuery.data?.pagination.hasNextPage || false}
            onPageChange= {handlePageChange}
            isLoading= {linksQuery.isLoading}
            showIfEmpty={false}
          />
          </CardContent>
        </Card>




      </div>
      <DeleteModal

        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        isDeleting={isDeleting}
        confirmDelete={confirmDelete}

      />

    </>



  )
}

export default Page
