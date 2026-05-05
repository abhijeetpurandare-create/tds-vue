const o={title:"Atoms/Divider",tags:["autodocs"]},r={render:()=>{const e=document.createElement("div");return e.style.cssText="display:flex;flex-direction:column;gap:16px;width:400px",e.innerHTML=`
      <p>Content above</p>
      <tarmac-divider></tarmac-divider>
      <p>Content below</p>
      <tarmac-divider divider-type="dash"></tarmac-divider>
      <p>After dashed divider</p>
      <tarmac-divider size="1.5" color="#ED4136"></tarmac-divider>
      <p>After colored divider</p>
    `,e}},t={render:()=>{const e=document.createElement("div");return e.style.cssText="display:flex;gap:16px;align-items:center;height:40px",e.innerHTML=`
      <span>Left</span>
      <tarmac-divider orientation="vertical"></tarmac-divider>
      <span>Center</span>
      <tarmac-divider orientation="vertical" divider-type="dash"></tarmac-divider>
      <span>Right</span>
    `,e}};var a,d,i;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:16px;width:400px';
    d.innerHTML = \`
      <p>Content above</p>
      <tarmac-divider></tarmac-divider>
      <p>Content below</p>
      <tarmac-divider divider-type="dash"></tarmac-divider>
      <p>After dashed divider</p>
      <tarmac-divider size="1.5" color="#ED4136"></tarmac-divider>
      <p>After colored divider</p>
    \`;
    return d;
  }
}`,...(i=(d=r.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var n,c,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:16px;align-items:center;height:40px';
    d.innerHTML = \`
      <span>Left</span>
      <tarmac-divider orientation="vertical"></tarmac-divider>
      <span>Center</span>
      <tarmac-divider orientation="vertical" divider-type="dash"></tarmac-divider>
      <span>Right</span>
    \`;
    return d;
  }
}`,...(s=(c=t.parameters)==null?void 0:c.docs)==null?void 0:s.source}}};const p=["Default","Vertical"];export{r as Default,t as Vertical,p as __namedExportsOrder,o as default};
