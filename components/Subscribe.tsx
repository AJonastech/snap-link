"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction } from "react";

export function SubscribeModal({ isOpen, onClose }: { isOpen: boolean; onClose: Dispatch<SetStateAction<boolean>> }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                        <span>Upgrade to Premium ⚡</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-blue-600">Why Upgrade?</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Unlimited link creation and management</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Advanced analytics and insights</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Custom branded domains</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Priority customer support</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                            Join thousands of professionals who've already upgraded to enhance their link management experience.
                        </p>
                    </div>
                    <Button 
                        className="w-full text-lg py-6"
                        size="lg"
                   
                    >
                        Upgrade Now
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}