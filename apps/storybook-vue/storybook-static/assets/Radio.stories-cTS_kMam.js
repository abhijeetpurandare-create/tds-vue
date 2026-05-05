const c={title:"Form/Radio",tags:["autodocs"]},a={render:()=>{const e=document.createElement("div");return e.style.cssText="display:flex;flex-direction:column;gap:12px",e.innerHTML=`
      <tarmac-radio tarmac-variant="standard" name="demo" value="1" checked>Standard (selected)</tarmac-radio>
      <tarmac-radio tarmac-variant="blue" name="demo2" value="2" checked>Blue (selected)</tarmac-radio>
      <tarmac-radio tarmac-variant="green" name="demo3" value="3" checked>Green (selected)</tarmac-radio>
      <tarmac-radio tarmac-variant="dlv_red" name="demo4" value="4" checked>DLV Red (selected)</tarmac-radio>
      <tarmac-radio tarmac-variant="standard" name="demo5" value="5">Unselected</tarmac-radio>
      <tarmac-radio tarmac-variant="standard" name="demo6" value="6" disabled>Disabled</tarmac-radio>
    `,e}};var r,d,t;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:12px';
    d.innerHTML = \`
      <tarmac-radio tarmac-variant="standard" name="demo" value="1" checked>Standard (selected)</tarmac-radio>
      <tarmac-radio tarmac-variant="blue" name="demo2" value="2" checked>Blue (selected)</tarmac-radio>
      <tarmac-radio tarmac-variant="green" name="demo3" value="3" checked>Green (selected)</tarmac-radio>
      <tarmac-radio tarmac-variant="dlv_red" name="demo4" value="4" checked>DLV Red (selected)</tarmac-radio>
      <tarmac-radio tarmac-variant="standard" name="demo5" value="5">Unselected</tarmac-radio>
      <tarmac-radio tarmac-variant="standard" name="demo6" value="6" disabled>Disabled</tarmac-radio>
    \`;
    return d;
  }
}`,...(t=(d=a.parameters)==null?void 0:d.docs)==null?void 0:t.source}}};const m=["Variants"];export{a as Variants,m as __namedExportsOrder,c as default};
