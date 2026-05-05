const d={title:"Navigation/TabCell",tags:["autodocs"]},e={render:()=>{const t=document.createElement("div");return t.style.cssText="display:flex;gap:0",t.innerHTML=`
      <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="All Orders" is-pressed></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="In Transit"></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="Delivered"></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="Returned"></tarmac-tab-cell>
    `,t}},a={render:()=>{const t=document.createElement("div");return t.style.cssText="display:flex;gap:8px",t.innerHTML=`
      <tarmac-tab-cell tab-type="button" tab-style="blue" size="lg" title="Active" is-pressed></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="button" tab-style="blue" size="lg" title="Inactive"></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="button" tab-style="blue" size="lg" title="Disabled" is-disabled></tarmac-tab-cell>
    `,t}};var l,r,c;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:0';
    d.innerHTML = \`
      <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="All Orders" is-pressed></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="In Transit"></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="Delivered"></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="Returned"></tarmac-tab-cell>
    \`;
    return d;
  }
}`,...(c=(r=e.parameters)==null?void 0:r.docs)==null?void 0:c.source}}};var s,b,i;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:8px';
    d.innerHTML = \`
      <tarmac-tab-cell tab-type="button" tab-style="blue" size="lg" title="Active" is-pressed></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="button" tab-style="blue" size="lg" title="Inactive"></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="button" tab-style="blue" size="lg" title="Disabled" is-disabled></tarmac-tab-cell>
    \`;
    return d;
  }
}`,...(i=(b=a.parameters)==null?void 0:b.docs)==null?void 0:i.source}}};const n=["Default","ButtonType"];export{a as ButtonType,e as Default,n as __namedExportsOrder,d as default};
