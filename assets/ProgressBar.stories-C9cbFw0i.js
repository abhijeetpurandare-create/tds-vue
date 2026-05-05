const o={title:"Feedback/ProgressBar",tags:["autodocs"]},r={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;flex-direction:column;gap:20px;width:400px",a.innerHTML=`
      <div><span style="font-size:13px;color:#6b6b6b">Primary 65%:</span><tarmac-progress-bar value="65" variant="primary" size="md" show-percentage></tarmac-progress-bar></div>
      <div><span style="font-size:13px;color:#6b6b6b">Success 100%:</span><tarmac-progress-bar value="100" variant="success" size="md" show-percentage></tarmac-progress-bar></div>
      <div><span style="font-size:13px;color:#6b6b6b">Error 30%:</span><tarmac-progress-bar value="30" variant="error" size="lg"></tarmac-progress-bar></div>
      <div><span style="font-size:13px;color:#6b6b6b">Warning 50%:</span><tarmac-progress-bar value="50" variant="warning" size="sm"></tarmac-progress-bar></div>
    `,a}};var e,s,t;r.parameters={...r.parameters,docs:{...(e=r.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:20px;width:400px';
    d.innerHTML = \`
      <div><span style="font-size:13px;color:#6b6b6b">Primary 65%:</span><tarmac-progress-bar value="65" variant="primary" size="md" show-percentage></tarmac-progress-bar></div>
      <div><span style="font-size:13px;color:#6b6b6b">Success 100%:</span><tarmac-progress-bar value="100" variant="success" size="md" show-percentage></tarmac-progress-bar></div>
      <div><span style="font-size:13px;color:#6b6b6b">Error 30%:</span><tarmac-progress-bar value="30" variant="error" size="lg"></tarmac-progress-bar></div>
      <div><span style="font-size:13px;color:#6b6b6b">Warning 50%:</span><tarmac-progress-bar value="50" variant="warning" size="sm"></tarmac-progress-bar></div>
    \`;
    return d;
  }
}`,...(t=(s=r.parameters)==null?void 0:s.docs)==null?void 0:t.source}}};const n=["Default"];export{r as Default,n as __namedExportsOrder,o as default};
