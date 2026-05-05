const n={title:"Overlay/Tooltip",tags:["autodocs"]},t={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;gap:24px;padding:60px",a.innerHTML=`
      <tarmac-tooltip content="Track your shipment" placement="top" variant="black"><tarmac-button text="Hover me (top)" size="sm"></tarmac-button></tarmac-tooltip>
      <tarmac-tooltip content="View order details" placement="bottom" variant="white"><tarmac-button text="Hover me (bottom)" size="sm"></tarmac-button></tarmac-tooltip>
      <tarmac-tooltip content="Delivery info" placement="right" variant="coal"><tarmac-button text="Hover me (right)" size="sm"></tarmac-button></tarmac-tooltip>
    `,a}};var e,o,r;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:24px;padding:60px';
    d.innerHTML = \`
      <tarmac-tooltip content="Track your shipment" placement="top" variant="black"><tarmac-button text="Hover me (top)" size="sm"></tarmac-button></tarmac-tooltip>
      <tarmac-tooltip content="View order details" placement="bottom" variant="white"><tarmac-button text="Hover me (bottom)" size="sm"></tarmac-button></tarmac-tooltip>
      <tarmac-tooltip content="Delivery info" placement="right" variant="coal"><tarmac-button text="Hover me (right)" size="sm"></tarmac-button></tarmac-tooltip>
    \`;
    return d;
  }
}`,...(r=(o=t.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const c=["Default"];export{t as Default,c as __namedExportsOrder,n as default};
