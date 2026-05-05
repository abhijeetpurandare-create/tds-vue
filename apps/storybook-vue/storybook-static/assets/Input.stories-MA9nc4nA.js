const o={title:"Form/Input",tags:["autodocs"]},t={render:()=>{const e=document.createElement("div");return e.style.cssText="display:flex;flex-direction:column;gap:16px;width:320px",e.innerHTML=`
      <tarmac-input label="Tracking ID" input-type="regular" placeholder="Enter AWB number" input-size="md"></tarmac-input>
      <tarmac-input label="Verified" input-type="success" placeholder="Valid AWB" input-size="md"></tarmac-input>
      <tarmac-input label="Invalid" input-type="error" placeholder="Invalid AWB" status-text="Please enter a valid AWB" input-size="md"></tarmac-input>
      <tarmac-input label="Info" input-type="infoBlue" placeholder="Info input" input-size="md"></tarmac-input>
    `,e}},a={render:()=>{const e=document.createElement("div");return e.style.cssText="display:flex;flex-direction:column;gap:16px;width:320px",e.innerHTML=`
      <tarmac-input label="Small" input-size="sm" placeholder="Small input"></tarmac-input>
      <tarmac-input label="Medium" input-size="md" placeholder="Medium input"></tarmac-input>
      <tarmac-input label="Large" input-size="lg" placeholder="Large input"></tarmac-input>
    `,e}},i={render:()=>{const e=document.createElement("div");return e.style.cssText="display:flex;flex-direction:column;gap:16px;width:320px",e.innerHTML=`
      <tarmac-input label="Disabled" is-disabled value="ORD-2024-78901" input-size="md"></tarmac-input>
      <tarmac-input label="Ghost" is-ghost placeholder="Loading..." input-size="md"></tarmac-input>
      <tarmac-input label="Mandatory" is-mandatory placeholder="Required field" input-size="md"></tarmac-input>
    `,e}};var r,n,l;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:16px;width:320px';
    d.innerHTML = \`
      <tarmac-input label="Tracking ID" input-type="regular" placeholder="Enter AWB number" input-size="md"></tarmac-input>
      <tarmac-input label="Verified" input-type="success" placeholder="Valid AWB" input-size="md"></tarmac-input>
      <tarmac-input label="Invalid" input-type="error" placeholder="Invalid AWB" status-text="Please enter a valid AWB" input-size="md"></tarmac-input>
      <tarmac-input label="Info" input-type="infoBlue" placeholder="Info input" input-size="md"></tarmac-input>
    \`;
    return d;
  }
}`,...(l=(n=t.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var p,d,c;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:16px;width:320px';
    d.innerHTML = \`
      <tarmac-input label="Small" input-size="sm" placeholder="Small input"></tarmac-input>
      <tarmac-input label="Medium" input-size="md" placeholder="Medium input"></tarmac-input>
      <tarmac-input label="Large" input-size="lg" placeholder="Large input"></tarmac-input>
    \`;
    return d;
  }
}`,...(c=(d=a.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var u,s,m;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:16px;width:320px';
    d.innerHTML = \`
      <tarmac-input label="Disabled" is-disabled value="ORD-2024-78901" input-size="md"></tarmac-input>
      <tarmac-input label="Ghost" is-ghost placeholder="Loading..." input-size="md"></tarmac-input>
      <tarmac-input label="Mandatory" is-mandatory placeholder="Required field" input-size="md"></tarmac-input>
    \`;
    return d;
  }
}`,...(m=(s=i.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};const x=["Types","Sizes","States"];export{a as Sizes,i as States,t as Types,x as __namedExportsOrder,o as default};
