const s={title:"Atoms/StatusIndicator",tags:["autodocs"]},a={render:()=>{const t=document.createElement("div");return t.style.cssText="display:flex;flex-wrap:wrap;gap:16px",t.innerHTML=`
      <tarmac-status-indicator variant="success" label="Delivered"></tarmac-status-indicator>
      <tarmac-status-indicator variant="failed" label="Failed"></tarmac-status-indicator>
      <tarmac-status-indicator variant="warning" label="Delayed"></tarmac-status-indicator>
      <tarmac-status-indicator variant="information" label="In Transit"></tarmac-status-indicator>
      <tarmac-status-indicator variant="pending" label="Pending"></tarmac-status-indicator>
      <tarmac-status-indicator variant="scheduled" label="Scheduled"></tarmac-status-indicator>
      <tarmac-status-indicator variant="unknown" label="Unknown"></tarmac-status-indicator>
    `,t}};var r,i,n;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:16px';
    d.innerHTML = \`
      <tarmac-status-indicator variant="success" label="Delivered"></tarmac-status-indicator>
      <tarmac-status-indicator variant="failed" label="Failed"></tarmac-status-indicator>
      <tarmac-status-indicator variant="warning" label="Delayed"></tarmac-status-indicator>
      <tarmac-status-indicator variant="information" label="In Transit"></tarmac-status-indicator>
      <tarmac-status-indicator variant="pending" label="Pending"></tarmac-status-indicator>
      <tarmac-status-indicator variant="scheduled" label="Scheduled"></tarmac-status-indicator>
      <tarmac-status-indicator variant="unknown" label="Unknown"></tarmac-status-indicator>
    \`;
    return d;
  }
}`,...(n=(i=a.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const e=["AllVariants"];export{a as AllVariants,e as __namedExportsOrder,s as default};
