import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import type { Address } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import AddressContainer from "./address/addressContainer";
import AddressFormContainer from "./AddressForm";

interface SheethandlerProps {
    addresses: Address[];
    onAddressSelect?: (address: Address | null) => void;
    selectedAddress?: Address | null;
}

export const Sheethandler: React.FC<SheethandlerProps> = ({
    addresses,
    onAddressSelect,
    selectedAddress: externalSelectedAddress,
}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openSheet, setOpenSheet] = useState(false);
    const [internalSelectedAddress, setInternalSelectedAddress] =
        useState<Address | null>(
            externalSelectedAddress || addresses?.[0] || null
        );


    useEffect(() => {
        if (externalSelectedAddress) {
            setInternalSelectedAddress(externalSelectedAddress);
        }
    }, [externalSelectedAddress]);

    const handleAddressSelect = (address: Address) => {
        setInternalSelectedAddress(address);
    };

    const handleSave = () => {

        if (onAddressSelect) {
            onAddressSelect(internalSelectedAddress);
        }
        setOpenSheet(false);
    };

    const handleAddNewAddress = () => {
        setOpenSheet(false);
        setOpenDialog(true);
    };

    
    return (
        <div>
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className="text-[#0e9ab9] cursor-pointer"
                    >
                        EDIT
                    </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle className="flex justify-between items-center">
                            <span>Shipping Address</span>
                            <Button
                                variant={"ghost"}
                                onClick={handleAddNewAddress}
                                className="text-[#0e9ab9]"
                            >
                                Add new Address
                            </Button>
                        </SheetTitle>

                        <SheetDescription className="px-2 py-3 text-black">
                            <div className="space-y-4 max-h-[400px] overflow-y-auto">
                                {addresses?.map((address, index) => (
                                    <div
                                        key={address.id || index}
                                        className="border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() =>
                                            handleAddressSelect(address)
                                        }
                                    >
                                        <div className="flex gap-4 items-start">
                                            <Checkbox
                                                checked={
                                                    internalSelectedAddress?.id ===
                                                    address.id
                                                }
                                                onCheckedChange={() =>
                                                    handleAddressSelect(address)
                                                }
                                                className="mt-1"
                                            />
                                            <AddressContainer
                                                address={address}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {(!addresses || addresses.length === 0) && (
                                    <div className="text-center py-4 text-gray-500">
                                        No addresses found. Add your first
                                        address.
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end pt-4 border-t mt-4">
                                <Button
                                    onClick={handleSave}
                                    className="bg-[#0e9ab9] hover:bg-[#0c8aa6] text-white"
                                >
                                    Save Address
                                </Button>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="w-full max-w-4xl p-6">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-medium tracking-wide">
                            Add new shipping Address
                        </DialogTitle>
                        <DialogDescription>
                            <AddressFormContainer
                                setOpenDialog={setOpenDialog}
                            
                            />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};
