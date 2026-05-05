const z={title:"Atoms/Avatar",tags:["autodocs"]},t={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;gap:12px;align-items:center",a.innerHTML=`
      <tarmac-avatar size="sm">AB</tarmac-avatar>
      <tarmac-avatar size="md">CD</tarmac-avatar>
      <tarmac-avatar size="lg">EF</tarmac-avatar>
      <tarmac-avatar size="xl">GH</tarmac-avatar>
    `,a}},e={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;gap:12px;align-items:center",a.innerHTML=`
      <tarmac-avatar size="lg" shape="round">RD</tarmac-avatar>
      <tarmac-avatar size="lg" shape="square">SQ</tarmac-avatar>
    `,a}},r={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;gap:16px;align-items:center",a.innerHTML=`
      <tarmac-avatar size="lg" show-status status-type="active">ON</tarmac-avatar>
      <tarmac-avatar size="lg" show-status status-type="inactive">OF</tarmac-avatar>
      <tarmac-avatar size="lg" show-status status-type="idle">ID</tarmac-avatar>
      <tarmac-avatar size="lg" show-status status-type="brand">BR</tarmac-avatar>
    `,a}},s={render:()=>{const a=document.createElement("div");return a.style.cssText="display:flex;gap:12px;align-items:center",a.innerHTML=`
      <tarmac-avatar size="lg">OK</tarmac-avatar>
      <tarmac-avatar size="lg" is-disabled>DI</tarmac-avatar>
      <tarmac-avatar size="lg" is-ghost>GH</tarmac-avatar>
    `,a}};var c,m,i;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:12px;align-items:center';
    d.innerHTML = \`
      <tarmac-avatar size="sm">AB</tarmac-avatar>
      <tarmac-avatar size="md">CD</tarmac-avatar>
      <tarmac-avatar size="lg">EF</tarmac-avatar>
      <tarmac-avatar size="xl">GH</tarmac-avatar>
    \`;
    return d;
  }
}`,...(i=(m=t.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var n,d,l;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:12px;align-items:center';
    d.innerHTML = \`
      <tarmac-avatar size="lg" shape="round">RD</tarmac-avatar>
      <tarmac-avatar size="lg" shape="square">SQ</tarmac-avatar>
    \`;
    return d;
  }
}`,...(l=(d=e.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var o,v,p;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:16px;align-items:center';
    d.innerHTML = \`
      <tarmac-avatar size="lg" show-status status-type="active">ON</tarmac-avatar>
      <tarmac-avatar size="lg" show-status status-type="inactive">OF</tarmac-avatar>
      <tarmac-avatar size="lg" show-status status-type="idle">ID</tarmac-avatar>
      <tarmac-avatar size="lg" show-status status-type="brand">BR</tarmac-avatar>
    \`;
    return d;
  }
}`,...(p=(v=r.parameters)==null?void 0:v.docs)==null?void 0:p.source}}};var u,g,x;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:12px;align-items:center';
    d.innerHTML = \`
      <tarmac-avatar size="lg">OK</tarmac-avatar>
      <tarmac-avatar size="lg" is-disabled>DI</tarmac-avatar>
      <tarmac-avatar size="lg" is-ghost>GH</tarmac-avatar>
    \`;
    return d;
  }
}`,...(x=(g=s.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const y=["Initials","Shapes","StatusDot","States"];export{t as Initials,e as Shapes,s as States,r as StatusDot,y as __namedExportsOrder,z as default};
