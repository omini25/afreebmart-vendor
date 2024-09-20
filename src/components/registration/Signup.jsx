import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/actions/actions.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const Signup = () => {
    const [name, setName] = useState('');
    const [store_name, setStore_Name] = useState('');
    const [store_description, setStore_Description] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);

    const handleSignup = async (event) => {
        event.preventDefault();

        // Gather form data
        const formData = {
            name: name,
            store_name: store_name,
            store_description: store_description,
            email: email,
            phone: phone,
            location: `${streetNumber}, ${streetName}, ${city}, ${state}, ${country}, ${postalCode}`,
            password: password
        };

        // Dispatch the signup action with the form data
        const result = await dispatch(signup(formData));

        console.log('Signup Result:', result); // Log the signup result

        if (!result.error) {
            toast.success('Signup successful!');
            navigate('/dashboard');
        } else {
            toast.error('Signup failed!');
            navigate('/signup');
        }
    };


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://api.afreebmart.com/backend/images/logo/afreemart-logo.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up for a Vendor account
                    </h2>
                </div>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href="/" className="font-semibold leading-6 text-primary hover:text-secondary">
                        Login
                    </a>
                </p>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" onSubmit={handleSignup}>
                            {error && <p>{error}</p>}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Store Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="store_name"
                                        type="text"
                                        autoComplete="name"
                                        value={store_name}
                                        onChange={e => setStore_Name(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Store Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="name"
                                        name="store_name"
                                        autoComplete="name"
                                        value={store_description}
                                        onChange={e => setStore_Description(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        autoComplete="phone"
                                        required
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Your Address
                                </label>
                                <div className="mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div>
                                        <label htmlFor="streetNumber"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Street Number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="streetNumber"
                                                name="streetNumber"
                                                type="text"
                                                autoComplete="street-address"
                                                required
                                                value={streetNumber}
                                                onChange={e => setStreetNumber(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="streetName"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Street Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="streetName"
                                                name="streetName"
                                                type="text"
                                                autoComplete="street-address"
                                                required
                                                value={streetName}
                                                onChange={e => setStreetName(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="city"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                autoComplete="address-level2"
                                                required
                                                value={city}
                                                onChange={e => setCity(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="state"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            State/Province
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="state"
                                                name="state"
                                                type="text"
                                                autoComplete="address-level1"
                                                required
                                                value={state}
                                                onChange={e => setState(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="country"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Country
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="country"
                                                name="country"
                                                type="text"
                                                autoComplete="country-name"
                                                required
                                                value={country}
                                                onChange={e => setCountry(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="postalCode"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Postal Code
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="postalCode"
                                                name="postalCode"
                                                type="text"
                                                autoComplete="postal-code"
                                                required
                                                value={postalCode}
                                                onChange={e => setPostalCode(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Sign up
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}