import {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    FolderIcon,
    GlobeAltIcon,
    XMarkIcon,
    Bars3Icon,
    BuildingStorefrontIcon, IdentificationIcon,
    InboxStackIcon,
    MagnifyingGlassIcon, TagIcon, UserCircleIcon,
    UserGroupIcon,
    ShoppingBagIcon, ShoppingCartIcon, TruckIcon, WalletIcon, ListBulletIcon, PhotoIcon,
} from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions';
import axios from 'axios';
import {server} from "../../server.js";
import {assetServer} from "../../../assetServer.js";
import banknotesIcon from "@heroicons/react/16/solid/esm/BanknotesIcon.js";
import {ArrowRightStartOnRectangleIcon} from "@heroicons/react/20/solid/index.js";
import AddProduct from "./AddProduct.jsx";
import {useParams} from "react-router-dom";





const navigation = [
    { name: 'Overview', href: '/dashboard', icon: FolderIcon, current: false },
    { name: 'Orders', href: '/orders', icon: ShoppingCartIcon, current: false },
    { name: 'Products', href: '/products', icon: ShoppingBagIcon, current: true },
    // { name: 'Categories', href: '/categories', icon: ListBulletIcon, current: false },
    { name: 'Ads', href: '/ads', icon: GlobeAltIcon, current: false },
    { name: 'Deliveries', href: '/deliveries', icon: TruckIcon, current: false },
    { name: 'Payment History', href: '/payments', icon: banknotesIcon, current: false },
    { name: 'Payment Request', href: '/payments-requests', icon: WalletIcon, current: false },
    { name: 'Messages', href: '/messages', icon: InboxStackIcon, current: false },
    // { name: 'Users', href: '/users', icon: UserGroupIcon, current: false },
    // { name: 'Vendors', href: '/vendors', icon: BuildingStorefrontIcon, current: false },
    // { name: 'Admins', href: '/admins', icon: IdentificationIcon, current: false },
    // { name: 'Coupons', href: '/coupons', icon: TagIcon, current: false },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export const ProductEdit = () => {
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'));
    const [products, setProducts] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${server}/admin/products/${id}`);

                setProducts(response.data[0]);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);



    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div
                                        className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 ring-1 ring-white/10">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <a href="/dashboard">
                                                <img
                                                    className="h-8 w-auto"
                                                    src="src/assets/afreemart-logo.png"
                                                    alt="Afreebmart Vendor"
                                                />
                                            </a>
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-primary text-white'
                                                                            : 'text-gray-400 hover:text-white hover:bg-secondary',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <item.icon className="h-6 w-6 shrink-0"
                                                                               aria-hidden="true"/>
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li key="Log out">
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            dispatch(logout()); // dispatch the logout action when the link is clicked
                                                        }}
                                                        className={classNames(
                                                            'text-gray-400 hover:bg-red-800 hover:secondary',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                        )}
                                                    >
                                                        <ArrowRightStartOnRectangleIcon className="h-6 w-6 shrink-0"
                                                                                        aria-hidden="true"/>
                                                        Log out
                                                    </a>
                                                </li>

                                                <li className="-mx-6 mt-auto">
                                                    <a
                                                        href="/profile"
                                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-secondary hover:secondary"
                                                    >
                                                        <img
                                                            className="h-8 w-8 rounded-full bg-gray-800"
                                                            src={`${assetServer}/images/users/${user.user.image}`}
                                                            alt=""
                                                        />
                                                        <span className="sr-only">Your profile</span>
                                                        <span
                                                            aria-hidden="true">${user.vendor_info.wallet_balance}</span>
                                                        <span aria-hidden="true">{user.user.name}</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div
                        className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 ring-1 ring-white/5 border border-primary">
                        <div className="flex h-16 shrink-0 items-center">
                            <a href="/">
                                <img
                                    className="h-8 w-auto"
                                    src="src/assets/afreemart-logo.png"
                                    alt="Afreebmart Vendor"
                                />
                            </a>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-primary text-white'
                                                            : 'text-gray-400 hover:text-white hover:bg-secondary',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )}
                                                >
                                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li key="Log out">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(logout()); // dispatch the logout action when the link is clicked
                                        }}
                                        className={classNames(
                                            'text-gray-400 hover:bg-red-800 hover:secondary',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <ArrowRightStartOnRectangleIcon className="h-6 w-6 shrink-0"
                                                                        aria-hidden="true"/>
                                        Log out
                                    </a>
                                </li>

                                <li className="-mx-6 mt-auto">
                                    <a
                                        href="/profile"
                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-secondary hover:secondary"
                                    >
                                        <img
                                            className="h-8 w-8 rounded-full bg-gray-800"
                                            src={`${assetServer}/images/users/${user.user.image}`}
                                            alt=""
                                        />
                                        <span className="sr-only">Your profile</span>
                                        <span aria-hidden="true">${user.vendor_info.wallet_balance}</span>
                                        <span aria-hidden="true">{user.user.name}</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="xl:pl-72">
                    {/* Sticky search header */}
                    <div
                        className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
                        <button type="button" className="-m-2.5 p-2.5 text-black xl:hidden"
                                onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-5 w-5" aria-hidden="true"/>
                        </button>

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form className="flex flex-1" action="#" method="GET">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <div className="relative w-full">
                                    <MagnifyingGlassIcon
                                        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                                        aria-hidden="true"
                                    />
                                    <input
                                        id="search-field"
                                        className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                                        placeholder="Search..."
                                        type="search"
                                        name="search"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    <main className="lg:pr-10 lg:pl-10">
                        <div className="bg-white">


                            <main className="pb-14 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
                                <div className="px-4 sm:px-6 lg:px-8">
                                    <header
                                        className="border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                                        <div className="md:flex md:items-center md:justify-between">
                                            <div className="min-w-0 flex-1">
                                                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                                    Product #{id}
                                                </h2>
                                            </div>
                                        </div>
                                    </header>
                                    <form>
                                        <div className="space-y-12">
                                            <div className="border-b border-gray-900/10 pb-12">
                                                <h2 className="text-base font-semibold leading-7 text-gray-900">Product</h2>


                                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="username"
                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                            Product Name
                                                        </label>
                                                        <div className="mt-2">
                                                            <div
                                                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                                                <input
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    autoComplete="username"
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                    placeholder={`${products.product_name}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="username"
                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                            Category
                                                        </label>
                                                        <div className="mt-2">
                                                            <div
                                                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                                                <input
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    autoComplete="username"
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                    placeholder={`${products.category}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="username"
                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                            Sub-Category
                                                        </label>
                                                        <div className="mt-2">
                                                            <div
                                                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                                                <input
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    autoComplete="username"
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                    placeholder={`${products.subcategory}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="username"
                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                            Unit
                                                        </label>
                                                        <div className="mt-2">
                                                            <div
                                                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                                                <input
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    autoComplete="username"
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                    placeholder={`${products.unit}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="username"
                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                            Tags
                                                        </label>
                                                        <div className="mt-2">
                                                            <div
                                                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                                                <input
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    autoComplete="username"
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                    placeholder={`${products.tags}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-full">
                                                        <label htmlFor="about"
                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                            Description
                                                        </label>
                                                        <div className="mt-2">
                                                            <textarea
                                                                id="about"
                                                                name="about"
                                                                rows={3}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                                defaultValue={''}
                                                                placeholder={`${products.description}`}
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-span-full">
                                                        <label htmlFor="cover-photo"
                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                            Product Image
                                                        </label>
                                                        <div
                                                            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                            <div className="text-center">
                                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300"
                                                                           aria-hidden="true"/>
                                                                <div
                                                                    className="mt-4 flex text-sm leading-6 text-gray-600">
                                                                    <label
                                                                        htmlFor="file-upload"
                                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-indigo-500"
                                                                    >
                                                                        <span>Upload a file</span>
                                                                        <input id="file-upload" name="file-upload"
                                                                               type="file" className="sr-only"/>
                                                                    </label>
                                                                    <p className="pl-1">or drag and drop</p>
                                                                </div>
                                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG,
                                                                    GIF up to 10MB</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="username"
                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                            Weight
                                                        </label>
                                                        <div className="mt-2">
                                                            <div
                                                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                                                <input
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    autoComplete="username"
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                    placeholder={`${products.shipping_weight}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="username"
                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                            Price
                                                        </label>
                                                        <div className="mt-2">
                                                            <div
                                                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                                                <input
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    autoComplete="username"
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                    placeholder={`${products.price}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="username"
                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                            Bulk Price
                                                        </label>
                                                        <div className="mt-2">
                                                            <div
                                                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                                                <input
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    autoComplete="username"
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                    placeholder={`${products.group_price}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="username"
                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                            Quantity
                                                        </label>
                                                        <div className="mt-2">
                                                            <div
                                                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                                                <input
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    autoComplete="username"
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                    placeholder={`${products.quantity}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/*<div className="sm:col-span-4">*/}
                                                    {/*    <label htmlFor="username"*/}
                                                    {/*           className="block text-sm font-medium leading-6 text-gray-900">*/}
                                                    {/*        Vendor id*/}
                                                    {/*    </label>*/}
                                                    {/*    <div className="mt-2">*/}
                                                    {/*        <div*/}
                                                    {/*            className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">*/}
                                                    {/*            <input*/}
                                                    {/*                type="text"*/}
                                                    {/*                name="username"*/}
                                                    {/*                id="username"*/}
                                                    {/*                autoComplete="username"*/}
                                                    {/*                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"*/}
                                                    {/*                placeholder={`${products.vendor_id}`}*/}
                                                    {/*            />*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*</div>*/}

                                                </div>
                                            </div>

                                            
                                        </div>

                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            <button type="button"
                                                    className="text-sm font-semibold leading-6 text-gray-900">
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </main>


                        </div>
                    </main>

                </div>
            </div>
        </>
    )
}

export default ProductEdit