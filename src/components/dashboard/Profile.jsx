import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    ChartBarSquareIcon,
    Cog6ToothIcon,
    FolderIcon,
    GlobeAltIcon,
    ServerIcon,
    SignalIcon, UserIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions';



const navigation = [
    { name: 'Overview', href: '/dashboard', icon: FolderIcon, current: true },
    { name: 'Orders', href: '/orders', icon: ServerIcon, current: false },
    { name: 'Wishlist', href: '/wishlist', icon: SignalIcon, current: false },
    { name: 'Groups', href: '/account/groups', icon: GlobeAltIcon, current: false },
    { name: 'Messages', href: '/messages', icon: ChartBarSquareIcon, current: false },
    { name: 'Payment History', href: '/payments', icon: Cog6ToothIcon, current: false },
    { name: 'Profile', href: '/profile', icon: UserIcon, current: false },
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}





export const Profile = () => {
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false)

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
                                            <a href="/">
                                                <img
                                                    className="h-8 w-auto"
                                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                    alt="Your Company"
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
                                                                            ? 'bg-gray-800 text-white'
                                                                            : 'text-gray-400 hover:text-white hover:primary',
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
                                                            'text-gray-400 hover:text-white hover:bg-gray-800',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                        )}
                                                    >
                                                        <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                                        Log out
                                                    </a>
                                                </li>

                                                <li className="-mx-6 mt-auto">
                                                    <a
                                                        href="/"
                                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-secondary hover:bg-gray-800"
                                                    >
                                                        <img
                                                            className="h-8 w-8 rounded-full bg-gray-800"
                                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                            alt=""
                                                        />
                                                        <span className="sr-only">Your profile</span>
                                                        <span aria-hidden="true">Tom Cook</span>
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
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="Your Company"
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
                                        <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                        Log out
                                    </a>
                                </li>

                                <li className="-mx-6 mt-auto">
                                    <a
                                        href="/profile"
                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-secondary hover:bg-gray-800"
                                    >
                                        <img
                                            className="h-8 w-8 rounded-full bg-gray-800"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                        <span className="sr-only">Your profile</span>
                                        <span aria-hidden="true">Tom Cook</span>
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
                        <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden"
                                onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
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
                        {/* Settings forms */}
                        <div className="divide-y divide-white/5">
                            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-white">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-400">
                                        Use a permanent address where you can receive mail.
                                    </p>
                                </div>

                                <form className="md:col-span-2">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                        <div className="col-span-full flex items-center gap-x-8">
                                            <img
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                                className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                                            />
                                            <div>
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                                                >
                                                    Change avatar
                                                </button>
                                                <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                                                Username
                                            </label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                          <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                            example.com/
                          </span>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        id="username"
                                                        autoComplete="username"
                                                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                                        placeholder="janesmith"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="timezone" className="block text-sm font-medium leading-6 text-white">
                                                Timezone
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="timezone"
                                                    name="timezone"
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                                                >
                                                    <option>Pacific Standard Time</option>
                                                    <option>Eastern Standard Time</option>
                                                    <option>Greenwich Mean Time</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-white">Change password</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-400">
                                        Update your password associated with your account.
                                    </p>
                                </div>

                                <form className="md:col-span-2">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-white">
                                                Current password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="current-password"
                                                    name="current_password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-white">
                                                New password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="new-password"
                                                    name="new_password"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-white">
                                                Confirm password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="confirm-password"
                                                    name="confirm_password"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-white">Log out other sessions</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-400">
                                        Please enter your password to confirm you would like to log out of your other sessions across all of
                                        your devices.
                                    </p>
                                </div>

                                <form className="md:col-span-2">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <label htmlFor="logout-password" className="block text-sm font-medium leading-6 text-white">
                                                Your password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="logout-password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        >
                                            Log out other sessions
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-white">Delete account</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-400">
                                        No longer want to use our service? You can delete your account here. This action is not reversible.
                                        All information related to this account will be deleted permanently.
                                    </p>
                                </div>

                                <form className="flex items-start md:col-span-2">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                                    >
                                        Yes, delete my account
                                    </button>
                                </form>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </>
    )
}

export default Profile