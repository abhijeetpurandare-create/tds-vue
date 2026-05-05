const o={title:"Atoms/Chip",tags:["autodocs"]},a={render:()=>{const c=document.createElement("div");return c.style.cssText="display:flex;flex-wrap:wrap;gap:8px",c.innerHTML=`
      <tarmac-chip chip-type="black">Black</tarmac-chip>
      <tarmac-chip chip-type="blue">Blue</tarmac-chip>
      <tarmac-chip chip-type="success">Success</tarmac-chip>
      <tarmac-chip chip-type="error">Error</tarmac-chip>
      <tarmac-chip chip-type="warning">Warning</tarmac-chip>
      <tarmac-chip chip-type="coal">Coal</tarmac-chip>
      <tarmac-chip chip-type="dlv_red">DLV Red</tarmac-chip>
    `,c}},e={render:()=>{const c=document.createElement("div");return c.style.cssText="display:flex;flex-wrap:wrap;gap:8px",c.innerHTML=`
      <tarmac-chip chip-type="black" chip-variant="outlined">Black</tarmac-chip>
      <tarmac-chip chip-type="blue" chip-variant="outlined">Blue</tarmac-chip>
      <tarmac-chip chip-type="success" chip-variant="outlined">Success</tarmac-chip>
      <tarmac-chip chip-type="error" chip-variant="outlined">Error</tarmac-chip>
    `,c}},r={render:()=>{const c=document.createElement("div");return c.style.cssText="display:flex;gap:8px;align-items:center",c.innerHTML=`
      <tarmac-chip chip-type="blue" size="sm">Small</tarmac-chip>
      <tarmac-chip chip-type="blue" size="md">Medium</tarmac-chip>
      <tarmac-chip chip-type="blue" size="lg">Large</tarmac-chip>
    `,c}};var t,p,i;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px';
    d.innerHTML = \`
      <tarmac-chip chip-type="black">Black</tarmac-chip>
      <tarmac-chip chip-type="blue">Blue</tarmac-chip>
      <tarmac-chip chip-type="success">Success</tarmac-chip>
      <tarmac-chip chip-type="error">Error</tarmac-chip>
      <tarmac-chip chip-type="warning">Warning</tarmac-chip>
      <tarmac-chip chip-type="coal">Coal</tarmac-chip>
      <tarmac-chip chip-type="dlv_red">DLV Red</tarmac-chip>
    \`;
    return d;
  }
}`,...(i=(p=a.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var s,h,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px';
    d.innerHTML = \`
      <tarmac-chip chip-type="black" chip-variant="outlined">Black</tarmac-chip>
      <tarmac-chip chip-type="blue" chip-variant="outlined">Blue</tarmac-chip>
      <tarmac-chip chip-type="success" chip-variant="outlined">Success</tarmac-chip>
      <tarmac-chip chip-type="error" chip-variant="outlined">Error</tarmac-chip>
    \`;
    return d;
  }
}`,...(m=(h=e.parameters)==null?void 0:h.docs)==null?void 0:m.source}}};var n,l,d;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:8px;align-items:center';
    d.innerHTML = \`
      <tarmac-chip chip-type="blue" size="sm">Small</tarmac-chip>
      <tarmac-chip chip-type="blue" size="md">Medium</tarmac-chip>
      <tarmac-chip chip-type="blue" size="lg">Large</tarmac-chip>
    \`;
    return d;
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const u=["Standard","Outlined","Sizes"];export{e as Outlined,r as Sizes,a as Standard,u as __namedExportsOrder,o as default};
