import type { Address } from "@/types";

interface AddressContainerProps {
    address: Address;
}

const AddressContainer: React.FC<AddressContainerProps> = ({ address }) => {
    return (
        <div className="flex flex-col w-full p-3rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">
                    {address.name}
                </span>
                <div className="flex items-center gap-2">
                    {address.isDefault && (
                        <span className="text-xs text-blue-600 font-medium">
                            DEFAULT
                        </span>
                    )}
                    <span className="text-sm text-gray-500">
                        {address.phonenumber}
                    </span>
                </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
                <div className="capitalize px-4 text-lg w-fit  py-1 rounded-md text-white bg-blue-600">
                    {address.location.toLowerCase()}
                </div>
                <div>{address.street}</div>
                <div>
                    {address.city}, {address.state} {address.zipCode}
                </div>
                <div>{address.country}</div>
            </div>
        </div>
    );
};

export default AddressContainer;
