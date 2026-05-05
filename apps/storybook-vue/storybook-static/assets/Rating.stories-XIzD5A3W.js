const i={title:"Form/Rating",tags:["autodocs"]},a={render:()=>{const e=document.createElement("div");return e.style.cssText="display:flex;flex-direction:column;gap:16px",e.innerHTML=`
      <div><span style="font-size:13px;color:#6b6b6b">Interactive:</span><br/><tarmac-rating value="3" size="lg"></tarmac-rating></div>
      <div><span style="font-size:13px;color:#6b6b6b">Read-only:</span><br/><tarmac-rating value="4" size="lg" read-only></tarmac-rating></div>
      <div><span style="font-size:13px;color:#6b6b6b">Half stars:</span><br/><tarmac-rating value="3.5" size="lg" allow-half read-only></tarmac-rating></div>
      <div><span style="font-size:13px;color:#6b6b6b">Sizes:</span><br/>
        <div style="display:flex;gap:16px;align-items:center">
          <tarmac-rating value="4" size="sm" read-only></tarmac-rating>
          <tarmac-rating value="4" size="md" read-only></tarmac-rating>
          <tarmac-rating value="4" size="lg" read-only></tarmac-rating>
        </div>
      </div>
    `,e}};var r,t,n;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:16px';
    d.innerHTML = \`
      <div><span style="font-size:13px;color:#6b6b6b">Interactive:</span><br/><tarmac-rating value="3" size="lg"></tarmac-rating></div>
      <div><span style="font-size:13px;color:#6b6b6b">Read-only:</span><br/><tarmac-rating value="4" size="lg" read-only></tarmac-rating></div>
      <div><span style="font-size:13px;color:#6b6b6b">Half stars:</span><br/><tarmac-rating value="3.5" size="lg" allow-half read-only></tarmac-rating></div>
      <div><span style="font-size:13px;color:#6b6b6b">Sizes:</span><br/>
        <div style="display:flex;gap:16px;align-items:center">
          <tarmac-rating value="4" size="sm" read-only></tarmac-rating>
          <tarmac-rating value="4" size="md" read-only></tarmac-rating>
          <tarmac-rating value="4" size="lg" read-only></tarmac-rating>
        </div>
      </div>
    \`;
    return d;
  }
}`,...(n=(t=a.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};const s=["Default"];export{a as Default,s as __namedExportsOrder,i as default};
