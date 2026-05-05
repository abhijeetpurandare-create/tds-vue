const r={title:"Atoms/Link",tags:["autodocs"]},e={render:()=>{const t=document.createElement("div");return t.style.cssText="display:flex;flex-direction:column;gap:12px",t.innerHTML=`
      <tarmac-link link-style="blue" size="md" text="Track your shipment" href="#"></tarmac-link>
      <tarmac-link link-style="black" size="md" text="View order details" href="#"></tarmac-link>
      <tarmac-link link-style="blue" size="sm" text="Small link" href="#"></tarmac-link>
      <tarmac-link link-style="blue" size="lg" text="Large link" href="#"></tarmac-link>
      <tarmac-link link-style="blue" size="md" text="Disabled link" is-disabled href="#"></tarmac-link>
    `,t}};var l,a,i;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:12px';
    d.innerHTML = \`
      <tarmac-link link-style="blue" size="md" text="Track your shipment" href="#"></tarmac-link>
      <tarmac-link link-style="black" size="md" text="View order details" href="#"></tarmac-link>
      <tarmac-link link-style="blue" size="sm" text="Small link" href="#"></tarmac-link>
      <tarmac-link link-style="blue" size="lg" text="Large link" href="#"></tarmac-link>
      <tarmac-link link-style="blue" size="md" text="Disabled link" is-disabled href="#"></tarmac-link>
    \`;
    return d;
  }
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const n=["Default"];export{e as Default,n as __namedExportsOrder,r as default};
