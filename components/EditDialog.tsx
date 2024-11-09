
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Settings } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { Button } from './ui/button'
import { Link as LinkType } from '@prisma/client'

function EditDialog({ linkData, handleEdit }: { linkData: Omit<LinkType, 'password'>, handleEdit: (event: React.FormEvent<HTMLFormElement>) => void }) {
    const [isPasswordProtected, setIsPasswordProtected] = React.useState(linkData.isPasswordProtected)
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Settings className="h-5 w-5 text-muted-foreground" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Link Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="originalUrl">Original URL</Label>
              <Input id="originalUrl" defaultValue={linkData.originalUrl} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customId">Custom ID</Label>
              <Input id="customId" defaultValue={linkData.customId ?? ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                defaultValue={linkData.expiryDate ? linkData.expiryDate.toISOString().split('T')[0] : ''}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isPasswordProtected"
                checked={isPasswordProtected}
                onCheckedChange={setIsPasswordProtected}
              />
              <Label htmlFor="isPasswordProtected">Password Protected</Label>
            </div>
            {isPasswordProtected && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
            )}
            <Button type="submit">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

export default EditDialog