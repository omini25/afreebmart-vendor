import {Fragment, useEffect, useState} from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import {server} from "../../server.js";
import axios from 'axios';

const reviews = {
    average: 4,
    featured: [
        {
            id: 1,
            rating: 5,
            content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
            date: 'July 16, 2021',
            datetime: '2021-07-16',
            author: 'Emily Selman',
            avatarSrc:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
        },
        {
            id: 2,
            rating: 5,
            content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
            date: 'July 12, 2021',
            datetime: '2021-07-12',
            author: 'Hector Gibbons',
            avatarSrc:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
        },
        // More reviews...
    ],
}
const faqs = [
    {
        question: 'What format are these icons?',
        answer:
            'The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.',
    },
    {
        question: 'Can I use the icons at different sizes?',
        answer:
            "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
    },
    // More FAQs...
]
const license = {
    href: '#',
    summary:
        'For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.',
    content: `
    <h4>Overview</h4>
    
    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
    
    <ul role="list">
    <li>You\'re allowed to use the icons in unlimited projects.</li>
    <li>Attribution is not required to use the icons.</li>
    </ul>
    
    <h4>What you can do with it</h4>
    
    <ul role="list">
    <li>Use them freely in your personal and professional work.</li>
    <li>Make them your own. Change the colors to suit your project or brand.</li>
    </ul>
    
    <h4>What you can\'t do with it</h4>
    
    <ul role="list">
    <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
    <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
    </ul>
  `,
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const ProductDetails = ({product}) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`${server}/review/${product.id}`)
            .then(response => setReviews(response.data.reviews))
            .catch(error => console.error('Error:', error));
    }, [product.id]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Image gallery */}
                    <Tab.Group as="div" className="flex flex-col-reverse">
                        {/* Image selector */}
                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <Tab.List className="grid grid-cols-4 gap-6">
                                <Tab
                                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                >
                                    <>
                                        <span className="sr-only">{product.image}</span>
                                        <span className="absolute inset-0 overflow-hidden rounded-md">
                                            <img src={`https://api.afreebmart.com/images/products/${product.image}`} alt=""
                                                 className="h-full w-full object-cover object-center"/>
                                        </span>
                                        <span
                                            className='ring-transparent pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                            aria-hidden="true"
                                        />
                                    </>
                                </Tab>
                            </Tab.List>
                        </div>

                        <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                            <Tab.Panel>
                                <img
                                    src={`https://api.afreebmart.com/images/products/${product.image}`}
                                    alt={product.product_name}
                                    className="h-full w-full object-cover object-center sm:rounded-lg"
                                />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.product_name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">$ {product.price}</p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-3">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={`
                                                product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                                                'h-5 w-5 flex-shrink-0'
                                            `}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{product.rating} out of 5 stars</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>

                            <div
                                className="space-y-6 text-base text-gray-700"
                                dangerouslySetInnerHTML={{__html: product.description}}
                            />
                        </div>


                        <div className="sm:flex-col1 mt-10 flex">
                            {product.group === 1 ? (
                                <button
                                    type="button"
                                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                >
                                    Join or Create Group
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                >
                                    Add to cart
                                </button>
                            )}

                            <button
                                type="button"
                                className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            >
                                <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true"/>
                                <span className="sr-only">Add to wishlist</span>
                            </button>
                        </div>


                        <section aria-labelledby="details-heading" className="mt-12">
                            <h2 id="details-heading" className="sr-only">
                                Additional details
                            </h2>

                            <div className="divide-y divide-gray-200 border-t">
                                {product && product.details && product.details.map((detail) => (
                                    <Disclosure as="div" key={detail.name}>
                                        {({open}) => (
                                            <>
                                                <h3>
                                                    <Disclosure.Button
                                                        className="group relative flex w-full items-center justify-between py-6 text-left">
                                                        <span
                                                            className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}
                                                        >
                                                          {detail.name}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                          {open ? (
                                                              <MinusIcon
                                                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                                  aria-hidden="true"
                                                              />
                                                          ) : (
                                                              <PlusIcon
                                                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                  aria-hidden="true"
                                                              />
                                                          )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                                                    <ul role="list">
                                                        {detail.items.map((item) => (
                                                            <li key={item}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </div>

                            {/* Share Buttons */}
                            <div
                                className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                                <div className="mt-10 border-t border-gray-200 pt-10">
                                    <h3 className="text-sm font-medium text-gray-900">Share</h3>
                                    <ul role="list" className="mt-4 flex items-center space-x-6">
                                        <li>
                                            <button onClick={() => {
                                                navigator.share({
                                                    title: product.product_name,
                                                    text: product.description,
                                                    url: `https://api.afreebmart.com/products/${product.id}`,
                                                })
                                            }}
                                                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Share on Facebook</span>
                                                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => {
                                                navigator.share({
                                                    title: product.product_name,
                                                    text: product.description,
                                                    url: `https://api.afreebmart.com/products/${product.id}`,
                                                })
                                            }}
                                                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Share on Instagram</span>
                                                <svg className="h-6 w-6" aria-hidden="true" fill="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => {
                                                navigator.share({
                                                    title: product.product_name,
                                                    text: product.description,
                                                    url: `https://api.afreebmart.com/products/${product.id}`,
                                                })
                                            }}
                                                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Share on Twitter</span>
                                                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor"
                                                     viewBox="0 0 20 20">
                                                    <path
                                                        d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                                                </svg>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>


                <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                    <Tab.Group as="div">
                        <div className="border-b border-gray-200">
                            <Tab.List className="-mb-px flex space-x-8">
                                <Tab
                                    className={`({selected}) =>
                                    
                                        selected
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                                `}
                                >
                                    Customer Reviews
                                </Tab>
                                <Tab
                                    className={`({selected}) =>
                                    
                                        selected
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                                    
                                `}
                                >
                                    FAQ
                                </Tab>
                                <Tab
                                    className={`({selected}) =>
                                   
                                        selected
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                                    
                                `}
                                >
                                    License
                                </Tab>
                            </Tab.List>
                        </div>
                        <Tab.Panels as={Fragment}>
                            <Tab.Panel className="-mb-10">
                                <h3 className="sr-only">Customer Reviews</h3>

                                {/*{reviews.featured.map((review, reviewIdx) => (*/}
                                {/*    <div key={review.id} className="flex space-x-4 text-sm text-gray-500">*/}
                                {/*        <div className="flex-none py-10">*/}
                                {/*            <img src={review.avatarSrc} alt=""*/}
                                {/*                 className="h-10 w-10 rounded-full bg-gray-100"/>*/}
                                {/*        </div>*/}
                                {/*        <div*/}
                                {/*            className={classNames(reviewIdx === 0 ? '' : 'border-t border-gray-200', 'py-10')}>*/}
                                {/*            <h3 className="font-medium text-gray-900">{review.author}</h3>*/}
                                {/*            <p>*/}
                                {/*                <time dateTime={review.datetime}>{review.date}</time>*/}
                                {/*            </p>*/}

                                {/*            <div className="mt-4 flex items-center">*/}
                                {/*                {[0, 1, 2, 3, 4].map((rating) => (*/}
                                {/*                    <StarIcon*/}
                                {/*                        key={rating}*/}
                                {/*                        className={classNames(*/}
                                {/*                            review.rating > rating ? 'text-yellow-400' : 'text-gray-300',*/}
                                {/*                            'h-5 w-5 flex-shrink-0'*/}
                                {/*                        )}*/}
                                {/*                        aria-hidden="true"*/}
                                {/*                    />*/}
                                {/*                ))}*/}
                                {/*            </div>*/}
                                {/*            <p className="sr-only">{review.rating} out of 5 stars</p>*/}

                                {/*            <div*/}
                                {/*                className="prose prose-sm mt-4 max-w-none text-gray-500"*/}
                                {/*                dangerouslySetInnerHTML={{__html: review.content}}*/}
                                {/*            />*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*))}*/}
                            </Tab.Panel>

                            <Tab.Panel className="text-sm text-gray-500">
                                <h3 className="sr-only">Frequently Asked Questions</h3>

                                <dl>
                                    {faqs.map((faq) => (
                                        <Fragment key={faq.question}>
                                            <dt className="mt-10 font-medium text-gray-900">{faq.question}</dt>
                                            <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                                                <p>{faq.answer}</p>
                                            </dd>
                                        </Fragment>
                                    ))}
                                </dl>
                            </Tab.Panel>

                            <Tab.Panel className="pt-10">
                                <h3 className="sr-only">License</h3>

                                <div
                                    className="prose prose-sm max-w-none text-gray-500"
                                    dangerouslySetInnerHTML={{__html: license.content}}
                                />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>

        </div>
    )
}