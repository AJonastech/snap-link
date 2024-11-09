import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {Link as LinkType} from "@prisma/client"
import { trpc } from '@/trpc/client'
import { LoadingButton } from './ui/LoadingButton'
import { useToast } from '@/hooks/use-toast'
import DeleteModal from './DeleteModal'
import { useRouter } from 'next/navigation'
function LinkSettings({
    linkDetails
}:{
    linkDetails: Omit<LinkType, "password">
}) {
    const linksQuery = trpc.links.fetchLinks.useQuery({
        page:1,
        limit:5
      })
    const [showDeleteModal, setShowDeleteModal] = React.useState(false)
    const router= useRouter()
    const {toast} = useToast()
    const {mutate:updateLinkDetails, isPending:isUpdating} = trpc.links.updateLinkDetails.useMutation({
        onSuccess: () => {

            toast({
                title: "Link updated",
                description: "Link details have been updated successfully",
                variant: "success"
            })

            linksQuery.refetch()
        },
        onError: (err) => {
      
            toast({
                title: "Error",
                description: err.message,
                variant: "destructive",
            })
        }
    })
    const {mutate:deleteLink, isPending:isDeleting} = trpc.links.deleteLink.useMutation({
        onSuccess:()=>{
            toast({
                title: "Link deleted",
                description: "Link has been deleted successfully",
                variant: "success"
            })
            linksQuery.refetch()
            setShowDeleteModal(false)
            router.push("/custom-links")
        },
        onError:(err)=>{
            toast({
                title: "Link deleted",
                description: err.message,
                variant: "destructive"
            })
     
        }
    })

    
    const handleUpdateLinkDetails = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
         const formData = new FormData(e.currentTarget)
         const customId = formData.get("customId") as string
         const originalUrl = formData.get("originalUrl") as string
         updateLinkDetails({
            customId,
            originalUrl,
            expiryDate: linkDetails.expiryDate ?? undefined,
         })
    }
   
    const confirmDelete = ()=>{
        deleteLink({ customId: linkDetails.customId as string })
    
    }
return (

    <div className="grid gap-8 p-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Link Information Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
            <form onSubmit={handleUpdateLinkDetails} className="space-y-6">
    <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Custom Link Name
            </label>
            <Input 
                name="customId" // Add name attribute here
                className="py-3 border rounded-md"
                placeholder="Enter custom link name"
                defaultValue={linkDetails?.customId as string}
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Target URL
            </label>
            <Input 
                name="originalUrl" // Add name attribute here
                className="py-3 border rounded-md"
                type="url"
                placeholder="https://example.com"
                defaultValue={linkDetails?.originalUrl}
            />
        </div>
        <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Expiry Date
            </label>
            <Input 
                name="expiryDate" // Add name attribute if you plan to use this value
                className="py-3 border rounded-md"
                type="date"
                defaultValue={linkDetails?.expiryDate?.toISOString().split('T')[0]}
            />
        </div>
        <LoadingButton loading={isUpdating} className="w-full md:col-span-2" variant="default">
          {isUpdating ? "Saving Changes": "Save Changes"}
        </LoadingButton>
    </div>
</form>

            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="space-y-0.5">
                        <h3 className="font-medium tracking-tight">Link Status</h3>
                        <p className="text-sm text-muted-foreground">Enable or disable this link</p>
                    </div>
                    <Button variant="outline">
                        {true ? 'Deactivate' : 'Activate'}
                    </Button>
                </div>

                <div className="space-y-4">
                    <h3 className="font-medium tracking-tight">Password Protection</h3>
                    <Input
                        className="py-3 border rounded-md"
                        type="password"
                        placeholder="Set new password"
                    />
                    <Button variant="outline" className="w-full">
                        Update Password
                    </Button>
                </div>
            </CardContent>
        </Card>

        <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
                <CardTitle className="text-destructive text-lg font-semibold">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Once you delete a link, there is no going back. Please be certain.
                    </p>
                    <Button onClick={()=>{setShowDeleteModal(true)}} variant="destructive" className="w-full">
                        Delete Link
                    </Button>
                </div>
            </CardContent>
        </Card>

        <DeleteModal
 
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        isDeleting={isDeleting}
        confirmDelete={confirmDelete}

      />

    </div>

)
}

export default LinkSettings