import React, { lazy, Suspense } from 'react';
import delhiveryLogoDark from '../../../../../packages/molecules/src/assets/delhivery-logo-dark.png';
import fb from '../../../../../packages/molecules/src/assets/fb.png';
import twitterNew from '../../../../../packages/molecules/src/assets/twitter-new.png';
import linkedin from '../../../../../packages/molecules/src/assets/linkedin.png';
import yt from '../../../../../packages/molecules/src/assets/yt.png';
import insta from '../../../../../packages/molecules/src/assets/insta.png';

import Footer from '../../../../../packages/molecules/src/customerAppsFooter'

// Wrapper component to handle loading and error states
const FooterWrapper = (props: any) => (
    <Suspense fallback={<div>Loading timeline component...</div>}>
        <Footer {...props} />
    </Suspense>
);

// Define the default export to configure the story
export default {
    title: 'Test/Footer',
    component: FooterWrapper,
    tags: ['autodocs'],
    args: {
        footerData: { control: "object" },
    }
};

// Template for the story
const Template = (args) => <Footer {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
    footerData: {
        header: {
            img: (
                <img width="180" height="29" src={delhiveryLogoDark} alt="Delhivery" />
            ),
            certifications: [
                "ISO 9001: 2015, ISO 27001: 2013 Certified Company",
                "CIN: L63090DL2011PLC221234",
            ],
        },
        sections: [
            {
                title: 'Services',
                links: [
                    { text: 'Express Parcel', url: '/services/express-parcel' },
                    { text: 'Warehousing', url: '/services/warehousing' },
                    { text: 'Part Truckload', url: '/services/part-truckload' },
                    { text: 'Full Truckload', url: '/services/truckload-freight' },
                    { text: 'Cross Border', url: '/services/cross-border' },
                    { text: 'Data Intelligence', url: '/services/data-intelligence' },
                    {
                        text: 'Software Platform',
                        url: 'https://getos1.com/',
                        external: true,
                    },
                ],
            },
            // Add other sections as needed
        ],
        bottomInfo: {
            securityPolicy: {
                title: 'Information Security Policy',
                descriptionA:
                    'Delhivery is committed to safeguarding the confidentiality, integrity and availability of all physical and electronic information assets of the organization.',
                descriptionB:
                    'We ensure that the regulatory, operational and contractual requirements are fulfilled.',
            },
            disclaimer: {
                title: 'Disclaimer',
                description: 'Operational metrics listed are as of August 04, 2023',
            },
        },
        socialLinks: [
            {
                url: "https://www.facebook.com/delhivery",
                img: <img className="min-w-7 h-7" src={fb} alt="Facebook" />,
                alt: "Facebook",
            },
            {
                url: "https://twitter.com/delhivery",
                img: <img className="min-w-7 h-7" src={twitterNew} alt="Twitter" />,
                alt: "Twitter",
            },
        ],
    },

};

// export const WithoutSocialLinks = Template.bind({});
// Default.args = {
//     footerData: {
//         header: {
//             img: (
//                 <img width="180" height="29" src={delhiveryLogoDark} alt="Delhivery" />
//             ),
//             certifications: [
//                 "ISO 9001: 2015, ISO 27001: 2013 Certified Company",
//                 "CIN: L63090DL2011PLC221234",
//             ],
//         },
//         sections: [
//             {
//                 title: 'Services',
//                 links: [
//                     { text: 'Express Parcel', url: '/services/express-parcel' },
//                     { text: 'Warehousing', url: '/services/warehousing' },
//                     { text: 'Part Truckload', url: '/services/part-truckload' },
//                     { text: 'Full Truckload', url: '/services/truckload-freight' },
//                     { text: 'Cross Border', url: '/services/cross-border' },
//                     { text: 'Data Intelligence', url: '/services/data-intelligence' },
//                     {
//                         text: 'Software Platform',
//                         url: 'https://getos1.com/',
//                         external: true,
//                     },
//                 ],
//             },
//             // Add other sections as needed
//         ],
//         bottomInfo: {
//             securityPolicy: {
//                 title: 'Information Security Policy',
//                 descriptionA:
//                     'Delhivery is committed to safeguarding the confidentiality, integrity and availability of all physical and electronic information assets of the organization.',
//                 descriptionB:
//                     'We ensure that the regulatory, operational and contractual requirements are fulfilled.',
//             },
//             disclaimer: {
//                 title: 'Disclaimer',
//                 description: 'Operational metrics listed are as of August 04, 2023',
//             },
//         },
//         socialLinks: [
//             {
//                 url: "https://www.facebook.com/delhivery",
//                 img: <img className="min-w-7 h-7" src={fb} alt="Facebook" />,
//                 alt: "Facebook",
//             },
//             {
//                 url: "https://twitter.com/delhivery",
//                 img: <img className="min-w-7 h-7" src={twitterNew} alt="Twitter" />,
//                 alt: "Twitter",
//             },
//         ],
//     },
// };


// export const WithoutBottomInfo = Template.bind({});
// Default.args = {
//     footerData: {
//         header: {
//             img: <img width="180" height="29" src={delhiveryLogoDark} alt="Delhivery" />,
//             certifications: [
//                 'ISO 9001: 2015, ISO 27001: 2013 Certified Company',
//                 'CIN: L63090DL2011PLC221234',
//             ],
//         },
//         sections: [
//             {
//                 title: 'Services',
//                 links: [
//                     { text: 'Express Parcel', url: '/services/express-parcel' },
//                     { text: 'Warehousing', url: '/services/warehousing' },
//                     { text: 'Part Truckload', url: '/services/part-truckload' },
//                     { text: 'Full Truckload', url: '/services/truckload-freight' },
//                     { text: 'Cross Border', url: '/services/cross-border' },
//                     { text: 'Data Intelligence', url: '/services/data-intelligence' },
//                     {
//                         text: 'Software Platform',
//                         url: 'https://getos1.com/',
//                         external: true,
//                     },
//                 ],
//             },
//             // Add other sections as needed
//         ],
//         bottomInfo: {},
//         socialLinks: [
//             {
//                 url: "https://www.facebook.com/delhivery",
//                 img: <img className="min-w-7 h-7" src={fb} alt="Facebook" />,
//                 alt: "Facebook",
//             },
//             {
//                 url: "https://twitter.com/delhivery",
//                 img: <img className="min-w-7 h-7" src={twitterNew} alt="Twitter" />,
//                 alt: "Twitter",
//             },
//         ],
//     },
// };