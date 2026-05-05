const p={title:"Atoms/Spinner",tags:["autodocs"]},r={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;gap:16px;align-items:center",a.innerHTML=`
      <tarmac-spinner tarmac-variant="tarmac-01" tarmac-size="24px"></tarmac-spinner>
      <tarmac-spinner tarmac-variant="tarmac-01" tarmac-size="32px"></tarmac-spinner>
      <tarmac-spinner tarmac-variant="tarmac-01" tarmac-size="44px"></tarmac-spinner>
    `,a}},e={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;gap:16px;align-items:center",a.innerHTML=`
      <tarmac-spinner variant="primary" size="sm"></tarmac-spinner>
      <tarmac-spinner variant="success" size="md"></tarmac-spinner>
      <tarmac-spinner variant="error" size="lg"></tarmac-spinner>
    `,a}};var t,n,s;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:16px;align-items:center';
    d.innerHTML = \`
      <tarmac-spinner tarmac-variant="tarmac-01" tarmac-size="24px"></tarmac-spinner>
      <tarmac-spinner tarmac-variant="tarmac-01" tarmac-size="32px"></tarmac-spinner>
      <tarmac-spinner tarmac-variant="tarmac-01" tarmac-size="44px"></tarmac-spinner>
    \`;
    return d;
  }
}`,...(s=(n=r.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var c,i,m;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:16px;align-items:center';
    d.innerHTML = \`
      <tarmac-spinner variant="primary" size="sm"></tarmac-spinner>
      <tarmac-spinner variant="success" size="md"></tarmac-spinner>
      <tarmac-spinner variant="error" size="lg"></tarmac-spinner>
    \`;
    return d;
  }
}`,...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const d=["Default","Legacy"];export{r as Default,e as Legacy,d as __namedExportsOrder,p as default};
