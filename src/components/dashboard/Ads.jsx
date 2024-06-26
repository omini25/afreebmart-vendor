import {Fragment, useEffect, useState} from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    FolderIcon,
    GlobeAltIcon,
    XMarkIcon,
    Bars3Icon,
    BuildingStorefrontIcon, IdentificationIcon,
    InboxStackIcon,
    MagnifyingGlassIcon, TagIcon, UserCircleIcon,
    UserGroupIcon,
    ShoppingBagIcon, ShoppingCartIcon, TruckIcon, WalletIcon, ListBulletIcon,
} from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions';
import axios from 'axios';
import {server} from "../../server.js";
import {assetServer} from "../../../assetServer.js";
import banknotesIcon from "@heroicons/react/16/solid/esm/BanknotesIcon.js";
import {ArrowRightStartOnRectangleIcon} from "@heroicons/react/20/solid/index.js";
import AddAds from "./AddAds.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";




const navigation = [
    { name: 'Overview', href: '/dashboard', icon: FolderIcon, current: false },
    { name: 'Orders', href: '/orders', icon: ShoppingCartIcon, current: false },
    { name: 'Products', href: '/products', icon: ShoppingBagIcon, current: false },
    // { name: 'Categories', href: '/categories', icon: ListBulletIcon, current: false },
    { name: 'Ads', href: '/ads', icon: GlobeAltIcon, current: true },
    { name: 'Deliveries', href: '/deliveries', icon: TruckIcon, current: false },
    { name: 'Payment History', href: '/payments', icon: banknotesIcon, current: false },
    { name: 'Payment Request', href: '/payments-requests', icon: WalletIcon, current: false },
    { name: 'Messages', href: '/messages', icon: InboxStackIcon, current: false },
    // { name: 'Users', href: '/users', icon: UserGroupIcon, current: false },
    // { name: 'Vendors', href: '/vendors', icon: BuildingStorefrontIcon, current: false },
    { name: 'Reviews', href: '/reviews', icon: IdentificationIcon, current: false },
    { name: 'Coupons', href: '/coupons', icon: TagIcon, current: false },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export const Ads = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isAddAdsOpen, setIsAddAdsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchads = async () => {
            try {
                const response = await axios.get(`${server}/vendor/ads/${user.user.id}`);

                setAds(response.data.flat());
            } catch (error) {
                console.error('Failed to fetch ads:', error);
            }
        };

        fetchads();
    }, []);

    const handleDelete = async (adId) => {
        try {
            const response = await axios.delete(`${server}/vendor/ads/${adId}`);
            if (response.status === 200) {
                // Remove the deleted ad from the ads state
                setAds(ads.filter(ad => ad.id !== adId));
            }
        } catch (error) {
            console.error('Failed to delete ad:', error);
        }
    };

    const handleStatusChange = async (adId, newStatus) => {
        try {
            const response = await axios.put(`${server}/vendor/ads/${adId}`, {
                status: newStatus === 'Active' ? 'active' : 'expired'
            });
            if (response.status === 200) {
                // Update the status of the ad in the ads state
                setAds(ads.map(ad => ad.id === adId ? {...ad, status: newStatus} : ad));
            }
        } catch (error) {
            console.error('Failed to update ad status:', error);
        }
    };

    const handleRenew = async (productId, amount, duration) => {
        try {
            const response = await axios.post(`${server}/stripe/checkout`, {
                product_id: productId,
                amount: amount,
                duration: duration
            });
            if (response.status === 200) {
                // Redirect to Stripe checkout
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error('Failed to renew product:', error);
        }
    };


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
                                                            toast.success('Logout successful!'); // display a toast message
                                                            navigate("/"); // navigate to home page
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
                                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-secondary hover:bg-secondary"
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
                                            toast.success('Logout successful!'); // display a toast message
                                            navigate("/"); // navigate to home page
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
                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-secondary hover:bg-secondary"
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
                        className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-transparent px-4 shadow-sm sm:px-6 lg:px-8">
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
                                    <div
                                        className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">Ads</h3>
                                        <div className="mt-3 sm:ml-4 sm:mt-0">
                                            <label htmlFor="mobile-search-candidate" className="sr-only">
                                                Search
                                            </label>
                                            <label htmlFor="desktop-search-candidate" className="sr-only">
                                                Search
                                            </label>
                                            <div className="flex rounded-md shadow-sm">
                                                <div className="relative flex-grow focus-within:z-10">
                                                    <div
                                                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"
                                                                             aria-hidden="true"/>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="mobile-search-candidate"
                                                        id="mobile-search-candidate"
                                                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                                                        placeholder="Search"
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                    <input
                                                        type="text"
                                                        name="desktop-search-candidate"
                                                        id="desktop-search-candidate"
                                                        className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                                                        placeholder="Search candidates"
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    onClick={() => setIsAddAdsOpen(true)}
                                                >
                                                    Create an Ad
                                                </button>
                                                <div className="fixed top-0 left-0 z-50">
                                                    {isAddAdsOpen &&
                                                        <AddAds onClose={() => setIsAddAdsOpen(false)}/>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flow-root">
                                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                                <table className="min-w-full divide-y divide-gray-300">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col"
                                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                            Product
                                                        </th>
                                                        {/*<th scope="col"*/}
                                                        {/*    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">*/}
                                                        {/*    Vendor*/}
                                                        {/*</th>*/}

                                                        <th scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Ad Details
                                                        </th>

                                                        <th scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Status and Updated Date
                                                        </th>

                                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                            <span className="sr-only">Action</span>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                    {ads.filter(ad => ad.product_name.toLowerCase().includes(searchTerm.toLowerCase()) || ad.product_id.toString().includes(searchTerm)).map((ad) => (
                                                        <tr key={ad.id}>
                                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                        <div
                                                                            className="font-medium text-gray-900">{ad.product_name}</div>
                                                                        <div
                                                                            className="mt-1 text-gray-500">#{ad.product_id}</div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                        <div
                                                                            className="font-medium text-gray-900">{ad.status}</div>
                                                                        <div
                                                                            className="mt-1 text-gray-500">{ad.duration} days
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                        <div
                                                                            className="font-medium text-gray-900">{ad.status}</div>
                                                                        <div className="mt-1 text-gray-500">
                                                                            {new Date(ad.updated_at).toLocaleDateString()}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                                {ad.status === 'expired' && (
                                                                    <button
                                                                        onClick={() => handleRenew(ad.id, ad.amount, ad.duration)}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                    >
                                                                        Renew
                                                                    </button>
                                                                )}
                                                            </td>

                                                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                                <select
                                                                    value={ad.status === 'expired' ? 'Suspend' : 'Active'}
                                                                    onChange={(e) => handleStatusChange(ad.id, e.target.value)}
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    <option value="Active">Active</option>
                                                                    <option value="Suspend">Suspend</option>
                                                                </select>
                                                            </td>


                                                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                                <button
                                                                    onClick={() => handleDelete(ad.id)}
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </main>

                </div>
            </div>
        </>
    )
}

export default Ads