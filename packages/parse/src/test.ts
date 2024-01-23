import { generateReact } from './react';

// console.log(
//     generateReact(
//         'UpOutlined',
//         `
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M5.03368 15.5244L11.9997 8.55741L18.9667 15.5244" stroke="currentColor" stroke-width="1.5" />
//       </svg>
// `,
//     ),
// );

// const a = generateComponentUtils();
console.log(
    generateReact(
        'Test',
        `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="4" fill="currentColor" />
  <g clip-path="url(#clip0_4983_55280)">
    <path
      d="M22.4783 20H11.5183L9.08828 22.14C8.26828 22.86 6.98828 22.28 6.98828 21.19V10.52C6.98828 9.68 7.66828 9 8.50828 9H22.4683C23.3083 9 23.9883 9.68 23.9883 10.52V18.48C23.9883 19.32 23.3083 20 22.4683 20H22.4783Z"
      stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
    <path d="M10 16.5H20.84" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
    <path d="M10 13.5H18" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
  </g>
  <defs>
    <clipPath id="clip0_4983_55280">
      <rect width="19" height="15.46" fill="white" transform="translate(6 8)" />
    </clipPath>
  </defs>
</svg>
`,
        // { isPreview: true },
    ),
);
