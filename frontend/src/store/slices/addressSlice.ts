import type { Address } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { addAddress, getAddresses } from "../thunks/authThunks";

interface AddressState {
    addresses: Address[];
    loading: boolean;
    error: string | null;
}

const initialState: AddressState = {
    addresses: [],
    loading: false,
    error: null,
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        clearAddresses: (state) => {
            state.addresses = [];
            state.error = null;
            state.loading = false;
        },
        setDefaultAddress: (state, action) => {
            const addressId = action.payload;
            state.addresses = state.addresses.map((address) => ({
                ...address,
                isDefault: address.id === addressId,
            }));
        },
        removeAddress: (state, action) => {
            const addressId = action.payload;
            state.addresses = state.addresses.filter(
                (address) => address.id !== addressId
            );
        },
    },
    extraReducers: (builder) => {
        // Add Address
        builder
            .addCase(addAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                // Add the new address to the state
                if (action.payload.address) {
                    state.addresses.push(action.payload.address);
                }
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as string) || "Failed to add address";
            });

        // Get Addresses
        builder
            .addCase(getAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                if (action.payload.addresses) {
                    state.addresses = action.payload.addresses;
                } else {
                    state.addresses = [];
                }
            })
            .addCase(getAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as string) || "Failed to fetch addresses";
                state.addresses = [];
            });
    },
});

export const { clearAddresses, setDefaultAddress, removeAddress } =
    addressSlice.actions;
export default addressSlice.reducer;
