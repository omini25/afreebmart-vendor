import {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {PhotoIcon} from "@heroicons/react/20/solid/index.js";
import axios from "axios";
import {server} from "../../server.js";
import {toast} from "react-toastify";
import {loadStripe} from '@stripe/stripe-js';



export function AddCategory({onClose}) {
    const [open, setOpen] = useState(true)
    const user = JSON.parse(localStorage.getItem('user'));
    const [products, setProducts] = useState([]);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${server}/vendor/products/${user.user.id}`);

                setProducts(response.data.products);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const product_id = document.getElementById('product_id').value;
        const duration = document.getElementById('duration').value;
        const amount = document.getElementById('amount').value;

        const stripe = await loadStripe('pk_test_51K4bVzCT7v0Ax3ZCQUKpDk4gTPZ6UuWcJlMpNULOujrGRhsEL4IPAdeZ7KwDXIFEcJ5sLTxm3r2DMCUaQYWbLl2W00W13HDVPl');

        // Call your backend to create the Checkout Session
        const response = await fetch(`${server}/ads/checkout/${user.user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: product_id,
                duration: duration,
                amount: amount
            })
        });

        const session = await response.json();

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            alert(result.error.message);
        }
    };


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                    <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl" onSubmit={handleSubmit}>
                                        <div className="flex-1">

                                            <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between space-x-3">
                                                    <div className="space-y-1">
                                                        <Dialog.Title
                                                            className="text-base font-semibold leading-6 text-gray-900">
                                                            New Ad
                                                        </Dialog.Title>
                                                        <p className="text-sm text-gray-500">
                                                            Add a new ad to your store
                                                        </p>
                                                    </div>
                                                    <div className="flex h-7 items-center">

                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                            onClick={onClose}
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Divider container */}
                                            <div
                                                className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="project-name"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Products
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <select
                                                            name="product_id"
                                                            id="product_id"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        >
                                                            {products.map((product) => (
                                                                <option
                                                                    key={product.id}
                                                                    value={product.id}
                                                                >
                                                                    {product.product_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>


                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="duration"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Number of days
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="number"
                                                            name="duration"
                                                            id="duration"
                                                            value={duration}
                                                            onChange={(e) => setDuration(e.target.value)}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="amount"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Amount
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="number"
                                                            name="amount"
                                                            id="amount"
                                                            value={duration * 1.5}
                                                            readOnly
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    onClick={onClose} // Call the onClose prop function when the button is clicked
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                                >
                                                    Create Ad
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default AddCategory;
