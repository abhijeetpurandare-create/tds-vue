const l={title:"Atoms/Badge",tags:["autodocs"]},e={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;flex-wrap:wrap;gap:8px;align-items:center",a.innerHTML=`
      <tarmac-badge variant="black">Black</tarmac-badge>
      <tarmac-badge variant="white">White</tarmac-badge>
      <tarmac-badge variant="coal">Coal</tarmac-badge>
      <tarmac-badge variant="dlv_red">DLV Red</tarmac-badge>
      <tarmac-badge variant="info">Info</tarmac-badge>
      <tarmac-badge variant="success">Success</tarmac-badge>
      <tarmac-badge variant="warning">Warning</tarmac-badge>
      <tarmac-badge variant="error">Error</tarmac-badge>
      <tarmac-badge variant="cardbox">Cardbox</tarmac-badge>
    `,a}},r={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;gap:8px;align-items:center",a.innerHTML=`
      <tarmac-badge variant="info" size="sm">Small</tarmac-badge>
      <tarmac-badge variant="info" size="md">Medium</tarmac-badge>
      <tarmac-badge variant="info" size="lg">Large</tarmac-badge>
    `,a}},t={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;gap:8px;align-items:center",a.innerHTML=`
      <tarmac-badge variant="success">Normal</tarmac-badge>
      <tarmac-badge variant="success" show-status>With Status</tarmac-badge>
      <tarmac-badge variant="success" is-disabled>Disabled</tarmac-badge>
      <tarmac-badge variant="success" is-ghost>Ghost</tarmac-badge>
    `,a}};var c,s,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;align-items:center';
    d.innerHTML = \`
      <tarmac-badge variant="black">Black</tarmac-badge>
      <tarmac-badge variant="white">White</tarmac-badge>
      <tarmac-badge variant="coal">Coal</tarmac-badge>
      <tarmac-badge variant="dlv_red">DLV Red</tarmac-badge>
      <tarmac-badge variant="info">Info</tarmac-badge>
      <tarmac-badge variant="success">Success</tarmac-badge>
      <tarmac-badge variant="warning">Warning</tarmac-badge>
      <tarmac-badge variant="error">Error</tarmac-badge>
      <tarmac-badge variant="cardbox">Cardbox</tarmac-badge>
    \`;
    return d;
  }
}`,...(d=(s=e.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var n,i,m;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:8px;align-items:center';
    d.innerHTML = \`
      <tarmac-badge variant="info" size="sm">Small</tarmac-badge>
      <tarmac-badge variant="info" size="md">Medium</tarmac-badge>
      <tarmac-badge variant="info" size="lg">Large</tarmac-badge>
    \`;
    return d;
  }
}`,...(m=(i=r.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var g,b,o;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:8px;align-items:center';
    d.innerHTML = \`
      <tarmac-badge variant="success">Normal</tarmac-badge>
      <tarmac-badge variant="success" show-status>With Status</tarmac-badge>
      <tarmac-badge variant="success" is-disabled>Disabled</tarmac-badge>
      <tarmac-badge variant="success" is-ghost>Ghost</tarmac-badge>
    \`;
    return d;
  }
}`,...(o=(b=t.parameters)==null?void 0:b.docs)==null?void 0:o.source}}};const u=["AllVariants","Sizes","States"];export{e as AllVariants,r as Sizes,t as States,u as __namedExportsOrder,l as default};
