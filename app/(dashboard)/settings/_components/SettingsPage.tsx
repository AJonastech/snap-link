"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useForm } from 'react-hook-form'
import { Separator } from '@/components/ui/separator'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { trpc } from '@/trpc/client'
import { LoadingButton } from '@/components/ui/LoadingButton'

function SettingsPage() {
    const {toast} = useToast()


    const router = useRouter();
    const { mutate: createSession, isPending: isCreatingSession } = trpc.user.createSubscriptionSession.useMutation({
      onSuccess: (data) => {
        // Redirect to Stripe Checkout
        toast({
          title: ` Subscription created `,
          description: "You will be redirected to Stripe Checkout."
        })
        router.push(`${data.sessionUrl}`);
      },
      onError:(err)=>{
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive"
      })
    }})

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      notifications: true,
      marketingEmails: false
    }
  })

const createStripeSession =()=>{
    createSession()
}

  const onSubmit = async (data: any) => {
    // TODO: Implement settings update
    toast({
      title: "Settings updated",
      description: "Your settings have been updated successfully."
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal information and profile settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about your link activity
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new features and updates
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>
                Manage your subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Free Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    You are currently on the free plan with 5 links limit
                  </p>
                  <LoadingButton loading={isCreatingSession}  onClick={createStripeSession} className="mt-4" variant="outline">
                  {isCreatingSession ? "Loading...":"Upgrade to Pro" }  
                  </LoadingButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPage