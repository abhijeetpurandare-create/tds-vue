const s={title:"Form/Checkbox",tags:["autodocs"]},e={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;flex-direction:column;gap:12px",a.innerHTML=`
      <tarmac-checkbox tarmac-variant="standard" checked>Standard (checked)</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="blue" checked>Blue (checked)</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="green" checked>Green (checked)</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="dlv_red" checked>DLV Red (checked)</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="standard">Unchecked</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="standard" indeterminate>Indeterminate</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="standard" disabled>Disabled</tarmac-checkbox>
    `,a}},c={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;flex-direction:column;gap:16px",a.innerHTML=`
      <tarmac-checkbox tarmac-variant="standard" subtext="Receive SMS updates for this shipment">Enable notifications</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="blue" tarmac-style="rounded" subtext="I agree to the terms and conditions">Accept terms</tarmac-checkbox>
    `,a}};var t,r,d;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:12px';
    d.innerHTML = \`
      <tarmac-checkbox tarmac-variant="standard" checked>Standard (checked)</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="blue" checked>Blue (checked)</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="green" checked>Green (checked)</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="dlv_red" checked>DLV Red (checked)</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="standard">Unchecked</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="standard" indeterminate>Indeterminate</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="standard" disabled>Disabled</tarmac-checkbox>
    \`;
    return d;
  }
}`,...(d=(r=e.parameters)==null?void 0:r.docs)==null?void 0:d.source}}};var n,o,m;c.parameters={...c.parameters,docs:{...(n=c.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:16px';
    d.innerHTML = \`
      <tarmac-checkbox tarmac-variant="standard" subtext="Receive SMS updates for this shipment">Enable notifications</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="blue" tarmac-style="rounded" subtext="I agree to the terms and conditions">Accept terms</tarmac-checkbox>
    \`;
    return d;
  }
}`,...(m=(o=c.parameters)==null?void 0:o.docs)==null?void 0:m.source}}};const i=["Variants","WithSubtext"];export{e as Variants,c as WithSubtext,i as __namedExportsOrder,s as default};
